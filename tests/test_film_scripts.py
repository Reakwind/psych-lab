import json
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import film_scripts  # noqa: E402
import verbatim  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]


class Alignment(unittest.TestCase):
    def spans(self, scenes, paras):
        doc, spans, leftovers = film_scripts.align([s.split() for s in scenes], paras)
        quote = lambda idx: [q['text'] for q in film_scripts.quotes(doc, idx, 'x')]
        return [quote(s) for s in spans], [quote(r) for r in leftovers]

    def test_scenes_take_their_own_words_and_headings_are_left_over(self):
        spans, left = self.spans(['שלום לכם', 'נשימה בטנית'], ['כותרת', 'שלום לכם', 'נשימה בטנית'])
        self.assertEqual(spans, [['שלום לכם'], ['נשימה בטנית']])
        self.assertEqual(left, [['כותרת']])

    def test_a_stage_direction_inside_a_scene_stays_in_that_scene(self):
        spans, left = self.spans(['שאיפה עצירה'], ['שאיפה (מדגים) עצירה'])
        self.assertEqual(spans, [['שאיפה (מדגים) עצירה']])
        self.assertEqual(left, [])
        _, changed = film_scripts.changed('שאיפה עצירה'.split(), 'שאיפה (מדגים) עצירה'.split())
        self.assertEqual(changed, [1])

    def test_a_scene_spanning_paragraphs_is_quoted_per_paragraph(self):
        spans, _ = self.spans(['אחת שתיים שלוש'], ['אחת שתיים', 'שלוש'])
        self.assertEqual(spans, [['אחת שתיים', 'שלוש']])

    def test_leftover_runs_never_cross_paragraphs(self):
        _, left = self.spans(['סוף'], ['קישור לבריף', 'הערה', 'סוף'])
        self.assertEqual(left, [['קישור לבריף'], ['הערה']])

    def test_vowel_marks_are_ignored_but_spelling_is_not(self):
        self.assertEqual(film_scripts.VOWELS.sub('', 'בְּיוֹם־יוֹם'), 'ביום־יום')
        self.assertNotEqual(film_scripts.VOWELS.sub('', 'מְקֻוֶּה'), 'מקווה')


class Repository(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.corpus = verbatim.Corpus()
        missing = [p for p in cls.corpus.unreadable if p.startswith(film_scripts.SCRIPTS)]
        if missing:
            raise unittest.SkipTest('Film scripts not downloaded (git lfs pull)')
        cls.data = json.loads((ROOT / film_scripts.OUT).read_text(encoding='utf-8'))

    def test_generated_file_is_current(self):
        self.assertEqual(film_scripts.render(film_scripts.build()), (ROOT / film_scripts.OUT).read_text(encoding='utf-8'))

    def test_every_film_has_its_own_script_document(self):
        narration = json.loads((ROOT / film_scripts.NARRATION).read_text(encoding='utf-8'))
        self.assertEqual(set(self.data['films']), set(narration))
        sources = [f['source'] for f in self.data['films'].values()]
        self.assertEqual(len(sources), len(set(sources)))
        self.assertTrue(all(s.startswith(film_scripts.SCRIPTS) for s in sources))

    def test_every_scene_is_accounted_for(self):
        narration = json.loads((ROOT / film_scripts.NARRATION).read_text(encoding='utf-8'))
        for fid, film in self.data['films'].items():
            self.assertEqual([l['scene'] for l in film['lines']], list(range(len(narration[fid]['scenes']))), fid)

    def test_all_quoted_text_is_verbatim_from_the_scripts(self):
        problems, _ = verbatim.check([str(ROOT / film_scripts.OUT)], self.corpus)
        self.assertEqual(problems, [])


if __name__ == '__main__':
    unittest.main()
