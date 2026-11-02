"""Build the app's voice-over: one file per script, vowel-marked text, real pauses, mastered.

Usage: env/bin/python app_audio.py PREPPED_JSON OUT_DIR
Writes OUT_DIR/<script>.mp4 (AAC audio; the artifact's asset store takes mp4, not mp3) and
OUT_DIR/timings.json with each part's [start, end] in the file.

Unlike the old files, every pause is inside the recording, so the player can let it run on
without stopping between parts: part i's span runs until part i+1 starts.
"""
import asyncio, hashlib, json, os, re, subprocess, sys
import numpy as np
import edge_tts

PREPPED, OUT = sys.argv[1:3]
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out', 'cache')   # shared with the A/B/C test
SR = 24000
VOICES = {'אריאל': 'he-IL-AvriNeural', 'נירה': 'he-IL-HilaNeural'}

# (rate, pitch). Practices are slower and a touch lower; parts the script slows down use 'slow'.
STYLE = {'video': ('-8%', '+0Hz'), 'practice': ('-14%', '-2Hz'), 'slow': ('-18%', '-2Hz')}
SCENE_GAP = {'video': 1.15, 'practice': 1.6}
COUNT_BEAT = 1.25      # seconds between counts in breathing rounds
HOLD_BASE = 1.0        # a part's written hold is silence after it, on top of this
LEAD_IN = 0.3          # the next part's picture appears this long before its voice
TAIL = 0.8

MASTER = ','.join([
    'highpass=f=70',
    'equalizer=f=180:t=q:w=1:g=2',       # a little body
    'equalizer=f=3200:t=q:w=1.2:g=-1.5', # soften the synthetic edge
    'equalizer=f=7000:t=q:w=1.5:g=-2',   # tame sibilance
    'acompressor=threshold=-20dB:ratio=2:attack=15:release=200:makeup=1',
    'loudnorm=I=-16:TP=-1.5:LRA=9',
])
NIKUD = re.compile('[֑-ׇ]')


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def trim(x, keep=0.03):
    """Cut the engine's own leading and trailing silence so pauses are exactly what we set."""
    loud = np.flatnonzero(np.abs(x) > 0.01)
    if not len(loud):
        return x[:0]
    pad = int(keep * SR)
    return x[max(0, loud[0] - pad): loud[-1] + pad]


def silence(sec):
    return np.zeros(int(round(max(0.0, sec) * SR)), np.float32)


def cache_path(text, voice, rate, pitch):
    key = hashlib.sha1(f'{voice}|{rate}|{pitch}|{text}'.encode()).hexdigest()[:16]
    return os.path.join(CACHE, key + '.mp3')


async def fetch(sem, text, voice, rate, pitch):
    path = cache_path(text, voice, rate, pitch)
    if os.path.exists(path) and os.path.getsize(path):
        return
    async with sem:
        for attempt in range(5):
            try:
                await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(path)
                return
            except Exception:
                if attempt == 4:
                    raise
                await asyncio.sleep(2 + attempt * 4)


def clip(text, voice, style):
    return trim(decode(cache_path(text, voice, *STYLE[style])))


def counting(sc):
    """A breathing round: the script slows it right down and every comma-separated chunk is one
    word ("שאיפה, שתיים, שלוש"). A count-in ("...ונתחיל בעוד שלוש, שתיים, אחת") is spoken
    normally up to its first number. Returns (lead, words) or None."""
    if sc['rate'] is None or sc['rate'] > 0.75:
        return None
    chunks = [c.strip(' .') for s in sc['sents'] for c in s['marked'].split(',') if c.strip(' .')]
    lead = ''
    if ' ' in chunks[0]:
        lead, chunks[0] = chunks[0].rsplit(' ', 1)
        if NIKUD.sub('', chunks[0]) != 'שלוש':
            return None
    if any(' ' in c for c in chunks):
        return None
    return lead, chunks


def plan(info):
    """What to synthesise for each part: [(text, style)], plus how it is laid out."""
    kind = 'practice' if info['practice'] else 'video'
    parts = []
    for sc in info['scenes']:
        c = counting(sc)
        if c:
            lead, words = c
            parts.append({'count': True, 'lead': lead, 'words': words, 'hold': sc['hold'],
                          'jobs': ([(lead, 'practice')] if lead else []) + [(w, 'slow') for w in words]})
        else:
            style = 'slow' if sc['rate'] is not None else kind
            parts.append({'count': False, 'sents': sc['sents'], 'hold': sc['hold'],
                          'jobs': [(s['marked'], style) for s in sc['sents']]})
    return kind, parts


def build(info):
    voice = VOICES[info['who']]
    kind, parts = plan(info)
    audio, starts, gaps = [], [], []
    t = 0.0
    for i, p in enumerate(parts):
        starts.append(t)
        if p['count']:
            seg = np.zeros(0, np.float32)
            if p['lead']:
                seg = np.concatenate([clip(p['lead'], voice, 'practice'), silence(0.35)])
            origin = len(seg) / SR
            for k, w in enumerate(p['words']):
                at = max(origin + k * COUNT_BEAT, len(seg) / SR + 0.15)
                seg = np.concatenate([seg, silence(at - len(seg) / SR), clip(w, voice, 'slow')])
            # one-word rounds ("שאיפה.") last as long as the script's hold asked for, in whole beats
            beats = 3 if p['lead'] else max(len(p['words']), round((HOLD_BASE + 0.7 + p['hold']) / COUNT_BEAT))
            seg = np.concatenate([seg, silence(origin + beats * COUNT_BEAT - len(seg) / SR)])
        else:
            pieces = []
            for j, (s, (text, style)) in enumerate(zip(p['sents'], p['jobs'])):
                pieces.append(clip(text, voice, style))
                if j < len(p['sents']) - 1:
                    pieces.append(silence(s['pause']))
            seg = np.concatenate(pieces)
        audio.append(seg)
        t += len(seg) / SR
        nxt = parts[i + 1] if i + 1 < len(parts) else None
        if nxt is None:
            gap = TAIL
        elif p['count'] and (p['lead'] or nxt['count']):
            gap = 0.0                      # the beat runs straight on
        elif p['hold'] and not p['count']:
            gap = max(SCENE_GAP[kind], HOLD_BASE + p['hold'])
        else:
            gap = SCENE_GAP[kind]
        audio.append(silence(gap))
        t += gap
        gaps.append(gap)
    # part i shows until shortly before part i+1's voice starts
    cuts = [0.0] + [starts[i + 1] - min(LEAD_IN, gaps[i]) for i in range(len(parts) - 1)] + [t]
    spans = [[round(a, 2), round(b, 2)] for a, b in zip(cuts, cuts[1:])]
    return np.concatenate(audio), spans


def write(x, path):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-af', MASTER, '-ar', str(SR), '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', path],
                   input=x.astype(np.float32).tobytes(), check=True)


async def main():
    os.makedirs(CACHE, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    data = json.load(open(PREPPED, encoding='utf-8'))
    jobs = {(text, VOICES[info['who']], style) for info in data.values() for p in plan(info)[1] for text, style in p['jobs']}
    sem = asyncio.Semaphore(6)
    todo = [j for j in jobs if not os.path.exists(cache_path(j[0], j[1], *STYLE[j[2]]))]
    print(len(jobs), 'clips,', len(todo), 'to synthesise', flush=True)
    done = 0

    async def one(j):
        nonlocal done
        await fetch(sem, j[0], j[1], *STYLE[j[2]])
        done += 1
        if done % 100 == 0:
            print(done, 'synthesised', flush=True)
    await asyncio.gather(*(one(j) for j in todo))

    timings = {}
    for name, info in data.items():
        audio, spans = build(info)
        write(audio, os.path.join(OUT, f'{name}.mp4'))
        timings[name] = {'total': round(len(audio) / SR, 1), 'spans': spans}
        print(name, timings[name]['total'], flush=True)
    json.dump(timings, open(os.path.join(OUT, 'timings.json'), 'w'), indent=1)


asyncio.run(main())
