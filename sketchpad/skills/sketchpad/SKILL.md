---
name: sketchpad
description: Read a sketch the owner drew on a design in the sketchpad board and change the design straight away. Use when a prompt says a sketch arrived from the sketchpad, names a studio/sketches/<id>/ folder, or the owner asks for a new design to draw on, or asks how to open the board.
---

# Sketchpad: turning marks into changes

The owner directs designs by drawing on them instead of describing them. Each Send on the board saves a **sketch packet** and the sketchpad mod hands it to you. Your job: understand the marks and change the design, straight away.

## The folders

- `studio/designs/<name>/index.html`: the designs, one folder each, plain HTML, CSS and JavaScript with no build step and no network. The board shows them and reloads one whenever its files change, so saving your edit is what shows the owner the result.
- `studio/sketches/<id>/`: one folder per Send (not committed to Git):
  - `packet.json`: the design and its version, the owner's `note`, the board's `viewport`, and `marks`, numbered from 1.
  - `snapshot.png`: the whole design page as the owner saw it, with the marks drawn on it and numbered. **Always look at it** (open it with the Read tool).
  - `strokes.png`: the marks alone, numbered.
  - `before/`: the design's files as they were when the owner drew. Compare against it; never edit it.

Each mark in `packet.json` has:

- `n`: its number on the images; `color`; `pointer` (`mouse`, `pen` or `touch`).
- `box`, `start`, `end` and `points`: where it is, in the design page's coordinates (CSS pixels from the page's top left).
- `closed`: true for a loop (a circle around something).
- `touches`: the elements the line passes over, with `selector`, `id`, `text` and `box`.
- `encloses`: for a loop, the elements inside it.

## How to read the marks

Marks are rough and quick. Read them as a designer reads a colleague's markup:

| Mark | Usually means |
| --- | --- |
| A loop around something | "This one": the change in the note or the next mark applies to it; on its own, make it stand out more or rethink it |
| A line or arrow from A to B | Move A to B, or "A goes with B" |
| A cross or a strike-through | Remove it |
| A shape drawn on empty space | Add something there, shaped like that (a box is a card or button, a line is a divider, a circle is an icon or image) |
| Handwriting | Read it from the snapshot: a label to put there, or an instruction |
| Several marks in one colour | One idea; a different colour is a different idea |

The `note` is the owner's own words and outranks your reading of a mark. Use `touches` and `encloses` to know exactly which element a mark is on; use the snapshot for everything the coordinates do not say (shape, handwriting, intent).

## What to do

1. Read `packet.json` and look at `snapshot.png`. Read the design's current `index.html`.
2. **Just build it** (the owner's decision): make the change in `studio/designs/<design>/` without asking first. Where a mark is ambiguous, take the most plausible reading and say which you took.
3. Keep every element the owner might point at addressable: give meaningful `id`s (`breath-circle`, `start-button`) to anything new, so the next marks land on a named element.
4. Reply briefly, one line per mark: `1 (loop around the circle, "bigger"): the circle is now 220 px.` Then stop: the board has already reloaded, and the owner will draw again.
5. If the change cannot be made (it needs content that does not exist, for example), say so in one line and make the rest.

## New designs

When the owner asks for something new to draw on, create `studio/designs/<short-name>/index.html`: a self-contained page with its title in `<title>`, ids on the meaningful elements, no external requests. It appears in the board's design list straight away.

## Content rules (this repository)

- Program content from Remepy's sources (scripts, activity text, titles, narration) is quoted exactly, with its source ID, as AGENTS.md requires.
- Text you write yourself for a design is a draft: keep the design's visible "AI draft" label, and add one to any new design that carries program-like text.
- Commit design changes as the repository's agreement says (`python3 scripts/agents.py commit`). Sketch packets stay local.

## The board

The mod starts the board when a session opens in this project and shows its address in the **Sketchpad** pane beside the chat (or run `/sketchpad`). Open that address (`http://127.0.0.1:63690/` unless that port was busy) in the desktop app's preview panel or in a browser. If the owner asks how to use it: pick a design, draw in **Draw** mode (**Use** mode clicks and scrolls the design), add a note if words help, and press **Send to Claude**.
