// What the sketchpad mod keeps in its session state, read by the pane.

/** The relay the mod started: where the board is, or why it is not running. */
export type Relay = {
  state: 'off' | 'starting' | 'running' | 'stopped'
  url?: string
  lan?: string[]
  message?: string
}

/** The marks being drawn right now, as the board last reported them (page coordinates). */
export type Live = {
  design: string
  device: string | null
  viewport: { width: number; height: number; scrollX: number; scrollY: number } | null
  strokes: { color: string; points: [number, number][] }[]
  at: number
}

/** One Send, handed to Claude. */
export type SentSketch = {
  id: string
  design: string
  marks: number
  note: string
  at: number
}

/** The last time Claude's change to a design reached the board. */
export type DesignChange = { name: string; version: string; at: number }

declare module 'claude-code' {
  interface PluginState {
    sketchpad: {
      relay: Shaped<Relay>
      live: Shaped<Live | null>
      sent: Shaped<SentSketch[]>
      changed: Shaped<DesignChange | null>
    }
  }
}
