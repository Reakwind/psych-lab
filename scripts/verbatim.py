#!/usr/bin/env python3
"""Prove that program text shown by the Lab is quoted verbatim from protected source material.

Usage: python3 scripts/verbatim.py FILE...   (JSON data or HTML prototypes)

A JSON quote is an object {"text": ..., "source": "<protected path>"}; its text must occur exactly
in that source. Any other Hebrew string in JSON, and every Hebrew text run in HTML, must occur
exactly somewhere in the source material. LFS sources that are not downloaded are skipped, and
the command says so, because text that cannot be read cannot be verified.
"""
import csv
import html
from html.parser import HTMLParser
import io
import json
from pathlib import Path
import re
import subprocess
import sys
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parent))
from agent_safety import ROOT  # noqa: E402
import source_guard  # noqa: E402

HEBREW = re.compile(r'[֐-׿]')
LFS = b'version https://git-lfs.github.com/spec/v1'
# Boundary between separate source strings, cells, paragraphs and files. Not whitespace, so
# collapsing whitespace for matching can never join two unrelated pieces into one phrase.
SEP = '\x00'
TEXT_SOURCES = {'.json', '.txt', '.md', '.csv', '.html', '.htm', '.xlsx', '.docx'}


def json_strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for v in value.values():
            yield from json_strings(v)
    elif isinstance(value, list):
        for v in value:
            yield from json_strings(v)


def csv_cells(text):
    """Snapshots store spreadsheets as CSV text; quoted cells must be compared after parsing."""
    try:
        return [cell for row in csv.reader(io.StringIO(text)) for cell in row]
    except csv.Error:
        return []


def xml_runs(xml, tag):
    return [html.unescape(t) for t in re.findall(rf'<{tag}(?:\s[^>]*)?>([^<]*)</{tag}>', xml)]


def source_text(path):
    """All readable text of one source file, or None when it cannot be read (e.g. LFS pointer)."""
    file = ROOT / path
    suffix = file.suffix.lower()
    if suffix not in TEXT_SOURCES:
        return ''  # Media and binaries hold no quotable text.
    data = file.read_bytes()
    if data.startswith(LFS):
        return None
    if suffix == '.json':
        values = list(json_strings(json.loads(data.decode('utf-8'))))
        return SEP.join(values + [c for v in values if ',' in v and '\n' in v for c in csv_cells(v)])
    if suffix in {'.txt', '.md'}:
        return data.decode('utf-8')
    if suffix == '.csv':
        text = data.decode('utf-8', errors='replace')
        return text + SEP + SEP.join(csv_cells(text))
    if suffix in {'.html', '.htm'}:
        text = html.unescape(data.decode('utf-8'))
        return text + SEP + SEP.join(re.sub(r'<[^>]+>', SEP, text).split(SEP))
    if suffix == '.xlsx':
        with zipfile.ZipFile(file) as z:
            parts = xml_runs(z.read('xl/sharedStrings.xml').decode('utf-8'), 't') if 'xl/sharedStrings.xml' in z.namelist() else []
            parts += [html.unescape(n) for n in re.findall(r'<sheet [^>]*name="([^"]+)"', z.read('xl/workbook.xml').decode('utf-8'))]
        return SEP.join(parts)
    if suffix == '.docx':
        with zipfile.ZipFile(file) as z:
            xml = z.read('word/document.xml').decode('utf-8')
        return SEP.join(''.join(xml_runs(p, 'w:t')) for p in re.findall(r'<w:p[ >].*?</w:p>', xml, re.S))
    return ''


# Preserved earlier design prototype: protected from edits, but it is evidence of what the design
# showed, never authority for program text. Copying its wording elsewhere must not verify it.
PROTOTYPE = 'animation-kit/artifact-files/'


class Corpus:
    def __init__(self, exclude=()):
        """Program sources vouch for text; prototype boards only explain where unsourced text came from."""
        self.texts, self.prototype, self.unreadable = {}, {}, []
        for path in source_guard.load()[1]:
            if path in exclude:
                continue
            text = source_text(path)
            if text is None:
                self.unreadable.append(path)
            elif text:
                (self.prototype if path.startswith(PROTOTYPE) else self.texts)[path] = text
        self.blob = SEP.join(self.texts.values())
        self.prototype_blob = SEP.join(self.prototype.values())
        self.index()

    def index(self):
        # Displayed text is compared with whitespace collapsed on both sides, as screens show it,
        # so a whole run is matched at once and line breaks cannot split it into sourced fragments.
        self.flat = collapse(self.blob)
        self.prototype_flat = collapse(self.prototype_blob)

    def in_source(self, text, path):
        return path in self.texts and text in self.texts[path]

    def anywhere(self, text):
        return collapse(text) in self.flat

    def why_missing(self, text):
        return ('found only in the original design prototype, not in a program source'
                if collapse(text) in self.prototype_flat else 'not found in any program source')


def collapse(text):
    return re.sub(r'\s+', ' ', text).strip()


def quote_problems(data, corpus, where=''):
    """Check {"text", "source"} quotes exactly; other Hebrew strings must exist in some source."""
    problems = []
    if isinstance(data, dict):
        if set(data) >= {'text', 'source'} and isinstance(data['text'], str):
            if data['source'].startswith(PROTOTYPE):
                problems.append(f"{where}: {data['source']} is a design prototype, not a program source")
            elif not corpus.in_source(data['text'], data['source']):
                problems.append(f"{where}: not verbatim in {data['source']}: {data['text'][:60]!r}")
            # A sourced quote must not shelter other content: check its remaining fields too.
            data = {k: v for k, v in data.items() if k not in ('text', 'source')}
        for k, v in data.items():
            problems += quote_problems(v, corpus, f'{where}.{k}')
    elif isinstance(data, list):
        for i, v in enumerate(data):
            problems += quote_problems(v, corpus, f'{where}[{i}]')
    elif isinstance(data, str) and HEBREW.search(data) and not corpus.anywhere(data):
        problems.append(f'{where}: Hebrew text {corpus.why_missing(data)}: {data[:60]!r}')
    return problems


# Script text is read with a real JavaScript tokenizer (acorn, pinned in package.json), never a
# hand-written lexer: strings and template chunks come out exactly as the engine evaluates them
# (escapes, line continuations, regex/division, nested interpolation). If a script cannot be
# tokenized, verification fails closed.
TOKENIZE_JS = r"""
const acorn = require('acorn');
let src = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => { src += d; }).on('end', () => {
  const strings = [];
  try {
    const opts = {ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true, allowReturnOutsideFunction: true};
    for (const t of acorn.tokenizer(src, opts)) {
      if (t.type === acorn.tokTypes.string || t.type === acorn.tokTypes.template) strings.push(String(t.value ?? ''));
    }
    process.stdout.write(JSON.stringify({ok: true, strings}));
  } catch (e) {
    process.stdout.write(JSON.stringify({ok: false, error: String(e && e.message || e)}));
  }
});
"""


class ScriptError(ValueError):
    pass


def js_strings(code):
    """Every string literal and template chunk in `code`, as JavaScript evaluates them."""
    try:
        result = subprocess.run(['node', '-e', TOKENIZE_JS], input=code, capture_output=True,
                                text=True, cwd=ROOT, timeout=60)
        data = json.loads(result.stdout or '{}')
    except (OSError, ValueError, subprocess.TimeoutExpired) as e:
        raise ScriptError(f'cannot tokenize script (needs node and npm ci): {e}') from None
    if not data.get('ok'):
        raise ScriptError('script could not be tokenized, so its text cannot be verified: '
                          + str(data.get('error') or result.stderr.strip()[:200]))
    return data['strings']


# Text inside these inline elements is displayed contiguously with its neighbours, so it is joined
# before matching; every other element starts a new run. Unknown elements count as inline: when
# layout is unclear the checker prefers flagging joined text over certifying sourced fragments.
INLINE = {'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'font', 'i', 'kbd',
          'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup',
          'time', 'tt', 'u', 'var', 'wbr', 'nobr'}
BLOCK = {'address', 'article', 'aside', 'blockquote', 'body', 'br', 'button', 'caption', 'dd',
         'details', 'dialog', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer',
         'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'img', 'input',
         'label', 'legend', 'li', 'main', 'nav', 'ol', 'option', 'p', 'pre', 'section', 'select',
         'summary', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'ul',
         'svg', 'text', 'tspan', 'g', 'video', 'audio', 'helmet', 'x-dc', 'sc-if', 'sc-for',
         'dc-import', 'x-import', 'script', 'style', 'template', 'iframe', 'canvas'}


class TextRuns(HTMLParser):
    """Displayed text runs (inline elements joined), every attribute value, and script strings."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.runs, self.raw, self.errors, self.buffer = [], None, [], []

    def flush(self):
        if self.buffer:
            self.runs.append(''.join(self.buffer))
            self.buffer = []

    def boundary(self, tag):
        if tag in BLOCK or tag not in INLINE and tag.startswith(('sc-', 'dc-', 'x-')):
            self.flush()

    def handle_starttag(self, tag, attrs):
        self.boundary(tag)
        for name, value in attrs:
            if not value:
                continue
            code = value[len('javascript:'):] if value.lower().startswith('javascript:') else \
                value if name.lower().startswith('on') else None
            if code is None:
                self.runs.append(value)
                continue
            # Event handlers and javascript: URLs are code: check their evaluated string values.
            try:
                self.runs += js_strings(code)
            except ScriptError as e:
                self.errors.append(str(e))
        if tag in ('script', 'style'):
            self.raw = tag

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag in ('script', 'style'):
            self.raw = None

    def handle_endtag(self, tag):
        if tag == self.raw:
            self.raw = None
        self.boundary(tag)

    def handle_data(self, data):
        if self.raw == 'script':
            try:
                self.runs += js_strings(data)
            except ScriptError as e:
                self.errors.append(str(e))
        elif self.raw is None:
            self.buffer.append(data)

    def close(self):
        super().close()
        self.flush()


def html_problems(text, corpus):
    """Every Hebrew text run in a prototype (text nodes, attribute values, JS strings) must be sourced."""
    parser = TextRuns()
    parser.feed(text)
    parser.close()
    problems = list(parser.errors)  # an unreadable script fails closed
    for run in parser.runs:  # already decoded once by the parser; never decode twice
        text = collapse(run)  # one whole run, as displayed
        if HEBREW.search(text) and not corpus.anywhere(text):
            problems.append(f'{corpus.why_missing(text)}: {text[:60]!r}')
    return problems


def check(paths, corpus=None):
    corpus = corpus or Corpus(exclude={str(Path(p).resolve().relative_to(ROOT)) for p in paths if Path(p).resolve().is_relative_to(ROOT)})
    problems = []
    for path in paths:
        text = Path(path).read_text(encoding='utf-8')
        found = quote_problems(json.loads(text), corpus, path) if path.endswith('.json') else html_problems(text, corpus)
        problems += [p if p.startswith(path) else f'{path}: {p}' for p in found]
    return problems, corpus


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    problems, corpus = check(sys.argv[1:])
    if corpus.unreadable:
        print(f'Note: {len(corpus.unreadable)} source file(s) not downloaded (Git LFS) and not searched: '
              + ', '.join(sorted(corpus.unreadable)[:5]) + (' …' if len(corpus.unreadable) > 5 else ''))
    if problems:
        print('Not verbatim:\n- ' + '\n- '.join(problems), file=sys.stderr)
        sys.exit(1)
    print(f'Verbatim: all program text in {len(sys.argv) - 1} file(s) is quoted from source material.')


if __name__ == '__main__':
    main()
