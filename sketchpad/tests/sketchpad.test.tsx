import { expect, test } from 'claude-code/testing'

import { liveSvg, packetPrompt } from '../hooks/register'

// The test runtime has timers; the mod's typings name no DOM or Node globals.
declare const setTimeout: (run: () => void, ms: number) => unknown

const PANE = {
  plugin: 'sketchpad',
  component: 'Pane',
  requestId: 'sketchpad',
  props: {
    title: 'Sketchpad',
    isFocused: false,
    bodyColumns: 48,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

const line = (event: object) => 'SKETCHPAD ' + JSON.stringify(event) + '\n'

test('the prompt points Claude at the packet and the design', () => {
  const text = packetPrompt({ id: '0003', design: 'breathing', dir: '/p/studio/sketches/0003', marks: 2, note: 'bigger' })
  expect(text).toContain('/p/studio/sketches/0003/packet.json')
  expect(text).toContain('/p/studio/sketches/0003/snapshot.png')
  expect(text).toContain('studio/designs/breathing/')
  expect(text).toContain('2 marks')
  expect(text).toContain('"bigger"')
})

test('the live marks are drawn relative to what the board shows', () => {
  const svg = liveSvg({
    design: 'breathing', device: 'Mac · mouse', at: 0,
    viewport: { width: 400, height: 300, scrollX: 0, scrollY: 100 },
    strokes: [{ color: '#e5484d', points: [[10, 110], [50, 150]] }, { color: 'javascript:x', points: [[5, 105]] }],
  })
  expect(svg).toContain('viewBox="0 0 400 300"')
  expect(svg).toContain('points="10,10 50,50"')
  expect(svg).not.toContain('javascript')
})

test('a project with designs starts the board, shows marks, and hands a Send to Claude', async ($, on) => {
  const submitted: string[] = []
  on('command.register', () => ({ value: { command: 'sketchpad' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('fs.stat', () => ({ value: { kind: 'dir', size: 0, mtimeMs: 0, isLink: false } }))
  on('process.run', () => ({ value: { exitCode: 0, stdout: '/usr/local/bin/node\n', stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }))
  on('process.spawn', async function* () {
    yield { stream: 'stdout' as const, text: line({ type: 'ready', url: 'http://127.0.0.1:63690/', lan: [] }) }
    yield { stream: 'stdout' as const, text: line({ type: 'live', design: 'breathing', device: 'Mac · mouse',
      viewport: { width: 800, height: 600, scrollX: 0, scrollY: 0 }, strokes: [{ color: '#e5484d', points: [[1, 2], [30, 40]] }] }) }
    // A line split across two pieces still arrives whole.
    const packet = line({ type: 'packet', id: '0001', design: 'breathing', dir: '/p/studio/sketches/0001', marks: 1, note: 'bigger' })
    yield { stream: 'stdout' as const, text: packet.slice(0, 20) }
    yield { stream: 'stdout' as const, text: packet.slice(20) }
    return { value: { code: 0, signal: null } }
  })
  on('prompt.submit', (_, e) => { submitted.push(e.text); return { text: e.text } })
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/p', surface: 'desktop', isInteractive: true })
  // The relay runs in the background: let it read its output.
  for (let i = 0; i < 50 && submitted.length === 0; i++) await new Promise<void>(r => setTimeout(() => r(), 10))

  expect(submitted.length).toBe(1)
  expect(submitted[0]).toContain('Sketch 0001')
  expect(submitted[0]).toContain('/p/studio/sketches/0001/packet.json')

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /Sent to Claude/ }))?.text).toBe('Sent to Claude')
    expect((await ui.find({ type: 'Text', text: /0001 · breathing/ }))?.text).toContain('1 mark')
    await ui.unmount()
  }
})

test('without a running board the pane offers to start it', async $ => {
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /not running/ }))?.text).toBe('The board is not running.')
    await ui.unmount()
  }
})
