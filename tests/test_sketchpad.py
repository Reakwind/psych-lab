"""The sketchpad (docs/SKETCHPAD_PLAN.md): the relay serves the board and the designs, saves each Send as a
sketch packet and reports it; the board draws, finds what a mark is on and sends, at desktop and phone size;
the mod passes its own checks and tests; the designs are self-contained."""
import base64
import json
from pathlib import Path
import re
import shutil
import socket
import subprocess
import tempfile
import threading
import time
import unittest
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
RELAY = ROOT / 'sketchpad/relay/server.mjs'
DESIGNS = ROOT / 'studio/designs'
# A 1 x 1 PNG, standing in for the board's images.
PNG = 'data:image/png;base64,' + base64.b64encode(bytes.fromhex(
    '89504e470d0a1a0a0000000d4948445200000001000000010806000000'
    '1f15c4890000000d49444154789c63000100000500010d0a2db40000000049454e44ae426082')).decode()


def free_port():
    with socket.socket() as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]


def chrome():
    result = subprocess.run(['node', '--input-type=module', '-e', "import {chromePath} from './scripts/browser.mjs'; process.stdout.write(chromePath() || '')"],
                            cwd=ROOT, capture_output=True, text=True)
    return result.stdout.strip() or None


class Relay:
    """The relay on a copy of the designs, with its stdout events collected."""

    def __init__(self):
        self.tmp = Path(tempfile.mkdtemp(prefix='sketchpad-'))
        self.root = self.tmp / 'studio'
        shutil.copytree(DESIGNS, self.root / 'designs')
        self.proc = subprocess.Popen(['node', str(RELAY), '--root', str(self.root), '--port', str(free_port())],
                                     cwd=self.tmp, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        self.events = []
        first = self.proc.stdout.readline()
        assert first.startswith('SKETCHPAD '), first + self.proc.stderr.read()
        self.events.append(json.loads(first[len('SKETCHPAD '):]))
        self.url = self.events[0]['url'].rstrip('/')
        threading.Thread(target=self._read, daemon=True).start()

    def _read(self):
        for line in self.proc.stdout:
            if line.startswith('SKETCHPAD '):
                self.events.append(json.loads(line[len('SKETCHPAD '):]))

    def wait_for(self, kind, timeout=10):
        end = time.time() + timeout
        while time.time() < end:
            found = [e for e in self.events if e['type'] == kind]
            if found:
                return found[-1]
            time.sleep(0.05)
        raise AssertionError(f'no {kind} event: {self.events}')

    def get(self, path):
        try:
            with urllib.request.urlopen(self.url + path, timeout=10) as r:
                return r.status, r.headers.get('Content-Type', ''), r.read()
        except urllib.error.HTTPError as e:
            return e.code, '', e.read()

    def post(self, path, body):
        req = urllib.request.Request(self.url + path, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=10) as r:
                return r.status, json.loads(r.read())
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read())

    def close(self):
        self.proc.terminate()
        self.proc.wait(timeout=10)
        self.proc.stdout.close()
        self.proc.stderr.close()
        shutil.rmtree(self.tmp, ignore_errors=True)


class RelayTest(unittest.TestCase):
    def setUp(self):
        self.relay = Relay()

    def tearDown(self):
        self.relay.close()

    def test_serves_the_board_and_the_designs(self):
        status, kind, body = self.relay.get('/')
        self.assertEqual((status, kind.split(';')[0]), (200, 'text/html'))
        self.assertIn(b'Send to Claude', body)
        self.assertEqual(self.relay.get('/board/board.js')[0], 200)
        self.assertEqual(self.relay.get('/board/vendor/html-to-image.js')[0], 200)
        designs = json.loads(self.relay.get('/api/designs')[2])
        self.assertIn('breathing', [d['name'] for d in designs])
        self.assertTrue(all(re.fullmatch(r'[0-9a-f]{10}', d['version']) for d in designs))
        self.assertEqual(self.relay.get('/designs/breathing/')[0], 200)

    def test_nothing_outside_the_board_and_designs_is_served(self):
        for path in ['/designs/../../package.json', '/board/../server.mjs', '/designs/%2e%2e/%2e%2e/package.json', '/package.json']:
            self.assertEqual(self.relay.get(path)[0], 404, path)

    def test_a_send_becomes_a_packet_and_is_reported(self):
        mark = {'n': 1, 'color': '#e5484d', 'closed': True, 'box': {'x': 1, 'y': 2, 'width': 3, 'height': 4},
                'touches': [], 'encloses': [{'selector': '#breath-circle', 'id': 'breath-circle'}], 'points': [[1, 2], [3, 4]]}
        status, out = self.relay.post('/api/send', {'design': 'breathing', 'note': 'bigger', 'marks': [mark],
                                                    'snapshot': PNG, 'strokesImage': PNG, 'viewport': {'width': 800, 'height': 600}})
        self.assertEqual(status, 200, out)
        event = self.relay.wait_for('packet')
        self.assertEqual((event['id'], event['design'], event['marks'], event['note']), (out['id'], 'breathing', 1, 'bigger'))
        folder = Path(event['dir'])
        packet = json.loads((folder / 'packet.json').read_text())
        self.assertEqual(packet['marks'][0]['encloses'][0]['id'], 'breath-circle')
        self.assertEqual(packet['files']['snapshot'], 'snapshot.png')
        self.assertTrue((folder / 'snapshot.png').read_bytes().startswith(b'\x89PNG'))
        self.assertEqual((folder / 'before/index.html').read_bytes(), (DESIGNS / 'breathing/index.html').read_bytes())
        status, again = self.relay.post('/api/send', {'design': 'breathing', 'marks': []})
        self.assertEqual(int(again['id']), int(out['id']) + 1)

    def test_a_send_to_an_unknown_design_is_refused(self):
        for design in ['nope', '../designs', '']:
            status, out = self.relay.post('/api/send', {'design': design})
            self.assertEqual(status, 400, design)
        self.assertEqual(list((self.relay.root / 'sketches').iterdir()), [])

    def test_an_edited_design_is_announced(self):
        before = json.loads(self.relay.get('/api/designs')[2])[0]['version']
        page = self.relay.root / 'designs/breathing/index.html'
        page.write_text(page.read_text().replace('Paced breathing', 'Paced breathing, edited'))
        event = self.relay.wait_for('design')
        self.assertEqual(event['name'], 'breathing')
        self.assertNotEqual(event['version'], before)

    def test_live_marks_are_passed_on(self):
        self.relay.post('/api/live', {'design': 'breathing', 'strokes': [{'color': '#e5484d', 'points': [[1, 2], [3, 4]]}]})
        event = self.relay.wait_for('live')
        self.assertEqual(event['strokes'][0]['points'], [[1, 2], [3, 4]])


# Draws a loop around the breathing circle with the mouse at desktop and phone size, adds a note and sends.
BROWSER = r"""
const {chromium} = require('playwright');
const [base, exe] = process.argv.slice(1);
(async () => {
  const b = await chromium.launch({executablePath: exe, args: ['--no-sandbox']});
  const out = {errors: [], runs: []};
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    const p = await b.newPage({viewport: {width: w, height: h}});
    p.on('pageerror', e => out.errors.push(`${w}: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') out.errors.push(`${w}: ${m.text()}`); });
    await p.goto(base + '/?design=breathing');
    await p.waitForFunction(() => document.getElementById('frame').contentDocument?.getElementById('breath-circle'));
    await p.waitForTimeout(200);
    const box = await p.frameLocator('#frame').locator('#breath-circle').boundingBox();
    const cx = box.x + box.width / 2, cy = box.y + box.height / 2, r = box.width * 0.75;
    await p.mouse.move(cx + r, cy); await p.mouse.down();
    for (let a = 0; a <= 2 * Math.PI + 0.2; a += 0.15) await p.mouse.move(cx + r * Math.cos(a), cy + r * Math.sin(a));
    await p.mouse.up();
    await p.fill('#note', 'bigger');
    await p.click('#send');
    await p.waitForFunction(() => /^Sketch \d+ sent/.test(document.getElementById('status').textContent), null, {timeout: 20000});
    const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    out.runs.push({width: w, overflow: over, status: await p.textContent('#status')});
    await p.close();
  }
  await b.close();
  console.log(JSON.stringify(out));
})().catch(e => { console.log(JSON.stringify({fatal: String(e)})); process.exit(1); });
"""


class BoardTest(unittest.TestCase):
    def test_draw_and_send_in_a_browser(self):
        exe = chrome()
        if not exe:
            self.skipTest('No Chrome or Chromium found (set CHROME_PATH)')
        relay = Relay()
        try:
            result = subprocess.run(['node', '-e', BROWSER, relay.url, exe], cwd=ROOT, capture_output=True, text=True, timeout=180)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            out = json.loads(result.stdout.strip().splitlines()[-1])
            self.assertEqual(out['errors'], [])
            self.assertEqual([r['overflow'] for r in out['runs']], [0, 0], 'the board scrolls sideways')
            packets = sorted((relay.root / 'sketches').iterdir())
            self.assertEqual(len(packets), 2)
            for folder in packets:
                packet = json.loads((folder / 'packet.json').read_text())
                self.assertIsNone(packet['snapshotError'])
                self.assertEqual(packet['note'], 'bigger')
                mark = packet['marks'][0]
                self.assertTrue(mark['closed'], mark)
                self.assertIn('breath-circle', [e['id'] for e in mark['encloses']])
                self.assertGreater((folder / 'snapshot.png').stat().st_size, 10_000, 'the snapshot shows the design')
        finally:
            relay.close()


class ModTest(unittest.TestCase):
    def claude(self, *args):
        if not shutil.which('claude'):
            self.skipTest('The claude command is not installed')
        return subprocess.run(['claude', 'plugin', *args], cwd=ROOT, capture_output=True, text=True, timeout=300)

    def test_the_mod_and_marketplace_validate(self):
        result = self.claude('validate', 'sketchpad')
        self.assertIn('session.start', result.stdout + result.stderr)
        self.assertNotIn('Validation failed', result.stdout + result.stderr)
        self.assertNotIn('No digest', result.stdout + result.stderr)

    def test_the_mods_own_tests_pass(self):
        result = self.claude('test', 'sketchpad')
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn(' 0 fail', result.stdout + result.stderr)


class DesignTest(unittest.TestCase):
    def test_designs_are_self_contained_and_labelled(self):
        designs = [d for d in DESIGNS.iterdir() if d.is_dir()]
        self.assertTrue(designs)
        for d in designs:
            html = (d / 'index.html').read_text()
            self.assertRegex(html, r'<title>[^<]+</title>', d.name)
            self.assertNotRegex(html, r'(src|href)\s*=\s*["\']https?://', f'{d.name} loads from the network')
            self.assertIn('AI draft', html, f'{d.name} has no visible AI draft label')


if __name__ == '__main__':
    unittest.main()
