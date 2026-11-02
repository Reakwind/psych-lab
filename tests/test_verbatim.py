import json
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import verbatim  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]


class FakeCorpus(verbatim.Corpus):
    """A corpus from literal texts, so tests do not depend on which LFS files are downloaded."""

    def __init__(self, texts):
        self.texts, self.unreadable = dict(texts), []
        self.blob = '\n'.join(self.texts.values())


CORPUS = FakeCorpus({'sources/script.json': 'היי, אני נירה\nנשימה בטנית', 'sources/cards.json': 'שוברי קרח'})


class Quotes(unittest.TestCase):
    def test_quote_must_be_exact_in_its_named_source(self):
        ok = {'title': {'text': 'נשימה בטנית', 'source': 'sources/script.json'}}
        self.assertEqual(verbatim.quote_problems(ok, CORPUS), [])
        wrong_source = {'text': 'נשימה בטנית', 'source': 'sources/cards.json'}
        self.assertTrue(verbatim.quote_problems(wrong_source, CORPUS))
        paraphrase = {'text': 'נשימה מהבטן', 'source': 'sources/script.json'}
        self.assertTrue(verbatim.quote_problems(paraphrase, CORPUS))

    def test_other_hebrew_strings_must_exist_somewhere(self):
        self.assertEqual(verbatim.quote_problems({'a': ['שוברי קרח', 'Lab label']}, CORPUS), [])
        problems = verbatim.quote_problems({'a': {'b': 'טקסט שהומצא'}}, CORPUS, 'data')
        self.assertEqual(len(problems), 1)
        self.assertIn('data.a.b', problems[0])


class Prototypes(unittest.TestCase):
    def test_text_attributes_and_script_strings_are_checked(self):
        page = ('<html><body><h1>היי, אני נירה</h1><button aria-label="נשימה בטנית">x</button>'
                '<style>.x{content:"לא נבדק"}</style>'
                "<script>const t = ['שוברי קרח', \"מחשבה שהומצאה\"];</script></body></html>")
        problems = verbatim.html_problems(page, CORPUS)
        self.assertEqual(len(problems), 1)
        self.assertIn('מחשבה שהומצאה', problems[0])

    def test_invented_text_node_is_reported(self):
        self.assertTrue(verbatim.html_problems('<p>מה גרם לכם לחייך השבוע?</p>', CORPUS))


class Repository(unittest.TestCase):
    def test_a_checked_source_file_never_vouches_for_itself(self):
        board = 'animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/Cards.dc.html'
        corpus = verbatim.Corpus(exclude={board})
        self.assertNotIn(board, corpus.texts)

    def test_program_manifest_is_verbatim(self):
        corpus = verbatim.Corpus()
        needed = [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]
        if needed:
            self.skipTest('Text sources not downloaded (git lfs pull): ' + ', '.join(needed))
        problems, _ = verbatim.check([str(ROOT / 'psych-lab/intervention/program.json')], corpus)
        self.assertEqual(problems, [])


if __name__ == '__main__':
    unittest.main()
