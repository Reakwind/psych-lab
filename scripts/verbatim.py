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
import sys
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parent))
from agent_safety import ROOT  # noqa: E402
import source_guard  # noqa: E402

HEBREW = re.compile(r'[֐-׿]')
LFS = b'version https://git-lfs.github.com/spec/v1'
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
        return '\n'.join(values + [c for v in values if ',' in v and '\n' in v for c in csv_cells(v)])
    if suffix in {'.txt', '.md'}:
        return data.decode('utf-8')
    if suffix == '.csv':
        text = data.decode('utf-8', errors='replace')
        return text + '\n' + '\n'.join(csv_cells(text))
    if suffix in {'.html', '.htm'}:
        text = html.unescape(data.decode('utf-8'))
        return text + '\n' + '\n'.join(re.sub(r'<[^>]+>', '\n', text).split('\n'))
    if suffix == '.xlsx':
        with zipfile.ZipFile(file) as z:
            parts = xml_runs(z.read('xl/sharedStrings.xml').decode('utf-8'), 't') if 'xl/sharedStrings.xml' in z.namelist() else []
            parts += [html.unescape(n) for n in re.findall(r'<sheet [^>]*name="([^"]+)"', z.read('xl/workbook.xml').decode('utf-8'))]
        return '\n'.join(parts)
    if suffix == '.docx':
        with zipfile.ZipFile(file) as z:
            xml = z.read('word/document.xml').decode('utf-8')
        return '\n'.join(''.join(xml_runs(p, 'w:t')) for p in re.findall(r'<w:p[ >].*?</w:p>', xml, re.S))
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
        self.blob = '\n'.join(self.texts.values())
        self.prototype_blob = '\n'.join(self.prototype.values())

    def in_source(self, text, path):
        return path in self.texts and text in self.texts[path]

    def anywhere(self, text):
        return text in self.blob

    def why_missing(self, text):
        return ('found only in the original design prototype, not in a program source'
                if text in getattr(self, 'prototype_blob', '') else 'not found in any program source')


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


# JavaScript string values: comments and regular expressions are skipped, quotes inside them
# cannot open a string, and every string (or template-literal chunk) is checked as one whole value,
# so neither hidden text nor recombined fragments can pass.
REGEX_AFTER = set('(,=:[!&|?{};+-*%<>~^') | {''}
KEYWORDS_BEFORE_REGEX = {'return', 'typeof', 'case', 'do', 'else', 'in', 'of', 'new', 'delete', 'void', 'throw', 'yield', 'await'}


def js_strings(code):
    out, i, n, prev = [], 0, len(code), ''

    def read_quoted(i, quote):
        j, buf = i + 1, []
        while j < n and code[j] != quote and code[j] != '\n':
            if code[j] == '\\' and j + 1 < n:
                buf.append(code[j:j + 2]); j += 2
            else:
                buf.append(code[j]); j += 1
        return ''.join(buf), j + 1

    def read_template(i):
        j, buf, chunks = i + 1, [], []
        while j < n and code[j] != '`':
            if code[j] == '\\' and j + 1 < n:
                buf.append(code[j:j + 2]); j += 2
            elif code.startswith('${', j):
                chunks.append(''.join(buf)); buf = []
                depth, j = 1, j + 2
                start = j
                while j < n and depth:
                    depth += {'{': 1, '}': -1}.get(code[j], 0); j += 1
                out.extend(js_strings(code[start:j - 1]))
            else:
                buf.append(code[j]); j += 1
        chunks.append(''.join(buf))
        return chunks, j + 1

    while i < n:
        c = code[i]
        if c in ' \t\r\n':
            i += 1
        elif code.startswith('//', i):
            i = code.find('\n', i) % (n + 1) if '\n' in code[i:] else n
        elif code.startswith('/*', i):
            end = code.find('*/', i + 2)
            i = n if end < 0 else end + 2
        elif c in '"\'':
            value, i = read_quoted(i, c)
            out.append(value); prev = 'str'
        elif c == '`':
            chunks, i = read_template(i)
            out.extend(chunks); prev = 'str'
        elif c == '/' and (prev in REGEX_AFTER or prev in KEYWORDS_BEFORE_REGEX):
            j, in_class = i + 1, False
            while j < n and code[j] != '\n':
                if code[j] == '\\':
                    j += 2; continue
                if code[j] == '[':
                    in_class = True
                elif code[j] == ']':
                    in_class = False
                elif code[j] == '/' and not in_class:
                    break
                j += 1
            i = j + 1
            while i < n and code[i].isalpha():
                i += 1
            prev = 'regex'
        else:
            m = re.match(r'[A-Za-z_$][\w$]*|\d[\w.]*', code[i:])
            if m:
                prev = m[0] if m[0] in KEYWORDS_BEFORE_REGEX else 'word'
                i += len(m[0])
            else:
                prev = c if c not in ')]' else 'word'
                i += 1
    return [js_unescape(s) for s in out]


JS_ESCAPE = re.compile(r'\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|.)', re.S)
SIMPLE = {'n': '\n', 'r': '\r', 't': '\t', 'b': '\b', 'f': '\f', 'v': '\v', '0': '\0'}


def js_unescape(literal):
    """Decode JavaScript string escapes so escaped Hebrew is checked like literal Hebrew."""
    def one(match):
        e = match[1]
        if e.startswith('u{'):
            return chr(int(e[2:-1], 16))
        if e[0] in 'ux' and len(e) > 1:
            return chr(int(e[1:], 16))
        return SIMPLE.get(e, e)
    return JS_ESCAPE.sub(one, literal)


class TextRuns(HTMLParser):
    """Text nodes, every attribute value (any quoting) and JavaScript string literals."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.runs, self.raw = [], None

    def handle_starttag(self, tag, attrs):
        self.runs += [value for _, value in attrs if value]
        if tag in ('script', 'style'):
            self.raw = tag

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if tag == self.raw:
            self.raw = None

    def handle_data(self, data):
        if self.raw == 'script':
            self.runs += js_strings(data)
        elif self.raw is None:
            self.runs.append(data)


def html_problems(text, corpus):
    """Every Hebrew text run in a prototype (text nodes, attribute values, JS strings) must be sourced."""
    parser = TextRuns()
    parser.feed(text)
    parser.close()
    problems = []
    for run in parser.runs:
        for line in run.split('\n'):  # already decoded once by the parser; never decode twice
            line = line.strip()
            if HEBREW.search(line) and not corpus.anywhere(line):
                problems.append(f'{corpus.why_missing(line)}: {line[:60]!r}')
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
