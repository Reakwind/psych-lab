import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import agent_safety as safety
import agents as workflow
from agent_policy import check_claims, contract


def task(name='mobile-controls', scope=None):
    return {'task': name, 'agent': 'test-agent', 'branch': 'agent/' + name,
            'scope': scope or ['psych-lab/intervention/app.mjs']}


def pr(number, c):
    return {'number': number, 'body': '<!-- agent-contract\n' + json.dumps(c) + '\n-->'}


class Commands(unittest.TestCase):
    def test_safe_reads_and_normal_commits(self):
        for command in ['git status --short', 'git -C "a directory" diff --stat',
                        'git fetch origin main', 'git restore --staged -- owned.txt',
                        'git commit -m "fix(preview): explain the reason"',
                        'git push -u origin agent/mobile-controls', 'git lfs pull',
                        'git merge --no-edit origin/main', 'npm test']:
            with self.subTest(command=command):
                self.assertIsNone(safety.command_problem(command))

    def test_destructive_commands_and_wrappers(self):
        for command in ['git reset --hard HEAD', 'git clean -fd', 'git checkout -- file',
                        'git restore file', 'git rebase origin/main', 'git commit --amend',
                        'git push --force-with-lease', 'git push -f origin branch',
                        'git push origin :main', 'git push origin +HEAD:main',
                        'git push --mirror', 'git branch -D work', 'git branch -M main',
                        'git worktree remove ../other', 'git reflog expire --all',
                        'git -c core.hooksPath=/tmp commit -m bypass',
                        'git commit --no-verify -m bypass', 'git add -A',
                        'GIT_CONFIG_COUNT=1 git push origin main',
                        'bash -lc "git reset --hard"', 'env X=1 /usr/bin/git clean -fd',
                        'git status && git reset --hard', 'rm -rf .git',
                        'find .git -delete', 'git update-ref refs/heads/main HEAD',
                        'git unknown-alias', 'git switch -C main',
                        'echo x > .git/config', 'cp hook ./.git/hooks/pre-push', 'export GIT_DIR=/tmp/other',
                        'git config --global user.name someone', "bash <<'EOF'\ngit reset --hard\nEOF",
                        "cat > notes.md <<EOF\ntext\nEOF\ngit clean -fd",
                        # Unquoted heredocs expand $(...); pipelines may hand bodies to a shell;
                        # an unresolved delimiter must not hide the commands after it.
                        "cat > notes.md <<EOF\n$(git reset --hard)\nEOF",
                        "cat <<'EOF' | bash\ngit reset --hard\nEOF",
                        "cat <<EOF-TEXT\nhello\nEOF-TEXT\ngit reset --hard",
                        "cat <<'EOF'\nunterminated\ngit reset --hard"]:
            with self.subTest(command=command):
                self.assertIsNotNone(safety.command_problem(command))

    def test_ordinary_commands_near_git_names_are_not_false_positives(self):
        # `.github/`, `.gitignore`, stderr redirects and heredoc data are not Git metadata writes.
        for command in ['ls .github .githooks 2>/dev/null', 'cat .gitignore 2>&1 | head',
                        'grep -n GIT_CONFIG tests/test_agent_workflow.py', 'git config --global --get user.name',
                        "python3 - <<'EOF'\nfrom agent_safety import git\nc = git('branch')\nEOF",
                        "cat > notes.md <<'EOF'\nnever run git reset --hard\nEOF",
                        "git commit -m \"$(cat <<'EOF'\nfix(x): explain git reset avoidance\nEOF\n)\"",
                        'git remote get-url origin', 'git stash list', 'git grep -n contract']:
            with self.subTest(command=command):
                self.assertIsNone(safety.command_problem(command))


class Ownership(unittest.TestCase):
    def test_older_github_cli_pagination(self):
        self.assertEqual(safety.json_pages(' [1, 2]\n [3] \n'), [[1, 2], [3]])
        self.assertEqual(safety.json_pages('[]'), [[]])
        with self.assertRaises(ValueError):
            safety.json_pages('{}')

    def test_repository_proxy_does_not_allow_other_destinations(self):
        self.assertTrue(safety.origin_allowed('http://local_proxy@127.0.0.1:8765/git/Reakwind/psych-lab'))
        self.assertFalse(safety.origin_allowed('http://127.0.0.1:8765/git/someone/other'))
        self.assertFalse(safety.origin_allowed('https://untrusted.example/git/Reakwind/psych-lab'))
        self.assertFalse(safety.origin_allowed('https://github.com/Reakwind/psych-lab?token=anything'))

    def test_exact_files_do_not_conflict_with_siblings(self):
        self.assertFalse(safety.overlap(['a/file.mjs'], ['a/other.mjs']))
        self.assertFalse(safety.overlap(['a/film1/'], ['a/film10/']))
        self.assertTrue(safety.overlap(['a/'], ['a/file.mjs']))
        self.assertTrue(safety.overlap(['a/film1/'], ['a/film1/src/']))

    def test_paths_cannot_escape_scope(self):
        c = task(scope=['animation-kit/film8/'])
        safety.check_scope(c, ['animation-kit/film8/src/scene.js', 'docs/agent-tasks/mobile-controls.json'])
        with self.assertRaises(ValueError):
            safety.check_scope(c, ['animation-kit/film80/src/scene.js'])
        with self.assertRaises(ValueError):
            safety.check_scope(c, ['docs/agent-tasks/another-task.json'])
        for scope in ['../', '/', '*', 'a/../b', '.git/', '-x', 'a\\b']:
            with self.subTest(scope=scope), self.assertRaises(ValueError):
                safety.validate_contract(task(scope=[scope]))

    def test_oldest_claim_wins_without_deadlock(self):
        older, newer = task('older-task'), task('newer-task')
        pages = [[pr(12, older), pr(13, newer)]]
        check_claims(older, pages, current=12)
        with self.assertRaisesRegex(ValueError, '#12'):
            check_claims(newer, pages, current=13)
        with self.assertRaises(ValueError):
            check_claims(newer, pages, current=None)

    def test_different_files_can_be_reserved_concurrently(self):
        check_claims(task(scope=['different.mjs']), [[pr(1, task('existing-task'))]], current=2)

    def test_contract_must_be_unique_and_complete(self):
        self.assertEqual(contract(pr(1, task())['body']), task())
        for body in ['', pr(1, task())['body'] * 2, '<!-- agent-contract\n{}\n-->']:
            with self.assertRaises(ValueError):
                contract(body)

    def test_invalid_open_claim_fails_closed(self):
        with self.assertRaisesRegex(ValueError, 'no valid scope'):
            check_claims(task(), [[{'number': 1, 'body': 'missing contract'}]], None)


class GitHubAccess(unittest.TestCase):
    """Hosted proxies block GraphQL, so the workflow must use REST endpoints only."""

    def test_reservation_lookup_uses_rest_head_filter(self):
        c = task()
        listed = [[{'number': 7, 'html_url': 'https://example.invalid/7', 'draft': True, **pr(7, c)}]]
        with patch.object(workflow, 'gh_api', return_value=listed) as api:
            self.assertEqual(workflow.assert_reserved(c)['number'], 7)
        path = api.call_args.args[0]
        self.assertTrue(path.startswith('repos/Reakwind/psych-lab/pulls?'))
        self.assertIn('head=Reakwind%3Aagent%2Fmobile-controls', path)

    def test_gh_cli_calls_are_rest_only(self):
        result = subprocess.CompletedProcess([], 0, stdout='{"number": 3}', stderr='')
        with patch.object(workflow.shutil, 'which', return_value='/usr/bin/gh'), \
                patch.object(workflow.subprocess, 'run', return_value=result) as run:
            workflow.gh_api('repos/Reakwind/psych-lab/pulls', method='POST', data={'title': 'x'})
        args = run.call_args.args[0]
        self.assertEqual(args[:4], ['gh', 'api', '-X', 'POST'])
        self.assertEqual(json.loads(run.call_args.kwargs['input']), {'title': 'x'})

    def test_ready_falls_back_to_hosted_rest_route(self):
        failed = subprocess.CompletedProcess([], 1)
        with patch.object(workflow.shutil, 'which', return_value='/usr/bin/gh'), \
                patch.object(workflow.subprocess, 'run', return_value=failed), \
                patch.object(workflow, 'gh_api') as api:
            workflow.mark_ready({'number': 9, 'draft': True})
        api.assert_called_once_with('repos/Reakwind/psych-lab/pulls/9/ccr/ready_for_review', method='POST')

    def test_required_checks_follow_recorded_ruleset(self):
        self.assertEqual(workflow.required_checks(), ['agent-policy', 'quality'])

    def test_merge_gate(self):
        head = 'a' * 40
        pr_state = {'state': 'open', 'draft': False, 'head': {'sha': head}}
        green = [{'name': 'quality', 'status': 'completed', 'conclusion': 'success'},
                 {'name': 'agent-policy', 'status': 'completed', 'conclusion': 'cancelled'},
                 {'name': 'agent-policy', 'status': 'completed', 'conclusion': 'success'}]
        required = ['agent-policy', 'quality']
        done = {'status': 'completed', 'commit_sha': head}
        self.assertEqual(workflow.merge_problems(pr_state, head, green, required, [{'resolved': True}], done), [])
        cases = {
            'No Codex review': (pr_state, green, [], None),
            'not the head': (pr_state, green, [], {'status': 'completed', 'commit_sha': 'c' * 40}),
            'still running; wait': (pr_state, green, [], {'status': 'running', 'commit_sha': head}),
            'draft': ({**pr_state, 'draft': True}, green, [], done),
            'differs': ({**pr_state, 'head': {'sha': 'b' * 40}}, green, [], done),
            'failed': (pr_state, green + [{'name': 'quality', 'status': 'completed', 'conclusion': 'failure'}], [], done),
            'still running': (pr_state, green + [{'name': 'quality', 'status': 'in_progress', 'conclusion': None}], [], done),
            'no successful': (pr_state, green[1:], [], done),
            'unresolved': (pr_state, green, [{'resolved': False}], done),
        }
        for expected, (state, runs, threads, codex) in cases.items():
            with self.subTest(expected=expected):
                problems = workflow.merge_problems(state, head, runs, required, threads, codex)
                self.assertTrue(any(expected in p for p in problems), problems)

    def test_review_request_targets_pushed_head(self):
        c = task()
        head = 'd' * 40
        listed = [[{'number': 5, 'draft': False, 'head': {'sha': head}, **pr(5, c)}]]
        with patch.object(workflow, 'context', return_value=c), patch.object(workflow, 'git', return_value=head), \
                patch.object(workflow, 'gh_api', side_effect=[listed, {}]) as api:
            workflow.request_review(SimpleNamespace(footer=None))
        self.assertEqual(api.call_args.args[0], 'repos/Reakwind/psych-lab/issues/5/comments')
        self.assertEqual(api.call_args.kwargs['data']['body'], '@codex review')
        with patch.object(workflow, 'context', return_value=c), patch.object(workflow, 'git', return_value='e' * 40), \
                patch.object(workflow, 'gh_api', return_value=listed), self.assertRaisesRegex(ValueError, 'Push'):
            workflow.request_review(SimpleNamespace(footer=None))

    def test_codex_review_state_is_read_from_summary_comment(self):
        body = ('<!-- codex-review-state:v1 &#123;"code_review":&#123;"commit_sha":"abc",'
                '"status":"completed"&#125;&#125; -->\n## Codex Review Summary')
        self.assertEqual(workflow.codex_review_state([{'body': 'hi'}, {'body': body}])['status'], 'completed')
        self.assertIsNone(workflow.codex_review_state([{'body': 'no review here'}]))

    def test_lfs_hydration_counts(self):
        listing = 'abc123 * film/a.mp4\ndef456 - film/b.mp4\n0ff1ce - voice over/c.m4a\n'
        self.assertEqual(workflow.lfs_counts(listing), (1, 2))


class GitIntegration(unittest.TestCase):
    def setUp(self):
        # Hosted agents usually have a global Git identity; ignore machine configuration entirely.
        self.env = patch.dict(os.environ, {'GIT_CONFIG_GLOBAL': os.devnull, 'GIT_CONFIG_NOSYSTEM': '1'})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.patch = patch.object(safety, 'ROOT', self.root)
        self.patch.start()
        self.workflow_patch = patch.object(workflow, 'ROOT', self.root)
        self.workflow_patch.start()
        self.run_git('init', '-b', 'agent/mobile-controls')
        self.run_git('config', 'user.name', 'Guard test')
        self.run_git('config', 'user.email', 'guard@example.invalid')
        (self.root / '.agent-context.json').write_text(json.dumps(task(scope=['owned.txt'])))
        (self.root / '.gitignore').write_text('.agent-context.json\n')
        (self.root / 'owned.txt').write_text('initial\n')
        self.run_git('add', 'owned.txt', '.gitignore')
        self.run_git('commit', '-m', 'Initial test state')
        self.first = self.run_git('rev-parse', 'HEAD')
        (self.root / 'owned.txt').write_text('updated\n')
        self.run_git('add', 'owned.txt')
        self.run_git('commit', '-m', 'Update test state')
        self.head = self.run_git('rev-parse', 'HEAD')

    def run_git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.root, stderr=subprocess.DEVNULL, text=True).strip()

    def tearDown(self):
        self.workflow_patch.stop()
        self.patch.stop()
        self.temp.cleanup()

    def push_line(self, new=None, old=None, destination=None):
        ref = 'refs/heads/agent/mobile-controls'
        return f'{ref} {new or self.head} {destination or ref} {old or self.first}\n'

    def test_owned_fast_forward_is_allowed(self):
        safety.pre_push('origin', 'https://github.com/Reakwind/psych-lab.git', self.push_line())

    def test_up_to_date_push_with_blank_input_is_allowed(self):
        safety.pre_push('origin', 'https://github.com/Reakwind/psych-lab.git', '\n')
        safety.pre_push('origin', 'https://github.com/Reakwind/psych-lab.git', '\n' + self.push_line())

    def test_actual_history_rewrite_is_blocked(self):
        with self.assertRaisesRegex(ValueError, 'Non-fast-forward'):
            safety.pre_push('origin', 'https://github.com/Reakwind/psych-lab.git', self.push_line(new=self.first, old=self.head))

    def test_main_deletion_foreign_ref_and_remote_are_blocked(self):
        for line in [self.push_line(destination='refs/heads/main'),
                     self.push_line(new=safety.ZERO), self.push_line(destination='refs/heads/agent/other-task')]:
            with self.subTest(line=line), self.assertRaises(ValueError):
                safety.pre_push('origin', 'https://github.com/Reakwind/psych-lab.git', line)
        with self.assertRaises(ValueError):
            safety.pre_push('origin', 'https://github.com/other/repo.git', self.push_line())

    def test_unrelated_staged_work_is_rejected(self):
        (self.root / 'unowned.txt').write_text('other task\n')
        self.run_git('add', 'unowned.txt')
        with self.assertRaisesRegex(ValueError, 'outside'):
            safety.pre_commit()

    def test_main_commit_is_rejected(self):
        self.run_git('switch', '-c', 'main')
        with self.assertRaisesRegex(ValueError, 'owned task branch'):
            safety.pre_commit()

    def test_secret_scan_does_not_expose_credential(self):
        fake = 'ghp_' + 'x' * 36
        (self.root / 'owned.txt').write_text(fake)
        self.run_git('add', 'owned.txt')
        with self.assertRaises(ValueError) as caught:
            safety.scan_secrets(staged=True)
        self.assertNotIn(fake, str(caught.exception))
        self.assertIn('GitHub credential', str(caught.exception))

    def test_reservation_can_resume_after_network_failure(self):
        c = task(scope=['owned.txt'])
        metadata = self.root / 'docs/agent-tasks/mobile-controls.json'
        metadata.parent.mkdir(parents=True)
        metadata.write_text(json.dumps(c))
        self.run_git('add', str(metadata.relative_to(self.root)))
        with patch.object(workflow, 'git', side_effect=self.run_git):
            self.assertTrue(workflow.resume_state(c))

    def test_cloud_identity_uses_authenticated_noreply_address(self):
        self.run_git('config', '--unset', 'user.name')
        self.run_git('config', '--unset', 'user.email')
        with patch.object(workflow, 'gh_api', return_value={'id': 123, 'login': 'test-agent', 'name': 'Test Agent'}):
            workflow.ensure_identity()
        self.assertEqual(self.run_git('config', 'user.name'), 'Test Agent')
        self.assertEqual(self.run_git('config', 'user.email'), '123+test-agent@users.noreply.github.com')

    def test_provider_identity_is_preserved(self):
        with patch.object(workflow, 'gh_api') as api:
            workflow.ensure_identity()
        api.assert_not_called()
        self.assertEqual(self.run_git('config', 'user.name'), 'Guard test')

    def test_reservation_recovery_preserves_other_work(self):
        c = task(scope=['owned.txt'])
        metadata = self.root / 'docs/agent-tasks/mobile-controls.json'
        metadata.parent.mkdir(parents=True)
        metadata.write_text(json.dumps(c))
        (self.root / 'owned.txt').write_text('unfinished work\n')
        with patch.object(workflow, 'git', side_effect=self.run_git), self.assertRaisesRegex(ValueError, 'other uncommitted'):
            workflow.resume_state(c)
        self.assertEqual((self.root / 'owned.txt').read_text(), 'unfinished work\n')

    def merge_current_task_into_main(self):
        """Simulate a squash merge: main gains the task manifest; the task branch keeps its own commits."""
        self.run_git('switch', '-c', 'main-sim', self.first)
        metadata = self.root / 'docs/agent-tasks/mobile-controls.json'
        metadata.parent.mkdir(parents=True)
        metadata.write_text(json.dumps(task(scope=['owned.txt'])))
        self.run_git('add', 'docs/agent-tasks/mobile-controls.json')
        self.run_git('commit', '-m', 'Squashed task')
        self.run_git('update-ref', 'refs/remotes/origin/main', 'HEAD')
        self.run_git('switch', 'agent/mobile-controls')

    def next_task(self, open_prs=()):
        def run(*args, cwd=None):  # real Git in the temporary repository, but no network fetch
            if args[:2] != ('git', 'fetch'):
                subprocess.run([str(a) for a in args], cwd=self.root, check=True, capture_output=True)
        args = SimpleNamespace(task='next-task', agent='test-agent', summary='Next task', scope=['owned.txt'])
        with patch.object(workflow, 'open_prs', return_value=list(open_prs)), \
                patch.object(workflow, 'run', side_effect=run), patch.object(workflow, 'claim') as claim:
            workflow.next_task(args)
        return claim

    def test_next_task_starts_fresh_branch_from_main(self):
        self.merge_current_task_into_main()
        claim = self.next_task()
        claim.assert_called_once()
        self.assertEqual(self.run_git('branch', '--show-current'), 'agent/mobile-controls--next-task')
        self.assertEqual(self.run_git('rev-parse', 'HEAD'), self.run_git('rev-parse', 'origin/main'))
        self.assertFalse((self.root / '.agent-context.json').exists())

    def test_next_task_refuses_while_previous_task_is_unmerged_or_open(self):
        self.run_git('update-ref', 'refs/remotes/origin/main', self.first)  # manifest not on main
        with self.assertRaisesRegex(ValueError, 'not merged'):
            self.next_task()
        self.merge_current_task_into_main()
        with self.assertRaisesRegex(ValueError, 'not merged'):
            self.next_task(open_prs=[{'number': 4}])
        self.assertEqual(self.run_git('branch', '--show-current'), 'agent/mobile-controls')
        self.assertTrue((self.root / '.agent-context.json').exists())

    def test_recovery_cannot_change_the_contract(self):
        with self.assertRaisesRegex(ValueError, 'different contract'):
            workflow.resume_state(task('different-task', ['owned.txt']))



class DailySession(unittest.TestCase):
    def test_scope_update_keeps_every_other_section(self):
        old = task(scope=['a.txt'])
        text = workflow.body(old, 'Summary', 'Changed things', 'Tests pass', 'None') + '\n🤖 footer\n'
        new = {**old, 'scope': ['a.txt', 'docs/b.md']}
        updated = workflow.with_contract(text, new)
        self.assertEqual(workflow.published_contract({'body': updated}), new)
        self.assertIn('- `docs/b.md`', updated)
        for kept in ['Changed things', 'Tests pass', '🤖 footer']:
            self.assertIn(kept, updated)
        with self.assertRaises(ValueError):
            workflow.with_contract('no contract here', new)


class AfterMerge(unittest.TestCase):
    """After the squash merge: main is fast-forwarded and the session's clean worktree is removed."""

    def setUp(self):
        self.env = patch.dict(os.environ, {'GIT_CONFIG_GLOBAL': os.devnull, 'GIT_CONFIG_NOSYSTEM': '1'})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        base = Path(self.temp.name)
        self.origin, self.primary, self.work = base / 'origin.git', base / 'primary', base / 'primary/.worktrees/session'
        subprocess.check_call(['git', 'init', '--bare', '-b', 'main', str(self.origin)], stdout=subprocess.DEVNULL)
        subprocess.check_call(['git', 'clone', '-q', str(self.origin), str(self.primary)], stderr=subprocess.DEVNULL)
        self.git(self.primary, 'config', 'user.name', 'Test')
        self.git(self.primary, 'config', 'user.email', 'test@example.invalid')
        (self.primary / '.gitignore').write_text('.worktrees/\n.agent-context.json\n')
        self.git(self.primary, 'add', '.gitignore')
        self.git(self.primary, 'commit', '-qm', 'start')
        self.git(self.primary, 'push', '-q', 'origin', 'main')
        self.git(self.primary, 'worktree', 'add', '-q', '-b', 'claude/session', str(self.work), 'origin/main')
        # The day's PR is squash-merged on GitHub: origin/main moves on, main here is now behind.
        other = base / 'other'
        subprocess.check_call(['git', 'clone', '-q', str(self.origin), str(other)], stderr=subprocess.DEVNULL)
        (other / 'merged.txt').write_text('the day\'s work\n')
        self.git(other, 'add', 'merged.txt')
        self.git(other, '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', 'commit', '-qm', 'squash')
        self.git(other, 'push', '-q', 'origin', 'main')
        for module in (safety, workflow):
            p = patch.object(module, 'ROOT', self.work)
            p.start()
            self.addCleanup(p.stop)

    def git(self, where, *args):
        return subprocess.check_output(['git', *args], cwd=where, text=True, stderr=subprocess.DEVNULL).strip()

    def test_main_is_fast_forwarded_and_clean_worktree_removed(self):
        notes = workflow.after_merge()
        self.assertEqual(self.git(self.primary, 'rev-parse', 'main'), self.git(self.primary, 'rev-parse', 'origin/main'))
        self.assertTrue((self.primary / 'merged.txt').exists())
        self.assertFalse(self.work.exists())
        self.assertTrue(any('removed' in n for n in notes), notes)

    def test_worktree_with_uncommitted_work_is_kept(self):
        (self.work / 'draft.txt').write_text('not committed\n')
        notes = workflow.after_merge()
        self.assertTrue((self.work / 'draft.txt').exists())
        self.assertTrue(any('kept' in n for n in notes), notes)

if __name__ == '__main__':
    unittest.main()
