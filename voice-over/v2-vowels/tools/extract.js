// Pull script() data (who, scenes: t/rate/hold) out of every SXX.dc.html.
// Usage: node extract.js SCRIPTS_DIR > scenes.json
const fs = require('fs'), path = require('path');
const dir = process.argv[2], out = {};
for (const f of fs.readdirSync(dir).filter((f) => /^S\d.*\.dc\.html$/.test(f)).sort()) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = src.match(/  script\(\) \{\n    return (\{[\s\S]*?\n    \});\n  \}/);
  const S = Function('return ' + m[1])();
  out[f.replace('.dc.html', '')] = { who: S.who, session: S.session, title: S.title,
    scenes: S.scenes.map((s) => ({ t: s.t, rate: s.rate ?? null, hold: s.hold ?? 0 })) };
}
process.stdout.write(JSON.stringify(out, null, 1));
