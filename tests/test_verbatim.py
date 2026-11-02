import json
import re
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import verbatim  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]


class FakeCorpus(verbatim.Corpus):
    """A corpus from literal texts, so tests do not depend on which LFS files are downloaded."""

    def __init__(self, texts, prototype=''):
        self.texts, self.prototype, self.unreadable = dict(texts), {}, []
        self.blob = '\n'.join(self.texts.values())
        self.prototype_blob = prototype


CORPUS = FakeCorpus({'sources/script.json': 'היי, אני נירה\nנשימה בטנית', 'sources/cards.json': 'שוברי קרח'},
                    prototype='מה גרם לכם לחייך השבוע?')


class Quotes(unittest.TestCase):
    def test_quote_must_be_exact_in_its_named_source(self):
        ok = {'title': {'text': 'נשימה בטנית', 'source': 'sources/script.json'}}
        self.assertEqual(verbatim.quote_problems(ok, CORPUS), [])
        wrong_source = {'text': 'נשימה בטנית', 'source': 'sources/cards.json'}
        self.assertTrue(verbatim.quote_problems(wrong_source, CORPUS))
        paraphrase = {'text': 'נשימה מהבטן', 'source': 'sources/script.json'}
        self.assertTrue(verbatim.quote_problems(paraphrase, CORPUS))

    def test_a_sourced_quote_cannot_hide_other_fields(self):
        quote = {'text': 'נשימה בטנית', 'source': 'sources/script.json', 'activity': 'טקסט מומצא לחלוטין'}
        problems = verbatim.quote_problems(quote, CORPUS, 'q')
        self.assertEqual(len(problems), 1)
        self.assertIn('q.activity', problems[0])

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

    def test_single_quoted_and_value_attributes_are_checked(self):
        for page in ["<input placeholder='טקסט מומצא לחלוטין'>", '<input value="טקסט מומצא לחלוטין">']:
            with self.subTest(page=page):
                self.assertEqual(len(verbatim.html_problems(page, CORPUS)), 1)

    def test_escaped_script_strings_are_decoded(self):
        escaped = ''.join('\\u%04x' % ord(c) for c in 'טקסט מומצא')
        problems = verbatim.html_problems('<script>document.body.textContent = "%s";</script>' % escaped, CORPUS)
        self.assertEqual(len(problems), 1)
        self.assertIn('טקסט מומצא', problems[0])
        sourced = ''.join('\\u{%x}' % ord(c) for c in 'שוברי קרח')
        self.assertEqual(verbatim.html_problems("<script>x = '%s';</script>" % sourced, CORPUS), [])

    def test_invented_text_node_is_reported(self):
        self.assertTrue(verbatim.html_problems('<p>טקסט שהומצא</p>', CORPUS))

    def test_prototype_wording_never_verifies_new_work(self):
        # Copying an unsourced question from the original design into a new board must still fail.
        problems = verbatim.html_problems('<p>מה גרם לכם לחייך השבוע?</p>', CORPUS)
        self.assertEqual(len(problems), 1)
        self.assertIn('original design prototype', problems[0])
        cited = {'text': 'מה גרם לכם לחייך השבוע?', 'source': verbatim.PROTOTYPE + 'x/project/scripts/Cards.dc.html'}
        self.assertIn('not a program source', verbatim.quote_problems(cited, CORPUS)[0])


class Repository(unittest.TestCase):
    def test_a_checked_source_file_never_vouches_for_itself(self):
        board = 'animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/Cards.dc.html'
        corpus = verbatim.Corpus(exclude={board})
        self.assertNotIn(board, corpus.texts)
        self.assertNotIn(board, corpus.prototype)

    def test_design_prototype_is_evidence_not_authority(self):
        corpus = verbatim.Corpus()
        self.assertFalse(any(p.startswith(verbatim.PROTOTYPE) for p in corpus.texts))
        self.assertFalse(corpus.anywhere('מה גרם לכם לחייך השבוע?'))

    def test_program_manifest_is_verbatim(self):
        corpus = verbatim.Corpus()
        needed = [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]
        if needed:
            self.skipTest('Text sources not downloaded (git lfs pull): ' + ', '.join(needed))
        problems, _ = verbatim.check([str(ROOT / 'psych-lab/intervention/program.json')], corpus)
        # Only the Lab's own film titles ("מפגש N: ...") come from the original design; all program
        # text is verbatim from program sources.
        others = [p for p in problems if not re.search(r'\.clips?\.(?:S\w+\.)?title:', p)]
        self.assertEqual(others, [])
        self.assertTrue(all('original design prototype' in p for p in problems))


if __name__ == '__main__':
    unittest.main()
