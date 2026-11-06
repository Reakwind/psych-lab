import json
import re
from pathlib import Path
import sys
import unittest
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import verbatim  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]


class FakeCorpus(verbatim.Corpus):
    """A corpus from literal texts, so tests do not depend on which LFS files are downloaded."""

    def __init__(self, texts, prototype=''):
        self.texts, self.prototype, self.unreadable = dict(texts), {}, []
        self.paths = set(self.texts)
        self.blob = verbatim.SEP.join(self.texts.values())
        self.prototype_blob = prototype
        self.index()


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

    def test_quotes_match_as_displayed(self):
        # A soft line break in the source shows as a space; it is not a different text.
        corpus = FakeCorpus({'sources/a.docx': 'שורה אחת\nשורה שתיים'})
        self.assertEqual(verbatim.quote_problems({'text': 'שורה אחת שורה שתיים', 'source': 'sources/a.docx'}, corpus), [])
        self.assertTrue(verbatim.quote_problems({'text': ' ', 'source': 'sources/a.docx'}, corpus))
        # Separate paragraphs still never join into one quote.
        corpus = FakeCorpus({'sources/a.docx': 'שורה אחת' + verbatim.SEP + 'שורה שתיים'})
        self.assertTrue(verbatim.quote_problems({'text': 'שורה אחת שורה שתיים', 'source': 'sources/a.docx'}, corpus))

    def test_only_a_registered_source_path_is_exempt(self):
        corpus = FakeCorpus({'sources/תסריט.docx': 'נשימה בטנית'})
        self.assertEqual(verbatim.quote_problems({'source': 'sources/תסריט.docx', 'n': 1}, corpus), [])
        # Anything else under "source" is ordinary text and must still be sourced.
        problems = verbatim.quote_problems({'source': 'טקסט מומצא'}, corpus, 'f')
        self.assertEqual(len(problems), 1)
        self.assertIn('f.source', problems[0])

    def test_formatted_cell_runs_are_one_string(self):
        xml = ('<sst><si><t>שוברי קרח</t></si><si><r><t>היי,</t></r><r><rPr><b/></rPr><t xml:space="preserve"> אני</t></r>'
               '<r><t xml:space="preserve"> נירה</t></r><rPh><t>x</t></rPh></si></sst>')
        self.assertEqual(verbatim.shared_strings(xml), ['שוברי קרח', 'היי, אני נירה'])

    def test_docx_line_breaks_and_tabs_are_whitespace(self):
        xml = '<w:p><w:r><w:t>ברקע.</w:t><w:br/><w:t xml:space="preserve">ובפעמים</w:t><w:tab/><w:t>&amp;</w:t></w:r></w:p>'
        self.assertEqual(verbatim.docx_paragraph(xml), 'ברקע.\nובפעמים\t&')

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

    def test_regex_or_comment_quotes_cannot_hide_script_text(self):
        for script in ['const quote = /"/g; document.body.textContent = "טקסט מומצא לחלוטין";',
                       "// it's a comment\nel.textContent = 'טקסט מומצא לחלוטין';",
                       'el.textContent = `טקסט מומצא לחלוטין`;']:
            with self.subTest(script=script):
                problems = verbatim.html_problems('<script>%s</script>' % script, CORPUS)
                self.assertEqual(len(problems), 1, problems)
                self.assertIn('טקסט מומצא לחלוטין', problems[0])

    def test_script_strings_are_checked_whole(self):
        # Quotes inside a string are prose: sourced fragments must not certify altered wording.
        page = r"""<script>document.body.textContent = 'היי, "אני" נירה';</script>"""
        self.assertEqual(len(verbatim.html_problems(page, CORPUS)), 1)
        self.assertEqual(verbatim.html_problems("<script>x = 'היי, אני נירה';</script>", CORPUS), [])
        template = verbatim.html_problems('<script>x = `היי ${n} מומצא לגמרי`;</script>', CORPUS)
        self.assertEqual(len(template), 1)  # 'היי' is sourced; the invented chunk is not
        self.assertIn('מומצא לגמרי', template[0])

    def test_entities_are_decoded_once_like_the_browser(self):
        # The browser shows a literal '&#1488;' here; it must not be matched as decoded Hebrew.
        for page in ['<p>היי, &amp;#1488;ני נירה</p>', "<script>x = 'היי, &#1488;ני נירה';</script>"]:
            with self.subTest(page=page):
                self.assertEqual(len(verbatim.html_problems(page, CORPUS)), 1)
        self.assertEqual(verbatim.html_problems('<p>היי, &#1488;ני נירה</p>', CORPUS), [])

    def test_line_breaks_cannot_split_wording_into_sourced_fragments(self):
        continued = "<script>x = 'היי, אני\\\nנירה';</script>"  # JS evaluates to 'היי, אנינירה'
        self.assertEqual(len(verbatim.html_problems(continued, CORPUS)), 1)
        crlf = "<script>x = 'היי, אני\\\r\nנירה';</script>"
        self.assertEqual(len(verbatim.html_problems(crlf, CORPUS)), 1)
        joined = '<p>נשימה בטנית\nשוברי קרח</p>'  # two sourced lines displayed as one new phrase
        self.assertEqual(len(verbatim.html_problems(joined, CORPUS)), 1)
        self.assertEqual(verbatim.html_problems('<p>היי,   אני\n נירה</p>', CORPUS), [])

    def test_script_lexing_matches_javascript(self):
        # Braces inside interpolation strings and division after an object literal must not hide text.
        for script in ['document.body.textContent = `${"{"}טקסט מומצא לחלוטין`;',
                       'const n = {} / 2; document.body.textContent = "טקסט מומצא לחלוטין";']:
            with self.subTest(script=script):
                problems = verbatim.html_problems('<script>%s</script>' % script, CORPUS)
                self.assertEqual(len(problems), 1, problems)
                self.assertIn('טקסט מומצא לחלוטין', problems[0])

    def test_unreadable_script_fails_closed(self):
        problems = verbatim.html_problems("<script>const x = 'unterminated;</script>", CORPUS)
        self.assertEqual(len(problems), 1)
        self.assertIn('could not be tokenized', problems[0])

    def test_inline_markup_cannot_split_wording(self):
        # Displayed as 'היי, אנינירה', which no source contains.
        self.assertEqual(len(verbatim.html_problems('<p>היי, אני<span>נירה</span></p>', CORPUS)), 1)
        self.assertEqual(verbatim.html_problems('<p>היי, <b>אני</b> נירה</p>', CORPUS), [])
        # Block boundaries still separate independent sourced strings.
        self.assertEqual(verbatim.html_problems('<div>נשימה בטנית</div><div>שוברי קרח</div>', CORPUS), [])
        self.assertEqual(verbatim.html_problems('<p>נשימה בטנית<br>שוברי קרח</p>', CORPUS), [])

    def test_event_handlers_and_javascript_urls_are_code(self):
        escaped = ''.join('\\u%04x' % ord(c) for c in 'טקסט מומצא')
        for page in ['<button onclick="this.textContent=\'%s\'">x</button>' % escaped,
                     '<a href="javascript:alert(\'%s\')">x</a>' % escaped]:
            with self.subTest(page=page):
                problems = verbatim.html_problems(page, CORPUS)
                self.assertEqual(len(problems), 1, problems)
                self.assertIn('טקסט מומצא', problems[0])
        self.assertEqual(verbatim.html_problems('<button onclick="go(\'שוברי קרח\')">x</button>', CORPUS), [])

    def test_obfuscated_javascript_urls_and_srcdoc_documents(self):
        escaped = ''.join('\\u%04x' % ord(c) for c in 'טקסט מומצא')
        refs = ''.join('&amp;#%d;' % ord(c) for c in 'טקסט מומצא לחלוטין')
        for page in ['<a href=" javascript:alert(\'%s\')">x</a>' % escaped,
                     '<a href="java\tscript:alert(\'%s\')">x</a>' % escaped,
                     '<iframe srcdoc="&lt;p&gt;%s&lt;/p&gt;"></iframe>' % refs,
                     '<a href="javascript:alert(\'%s\')">x</a>' % quote('טקסט מומצא')]:
            with self.subTest(page=page):
                self.assertEqual(len(verbatim.html_problems(page, CORPUS)), 1)

    def test_escaped_script_strings_are_decoded(self):
        escaped = ''.join('\\u%04x' % ord(c) for c in 'טקסט מומצא')
        problems = verbatim.html_problems('<script>document.body.textContent = "%s";</script>' % escaped, CORPUS)
        self.assertEqual(len(problems), 1)
        self.assertIn('טקסט מומצא', problems[0])
        sourced = ''.join('\\u{%x}' % ord(c) for c in 'שוברי קרח')
        self.assertEqual(verbatim.html_problems("<script>x = '%s';</script>" % sourced, CORPUS), [])

    def test_javascript_modules_are_checked(self):
        module = "import {x} from './core.mjs';\nconst a = 'שוברי קרח';\nconst b = `היי ${a} מומצא לגמרי`;\nawait x();"
        problems = verbatim.js_problems(module, CORPUS)
        self.assertEqual(len(problems), 1, problems)
        self.assertIn('מומצא לגמרי', problems[0])
        self.assertIn('could not be tokenized', verbatim.js_problems("const x = 'unterminated;", CORPUS)[0])

    def test_invented_text_node_is_reported(self):
        self.assertTrue(verbatim.html_problems('<p>טקסט שהומצא</p>', CORPUS))

    def test_prototype_wording_never_verifies_new_work(self):
        # Copying an unsourced question from the original design into a new board must still fail.
        problems = verbatim.html_problems('<p>מה גרם לכם לחייך השבוע?</p>', CORPUS)
        self.assertEqual(len(problems), 1)
        self.assertIn('original design prototype', problems[0])
        cited = {'text': 'מה גרם לכם לחייך השבוע?', 'source': verbatim.PROTOTYPE + 'x/project/scripts/Cards.dc.html'}
        self.assertIn('not a program source', verbatim.quote_problems(cited, CORPUS)[0])


class InterfaceRegister(unittest.TestCase):
    """canvas/interface-he.json: owner-approved Hebrew interface words quoted from the original design."""
    RUTH = 'animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/Ruth.dc.html'

    def test_a_label_passes_only_as_a_whole_run(self):
        corpus = FakeCorpus({'sources/script.json': 'היי, אני נירה'})
        corpus.interface = frozenset({'המסע שלך'})
        self.assertEqual(verbatim.html_problems('<p>המסע שלך</p>', corpus), [])
        self.assertEqual(verbatim.js_problems('const a = "המסע שלך";', corpus), [])
        self.assertEqual(len(verbatim.html_problems('<p>המסע שלך ארוך</p>', corpus)), 1)
        self.assertEqual(len(verbatim.js_problems('const a = "זה המסע שלך";', corpus)), 1)

    def test_labels_must_be_whole_pieces_of_a_registered_design_board(self):
        paths = {self.RUTH, 'psych-lab/intervention/sources/cards.json'}
        labels, problems = verbatim.load_interface(paths, {'labels': [
            {'text': 'המסע שלך', 'source': self.RUTH},
            {'text': 'המסע של', 'source': self.RUTH},
            {'text': 'מילים שלא עוצבו', 'source': self.RUTH},
            {'text': 'צד א', 'source': 'psych-lab/intervention/sources/cards.json'},
            {'text': 'המסע שלך', 'source': 'animation-kit/artifact-files/unregistered.dc.html'}]})
        self.assertEqual(labels, frozenset({'המסע שלך'}))
        self.assertEqual(len(problems), 4)

    def test_the_register_is_verified_and_vouches_for_nothing_else(self):
        corpus = verbatim.Corpus()
        self.assertEqual(list(corpus.interface_errors), [])
        self.assertTrue(corpus.interface_label('המסע שלך'))
        # Design wording outside the register stays unsourced, and the register is not a program source.
        self.assertFalse(corpus.interface_label('מה גרם לכם לחייך השבוע?'))
        self.assertFalse(corpus.anywhere('המפגש של היום הושלם'))
        self.assertNotIn(verbatim.INTERFACE, corpus.texts)

    def test_program_labels_quote_their_program_source(self):
        corpus = verbatim.Corpus()
        if [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]:
            self.skipTest('Text sources not downloaded (git lfs pull)')
        register = json.loads((ROOT / verbatim.INTERFACE).read_text())
        for item in register['program_labels']:
            self.assertTrue(corpus.in_source(item['text'], item['source']), item)
        keys = [x['key'] for x in register['labels'] + register['program_labels']]
        self.assertEqual(len(keys), len(set(keys)))


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

    def test_sequencing_code_shows_no_unsourced_hebrew(self):
        # core.mjs sequences sessions and canvas/content.mjs selects what the Lab shows; neither holds program wording of its own.
        corpus = verbatim.Corpus()
        if [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]:
            self.skipTest('Text sources not downloaded (git lfs pull)')
        files = [str(ROOT / 'psych-lab/intervention/core.mjs'), str(ROOT / 'canvas/build.mjs'), str(ROOT / 'canvas/content.mjs'), str(ROOT / 'canvas/phone-logic.js'), str(ROOT / 'canvas/phone-markup.html'),
                 str(ROOT / 'canvas/flow-markup.html'), str(ROOT / 'canvas/app-logic.js'), str(ROOT / 'canvas/app-markup.html')]
        problems, _ = verbatim.check(files, corpus)
        self.assertEqual(problems, [])

    def test_narration_record_vouches_only_when_asked(self):
        corpus = FakeCorpus({'sources/script.json': 'היי, אני נירה'})
        corpus.narration_flat = verbatim.collapse('ושאיפה, שתיים, שלוש.')
        page = '<p>ושאיפה, שתיים, שלוש.</p>'
        self.assertEqual(verbatim.html_problems(page, corpus), [])
        self.assertEqual(len(verbatim.html_problems(page, CORPUS)), 1)
        self.assertEqual(len(verbatim.html_problems('<p>מילים שלא נאמרו</p>', corpus)), 1)

    def test_a_registered_source_path_is_a_name_not_program_text(self):
        corpus = FakeCorpus({'sources/תסריטים/נשימה.docx': 'נשימה בטנית'})
        self.assertEqual(verbatim.html_problems('<p><code>sources/תסריטים/נשימה.docx</code></p>', corpus), [])
        self.assertEqual(verbatim.js_problems('const p = "sources/תסריטים/נשימה.docx";', corpus), [])
        # Only the exact path: wording around it is still checked.
        self.assertEqual(len(verbatim.html_problems('<p>קובץ sources/תסריטים/נשימה.docx</p>', corpus)), 1)

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
