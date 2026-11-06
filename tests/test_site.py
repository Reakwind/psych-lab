"""The local Lab website (docs/WEBSITE_PLAN.md): built from the shared content layer, verbatim, linked,
served safely, and usable on a 390 x 844 phone and a desktop."""
import filecmp
import http.client
import json
from pathlib import Path
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import unittest
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import verbatim  # noqa: E402

LFS = b'version https://git-lfs.github.com/spec/v1'
UI_CSS = ROOT / 'animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/ui.css'


def build(out):
    result = subprocess.run(['node', 'site/build.mjs', '--out', str(out)], cwd=ROOT, capture_output=True, text=True)
    if result.returncode:
        raise AssertionError('site/build.mjs failed:\n' + result.stderr)
    return result.stdout


def free_port():
    with socket.socket() as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]


def chrome():
    """The browser scripts/browser.mjs would use (CHROME_PATH, then the system browser), or None."""
    result = subprocess.run(['node', '--input-type=module', '-e', "import {chromePath} from './scripts/browser.mjs'; process.stdout.write(chromePath() || '')"],
                            cwd=ROOT, capture_output=True, text=True)
    return result.stdout.strip() or None


class Site(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = Path(tempfile.mkdtemp(prefix='psych-lab-site-'))
        cls.dist = cls.tmp / 'dist'
        cls.log = build(cls.dist)
        cls.pages = sorted(cls.dist.rglob('*.html'))
        cls.media = json.loads((cls.dist / 'media.json').read_text())

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def test_build_is_repeatable(self):
        again = self.tmp / 'again'
        build(again)
        compared = filecmp.dircmp(self.dist, again)
        def differences(c, prefix=''):
            out = [prefix + n for n in c.left_only + c.right_only + c.diff_files + c.funny_files]
            for name, sub in c.subdirs.items():
                out += differences(sub, prefix + name + '/')
            return out
        self.assertEqual(differences(compared), [])

    def test_every_section_is_built(self):
        names = {str(p.relative_to(self.dist)) for p in self.pages}
        program = json.loads((ROOT / 'psych-lab/intervention/program.json').read_text())
        films = json.loads((ROOT / 'psych-lab/film-scripts.json').read_text())['films']
        for page in ['index.html', 'sessions/index.html', 'app/index.html', 'films/index.html', 'activities/index.html', 'sessions/held-out-047.html']:
            self.assertIn(page, names)
        for film in films:
            self.assertIn(f'films/{film}.html', names)
        kinds = {'video', 'audio', 'choice', 'breathing', 'inner', 'cards', 'reflection'}
        for aid, a in program['activities'].items():
            if a['kind'] in kinds:
                self.assertIn(f'activities/{aid}.html', names)

    def test_players_run_the_canvas_logic_unchanged(self):
        sessions = (self.dist / 'assets/sessions.js').read_text()
        app = (self.dist / 'assets/app.js').read_text()
        phone_logic = (ROOT / 'canvas/phone-logic.js').read_text()
        self.assertIn(phone_logic, sessions)
        self.assertIn(phone_logic, app)
        self.assertIn((ROOT / 'canvas/app-logic.js').read_text(), app)
        self.assertEqual((self.dist / 'assets/ui.css').read_bytes(), UI_CSS.read_bytes())

    def test_program_text_is_verbatim(self):
        corpus = verbatim.Corpus()
        needed = [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]
        if needed:
            self.skipTest('Text sources not downloaded (git lfs pull): ' + ', '.join(needed))
        files = [str(p) for p in self.pages if p.parent.name != 'films'] + [str(self.dist / 'assets/sessions.js'), str(self.dist / 'assets/app.js')]
        problems, _ = verbatim.check(files, corpus)
        self.assertEqual(problems, [])

    def test_film_pages_quote_scripts_and_narration(self):
        corpus = verbatim.Corpus(narration=True)
        needed = [p for p in corpus.unreadable if p.endswith(('.xlsx', '.docx'))]
        if needed:
            self.skipTest('Text sources not downloaded (git lfs pull): ' + ', '.join(needed))
        problems, _ = verbatim.check([str(p) for p in self.pages if p.parent.name == 'films'], corpus)
        self.assertEqual(problems, [])

    def test_links_resolve(self):
        broken = []
        for page in self.pages:
            for href in re.findall(r'href="(/[^"#]*)', page.read_text()):
                target = self.dist / href.lstrip('/')
                if href.endswith('/'):
                    target = target / 'index.html'
                if not target.is_file():
                    broken.append(f'{page.relative_to(self.dist)} -> {href}')
        self.assertEqual(broken, [])

    def test_media_are_downloaded_repository_files(self):
        texts = [p.read_text() for p in self.pages] + [(self.dist / f'assets/{n}.js').read_text() for n in ('sessions', 'app')]
        used = {u for t in texts for u in re.findall(r'"(/media/[^"]+)"', t)}
        for url in used:
            self.assertIn(url, self.media, f'{url} is linked but the server would refuse it')
        for url, rel in self.media.items():
            file = ROOT / rel
            self.assertTrue(file.is_file(), rel)
            with file.open('rb') as f:
                self.assertFalse(f.read(len(LFS)) == LFS, f'{rel} is an LFS pointer, not media')
            self.assertFalse(rel.startswith(('/', '..')) or '/../' in rel, rel)

    def test_missing_downloads_are_named_not_replaced(self):
        # Every film the audit names is either served from the repository or reported missing on its page.
        audit = json.loads((ROOT / 'psych-lab/status.json').read_text())
        for s in audit['sessions']:
            page = (self.dist / f'films/{s["id"]}.html').read_text()
            url = '/media/' + '/'.join(urllib.request.quote(seg) for seg in s['animation_path'].split('/'))
            if url in self.media:
                self.assertIn(f'src="{url}"', page)
            else:
                self.assertIn('not downloaded on this computer', page)
                self.assertNotIn('<video', page)


class Server(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = Path(tempfile.mkdtemp(prefix='psych-lab-serve-'))
        cls.dist = cls.tmp / 'dist'
        build(cls.dist)
        cls.port = free_port()
        cls.proc = subprocess.Popen(['node', 'site/serve.mjs', '--dist', str(cls.dist), '--port', str(cls.port)], cwd=ROOT,
                                    stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        cls.banner = cls.proc.stdout.readline()
        cls.base = f'http://127.0.0.1:{cls.port}'
        cls.media = json.loads((cls.dist / 'media.json').read_text())

    @classmethod
    def tearDownClass(cls):
        cls.proc.terminate()
        cls.proc.wait(timeout=10)
        cls.proc.stdout.close()
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def get(self, path, headers=None):
        req = urllib.request.Request(self.base + path, headers=headers or {})
        try:
            with urllib.request.urlopen(req, timeout=10) as r:
                return r.status, dict(r.headers), r.read()
        except urllib.error.HTTPError as e:
            return e.code, dict(e.headers), e.read()

    def test_listens_on_loopback_by_default(self):
        self.assertIn(f'http://127.0.0.1:{self.port}/', self.banner)

    def test_pages(self):
        status, headers, body = self.get('/')
        self.assertEqual(status, 200)
        self.assertIn('text/html', headers['Content-Type'])
        self.assertEqual(self.get('/films/')[0], 200)
        conn = http.client.HTTPConnection('127.0.0.1', self.port, timeout=10)
        conn.request('GET', '/films')
        r = conn.getresponse()
        self.assertEqual((r.status, r.getheader('Location')), (301, '/films/'))
        conn.close()

    def test_nothing_outside_the_site_or_media_list(self):
        for path in ['/media.json', '/../package.json', '/%2e%2e/package.json', '/media/package.json', '/media/canvas/build.mjs',
                     '/assets/../../package.json', '/media/..%2fpackage.json']:
            self.assertIn(self.get(path)[0], (400, 403, 404), path)

    def test_media_answer_byte_ranges(self):
        if not self.media:
            self.skipTest('No media downloaded (git lfs pull)')
        url, rel = next(iter(sorted(self.media.items())))
        size = (ROOT / rel).stat().st_size
        status, headers, body = self.get(url, {'Range': 'bytes=10-19'})
        self.assertEqual(status, 206)
        self.assertEqual(headers['Content-Range'], f'bytes 10-19/{size}')
        self.assertEqual(body, (ROOT / rel).read_bytes()[10:20])
        self.assertEqual(self.get(url, {'Range': f'bytes={size + 10}-'})[0], 416)


# Drives the built site in a real browser: no sideways scroll on any section at phone or desktop size, a
# session walked to its end, a film seeked and the app's day controls used.
BROWSER = r"""
const {chromium} = require('playwright');
const [base, exe] = process.argv.slice(1);
(async () => {
  const b = await chromium.launch({executablePath: exe, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']});
  const out = {overflow: [], errors: [], walk: null, film: null, app: null};
  for (const [w, h] of [[390, 844], [1280, 800]]) {
    const p = await b.newPage({viewport: {width: w, height: h}});
    p.on('pageerror', e => out.errors.push(`${w}: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') out.errors.push(`${w}: ${m.text()}`); });
    for (const u of ['/', '/sessions/', '/app/', '/films/', '/films/S01.html', '/activities/', '/activities/PS-ACT-002.html', '/activities/PS-ACT-002-motivation.html', '/activities/PS-ACT-004-deck-1.html', '/sessions/held-out-047.html']) {
      await p.goto(base + u, {waitUntil: 'load'});
      await p.waitForTimeout(150);
      const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 0) out.overflow.push(`${w}px ${u}: ${over}px`);
    }
    if (w === 390) {
      // On a phone the player is the screen: it fits the viewport under the header.
      await p.goto(base + '/sessions/', {waitUntil: 'load'});
      const box = await p.locator('.app').boundingBox();
      out.phoneApp = {width: Math.round(box.width), bottom: Math.round(box.y + box.height)};
      await p.locator('.srow').first().click();
      await p.getByRole('button', {name: 'Start', exact: true}).click();
      const steps = [];
      for (let i = 0; i < 20; i++) {
        await p.waitForTimeout(120);
        if (await p.getByText('Session complete').isVisible()) { steps.push('complete'); break; }
        steps.push(await p.locator('.app .topbar-title').first().innerText());
        await p.locator('.app .btn-filled:visible').last().click();
      }
      out.walk = steps;
      out.runs = await p.evaluate(() => JSON.parse(localStorage.getItem('psych-lab-phone-runs-v1') || '[]').length);
    } else {
      await p.goto(base + '/films/S01.html', {waitUntil: 'load'});
      const v = p.locator('video.film-video');
      out.film = (await v.count()) ? await v.evaluate(async el => {
        el.muted = true;
        if (el.readyState < 1) await new Promise((r, j) => { el.addEventListener('loadedmetadata', r, {once: true}); el.addEventListener('error', () => j(new Error('media error')), {once: true}); });
        el.currentTime = el.duration - 1;
        await new Promise(r => el.addEventListener('seeked', r, {once: true}));
        return {duration: el.duration, at: el.currentTime, width: el.videoWidth};
      }).catch(e => ({error: String(e)})) : 'not downloaded';
      await p.goto(base + '/app/', {waitUntil: 'load'});
      const day = async () => p.locator('.rail .big').innerText();
      const first = await day();
      await p.getByRole('button', {name: 'Next day →'}).click();
      out.app = [first, await day()];
    }
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.log(JSON.stringify({fatal: String(e)})); process.exit(1); });
"""


class Browser(unittest.TestCase):
    def test_site_in_a_browser(self):
        exe = chrome()
        if not exe:
            self.skipTest('No Chrome or Chromium found (set CHROME_PATH)')
        with tempfile.TemporaryDirectory(prefix='psych-lab-browser-') as tmp:
            dist = Path(tmp) / 'dist'
            build(dist)
            port = free_port()
            proc = subprocess.Popen(['node', 'site/serve.mjs', '--dist', str(dist), '--port', str(port)], cwd=ROOT, stdout=subprocess.PIPE, text=True)
            try:
                proc.stdout.readline()
                result = subprocess.run(['node', '-e', BROWSER, f'http://127.0.0.1:{port}', exe], cwd=ROOT, capture_output=True, text=True, timeout=300)
            finally:
                proc.terminate()
                proc.wait(timeout=10)
                proc.stdout.close()
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            out = json.loads(result.stdout.strip().splitlines()[-1])
            self.assertEqual(out['overflow'], [], 'pages scroll sideways')
            self.assertEqual(out['errors'], [])
            self.assertEqual(out['phoneApp']['width'], 390)
            self.assertLessEqual(out['phoneApp']['bottom'], 844)
            self.assertEqual(out['walk'][-1], 'complete', out['walk'])
            self.assertGreaterEqual(out['runs'], 1)
            self.assertEqual(out['app'], ['App day 2', 'App day 3'])
            if out['film'] != 'not downloaded':
                self.assertNotIn('error', out['film'])
                self.assertEqual(out['film']['width'], 1080)
                self.assertGreater(out['film']['at'], out['film']['duration'] - 2)


if __name__ == '__main__':
    unittest.main()
