import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import agent_safety as safety
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
                        'git unknown-alias', 'git switch -C main']:
            with self.subTest(command=command):
                self.assertIsNotNone(safety.command_problem(command))


class Ownership(unittest.TestCase):
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


class GitIntegration(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.patch = patch.object(safety, 'ROOT', self.root)
        self.patch.start()
        self.run_git('init', '-b', 'agent/mobile-controls')
        self.run_git('config', 'user.name', 'Guard test')
        self.run_git('config', 'user.email', 'guard@example.invalid')
        (self.root / '.agent-context.json').write_text(json.dumps(task(scope=['owned.txt'])))
        (self.root / 'owned.txt').write_text('initial\n')
        self.run_git('add', 'owned.txt')
        self.run_git('commit', '-m', 'Initial test state')
        self.first = self.run_git('rev-parse', 'HEAD')
        (self.root / 'owned.txt').write_text('updated\n')
        self.run_git('add', 'owned.txt')
        self.run_git('commit', '-m', 'Update test state')
        self.head = self.run_git('rev-parse', 'HEAD')

    def run_git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.root, stderr=subprocess.DEVNULL, text=True).strip()

    def tearDown(self):
        self.patch.stop()
        self.temp.cleanup()

    def push_line(self, new=None, old=None, destination=None):
        ref = 'refs/heads/agent/mobile-controls'
        return f'{ref} {new or self.head} {destination or ref} {old or self.first}\n'

    def test_owned_fast_forward_is_allowed(self):
        safety.pre_push('origin', 'https://github.com/Reakwind/psych-lab.git', self.push_line())

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


if __name__ == '__main__':
    unittest.main()
