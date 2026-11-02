# Session 73 storyboard: meaningful action — the things Ruth wants get pushed aside by a crowded day; she stops and asks what matters,
# her inner compass points the way, and the next step on her path can be very small. No grades; credit for effort and choice.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S73.dc.html')
assert len(times) == 12
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
WARM = '#E66A7A'

def icon(k, x, y, r=20, dim=False):
    """What matters, as the round badges of session 58: people, a hobby, taking part (helping hands), feeling more ourselves (the spark)."""
    c = ['#D6EBC8', '#A9C4FF', '#FFD7F3', '#FFF1CC'][k] if not dim else '#E3E6EA'
    g = [f'<path d="M-14 13 q0 -11 8 -11 q8 0 8 11Z" fill="{PLUM}" stroke="{INK}" stroke-width="1.2"></path><path d="M-2 13 q0 -11 8 -11 q8 0 8 11Z" fill="#4FA3A0" stroke="{INK}" stroke-width="1.2"></path><circle cx="-6" cy="-7" r="5" fill="{SKIN}" stroke="{INK}" stroke-width="1.2"></circle><circle cx="6" cy="-7" r="5" fill="{SKIN}" stroke="{INK}" stroke-width="1.2"></circle>',
         f'<path d="M-9 9 L6 -8" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path><circle cx="8" cy="-10" r="4" fill="{WARM}"></circle>',
         f'<path d="M-11 4 q11 10 22 0" fill="none" stroke="{INK}" stroke-width="2.5"></path><path d="M0 1 C-7 -4 -4 -11 0 -7 C4 -11 7 -4 0 1Z" fill="{WARM}"></path>',
         f'<path d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3Z" fill="{SPARK}" stroke="{INK}" stroke-width="1.2"></path>'][k]
    return f'<g transform="translate({x} {y}) scale({r / 20})" opacity="{0.45 if dim else 1}"><circle r="20" fill="{c}" stroke="{INK}" stroke-width="1.8"></circle>{g}</g>'

def blocks(y, n=7, x0=320, w=40, gap=4, dark=()):
    o, x = '', x0
    for k in range(n):
        o += block(x - w / 2, y, w, 28, '#6C7884' if k in dark else GREYS[k % 4]); x -= w + gap
    return o

def compass(x, y, r=34, a=0, glow=False):
    """Ruth's inner compass: the compass token of session 2's reward pan, grown into an anchor. a = needle angle (0 = up)."""
    g = f'<circle cx="{x}" cy="{y}" r="{r * 1.5}" fill="{SPARK}" opacity=".3"></circle>' if glow else ''
    return (g + f'<circle cx="{x}" cy="{y}" r="{r}" fill="#B7D3C6" stroke="{INK}" stroke-width="2.5"></circle><circle cx="{x}" cy="{y}" r="{r * .78}" fill="#FBFAF7" stroke="{INK}" stroke-width="1"></circle>'
            f'<g transform="rotate({a} {x} {y})"><path d="M{x} {y - r * .7} L{x + r * .16} {y} L{x - r * .16} {y}Z" fill="{AMBER}" stroke="{INK}" stroke-width="1.2"></path><path d="M{x} {y + r * .7} L{x + r * .16} {y} L{x - r * .16} {y}Z" fill="#9AA3AD" stroke="{INK}" stroke-width="1.2"></path></g><circle cx="{x}" cy="{y}" r="3" fill="{INK}"></circle>')

def path_scene(lit=(), small=False):
    o = land(sun=True) + stones(PATH, lit=lit)
    if small: o += f'<ellipse cx="200" cy="330" rx="12" ry="5" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></ellipse>'
    return o

def back(x, y=0):
    """Ruth from behind, small, on her path."""
    return (f'<g transform="translate(0 {y})"><path d="M{x - 13} 300 L{x - 13} 262 Q{x - 13} 252 {x} 252 Q{x + 13} 252 {x + 13} 262 L{x + 13} 300Z" fill="{PLUM}" stroke="{INK}" stroke-width="1.5"></path>'
            f'<rect x="{x - 10}" y="258" width="20" height="26" rx="6" fill="{PACK}" stroke="{INK}" stroke-width="1.2"></rect><path d="M{x - 5} 300 v16 M{x + 5} 300 v16" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>'
            f'<circle cx="{x}" cy="240" r="11" fill="#C8CCD2" stroke="{INK}" stroke-width="1.5"></circle></g>')

def card(x, y):
    return (f'<rect x="{x - 50}" y="{y - 40}" width="100" height="80" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><rect x="{x - 50}" y="{y - 40}" width="100" height="14" rx="6" fill="#D7DCE2"></rect>'
            + ''.join(f'<line x1="{x - 36}" y1="{y - 12 + k * 16}" x2="{x + 18}" y2="{y - 12 + k * 16}" stroke="{SLATE}" stroke-width="3"></line><path d="M{x + 28} {y - 18 + k * 16} l10 10 M{x + 38} {y - 18 + k * 16} l-10 10" stroke="#C0392B" stroke-width="2.5"></path>' for k in range(3)))

def star(x, y, r=12):
    pts = ' '.join(f'{x + (r if i % 2 == 0 else r * .45) * math.sin(i * math.pi / 5):.1f},{y - (r if i % 2 == 0 else r * .45) * math.cos(i * math.pi / 5):.1f}' for i in range(10))
    return f'<polygon points="{pts}" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></polygon>'

S = {}
S[1] = room() + chair() + ruth(150, mood='happy') + icon(0, 270, 90) + icon(1, 171, 70) + icon(2, 72, 90) + lbl(270, 128, 'לפגוש מישהו', size=10) + lbl(171, 108, 'לחזור לתחביב', size=10) + lbl(72, 128, 'לקחת חלק', size=10) + lbl(171, 24, 'מפגש 73 · מבוא לפעולה משמעותית', fill='#E3F4F0', size=11)
S[2] = room() + chair() + ruth(150, mood='flat') + blocks(70, n=7) + icon(0, 250, 120, 14) + icon(1, 171, 120, 14) + icon(2, 92, 120, 14) + lbl(171, 160, 'קשה לפנות לו מקום', size=11)
S[3] = room() + chair() + ruth(150, mood='flat') + blocks(70, n=8, x0=336, w=36, dark=(2, 5)) + icon(0, 24, 120, 11, True) + icon(1, 24, 150, 11, True) + icon(2, 24, 180, 11, True) + lbl(250, 110, 'עומס', size=10) + lbl(150, 110, 'התמודדות', size=10) + lbl(90, 220, 'נדחקים הצידה', size=10)
S[4] = room() + chair() + ruth(150).replace('r="4" fill="none"', 'r="0.1" fill="none"') + compass(171, 100, 34) + icon(3, 150, 170, 12) + lbl(80, 40, 'מה חשוב לי?', fill='#FFF1CC', size=12) + lbl(262, 40, 'מה יגרום לי להרגיש יותר אני?', size=9)
S[5] = room() + chair() + ruth(150, mood='happy') + compass(171, 110, 34, 0, True) + icon(0, 240, 110, 14) + icon(1, 171, 50, 14) + icon(2, 102, 110, 14) + card(290, 240) + strike(290, 240, 110) + lbl(171, 170, 'קודם כול, להיזכר', fill='#FFF1CC', size=11)
S[6] = path_scene(lit=(1, 2)) + back(171, 30) + compass(290, 70, 26) + lbl(120, 290, 'מה אפשרי עכשיו', size=10) + lbl(120, 250, 'הצעד הבא', size=10)
S[7] = path_scene(small=True) + back(140, 30) + compass(290, 70, 26, 200, True) + f'<path d="M280 90 Q250 220 205 325" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 5" fill="none"></path>' + lbl(171, 40, 'המצפן הפנימי', fill='#FFF1CC', size=12)
S[8] = path_scene(lit=(0,), small=True) + back(171, 30) + card(260, 110) + strike(260, 110, 110) + star(90, 120) + star(120, 90) + lbl(105, 160, 'על המאמץ · על הבחירה', size=10) + lbl(171, 30, 'גם צעדים קטנים נחשבים', fill='#FFF1CC', size=11)
S[9] = room(door_open=True) + ruth(140, 'stand', 'happy') + friend(230) + lbl(110, 60, 'להרגיש טוב יותר', fill='#FFF1CC', size=11) + lbl(240, 100, 'לתפקד טוב יותר', size=11)
S[10] = land() + back(90, 30) + back(171, 30).replace(PLUM, '#7FB7A8') + back(252, 30).replace(PLUM, '#B07AA1') + compass(90, 190, 18, -30) + compass(171, 190, 18, 10) + compass(252, 190, 18, 40) + lbl(171, 40, 'כל אחד בוחר בחיים שלו', fill='#FFF1CC', size=11)
S[11] = room() + chair() + ruth(150).replace('r="4" fill="none"', 'r="0.1" fill="none"') + bubble(90, 110, '', w=56, tail=False) + icon(0, 90, 110, 14) + bubble(250, 90, '', w=56, tail=False) + icon(1, 250, 90, 14) + lbl(171, 30, 'להיזכר בדברים שעושים לנו טוב', size=10)
S[12] = (room() + chair() + ruth(80, mood='happy') + compass(240, 150, 60, 30, True) + icon(0, 240, 66, 13) + icon(1, 324, 150, 13) + icon(2, 240, 234, 13) + icon(3, 156, 150, 13)
         + lbl(171, 330, 'מה הכי מתאים לכם היום?', fill='#FFF1CC', size=12))

ACTS = [
  (1, 'Act 1 · No room for it', [1, 2, 3], 'Things Ruth wants to do pop up around her as warm badges. Then her day fills with grey blocks, heavier with Parkinson\'s, and the badges get pushed to the edge and fade.'),
  (2, 'Act 2 · What matters to me?', [4, 5], 'She stops and asks. Her inner compass appears; its needle steadies and the badges come back around it. Not a full plan, not doing more: first, remember what matters.'),
  (3, 'Act 3 · The next step', [6, 7, 8], 'Out on her path, a stone lights for what is possible now, then the next one. Sometimes it is a tiny stone, as long as the compass points to it. No report card; stars for effort and choice; small steps count.'),
  (4, 'Act 4 · Each chooses their own way', [9, 10, 11, 12], 'A friend at the door; Ruth feels and functions better. Three people, three compasses, three directions. Memories of good things rise. The compass and her phone: which direction today?'),
]
SHOT = {
 1: ('Ruth in her armchair. Three warm badges pop up right to left on Nira\'s words: לפגוש מישהו (two friends) · לחזור לתחביב שאוהבים (a brush) · לקחת חלק במשהו שחשוב (helping hands with a heart). Title: מפגש 73 · מבוא לפעולה משמעותית.', 'Ruth\'s room; the "what matters" badges of session 58.', 'Badges pop on each phrase.'),
 2: ('A strip of grey task blocks slides in across the top, edge to edge; the badges have no gap to drop into: קשה לפנות לו מקום.', 'The day strip of session 58.', 'Blocks slide in and close up.'),
 3: ('More blocks crowd in, two darker ones tagged עומס and התמודדות; the badges are squeezed to the left edge, shrink and grey: נדחקים הצידה. Ruth\'s face falls.', 'Day strip, badges.', 'Badges pushed aside.'),
 4: ('The strip freezes. Ruth closes her eyes; a compass rises above her and its needle swings, then settles. Tags: מה חשוב לי? · מה יכול לגרום לי להרגיש יותר אני? (her spark glows on her chest).', 'The compass token from session 2; the spark (session 2).', 'Needle swings and settles.'),
 5: ('A long checklist (תוכנית שלמה) and a tower of extra blocks (לעשות יותר) appear and are struck through. The badges return around the compass, warm again: קודם כול, להיזכר במה שחשוב.', 'Struck tags (session 4).', 'Strikes draw; badges return.'),
 6: ('Ruth\'s path of stones, Ruth seen from behind at its foot, the compass glowing in the sky. One stone lights (מה אפשרי עכשיו), then the next (הצעד הבא).', 'The path of stepping stones (session 1).', 'Cut outdoors; stones light.'),
 7: ('A tiny stone appears close to her feet and lights; a dashed line runs from the compass needle to it: לפעמים הצעד ממש קטן · מחובר למצפן הפנימי.', 'Compass, stones.', 'Needle turns; she steps on.'),
 8: ('A report card with red crosses floats in and is struck through (לא לחלק ציונים). Ruth glows warm (נדיבים כלפי עצמנו); two stars pop (על המאמץ · על הבחירה); the small stones behind her shine: גם צעדים קטנים נחשבים.', 'The report card from session 25.', 'Card struck; stars pop.'),
 9: ('Back home: the door opens, a friend comes in, Ruth stands and walks over smiling: להרגיש טוב יותר · לתפקד טוב יותר.', 'The friend (session 5), the room\'s door.', 'Door opens.'),
 10: ('On the path, Ruth and two friends side by side, each with a small compass; the needles point different ways and a different stone lights for each: כל אחד בוחר · לפי מה שחשוב לו · מה שאפשרי עכשיו.', 'Friends; compasses; stones.', 'Needles turn apart.'),
 11: ('Ruth in her armchair, eyes closed; memory bubbles rise, each showing a badge that turns from grey to warm: להיזכר בדברים שעושים לנו טוב · דברים שמזמן לא חשבנו עליהם.', 'Thought balloon (session 10); badges.', 'Bubbles float up.'),
 12: ('The compass, big, with the badges at its points; the needle swings and settles. Her phone rises with the options: מה הכי מתאים לכם היום?', 'Compass; phone choices (sessions 64, 66).', 'Phone rises; hold.'),
}
legend1 = ('0 0 342 200', P + compass(171, 100, 60, 30, True), '<strong>The inner compass.</strong> Session 2\'s compass token, now Ruth\'s own: it points to what matters to her.')
legend2 = ('0 40 342 120', P + icon(0, 80, 100) + icon(1, 140, 100) + icon(2, 200, 100) + icon(3, 260, 100), '<strong>What matters.</strong> The badges of session 58: people, a hobby, taking part, feeling more herself.')
legend3 = ('0 200 342 160', P + stones(PATH, lit=(0, 1)), '<strong>The path.</strong> Session 1\'s stepping stones: the next step, sometimes a tiny one.')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, the day strip and badges (58), the compass token (2), the path (1), the report card (25), the friends (5).',
           '<strong>Content:</strong> every tag is Nira\'s words; the three things she names are the three badges.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S73Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 73 · מבוא לפעולה משמעותית',
      'Things that matter to us get pushed aside, all the more with Parkinson\'s. Stopping to ask what matters, our inner compass, points to a next step that is possible now, however small. We give ourselves credit for the effort and the choice, not grades, and each of us chooses our own direction.',
      'Warm badges of what Ruth wants → a crowded grey day pushes them aside → she stops, asks, and her compass appears → no big plan; she remembers → on her path, a possible step, sometimes tiny, on the compass line → no report card, stars for effort and choice → a friend at the door → three compasses, three ways → good memories → which direction today?',
      [legend1, legend2, legend3], carried, 'How it fits the program')
H = 3680
p = B + 'S73Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))
print('rows', rows)
