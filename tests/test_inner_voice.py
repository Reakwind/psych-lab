"""The Inner Voice game and the daily minutes come straight from the owner's current workbooks.

These checks read the spreadsheets independently of build.py, so a build bug cannot vouch for itself.
"""
from collections import defaultdict
import json
from pathlib import Path
import re
import unittest
import zipfile
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SHEETS = ROOT / 'sources/activity-sheets'
PROGRAM = ROOT / 'psych-lab/intervention/program.json'
NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
REL = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
THEMES = ['motivation', 'balanced', 'relaxation', 'mindfulness', 'compassion', 'labels', 'flexible']


def rows(path):
    z = zipfile.ZipFile(path)
    # A cell is either one <t> or formatted <r><t> runs; phonetic guides (<rPh>) are not shown.
    shared = [''.join(t.text or '' for t in si.findall(NS + 't') + si.findall(f'{NS}r/{NS}t'))
              for si in ET.fromstring(z.read('xl/sharedStrings.xml')).iter(NS + 'si')]
    targets = {r.get('Id'): r.get('Target') for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
    book = {}
    for sheet in ET.fromstring(z.read('xl/workbook.xml')).iter(NS + 'sheet'):
        target = targets[sheet.get(REL + 'id')].lstrip('/')
        xml = ET.fromstring(z.read(target if target.startswith('xl/') else 'xl/' + target))
        book[sheet.get('name')] = [
            {re.match(r'[A-Z]+', c.get('r'))[0]: (shared[int(c.find(NS + 'v').text)] if c.get('t') == 's'
                                                   else (c.find(NS + 'v').text if c.find(NS + 'v') is not None else ''))
             for c in row.iter(NS + 'c')} for row in xml.iter(NS + 'row')]
    return book


class CurrentWorkbooks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        for name in ('inner voice workout.xlsx', 'Protocol.xlsx'):
            if (SHEETS / name).read_bytes().startswith(b'version https://git-lfs'):
                raise unittest.SkipTest('Activity sheets not downloaded (git lfs pull)')
        cls.program = json.loads(PROGRAM.read_text(encoding='utf-8'))

    def test_every_thought_and_its_feedback_is_copied_exactly(self):
        book = rows(SHEETS / 'inner voice workout.xlsx')
        self.assertEqual(len(book), len(THEMES))
        for theme, sheet in zip(THEMES, book.values()):
            expected = [{'text': r['I'], 'english': r.get('B', ''), 'type': r.get('C', ''), 'type_he': r.get('H', ''),
                         'correct': r.get('G', ''), 'incorrect': r.get('F', '')}
                        for r in sheet[1:] if r.get('I', '').strip()]
            built = [{k: t[k] for k in ('text', 'english', 'type', 'type_he', 'correct', 'incorrect')}
                     for t in self.program['thoughts'][theme]]
            self.assertEqual(built, expected, theme)

    def test_each_answer_type_has_one_hebrew_name(self):
        names = defaultdict(set)
        for bank in self.program['thoughts'].values():
            for t in bank:
                names[t['type']].add(t['type_he'])
        self.assertEqual({k: len(v) for k, v in names.items()}, {k: 1 for k in names})
        self.assertEqual(names['Take it in'], {'לאמץ'})
        self.assertEqual(names['Let it go'], {'לשחרר'})

    def test_daily_minutes_are_the_protocol_activities_summed(self):
        book = rows(SHEETS / 'Protocol.xlsx')
        for key, sheet in [('light', 'Light speech'), ('heavy', 'Heavy speech')]:
            totals, day = defaultdict(float), None
            for r in book[sheet][3:]:
                if r.get('A', '').startswith('Day'):
                    day = int(r['A'].split()[1])
                if day and r.get('B', '').strip() and r.get('C', '').strip():
                    totals[day] += float(r['C'])
            self.assertEqual(self.program['daily_totals_minutes'][key], [totals[d] for d in range(1, 8)], sheet)

    def test_sources_name_the_current_files(self):
        for key, name in [('inner-voice', 'inner voice workout.xlsx'), ('protocol', 'Protocol.xlsx')]:
            self.assertEqual(self.program['sources'][key]['path'], f'sources/activity-sheets/{name}')


if __name__ == '__main__':
    unittest.main()
