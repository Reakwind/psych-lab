// The sketchpad mod: starts the relay for the session, shows the marks beside the chat as they are drawn,
// and hands each Send to Claude as a prompt of its own.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { DesignChange, Live, Relay, SentSketch } from '../types'

const PANE = 'sketchpad'
const TITLE = 'Sketchpad'

const relay = atom({ plugin: 'sketchpad', key: 'relay' } as const, { state: 'off' } as Relay, { shape: 'relay-1' })
const live = atom({ plugin: 'sketchpad', key: 'live' } as const, null as Live | null, { shape: 'live-1' })
const sent = atom({ plugin: 'sketchpad', key: 'sent' } as const, [] as SentSketch[], { shape: 'sent-1' })
const changed = atom({ plugin: 'sketchpad', key: 'changed' } as const, null as DesignChange | null, { shape: 'changed-1' })

// The relay runs while this copy of the module does; reloading the module ends it.
let isRunning = false
let cwd = ''

type RelayEvent =
  | { type: 'ready'; url: string; lan?: string[] }
  | { type: 'live'; design: string; device?: string | null; viewport?: Live['viewport']; strokes?: Live['strokes'] }
  | { type: 'packet'; id: string; design: string; dir: string; marks: number; note?: string }
  | { type: 'design'; name: string; version: string }
  | { type: 'error'; message: string }

/** The prompt that hands one Send to Claude. */
export function packetPrompt(e: { id: string; design: string; dir: string; marks: number; note?: string }): string {
  const marks = `${e.marks} mark${e.marks === 1 ? '' : 's'}`
  const note = e.note ? `, with the note "${e.note}"` : ''
  return (
    `Sketch ${e.id} arrived from the sketchpad board: ${marks} on the design "${e.design}"${note}. ` +
    `Use the sketchpad skill: read ${e.dir}/packet.json, look at ${e.dir}/snapshot.png, ` +
    `then change studio/designs/${e.design}/ straight away and say briefly what you changed for each mark.`
  )
}

/** The marks as an SVG of the board's visible area, for the pane. */
export function liveSvg(l: Live): string {
  const vp = l.viewport ?? { width: 800, height: 600, scrollX: 0, scrollY: 0 }
  const w = Math.max(1, vp.width)
  const h = Math.max(1, vp.height)
  const lines = l.strokes
    .filter(s => s.points.length > 0)
    .map(s => {
      const pts = s.points.map(([x, y]) => `${Math.round(x - vp.scrollX)},${Math.round(y - vp.scrollY)}`).join(' ')
      const color = /^#[0-9a-fA-F]{3,8}$/.test(s.color) ? s.color : '#e5484d'
      return s.points.length === 1
        ? `<circle cx="${pts.split(',')[0]}" cy="${pts.split(',')[1]}" r="4" fill="${color}"/>`
        : `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
    })
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="12" fill="#f4f4f6" stroke="#d9d9de" stroke-width="2"/>` +
    lines.join('') + `</svg>`
  // The pane takes at most 131072 characters of markup: keep the newest strokes when there are many.
  while (svg.length > 120000 && lines.length > 1) {
    lines.shift()
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
      `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="12" fill="#f4f4f6" stroke="#d9d9de" stroke-width="2"/>` +
      lines.join('') + `</svg>`
  }
  return svg
}

const clock = (at: number) => new Date(at).toTimeString().slice(0, 5)

// Node may not be on the desktop app's PATH (a Homebrew install, say): ask a login shell, then try the usual places.
async function findNode($: EngineInterface): Promise<string> {
  try {
    const found = await $.process.run(['/bin/sh', '-lc', 'command -v node'])
    const path = found.stdout.trim().split('\n').pop()
    if (found.exitCode === 0 && path) return path
  } catch { /* no shell: try the usual places */ }
  for (const candidate of ['/opt/homebrew/bin/node', '/usr/local/bin/node', '/usr/bin/node']) {
    const there = await $.fs.stat(candidate).then(() => true, () => false)
    if (there) return candidate
  }
  return 'node'
}

function startRelay($: EngineInterface): void {
  if (isRunning) return
  isRunning = true
  void (async () => {
    await update($, relay, (): Relay => ({ state: 'starting' }))
    let lastError = ''
    try {
      const node = await findNode($)
      const proc = $.process.spawn({
        argv: [node, `${$.plugin.root}/relay/server.mjs`, '--root', `${cwd}/studio`],
        cwd,
      })
      let buffer = ''
      for await (const piece of proc) {
        if (piece.stream === 'stderr') { lastError = piece.text.trim().split('\n').pop() || lastError; continue }
        buffer += piece.text
        let nl = buffer.indexOf('\n')
        while (nl >= 0) {
          const line = buffer.slice(0, nl)
          buffer = buffer.slice(nl + 1)
          nl = buffer.indexOf('\n')
          if (!line.startsWith('SKETCHPAD ')) continue
          let event: RelayEvent
          try { event = JSON.parse(line.slice('SKETCHPAD '.length)) as RelayEvent } catch { continue }
          await handle($, event)
        }
      }
    } catch (err) {
      lastError = String((err as Error)?.message ?? err)
    }
    isRunning = false
    await update($, relay, (): Relay => ({ state: 'stopped', message: lastError || 'The relay stopped.' }))
  })()
}

async function handle($: EngineInterface, event: RelayEvent): Promise<void> {
  if (event.type === 'ready') {
    await update($, relay, (): Relay => ({ state: 'running', url: event.url, lan: event.lan ?? [] }))
  } else if (event.type === 'live') {
    await update($, live, () => ({
      design: event.design, device: event.device ?? null, viewport: event.viewport ?? null,
      strokes: event.strokes ?? [], at: Date.now(),
    }))
  } else if (event.type === 'packet') {
    const one: SentSketch = { id: event.id, design: event.design, marks: event.marks, note: event.note ?? '', at: Date.now() }
    await update($, sent, list => [...list, one].slice(-20))
    await update($, live, () => null)
    void $.prompt.submit({ text: packetPrompt(event) })
  } else if (event.type === 'design') {
    await update($, changed, () => ({ name: event.name, version: event.version, at: Date.now() }))
  } else if (event.type === 'error') {
    await update($, relay, r => ({ ...r, message: event.message }))
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    cwd = e.cwd
    await $.command.register({ name: 'sketchpad', description: 'Open the sketchpad: draw on a design and send it to Claude' })
    const started = await next(e)
    // Start on its own in a project that has designs; elsewhere /sketchpad starts it.
    const hasStudio = await $.fs.stat(`${cwd}/studio/designs`).then(() => true, () => false)
    if (hasStudio) {
      startRelay($)
      void $.ui.open({ id: PANE, title: TITLE })
    }
    return started
  })

  on('command.run', { command: 'sketchpad' }, async $ => {
    if (!cwd) cwd = await $.session.cwd()
    startRelay($)
    await $.ui.open({ id: PANE, title: TITLE, focus: true })
    const r = await read($, relay)
    return { text: r.url ? `Sketchpad board: ${r.url}` : 'Starting the sketchpad; the board address appears in its pane.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const els = $.ui.resolve(e)
    const { Box, Text, Button, Link } = els
    const Svg = 'Svg' in els ? els.Svg : undefined
    const r = await read($, relay)
    const l = await read($, live)
    const list = await read($, sent)
    const c = await read($, changed)

    return (
      <Box flexDirection="column" gap={1}>
        {r.state === 'running' && r.url && (
          <Box flexDirection="column">
            <Text>Draw on the board, then press Send to Claude:</Text>
            <Link href={r.url} label={r.url} />
            {(r.lan ?? []).map(u => <Text dimColor>iPad: {u}</Text>)}
          </Box>
        )}
        {r.state === 'starting' && <Text dimColor>Starting the board…</Text>}
        {(r.state === 'off' || r.state === 'stopped') && (
          <Box flexDirection="column">
            <Text>{r.state === 'stopped' ? `The board stopped: ${r.message ?? ''}` : 'The board is not running.'}</Text>
            <Button onPress={() => startRelay($)}>Start the board</Button>
          </Box>
        )}

        {l && l.strokes.length > 0 ? (
          <Box flexDirection="column">
            <Text bold>Drawing on {l.design}{l.device ? ` (${l.device})` : ''}</Text>
            {Svg ? <Svg source={liveSvg(l)} alt={`${l.strokes.length} marks being drawn on ${l.design}`} /> :
              <Text>{l.strokes.length} marks so far</Text>}
          </Box>
        ) : (
          r.state === 'running' && <Text dimColor>Your marks appear here while you draw.</Text>
        )}

        {c && <Text dimColor>{c.name} changed at {clock(c.at)}</Text>}

        {list.length > 0 && (
          <Box flexDirection="column">
            <Text bold>Sent to Claude</Text>
            {list.slice(-5).reverse().map(s => (
              <Text dimColor>
                {s.id} · {s.design} · {s.marks} mark{s.marks === 1 ? '' : 's'}{s.note ? ` · “${s.note.slice(0, 40)}”` : ''} · {clock(s.at)}
              </Text>
            ))}
          </Box>
        )}
      </Box>
    )
  })
}
