// Review notes, one per page, kept in this browser (owner decision 2026-11-06). Export downloads every
// page's notes as JSON to hand on; notes do not travel between browsers or devices by themselves.
(function () {
  'use strict';
  const KEY = 'psych-lab-site-notes-v1';
  const page = location.pathname.replace(/index\.html$/, '') || '/';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
  const save = (all) => { try { localStorage.setItem(KEY, JSON.stringify(all)); return true; } catch (e) { return false; } };

  const button = document.querySelector('[data-notes-toggle]');
  const panel = document.getElementById('notes');
  if (!button || !panel) return;
  const area = panel.querySelector('textarea');
  const status = panel.querySelector('[data-notes-status]');
  const count = () => {
    const all = load(), n = Object.values(all).filter((x) => x && x.text && x.text.trim()).length;
    button.textContent = n ? `Notes (${n})` : 'Notes';
    const mine = all[page];
    status.textContent = mine && mine.text ? 'Saved in this browser ' + new Date(mine.updated).toLocaleString() : 'Not saved yet. Notes stay in this browser.';
  };
  area.value = (load()[page] || {}).text || '';
  count();

  let timer = null, dirty = false;
  const flush = () => {
    clearTimeout(timer);
    if (!dirty) return;
    dirty = false;
    const all = load();
    if (area.value.trim()) all[page] = { title: document.title, text: area.value, updated: new Date().toISOString() };
    else delete all[page];
    if (!save(all)) status.textContent = 'This browser refused to save the note.';
    else count();
  };
  area.addEventListener('input', () => { dirty = true; clearTimeout(timer); timer = setTimeout(flush, 300); });
  // Leaving the page, the box or exporting saves at once, so the last words are never lost.
  area.addEventListener('blur', flush);
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });

  const open = (yes) => {
    panel.hidden = !yes;
    button.setAttribute('aria-expanded', String(yes));
    if (yes) area.focus();
  };
  button.addEventListener('click', () => open(panel.hidden));
  panel.querySelector('[data-notes-close]').addEventListener('click', () => { open(false); button.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { open(false); button.focus(); } });

  // On claude.ai a page cannot start a download itself; it asks the viewer through the downloads capability,
  // looked up at load so the click does not wait. Where that is not offered, the browser downloads the file,
  // and the JSON is also shown to copy, in case the download is blocked.
  const downloads = window.claude && typeof window.claude.use === 'function'
    ? window.claude.use('downloads').catch(() => null) : Promise.resolve(null);
  const copyBox = panel.querySelector('[data-notes-json]');
  panel.querySelector('[data-notes-export]').addEventListener('click', async () => {
    flush();
    const text = JSON.stringify({ exported: new Date().toISOString(), site: 'Psych Lab', notes: load() }, null, 2);
    const filename = 'psych-lab-notes-' + new Date().toISOString().slice(0, 10) + '.json';
    const ready = await Promise.race([downloads, new Promise((r) => setTimeout(() => r(undefined), 50))]);
    if (ready) {
      try { await ready.save({ filename, data: text }); status.textContent = 'Notes exported.'; return; }
      catch (e) { if (e && e.code === 'declined') { status.textContent = 'Export cancelled.'; return; } }
    } else if (ready === null || !window.claude) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    }
    copyBox.hidden = false;
    copyBox.querySelector('textarea').value = text;
    status.textContent = 'If no file was saved, copy the notes below.';
  });
  panel.querySelector('[data-notes-copy]').addEventListener('click', () => {
    const box = copyBox.querySelector('textarea');
    const done = () => { status.textContent = 'Copied.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(box.value).then(done, () => { box.select(); });
    else box.select();
  });
})();
