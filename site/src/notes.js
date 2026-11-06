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

  let timer = null;
  area.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const all = load();
      if (area.value.trim()) all[page] = { title: document.title, text: area.value, updated: new Date().toISOString() };
      else delete all[page];
      if (!save(all)) status.textContent = 'This browser refused to save the note.';
      else count();
    }, 300);
  });

  const open = (yes) => {
    panel.hidden = !yes;
    button.setAttribute('aria-expanded', String(yes));
    if (yes) area.focus();
  };
  button.addEventListener('click', () => open(panel.hidden));
  panel.querySelector('[data-notes-close]').addEventListener('click', () => { open(false); button.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { open(false); button.focus(); } });

  panel.querySelector('[data-notes-export]').addEventListener('click', () => {
    const all = load();
    const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), site: 'Psych Lab', notes: all }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'psych-lab-notes-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  });
})();
