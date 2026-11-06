// A small renderer for the subset of the Design canvas component format that the Lab's own boards use
// (canvas/phone-markup.html, flow-markup.html, app-markup.html with phone-logic.js and app-logic.js), so the
// website runs those exact files without the canvas runtime, React or a CDN.
//
// Template:  {{a.b}} holes in text and attributes; <sc-if value="{{x}}">; <sc-for list="{{xs}}" as="x">;
//            onEvent="{{fn}}" handlers; ref="{{fn}}" callback refs; hint-* attributes are ignored.
// Logic:     class Component extends DCLogic { renderVals() { ... } } with this.state, setState(patch, cb),
//            componentDidMount, componentDidUpdate and componentWillUnmount. setState merges at once and
//            redraws on the next microtask, as the canvas runtime does.
//
// Redraws reuse DOM nodes by their place in the template (and loop index), so a playing <video> or <audio>
// is never recreated or moved while its screen stays up.
(function () {
  'use strict';
  const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const SVG = 'http://www.w3.org/2000/svg';
  const HTML = 'http://www.w3.org/1999/xhtml';
  const decoder = document.createElement('textarea');
  const decode = (s) => (s.indexOf('&') < 0 ? s : ((decoder.innerHTML = s), decoder.value));

  // ---- parsing: the template text is read as written, never through the browser's HTML parser, which would
  // move a <p> or <div> out of an enclosing <p> and change the structure the logic was written for.
  function holes(s) {
    const out = [];
    const re = /\{\{\s*([^}]*?)\s*\}\}/g;
    let last = 0, m;
    while ((m = re.exec(s))) {
      if (m.index > last) out.push(decode(s.slice(last, m.index)));
      out.push({ path: m[1].split('.') });
      last = re.lastIndex;
    }
    if (last < s.length) out.push(decode(s.slice(last)));
    return out;
  }

  function parse(src) {
    const root = { t: 'el', tag: '#root', attrs: [], kids: [] };
    const stack = [root];
    const token = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)|(<)/g;
    const attr = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let m;
    while ((m = token.exec(src))) {
      const top = stack[stack.length - 1];
      if (m[1]) {                       // closing tag: close up to the matching element
        const tag = m[1].toLowerCase();
        for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag.toLowerCase() === tag) { stack.length = i; break; }
      } else if (m[2]) {                // opening tag
        const tag = m[2].toLowerCase();
        const ns = tag === 'svg' ? SVG : top.ns === SVG && top.tag.toLowerCase() !== 'foreignobject' ? SVG : HTML;
        const node = { t: 'el', tag: ns === SVG ? m[2] : tag, ns, attrs: [], kids: [] };
        let a;
        attr.lastIndex = 0;
        while ((a = attr.exec(m[3] || ''))) {
          const value = a[2] ?? a[3] ?? a[4];
          node.attrs.push([a[1], value === undefined ? [''] : holes(value)]);
        }
        top.kids.push(node);
        if (!m[4] && !(ns === HTML && VOID.has(tag))) stack.push(node);
      } else if (m[5] || m[6]) {        // text (a stray '<' is text too)
        top.kids.push({ t: 'text', parts: holes(m[5] || m[6]) });
      }
    }
    return root;
  }

  // ---- building the next view from the template and the values renderVals() returned
  function resolve(path, scope) {
    let v = scope;
    for (const k of path) { if (v == null) return undefined; v = v[k]; }
    return v;
  }
  const textOf = (v) => (v == null || v === false || v === true ? '' : String(v));
  const joined = (parts, scope) => parts.map((p) => (typeof p === 'string' ? p : textOf(resolve(p.path, scope)))).join('');
  const single = (parts, scope) => (parts.length === 1 && typeof parts[0] !== 'string' ? resolve(parts[0].path, scope) : joined(parts, scope));
  const attrOf = (node, name) => { for (const [n, parts] of node.attrs) if (n === name) return parts; return null; };

  function build(node, scope, key, out) {
    if (node.t === 'text') { out.push({ t: 'text', key, text: joined(node.parts, scope) }); return; }
    if (node.tag === 'sc-if') {
      const parts = attrOf(node, 'value');
      if (parts && single(parts, scope)) node.kids.forEach((k, i) => build(k, scope, key + '.' + i, out));
      return;
    }
    if (node.tag === 'sc-for') {
      const parts = attrOf(node, 'list'), as = (attrOf(node, 'as') || ['item']).join('');
      const list = parts ? single(parts, scope) : null;
      (Array.isArray(list) ? list : []).forEach((item, j) => {
        const inner = Object.create(scope);
        inner[as] = item;
        node.kids.forEach((k, i) => build(k, inner, key + '[' + j + '].' + i, out));
      });
      return;
    }
    const v = { t: 'el', key, tag: node.tag, ns: node.ns, attrs: {}, events: {}, ref: null, kids: [] };
    for (const [name, parts] of node.attrs) {
      if (name.startsWith('hint-')) continue;
      if (name === 'ref') v.ref = single(parts, scope);
      else if (/^on[A-Z]/.test(name)) v.events[name.slice(2).toLowerCase()] = single(parts, scope);
      else v.attrs[name] = single(parts, scope);
    }
    node.kids.forEach((k, i) => build(k, scope, key + '.' + i, v.kids));
    out.push(v);
  }

  // ---- applying it to the page
  function setAttr(el, name, val) {
    if (name === 'value' && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT' || el.tagName === 'SELECT')) {
      const s = val == null ? '' : String(val);
      if (el.value !== s) el.value = s;
      return;
    }
    if (val == null || (val === false && !/^(aria|data)-/.test(name))) {
      if (el.hasAttribute(name)) el.removeAttribute(name);
      return;
    }
    const s = val === true && !/^(aria|data)-/.test(name) ? '' : String(val);
    if (el.getAttribute(name) !== s) el.setAttribute(name, s);
  }

  function create(v) {
    if (v.t === 'text') { const n = document.createTextNode(''); n.__k = v.key; return n; }
    const el = document.createElementNS(v.ns, v.tag);
    el.__k = v.key; el.__tag = v.tag; el.__a = new Set(); el.__h = {}; el.__l = new Set(); el.__new = true;
    return el;
  }

  function update(n, v) {
    if (v.t === 'text') { if (n.data !== v.text) n.data = v.text; return; }
    for (const name of n.__a) if (!(name in v.attrs)) n.removeAttribute(name);
    n.__a = new Set(Object.keys(v.attrs));
    for (const name in v.attrs) setAttr(n, name, v.attrs[name]);
    n.__h = v.events;
    for (const name in v.events) {
      if (n.__l.has(name)) continue;
      n.__l.add(name);
      n.addEventListener(name, (e) => { const h = n.__h[name]; if (typeof h === 'function') h(e); });
    }
    patchKids(n, v.kids);
    n.__ref = typeof v.ref === 'function' ? v.ref : null;
    if (n.__new) { n.__new = false; if (n.__ref) n.__ref(n); }
  }

  function unmount(n) {
    if (n.nodeType !== 1) return;
    for (const c of n.childNodes) unmount(c);
    if (n.__ref) { try { n.__ref(null); } catch (e) { console.error(e); } }
  }

  const same = (n, v) => (v.t === 'text' ? n.nodeType === 3 : n.nodeType === 1 && n.__tag === v.tag);

  function patchKids(parent, vkids) {
    const wanted = new Map(vkids.map((v) => [v.key, v]));
    const old = new Map();
    // Drop what the new view no longer has before placing anything, so kept nodes never need to move.
    for (const c of Array.from(parent.childNodes)) {
      const v = c.__k != null ? wanted.get(c.__k) : null;
      if (v && same(c, v) && !old.has(c.__k)) old.set(c.__k, c);
      else { unmount(c); parent.removeChild(c); }
    }
    let at = parent.firstChild;
    for (const v of vkids) {
      let n = old.get(v.key);
      if (!n) n = create(v);
      if (n !== at) parent.insertBefore(n, at);
      else at = at.nextSibling;
      update(n, v);
    }
  }

  // ---- the component host
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch, cb) {
      const u = typeof patch === 'function' ? patch(this.state, this.props) : patch;
      this.state = Object.assign({}, this.state, u || {});
      if (this.__host) this.__host.schedule(cb);
      else if (typeof cb === 'function') cb();
    }
    forceUpdate(cb) { if (this.__host) this.__host.schedule(cb); }
    renderVals() { return {}; }
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
  }

  function mount(container, markup, Logic, props) {
    const tree = parse(markup);
    const logic = new Logic(props || {});
    let pending = false, mounted = false, callbacks = [];
    const render = () => {
      let vals;
      try { vals = Object.assign({}, logic.props, logic.renderVals() || {}); }
      catch (e) { console.error(e); container.setAttribute('data-error', String(e && e.message || e)); return; }
      const out = [];
      tree.kids.forEach((k, i) => build(k, vals, String(i), out));
      patchKids(container, out);
      container.removeAttribute('data-error');
    };
    const flush = () => {
      pending = false;
      render();
      if (mounted) { try { logic.componentDidUpdate(logic.props); } catch (e) { console.error(e); } }
      const cbs = callbacks; callbacks = [];
      cbs.forEach((f) => { try { f(); } catch (e) { console.error(e); } });
    };
    logic.__host = { schedule(cb) { if (typeof cb === 'function') callbacks.push(cb); if (!pending) { pending = true; queueMicrotask(flush); } } };
    render();
    mounted = true;
    try { logic.componentDidMount(); } catch (e) { console.error(e); }
    // No unmount on pagehide: a page restored from the back/forward cache resumes with its timers and
    // listeners intact, and a page that is discarded takes them with it.
    return logic;
  }

  window.DCLogic = DCLogic;
  window.DCLite = { mount, parse };
})();
