"""Read-only inventory of the saved Psych Lab and its local media."""

import json
import re
import subprocess
import xml.etree.ElementTree as ET
import zipfile
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from functools import lru_cache
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
ARTIFACT = ROOT / 'animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c'
PROJECT = ARTIFACT / 'project'


def source_sections():
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    with zipfile.ZipFile(ROOT / 'Psych trailer scripts - repetition review.docx') as doc:
        xml = ET.fromstring(doc.read('word/document.xml'))
    paragraphs = [''.join(t.text or '' for t in p.findall('.//w:t', ns)).strip()
                  for p in xml.findall('.//w:p', ns)]
    paragraphs = [p for p in paragraphs if p]
    starts = [(i, re.match(r'^Session (\d+)\s*·\s*(.+)', p))
              for i, p in enumerate(paragraphs)]
    starts = [(i, match) for i, match in starts if match]
    repeats = Counter(m[1] for _, m in starts)
    seen = Counter()
    sections = {}
    for index, (i, match) in enumerate(starts):
        number, title = match.groups()
        suffix = chr(ord('a') + seen[number]) if repeats[number] > 1 else ''
        seen[number] += 1
        sid = 'S' + number.zfill(2) + suffix
        end = starts[index + 1][0] if index + 1 < len(starts) else paragraphs.index('Not on the timeline · Not on the timeline')
        sections[sid] = {'heading': paragraphs[i], 'paragraphs': paragraphs[i + 1:end]}
    extra = paragraphs.index('עזבו אותי ממיינדסט')
    end = next(i for i in range(extra + 1, len(paragraphs)) if paragraphs[i] == 'PD psychology program')
    sections['S99'] = {'heading': 'Not on the timeline · Re-engagement',
                        'paragraphs': paragraphs[extra:end]}
    return sections


@lru_cache(maxsize=256)
def probe_cached(path, size, modified):
    result = subprocess.run(['ffprobe', '-v', 'error', '-show_entries',
                             'format=duration:stream=codec_type,codec_name,width,height',
                             '-of', 'json', path], capture_output=True, text=True)
    if result.returncode:
        return {'valid_container': False, 'error': result.stderr.strip()[-300:]}
    info = json.loads(result.stdout)
    streams = info.get('streams', [])
    return {'valid_container': True, 'duration': round(float(info.get('format', {}).get('duration', 0)), 3),
            'video': any(s['codec_type'] == 'video' for s in streams),
            'audio': any(s['codec_type'] == 'audio' for s in streams), 'streams': streams}


def probe(path):
    stat = path.stat()
    return probe_cached(str(path), stat.st_size, stat.st_mtime_ns)


def transcript(text):
    match = re.search(r'lines\(\)\s*\{\s*return\s*(\[.*?\]);', text, re.S)
    if match:
        return json.loads(match[1])
    import ast
    return [ast.literal_eval(m[1]) for m in re.finditer(
        r"\{\s*t:\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")", text)]


def build_audit():
    source = source_sections()
    rows = []
    boards = sorted(p for p in (PROJECT / 'scripts').glob('S*.dc.html')
                    if re.fullmatch(r'S\d+[ab]?\.dc\.html', p.name))
    media = []
    for board in boards:
        sid = board.name.split('.')[0]
        text = board.read_text()
        title = re.search(r'<title>(.*?)</title>', text, re.S)[1]
        story = board.with_name(sid + 'Story.dc.html')
        story_text = story.read_text() if story.exists() else ''
        placeholder = 'Storyboard not started yet' in story_text
        authored = bool(story_text and not placeholder and '<svg' in story_text)
        film = ROOT / 'animation-kit' / ('film' + sid[1:].lstrip('0'))
        exported = ROOT / 'voice-over/mp4' / (sid + '-animated.mp4')
        rendered = film / (sid.lower() + '-full.mp4')
        animation = exported if exported.exists() else rendered if rendered.exists() else None
        audio = ROOT / 'animation-kit/audio' / (sid.lower() + '-voice.m4a')
        if not audio.exists():
            audio = ROOT / 'voice-over' / (sid + '.mp3')
        times = re.search(r'(?:times\(\)\s*\{\s*return|times\s*:)\s*(\[\s*\[.*?\]\s*\])', text, re.S)
        expected = float(json.loads(times[1])[-1][-1]) if times else None
        integrated = bool(re.search(r'<video\b', text))
        row = {'id': sid, 'title': title, 'source_script': sid in source,
               'source_heading': source.get(sid, {}).get('heading'),
               'narration': transcript(text),
               'audio_path': str(audio.relative_to(ROOT)) if audio.exists() else None,
               'board_path': str(board.relative_to(PROJECT)),
               'storyboard_path': str(story.relative_to(PROJECT)) if story.exists() else None,
               'storyboard_authored': authored, 'storyboard_placeholder': placeholder,
               'storyboard_svg_count': story_text.count('<svg'),
               'animation_path': str(animation.relative_to(ROOT)) if animation else None,
               'exported': exported.exists(), 'integrated_in_saved_lab': integrated,
               'film_source': str(film.relative_to(ROOT)) if film.exists() else None,
               'scene_manifest': (film / 'src/scenes.json').exists(),
               'expected_duration': expected,
               'status': 'integrated' if integrated and exported.exists() else 'rendered' if animation else 'storyboard' if authored else 'not_started'}
        if animation:
            media.append((row, animation))
        rows.append(row)
    with ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(lambda pair: probe(pair[1]), media))
    for (row, _), info in zip(media, results):
        row['media'] = info
        row['duration_difference'] = (round(info['duration'] - row['expected_duration'], 3)
                                      if info.get('duration') is not None and row['expected_duration'] is not None else None)
    summary = {'scripts': len(source), 'session_boards': len(rows),
               'audio': sum(bool(r['audio_path']) for r in rows),
               'authored_storyboards': sum(r['storyboard_authored'] for r in rows),
               'placeholder_storyboards': sum(r['storyboard_placeholder'] for r in rows),
               'animations_rendered': sum(bool(r['animation_path']) for r in rows),
               'animations_exported': sum(r['exported'] for r in rows),
               'trios_integrated': sum(r['status'] == 'integrated' and r['source_script'] and r['storyboard_authored'] for r in rows),
               'rendered_not_integrated': [r['id'] for r in rows if r['status'] == 'rendered'],
               'storyboard_only': [r['id'] for r in rows if r['status'] == 'storyboard'],
               'not_started': [r['id'] for r in rows if r['status'] == 'not_started'],
               'container_issues': [r['id'] for r in rows if r.get('media') and not (r['media'].get('valid_container') and r['media'].get('audio') and r['media'].get('video'))],
               'duration_issues_over_0_25s': [r['id'] for r in rows if r.get('duration_difference') is not None and abs(r['duration_difference']) > .25]}
    return {'checked_at': datetime.now(ZoneInfo('Asia/Jerusalem')).isoformat(timespec='seconds'),
            'scope': 'Local saved artifact and media. No assertion of live Claude synchronization or visual approval.',
            'summary': summary, 'sessions': rows}


if __name__ == '__main__':
    audit = build_audit()
    target = Path(__file__).with_name('status.json')
    target.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'report': str(target), **audit['summary']}, ensure_ascii=False, indent=2))
