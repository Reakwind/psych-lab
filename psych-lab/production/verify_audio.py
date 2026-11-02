"""Compare encoded narration with the final recorded source, without generating new speech."""
import json
import subprocess
import sys

import numpy as np

from manage import HERE, KIT, MANIFEST, film_dir


def pcm(path):
    result = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-map', '0:a:0',
                             '-ac', '1', '-ar', '8000', '-f', 'f32le', '-'],
                            capture_output=True, check=True)
    return np.frombuffer(result.stdout, dtype='<f4')


for sid in sys.argv[1:]:
    source = KIT / 'audio' / (sid.lower() + '-voice.m4a')
    movie = film_dir(sid) / (sid.lower() + '-full.mp4')
    reference, encoded = pcm(source), pcm(movie)
    length = min(len(reference), len(encoded))
    assert length / 8000 >= MANIFEST[sid]['expected_duration'] - .2, sid
    reference, encoded = reference[:length], encoded[:length]
    norm_a, norm_b = np.linalg.norm(reference), np.linalg.norm(encoded)
    assert norm_a > 0 and norm_b > 0, sid
    correlation = float(np.dot(reference, encoded) / (norm_a * norm_b))
    amplitude_ratio = float(norm_b / norm_a)
    assert correlation > .995 and .98 < amplitude_ratio < 1.02, (sid, correlation, amplitude_ratio)
    result = {'session': sid, 'seconds_compared': length / 8000,
              'correlation': correlation, 'amplitude_ratio': amplitude_ratio,
              'source': str(source), 'movie': str(movie),
              'movie_modified_ns': movie.stat().st_mtime_ns}
    (HERE / 'review' / sid / 'audio-check.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result), flush=True)
