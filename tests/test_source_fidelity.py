import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch
import os

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import agent_safety as safety
import agent_policy as policy
import source_guard as guard


class SourceGuard(unittest.TestCase):
    """Source material may be added, never modified, renamed or deleted."""

    def setUp(self):
        self.env = patch.dict(os.environ, {'GIT_CONFIG_GLOBAL': os.devnull, 'GIT_CONFIG_NOSYSTEM': '1'})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for module in (safety, guard):
            p = patch.object(module, 'ROOT', self.root)
            p.start()
            self.addCleanup(p.stop)
        self.git('init', '-b', 'agent/x')
        self.git('config', 'user.name', 'Test')
        self.git('config', 'user.email', 'test@example.invalid')
        (self.root / 'sources').mkdir()
        (self.root / 'sources/script.txt').write_text('שלום\n')
        (self.root / 'sources/film.mp4').write_text(
            'version https://git-lfs.github.com/spec/v1\noid sha256:' + 'a' * 64 + '\nsize 9\n')
        (self.root / 'lab.txt').write_text('lab work\n')
        (self.root / guard.MANIFEST).write_text(json.dumps({'protected': ['sources/'], 'files': {}}))
        self.git('add', '.')
        guard.register()
        self.git('add', guard.MANIFEST)
        self.git('commit', '-m', 'init')

    def git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.root, text=True, stderr=subprocess.DEVNULL)

    def test_registered_sources_verify_and_lfs_uses_pointer_oid(self):
        self.assertEqual(guard.verify(), [])
        files = guard.load()[1]
        self.assertEqual(files['sources/film.mp4'], 'a' * 64)
        self.assertNotIn('lab.txt', files)

    def test_modification_deletion_and_unregistered_files_fail(self):
        (self.root / 'sources/script.txt').write_text('שלום!\n')
        self.assertIn('sources/script.txt: source file modified', guard.verify())
        self.git('rm', '-q', 'sources/film.mp4')
        self.assertTrue(any('film.mp4: source file deleted' in p for p in guard.verify()))
        (self.root / 'sources/new.txt').write_text('new context\n')
        self.git('add', 'sources/new.txt')
        self.assertTrue(any('new.txt: new source file not registered' in p for p in guard.verify()))

    def test_adding_and_registering_new_source_is_allowed(self):
        (self.root / 'sources/new.txt').write_text('new context\n')
        self.git('add', 'sources/new.txt')
        guard.register()
        self.git('add', guard.MANIFEST)
        self.assertEqual(guard.verify(), [])
        self.assertEqual(guard.staged_problems(), [])

    def test_staged_edit_delete_rename_are_rejected_but_lab_files_are_free(self):
        (self.root / 'lab.txt').write_text('changed lab work\n')
        self.git('add', 'lab.txt')
        self.assertEqual(guard.staged_problems(), [])
        (self.root / 'sources/script.txt').write_text('edited\n')
        self.git('add', 'sources/script.txt')
        self.assertTrue(any('script.txt' in p and '(M)' in p for p in guard.staged_problems()))
        self.git('reset', '-q', 'sources/script.txt')
        self.git('mv', 'sources/film.mp4', 'sources/renamed.mp4')
        self.assertTrue(any('film.mp4' in p for p in guard.staged_problems()))

    def test_manifest_entries_are_immutable(self):
        old = json.dumps({'protected': ['sources/'], 'files': {'sources/a': '1'}})
        self.assertEqual(guard.manifest_problems(old, json.dumps({'protected': ['sources/', 'more/'],
                                                                  'files': {'sources/a': '1', 'sources/b': '2'}})), [])
        self.assertTrue(guard.manifest_problems(old, json.dumps({'protected': ['sources/'], 'files': {'sources/a': '9'}})))
        self.assertTrue(guard.manifest_problems(old, json.dumps({'protected': [], 'files': {'sources/a': '1'}})))

    def test_policy_rejects_non_additions_under_protected_paths(self):
        files = [{'filename': 'sources/new.txt', 'status': 'added'},
                 {'filename': 'lab.txt', 'status': 'modified'}]
        self.assertEqual(policy.source_violations(files, ['sources/']), [])
        for status in ['modified', 'removed', 'renamed', 'changed']:
            with self.subTest(status=status):
                self.assertTrue(policy.source_violations([{'filename': 'sources/script.txt', 'status': status}], ['sources/']))
        renamed_out = [{'filename': 'elsewhere.txt', 'previous_filename': 'sources/script.txt', 'status': 'renamed'}]
        self.assertTrue(policy.source_violations(renamed_out, ['sources/']))


class RepositorySources(unittest.TestCase):
    def test_repository_source_material_is_intact(self):
        self.assertEqual(guard.verify(), [])


if __name__ == '__main__':
    unittest.main()
