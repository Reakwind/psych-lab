#!/usr/bin/env python3
"""Pair every animated film with the script document it narrates, word for word.

Usage: python3 scripts/film_scripts.py [--check]

Inputs are read, never changed:
- sources/film-scripts/: the owner's script documents (DOCX), the source of truth for the films.
- voice-over/elevenlabs/prepped-all.json: the text each film's voice-over was generated from with
  the ElevenLabs API. Per scene, `orig` is the script line and `sents[].plain`/`marked` are the
  sentences sent to the voice engine (`marked` carries vowel marks for pronunciation).
- psych-lab/intervention/sources/hebrew-production-scripts.json: a later copy-edit of some scripts.

Writes psych-lab/film-scripts.json. Program text in it is only ever quoted from a source document
as {"text", "source"}; what the film and the voice engine say is referenced by scene and sentence
index into the narration record, with the positions of differing words, so the Lab can show both
side by side without this file restating anything that is not in a source.
"""
import difflib
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from agent_safety import ROOT  # noqa: E402
import verbatim  # noqa: E402

SCRIPTS = 'sources/film-scripts/'
NARRATION = 'voice-over/elevenlabs/prepped-all.json'
LATER = 'psych-lab/intervention/sources/hebrew-production-scripts.json'
OUT = 'psych-lab/film-scripts.json'
# Vowel and cantillation marks; the maqaf (05BE), paseq (05C0), sof pasuq (05C3) and nun hafukha
# (05C6) are letters/punctuation of the text itself and stay.
VOWELS = re.compile('[֑-ׇֽֿׁׂׅׄ]')


def words(text):
    return verbatim.collapse(text).split()


def paragraphs(path):
    """The document's non-empty paragraphs, as the verbatim checker reads them."""
    text = verbatim.source_text(path)
    if text is None:
        raise SystemExit(f'{path} is not downloaded (git lfs pull) and cannot be read')
    return [p for p in text.split(verbatim.SEP) if verbatim.collapse(p)]


def changed(a, b):
    """Positions of the words of a and of b that are not part of an exact match between them."""
    keep_a, keep_b = set(), set()
    for block in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        keep_a.update(range(block.a, block.a + block.size))
        keep_b.update(range(block.b, block.b + block.size))
    return [i for i in range(len(a)) if i not in keep_a], [j for j in range(len(b)) if j not in keep_b]


def align(scenes, paras):
    """Map each scene (list of words) onto document words; return per-scene spans and leftovers.

    Every document word belongs either to exactly one scene's span or to a run the film does not
    narrate. Runs never cross a paragraph boundary, so each one is quotable as it stands.
    """
    film = [(s, w) for s, scene in enumerate(scenes) for w in scene]
    doc = [(p, w) for p, para in enumerate(paras) for w in words(para)]
    owner = [None] * len(doc)  # scene index that narrates each document word, if any
    ops = difflib.SequenceMatcher(None, [w for _, w in film], [w for _, w in doc], autojunk=False).get_opcodes()
    for tag, i1, i2, j1, j2 in ops:
        if tag in ('equal', 'replace'):
            for k, j in enumerate(range(j1, j2)):
                i = min(i1 + k * max(1, i2 - i1) // max(1, j2 - j1), i2 - 1) if tag == 'replace' else i1 + k
                owner[j] = film[i][0]
        elif tag == 'insert' and 0 < i1 < len(film) and film[i1 - 1][0] == film[i1][0]:
            owner[j1:j2] = [film[i1][0]] * (j2 - j1)  # left out inside a scene, e.g. a stage direction
    spans = [[] for _ in scenes]
    for j, s in enumerate(owner):
        if s is not None:
            spans[s].append(j)
    leftovers, run = [], []
    for j, s in enumerate(owner + [0]):
        if s is None and (not run or doc[run[-1]][0] == doc[j][0]):
            run.append(j)
            continue
        if run:
            leftovers.append(run)
        run = [j] if s is None else []
    return doc, spans, leftovers


def quotes(doc, indices, path):
    """Quote consecutive document words by position, one quote per paragraph they come from."""
    assert indices == list(range(indices[0], indices[0] + len(indices))) if indices else True, indices
    out = []
    for j in indices:
        p = doc[j][0]
        if out and out[-1][0] == p:
            out[-1][1].append(doc[j][1])
        else:
            out.append((p, [doc[j][1]]))
    return [{'text': ' '.join(ws), 'source': path} for _, ws in out]


def pick_document(scene_words, documents):
    film = set(w for scene in scene_words for w in scene)
    scored = sorted(((len(film & set(words(' '.join(paras)))) / max(1, len(film)), path)
                     for path, paras in documents.items()), reverse=True)
    return scored[0]


def later_versions():
    content = json.loads((ROOT / LATER).read_text(encoding='utf-8'))['content']
    parts = re.split(r'(PS-CONT-\d{3})[ \t]*\n', content)
    return {parts[i]: words(parts[i + 1]) for i in range(1, len(parts), 2)}


def build():
    narration = json.loads((ROOT / NARRATION).read_text(encoding='utf-8'))
    documents = {str(p.relative_to(ROOT)): paragraphs(str(p.relative_to(ROOT)))
                 for p in sorted((ROOT / SCRIPTS).rglob('*.docx'))}
    later = later_versions()
    films, used = {}, {}
    for fid, record in narration.items():
        scenes = record['scenes']
        scene_words = [words(scene['orig']) for scene in scenes]
        overlap, path = pick_document(scene_words, documents)
        if overlap < 0.9 or path in used:
            raise SystemExit(f'{fid}: no unambiguous script document (best {path}, {overlap:.2f}, also {used.get(path)})')
        used[path] = fid
        doc, spans, leftovers = align(scene_words, documents[path])
        lines = []
        for s, scene in enumerate(scenes):
            script_words = [doc[j][1] for j in spans[s]]
            script_changed, film_changed = changed(script_words, scene_words[s])
            voiced = words(' '.join(sent['plain'] for sent in scene['sents']))
            film_voiced, voiced_changed = changed(scene_words[s], voiced)
            line = {'scene': s, 'script': quotes(doc, spans[s], path),
                    'verbatim': not script_changed and not film_changed}
            if not line['verbatim']:
                line['script_changed'], line['film_changed'] = script_changed, film_changed
            if film_voiced or voiced_changed:
                line['voiced_changed'] = voiced_changed  # positions in the joined plain sentences
            respelled = [k for k, sent in enumerate(scene['sents'])
                         if verbatim.collapse(VOWELS.sub('', sent['marked'])) != verbatim.collapse(sent['plain'])]
            if respelled:
                line['respelled'] = respelled  # sentences whose vowel-marked text is spelled differently
            lines.append(line)
        film_words = [w for scene in scene_words for w in scene]
        best = max(later.items(), key=lambda kv: len(set(kv[1]) & set(film_words)) / max(1, len(set(kv[1]))),
                   default=None)
        entry = {'id': fid, 'voice': record['who'], 'source': path, 'lines': lines,
                 'not_narrated': [q for run in leftovers for q in quotes(doc, run, path)]}
        if best and len(set(best[1]) & set(film_words)) / max(1, len(set(best[1]))) >= 0.6:
            ops = [op for op in difflib.SequenceMatcher(None, film_words, best[1], autojunk=False).get_opcodes()
                   if op[0] != 'equal']
            entry['later_version'] = {'id': best[0], 'source': LATER, 'differences': len(ops)}
        films[fid] = entry
    unused = sorted(set(documents) - set(used))
    return {'schema': 1, 'narration': NARRATION, 'scripts': SCRIPTS, 'films': films, 'documents_without_film': unused}


def render(data):
    return json.dumps(data, ensure_ascii=False, indent=1) + '\n'


def main():
    text = render(build())
    target = ROOT / OUT
    if '--check' in sys.argv:
        if not target.exists() or target.read_text(encoding='utf-8') != text:
            sys.exit(f'{OUT} is out of date; run python3 scripts/film_scripts.py')
        print(f'{OUT} is current.')
        return
    target.write_text(text, encoding='utf-8')
    data = json.loads(text)
    exact = sum(all(l['verbatim'] for l in f['lines']) for f in data['films'].values())
    print(f'Wrote {OUT}: {len(data["films"])} films, {exact} narrated word for word from their script.')


if __name__ == '__main__':
    main()
