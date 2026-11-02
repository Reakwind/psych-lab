"""The Psych Lab's Design canvases: boards are generated, current, verbatim, and only use their own media."""
import json
from pathlib import Path
import re
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import verbatim  # noqa: E402

CANVAS = ROOT / 'canvas'
REGISTRY = json.loads((CANVAS / 'canvases.json').read_text())


def boards(name):
    return sorted((CANVAS / name / 'project').rglob('*.dc.html'))


def assets(name):
    """Asset urls a canvas holds: its uploaded media, plus the films copied onto it."""
    urls = set(REGISTRY['media'].get(name, {}).values())
    pairs = {'films': 'assets-films.txt', 'phone': 'assets-phone.txt'}.get(name)
    if pairs:
        urls |= {'/_blob/' + line.split()[1] for line in (CANVAS / pairs).read_text().split('\n') if line.strip()}
    return urls


class CanvasBoards(unittest.TestCase):
    def test_boards_are_what_the_builder_makes(self):
        result = subprocess.run(['node', 'canvas/build.mjs', '--check'], cwd=ROOT, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

    def test_every_canvas_is_registered_and_has_an_entry_board(self):
        for name in ('home', 'activities', 'films', 'phone'):
            self.assertRegex(REGISTRY['canvases'][name]['url'], r'^https://claude\.ai/artifact/\w+$')
            index = json.loads((CANVAS / name / 'project' / 'canvas.json').read_text())
            self.assertEqual(index['order'][0], 'Main.dc.html')
            self.assertEqual(sorted(index['boards']), sorted(str(p.relative_to(CANVAS / name / 'project')) for p in boards(name)))

    def test_coverage(self):
        film_scripts = json.loads((ROOT / 'psych-lab/film-scripts.json').read_text())
        self.assertEqual(sorted(p.stem.removesuffix('.dc') for p in (CANVAS / 'films/project/f').glob('*.dc.html')), sorted(film_scripts['films']))
        program = json.loads((ROOT / 'psych-lab/intervention/program.json').read_text())
        phone = (CANVAS / 'phone/project/Phone.dc.html').read_text()
        self.assertEqual(len(re.findall(r'"n":\d+,"id":"S\d+"', phone)), len(program['sessions']))

    def test_boards_only_use_media_their_own_canvas_holds(self):
        for name in ('home', 'activities', 'films', 'phone', 'original'):
            held = assets(name)
            for board in boards(name):
                for url in re.findall(r'/_blob/[0-9a-f]{32}', board.read_text()):
                    self.assertIn(url, held, f'{board.relative_to(ROOT)} names an asset its canvas does not hold')

    def test_program_text_is_verbatim(self):
        corpus = verbatim.Corpus()
        needed = [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]
        if needed:
            self.skipTest('Text sources not downloaded (git lfs pull): ' + ', '.join(needed))
        files = [str(p) for name in ('home', 'activities', 'phone', 'original') for p in boards(name)]
        problems, _ = verbatim.check(files, corpus)
        self.assertEqual(problems, [])

    def test_film_boards_quote_scripts_and_narration(self):
        corpus = verbatim.Corpus(narration=True)
        needed = [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]
        if needed:
            self.skipTest('Text sources not downloaded (git lfs pull): ' + ', '.join(needed))
        problems, _ = verbatim.check([str(p) for p in boards('films')], corpus)
        self.assertEqual(problems, [])


if __name__ == '__main__':
    unittest.main()
