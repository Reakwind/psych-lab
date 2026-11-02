"""Build the app's voice-over with ElevenLabs: one file per script, real pauses, mastered.

Usage: python generate.py PREPPED_JSON OUT_DIR [S01 S02 ...]   (no names: every script)
Run it from the project folder: the API key is read from .env.local (ELEVENLABS_API_KEY).
Voices come from voices.json next to this file: {"נירה": "<voice_id>", "אריאל": "<voice_id>"}.

Writes OUT_DIR/<script>.mp4 (AAC; the artifact's asset store takes mp4) and OUT_DIR/timings.json
with each part's [start, end], in the same layout as the previous voice-over so the players and the
scene animations stay in sync. Every sentence is cached by its text and voice, so a rerun only pays
for what changed, and a run that stops (credits, network) resumes where it left off.
"""
import hashlib, json, os, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from dotenv import load_dotenv

load_dotenv('.env.local')
from elevenlabs import ElevenLabs, VoiceSettings  # noqa: E402

PREPPED, OUT = sys.argv[1:3]
ONLY = set(sys.argv[3:])
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'cache')
VOICES = json.load(open(os.path.join(HERE, 'voices.json'), encoding='utf-8'))
MODEL = 'eleven_v4'
SETTINGS = VoiceSettings(stability=0.7, similarity_boost=0.5)   # ElevenLabs' narration preset
SR = 24000

SCENE_GAP = {'video': 1.15, 'practice': 1.6}
COUNT_BEAT = 1.25      # seconds between counts in breathing rounds
HOLD_BASE = 1.0        # a part's written hold is silence after it, on top of this
LEAD_IN = 0.3          # the next part's picture appears this long before its voice
TAIL = 0.8

MASTER = ','.join([
    'highpass=f=70',
    'acompressor=threshold=-20dB:ratio=2:attack=15:release=200:makeup=1',
    'loudnorm=I=-16:TP=-1.5:LRA=9',
])

client = ElevenLabs()


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


def cache_path(job):
    text, voice = job[0], job[1]
    key = hashlib.sha1(f'{MODEL}|{voice}|{text}'.encode()).hexdigest()[:16]
    return os.path.join(CACHE, key + '.mp3')


def fetch(job):
    """job = (text, voice_id, previous_text, next_text). The neighbours only shape the delivery."""
    path = cache_path(job)
    if os.path.exists(path) and os.path.getsize(path):
        return
    text, voice, prev, nxt = job
    for attempt in range(5):
        try:
            audio = b''.join(client.text_to_speech.convert(
                text=text, voice_id=voice, model_id=MODEL, language_code='he', voice_settings=SETTINGS,
                previous_text=prev or None, next_text=nxt or None, output_format='mp3_44100_128'))
            open(path, 'wb').write(audio)
            return
        except Exception as e:
            status = getattr(e, 'status_code', None)
            if status in (401, 402, 403) or attempt == 4:
                raise
            time.sleep(3 + attempt * 5)


def clip(job):
    return trim(decode(cache_path(job)))


def counting(sc):
    """A breathing round: the script slows it right down and every comma-separated chunk is one
    word ("שאיפה, שתיים, שלוש"). A count-in ("...ונתחיל בעוד שלוש, שתיים, אחת") is spoken
    normally up to its first number. Returns (lead, words) or None."""
    if sc['rate'] is None or sc['rate'] > 0.75:
        return None
    chunks = [c.strip(' .') for s in sc['sents'] for c in s['plain'].split(',') if c.strip(' .')]
    lead = ''
    if ' ' in chunks[0]:
        lead, chunks[0] = chunks[0].rsplit(' ', 1)
        if chunks[0] != 'שלוש':
            return None
    if any(' ' in c for c in chunks):
        return None
    return lead, chunks


def plan(info):
    """What to synthesise for each part, plus how it is laid out."""
    voice = VOICES[info['who']]
    kind = 'practice' if info['practice'] else 'video'
    parts = []
    for sc in info['scenes']:
        c = counting(sc)
        if c:
            lead, words = c
            jobs = ([(lead, voice, '', '')] if lead else []) + [(w, voice, '', '') for w in words]
            parts.append({'count': True, 'lead': lead, 'words': words, 'hold': sc['hold'], 'jobs': jobs})
        else:
            texts = [s['plain'].replace('־', '-') for s in sc['sents']]   # maqaf as a plain hyphen
            jobs = [(t, voice, ' '.join(texts[:i])[-300:], ' '.join(texts[i + 1:])[:300]) for i, t in enumerate(texts)]
            parts.append({'count': False, 'sents': sc['sents'], 'hold': sc['hold'], 'jobs': jobs})
    return kind, parts


def build(info):
    kind, parts = plan(info)
    audio, starts, gaps = [], [], []
    t = 0.0
    for i, p in enumerate(parts):
        starts.append(t)
        if p['count']:
            seg = np.zeros(0, np.float32)
            jobs = list(p['jobs'])
            if p['lead']:
                seg = np.concatenate([clip(jobs.pop(0)), silence(0.35)])
            origin = len(seg) / SR
            for k, job in enumerate(jobs):
                at = max(origin + k * COUNT_BEAT, len(seg) / SR + 0.15)
                seg = np.concatenate([seg, silence(at - len(seg) / SR), clip(job)])
            # one-word rounds ("שאיפה.") last as long as the script's hold asked for, in whole beats
            beats = 3 if p['lead'] else max(len(p['words']), round((HOLD_BASE + 0.7 + p['hold']) / COUNT_BEAT))
            seg = np.concatenate([seg, silence(origin + beats * COUNT_BEAT - len(seg) / SR)])
        else:
            pieces = []
            for j, (s, job) in enumerate(zip(p['sents'], p['jobs'])):
                pieces.append(clip(job))
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


def main():
    os.makedirs(CACHE, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    data = json.load(open(PREPPED, encoding='utf-8'))
    names = [n for n in data if not ONLY or n in ONLY]
    timings_path = os.path.join(OUT, 'timings.json')
    timings = json.load(open(timings_path)) if os.path.exists(timings_path) else {}
    for name in names:
        jobs = list(dict.fromkeys(j for p in plan(data[name])[1] for j in p['jobs']))
        todo = [j for j in jobs if not os.path.exists(cache_path(j))]
        chars = sum(len(j[0]) for j in todo)
        print(f'{name}: {len(todo)} of {len(jobs)} sentences to synthesise, {chars} characters', flush=True)
        try:
            with ThreadPoolExecutor(3) as pool:
                list(pool.map(fetch, todo))
        except Exception as e:
            print(f'stopped at {name}: {getattr(e, "status_code", "")} {str(getattr(e, "body", e))[:300]}', flush=True)
            break
        audio, spans = build(data[name])
        write(audio, os.path.join(OUT, f'{name}.mp4'))
        timings[name] = {'total': round(len(audio) / SR, 1), 'spans': spans}
        json.dump(timings, open(timings_path, 'w'), indent=1)
        print(f'{name}: {timings[name]["total"]}s written', flush=True)


main()
