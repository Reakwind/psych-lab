"""Point every script player at its new recording and let the recording run on between parts.

Usage: python3 -I patch_continuous.py SCRIPTS_DIR URLS_JSON TIMINGS_JSON
The new recordings carry their own pauses (and the breathing rounds keep a steady beat across
parts), so the player no longer stops and waits 700 ms + hold between parts while a recording
plays: when the time passes a part's end it just shows the next part. The browser-voice fallback
still uses hold. Idempotent.
"""
import glob, json, os, re, sys

scripts_dir, urls_path, timings_path = sys.argv[1:4]
urls = json.load(open(urls_path))
timings = json.load(open(timings_path))

OLD_END = """    const endSpan = () => {
      if (this.spanEnd == null || !this.audio) return;
      if (this.audio.currentTime >= this.spanEnd - 0.12 || this.audio.ended) {
        this.spanEnd = null;
        try { this.audio.pause(); } catch (e) {}
        if (this.done) this.done();
      }
    };"""
NEW_END = """    const endSpan = () => {
      if (this.spanEnd == null || !this.audio) return;
      const a = this.audio;
      if (a.currentTime < this.spanEnd - 0.05 && !a.ended) return;
      // the recording has its own pauses, so it plays straight on into the next part
      const j = this.part + 1;
      if (j < times.length && !a.ended) {
        this.part = j;
        this.spanEnd = times[j][1];
        clearTimeout(this.backup);
        this.setState({ i: j });
        return;
      }
      this.stop();
      this.setState({ screen: 'end', playing: false });
    };"""
OLD_PLAY = "        this.spanEnd = span[1];\n        this.done = done;\n"
NEW_PLAY = "        this.spanEnd = span[1];\n        this.part = i;\n        this.done = done;\n"

n = 0
for f in sorted(glob.glob(os.path.join(scripts_dir, 'S[0-9]*.dc.html'))):
    stem = os.path.basename(f)[:-8]
    s = open(f, encoding='utf-8').read()
    if NEW_END not in s:
        for old, new in [(OLD_END, NEW_END), (OLD_PLAY, NEW_PLAY)]:
            assert s.count(old) == 1, (f, old[:50])
            s = s.replace(old, new, 1)
    stamp = "      audio: '%s', times: %s," % (urls[stem], json.dumps(timings[stem]['spans'], separators=(',', ':')))
    s, k = re.subn(r"      audio: '[^']*', times: \[[^\n]*\],", lambda m: stamp, s, count=1)
    assert k == 1, f
    open(f, 'w', encoding='utf-8').write(s)
    n += 1
print('patched', n)
