# Session 46 storyboard: a moment of gratitude — Ruth's crowded day, one warm moment lifted out of it, given attention, and put back.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S46.dc.html')
assert len(times) == 12
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
GREY = '#8996A5'

def tok(x, y, r=12, glow=False, dim=False):
    g = f'<circle cx="{x}" cy="{y}" r="{r * 1.9}" fill="{SPARK}" opacity=".35"></circle>' if glow else ''
    return g + f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFE2A8" stroke="{INK}" stroke-width="1.5" opacity="{0.45 if dim else 1}"></circle><circle cx="{x}" cy="{y}" r="{r * .5:.0f}" fill="{AMBER}" opacity="{0.45 if dim else 1}"></circle>'

def gb(x, y, glyph=''):
    return block(x, y, 34, 24, GREY) + glyph

def bar(y=70, items=''):
    return (f'<line x1="300" y1="{y}" x2="42" y2="{y}" stroke="{INK}" stroke-width="2"></line><circle cx="310" cy="{y}" r="9" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>'
            f'<path d="M32 {y - 8} a9 9 0 1 0 0 16 a7 7 0 1 1 0 -16Z" fill="#8E9AB0" stroke="{INK}" stroke-width="1.5"></path>' + items)

def attn(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".16"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 6"></circle>'

def badge(x, y, inner, r=30):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFF1CC" stroke="{INK}" stroke-width="2"></circle>' + inner

def qbub(x, y):
    return f'<circle cx="{x}" cy="{y}" r="13" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle><text x="{x}" y="{y + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="{INK}">?</text>'

def star(x, y, k=1.0):
    pts = ' '.join(f'{x + (30 if i % 2 == 0 else 12) * k * math.cos(math.pi / 2 + i * math.pi / 5):.1f},{y - (30 if i % 2 == 0 else 12) * k * math.sin(math.pi / 2 + i * math.pi / 5):.1f}' for i in range(10))
    return f'<polygon points="{pts}" fill="{SPARK}" stroke="{INK}" stroke-width="2"></polygon>'

DAY = bar(70, gb(260, 70) + gb(200, 70) + tok(150, 70, 8, dim=True) + gb(100, 70) + gb(60, 70))
ROOM = room() + chair()
def heart_s(x, y):
    return f'<path d="M{x} {y + 6} C{x - 11} {y - 1} {x - 6} {y - 10} {x} {y - 4} C{x + 6} {y - 10} {x + 11} {y - 1} {x} {y + 6}Z" fill="#E66A7A"></path>'

S = {}
S[1] = ROOM + ruth(150) + bar(70, gb(260, 70) + gb(171, 70) + gb(82, 70)) + lbl(260, 106, 'תוכניות', size=10) + lbl(171, 106, 'משימות', size=10) + lbl(82, 106, 'עניינים', size=10) + lbl(171, 30, 'מפגש 46 · רגע של הכרת תודה', fill='#E3F4F0', size=12)
S[2] = ROOM + ruth(150, mood='flat') + DAY + lbl(171, 110, 'קל לפספס את מה שאנחנו מעריכים', fill='#FFF1CC', size=11) + attn(150, 70, 18)
S[3] = ROOM + ruth(150, mood='happy') + bar(70, gb(260, 70) + gb(200, 70) + gb(100, 70) + gb(60, 70)) + tok(200, 160, 16, glow=True) + attn(200, 160, 30) + lbl(171, 300, 'רגע של הכרת תודה', fill='#FFF1CC')
S[4] = (ROOM + ruth(150, mood='happy') + badge(270, 110, head(270, 112, 12, 'happy')) + badge(171, 90, head(162, 92, 10, 'happy') + head(182, 92, 10, 'calm')) + badge(72, 110, head(64, 112, 10, 'calm') + heart_s(84, 104))
        + lbl(270, 156, 'אדם שיקר לנו', size=10) + lbl(171, 136, 'מישהו שתמך בנו', size=10) + lbl(72, 156, 'להיות שם בשביל אדם אחר', size=9))
S[5] = (ROOM + ruth(150, mood='happy') + badge(240, 100, f'<path d="M232 112 l6 -22 l8 22 M228 96 h20" stroke="{INK}" stroke-width="3" fill="none"></path>') + badge(100, 100, f'<path d="M88 102 l8 8 l16 -18" stroke="#5BAA6A" stroke-width="4" fill="none"></path>')
         + lbl(240, 146, 'משהו שהגוף אפשר לנו', size=10) + lbl(100, 146, 'הלך יותר טוב משציפינו', size=10))
S[6] = (ROOM + ruth(150) + star(110, 100, 1.4) + cross(110, 100, 26) + tok(240, 150, 6, glow=True) + tok(280, 230, 5, glow=True) + tok(60, 250, 5, glow=True) + tok(200, 290, 5, glow=True)
        + lbl(110, 40, 'לא חייבת להיות משהו גדול', size=10) + lbl(240, 90, 'דברים ממש קטנים', fill='#FFF1CC', size=11))
S[7] = bighead(f'<circle cx="171" cy="150" r="20" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>') + lbl(171, 300, 'מחקרים מראים · רווחה נפשית', fill='#E3F4F0', size=12)
TRAIN = ROOM + ruth(150, mood='happy') + bar(70, gb(260, 70) + tok(200, 70, 10, glow=True) + gb(140, 70) + tok(80, 70, 10, glow=True)) + attn(200, 70, 20) + lbl(171, 120, 'שוב ושוב · מאמנים את היכולת לראות', fill='#FFF1CC', size=10)
S[8] = (ROOM + ruth(150) + DAY + lbl(171, 120, 'לא להתעלם ממה שקשה', size=11) + lbl(171, 150, 'הכול טוב', size=11) + strike(171, 150, 70)
        + tok(250, 220, 16, glow=True) + f'<path d="M244 206 l6 10 l-4 8" stroke="{INK}" stroke-width="1.5" fill="none"></path>' + lbl(250, 260, 'שמחה · שברירית · מורכבת', size=9))
S[9] = (ROOM + ruth(150) + bar(70, gb(260, 70) + gb(200, 70) + gb(100, 70)) + tok(150, 150, 16, glow=True) + qbub(110, 130) + qbub(190, 120) + qbub(150, 190)
         + lbl(171, 300, 'עוצרים · כמה שאלות · ממשיכים ביום', fill='#E3F4F0', size=10))
S[10] = ROOM + ruth(150, mood='happy') + phone_guide(270, 200) + thought(140, 196, 110, 120) + f'<circle cx="100" cy="100" r="36" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle>' + tok(100, 100, 14, glow=True) + lbl(171, 40, 'משהו אחד', fill='#FFF1CC')
S[11] = (P + f'<rect x="96" y="40" width="150" height="290" rx="20" fill="{INK}"></rect><rect x="106" y="56" width="130" height="254" rx="10" fill="#F4F1EA"></rect>' + tok(171, 110, 22, glow=True)
         + f'<rect x="118" y="160" width="106" height="70" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><text x="171" y="190" text-anchor="middle" font-size="22" font-weight="700" fill="{INK}">?</text><path d="M134 212 H208" stroke="{SLATE}" stroke-width="3" stroke-linecap="round"></path>'
         + f'<circle cx="200" cy="100" r="20" fill="#FFFFFF" fill-opacity=".3" stroke="{INK}" stroke-width="3"></circle><line x1="214" y1="114" x2="228" y2="128" stroke="{INK}" stroke-width="5" stroke-linecap="round"></line>' + lbl(171, 340, 'לחקור בסקרנות', fill='#FFF1CC', size=11))
S[12] = ROOM + ruth(150, mood='happy') + tok(190, 220, 14, glow=True) + bar(70, gb(260, 70) + tok(200, 70, 8) + gb(130, 70) + gb(70, 70)) + lbl(171, 130, 'רגע קטן של הכרת תודה', fill='#FFF1CC', size=11)

ACTS = [
  (1, 'Act 1 · A full day', [1, 2], 'Ruth\'s day bar fills with grey blocks: plans, tasks, things to take care of. Small warm moments slip by between them.'),
  (2, 'Act 2 · One moment', [3, 4, 5, 6], 'Stop, notice one, give thanks. A person, someone who supported us, being there for someone, what the body allowed, what went better than expected. Small things count.'),
  (3, 'Act 3 · Why it helps', [7, 8], 'Practice trains attention to see and enjoy what we value; it doesn\'t erase what is hard, and it can feel warm, fragile or mixed.'),
  (4, 'Act 4 · The practice', [9, 10, 11, 12], 'Stop with one thing, a few questions on the screen, then back to the day. Ariel invites Ruth to think of one thing.'),
]
SHOT = {
 1: ('Ruth in her armchair. Above her, her day as a bar (session 42), morning on the right. Grey blocks drop in on their words, each with a glyph: תוכניות (calendar) · משימות (checklist) · עניינים שצריך לדאוג להם (!).', 'Room, day bar and grey blocks (42).', 'Blocks drop onto the bar.'),
 2: ('The day scrolls by, crowded with grey blocks; small dim warm tokens slip past between them unseen: קל לפספס את מה שאנחנו מעריכים. On "נקדיש להם" the circle of attention appears and catches one.', 'Day bar, warm tokens (42–43), circle of attention (3a).', 'Bar scrolls; circle fades in.'),
 3: ('The day stops. The circle lifts one warm token out of the bar; it glows near Ruth and she smiles: נעצור לרגע · רגע של הכרת תודה.', 'Circle, warm token.', 'Token floats down to her.'),
 4: ('Three warm badges rise right to left on their words: a dear person · someone who supported us (a hand on a shoulder) · Ruth being there for someone (a heart). Tags in Ariel\'s words.', 'Friends (5), badges (43).', 'Each badge pops on its word.'),
 5: ('Two more badges: Ruth walking (משהו שהגוף אפשר לנו לעשות) and a sunny day card with a tick (משהו שהלך היום קצת יותר טוב משציפינו).', 'Day card (3a), walking Ruth.', 'Badges pop.'),
 6: ('A big shining star rises and fades: לא חייבת להיות משהו גדול. The circle of attention drifts through the room and tiny warm sparks light up: דברים ממש קטנים.', 'Circle of attention, warm tokens.', 'Star shrinks; sparks light.'),
 7: ('Into the head (session 2\'s cutaway): the bulb glows warmer: מחקרים מראים · רווחה נפשית. Then back to the day bar: again and again the circle catches warm tokens, faster each time: שוב ושוב · מאמנים את היכולת · לראות אותם ולהנות מהם.', 'Head cutaway (2, 7), day bar and circle.', 'Dip into the head, then out.'),
 8: ('The grey blocks stay on the day: לא להתעלם ממה שקשה; a tag "הכול טוב" is struck through. A warm token by Ruth glows (שמחה וחמימות), then shows a fine crack and a grey half (שברירית · מורכבת).', 'Struck tag (4), warm token.', 'Crack draws in.'),
 9: ('The bar stops; one warm token lifts; three question bubbles orbit it (no words); it goes back and the day moves on: עוצרים · כמה שאלות קצרות · ממשיכים ביום.', 'Day bar, warm token.', 'Token out, orbit, back.'),
 10: ('Ariel on Ruth\'s phone invites her; she closes her eyes; a memory bubble above her fills with a warm glow during the pause: משהו אחד.', 'Ariel on the phone (3), memory bubble (43).', 'Glow grows through the silence.'),
 11: ('Ruth\'s phone large: the warm token at the top, a question card below (a "?" and lines, the real questions are the app\'s); a magnifier moves over it: השאלות שיופיעו על המסך · לחקור בסקרנות.', 'Big phone (4), magnifier (43).', 'Phone slides up.'),
 12: ('Back in the chair: the warm token rests by Ruth\'s heart, the day bar quiet above: רגע קטן של הכרת תודה.', 'Room, day bar.', 'Hold.'),
}
legend1 = ('0 40 342 80', P + DAY, '<strong>Ruth\'s day.</strong> The bar from sessions 42–43: grey demands, warm moments in between.')
legend2 = ('0 0 342 360', ROOM + ruth(150, mood='happy') + tok(200, 160, 16, glow=True) + attn(200, 160, 30), '<strong>One warm moment.</strong> Lifted out by the circle of attention, held for a while, then put back.')
legend3 = ('0 0 342 360', TRAIN, '<strong>A trained eye.</strong> Again and again, the circle catches what we value as it passes.')
carried = ['<strong>Kept:</strong> Ruth\'s room, the day bar with grey blocks and warm tokens (42–43), the circle of attention (3a), the head cutaway (2), Ariel on the phone (3), the big phone (4), friends (5).',
           '<strong>Examples</strong> are exactly the ones Ariel names; the on-screen questions are not in the script, so the phone shows a "?" card without words.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S46Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 46 · רגע של הכרת תודה',
      'A day full of demands makes it easy to miss what we value. Gratitude is a short pause: notice one thing, give it attention with a few questions, then go back to the day. Practised again and again, it trains us to see and enjoy those things, without pretending the hard parts are gone.',
      'A day crowded with grey blocks → warm moments slip by → the circle catches one, the day pauses → many kinds of things to be grateful for, small ones too → the head: practice trains attention → the hard blocks stay; gratitude can feel warm or fragile → stop, ask, continue → one thing, on the phone.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
f = B + 'S46Story.dc.html'; page = open(f, encoding='utf-8').read(); open(f, 'w', encoding='utf-8').write(page.replace('"height":4700', '"height":3700'))
