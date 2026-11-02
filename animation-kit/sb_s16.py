# Session 16 storyboard: the struggle switch — a light switch on the wall of Ruth's room clicks on when she starts fighting what she feels;
# with it on, a stack of extra weight (frustration, anger, more worries) piles up beside her and drains her battery. It can't simply be switched off,
# but she can notice the click, speak to herself kindly, and turn it down a little: a dimmer, five percent, a moment to breathe.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S16.dc.html')
assert len(times) == 22
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
RED = '#D9534F'

def switch(x, y, on=False, s=1.0, dim=None):
    """The struggle switch: a wall plate with a rocker; on = rocker up and a red light. dim = a dimmer dial instead (0..1 of the way down)."""
    w, h = 34 * s, 54 * s
    o = f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="{6 * s}" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
    if dim is not None:
        import math
        a = math.radians(-120 + 240 * (1 - dim))
        o += (f'<circle cx="{x}" cy="{y}" r="{12 * s}" fill="#EEF0F2" stroke="{INK}" stroke-width="2"></circle>'
              f'<line x1="{x}" y1="{y}" x2="{x + 10 * s * math.sin(a):.1f}" y2="{y - 10 * s * math.cos(a):.1f}" stroke="{RED}" stroke-width="3" stroke-linecap="round"></line>')
        return o
    ry = y - 10 * s if on else y + 10 * s
    o += f'<rect x="{x - 9 * s}" y="{y - 18 * s}" width="{18 * s}" height="{36 * s}" rx="{4 * s}" fill="#EEF0F2" stroke="{INK}" stroke-width="1.5"></rect>'
    o += f'<rect x="{x - 9 * s}" y="{ry - 8 * s}" width="{18 * s}" height="{16 * s}" rx="{4 * s}" fill="{RED if on else SLATE}"></rect>'
    if on:
        o += f'<circle cx="{x}" cy="{y - h / 2 - 12 * s}" r="{6 * s}" fill="{RED}"></circle><circle cx="{x}" cy="{y - h / 2 - 12 * s}" r="{12 * s}" fill="{RED}" opacity=".25"></circle>'
    return o

def slab(x, y, text, kind='grey', w=None):
    fill = {'grey': '#B7BEC6', 'red': '#E9A3A0', 'card': '#D7DCE2'}[kind]
    w = w or len(text) * 7 + 26
    return (f'<rect x="{x - w / 2:.0f}" y="{y - 13}" width="{w:.0f}" height="26" rx="6" fill="{fill}" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-size="11" font-weight="600" fill="{INK}" direction="rtl">{html.escape(text)}</text>')

def stack(x, items, y0=300):
    return ''.join(slab(x, y0 - k * 28, t, kd) for k, (t, kd) in enumerate(items))

def heart(x, y, r=14):
    return f'<path d="M{x} {y + r * .8} C{x - r * 1.3} {y} {x - r * .7} {y - r * 1.1} {x} {y - r * .4} C{x + r * .7} {y - r * 1.1} {x + r * 1.3} {y} {x} {y + r * .8}Z" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>'

def cal(x, y):
    return (f'<rect x="{x - 18}" y="{y - 16}" width="36" height="34" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><rect x="{x - 18}" y="{y - 16}" width="36" height="9" rx="3" fill="{AMBER}"></rect>'
            f'<path d="M{x} {y - 2} l3 6 l6 1 l-5 4 l2 6 l-6 -3 l-6 3 l2 -6 l-5 -4 l6 -1Z" fill="{SPARK}" stroke="{INK}" stroke-width="1"></path>')

def seat(mood='calm', x=90):
    return room() + chair().replace('M110', 'M70').replace('x="102"', 'x="62"') + ruth(x, mood=mood)

def wall_switch(on=False):
    return switch(230, 196, on, 0.8)

def push(x, y):
    return f'<path d="M{x} {y} l24 -6 M{x} {y + 8} l24 0" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>'

SW = [('קושי גופני', 'grey'), ('חרדה', 'grey')]
EX = [('תסכול', 'red'), ('כעס', 'red')]
S = {}
S[1] = seat('flat') + wall_switch() + f'<ellipse cx="200" cy="120" rx="40" ry="24" fill="#B7BEC6" stroke="{INK}" stroke-width="1.5"></ellipse>' + push(120, 210) + lbl(171, 30, 'המאבק רק מוסיף קושי', fill='#FFF1CC', size=12)
S[2] = P + switch(171, 170, False, 2.6) + ariel(290) + lbl(171, 40, 'מתג המאבק', fill='#E3F4F0') + lbl(171, 300, 'ACT', size=12)
S[3] = P + switch(110, 170, True, 2.0) + ruth(240, 'stand', 'flat') + push(200, 220) + lbl(171, 40, 'נדלק כשמתחילים להיאבק', fill='#FFF1CC', size=12)
S[4] = seat('flat') + wall_switch() + cal(300, 90) + battery(300, 250, 0.2, w=28, h=46, label=False) + tremor(110, 250) + lbl(171, 30, 'אירוע חשוב', fill='#E3F4F0') + lbl(160, 70, 'עייפים · חסרי אנרגיה · סימפטומים', size=9)
S[5] = seat('flat') + wall_switch() + thought_card(220, 90, 'מה אם זה יחמיר?', w=130) + thought_card(210, 140, 'איך אצליח לעבור את היום?', w=170) + lbl(70, 40, 'חרדה', size=12)
S[6] = seat('flat') + wall_switch() + lbl(230, 90, 'תסכול', fill='#F6D3D1', size=13) + lbl(270, 130, 'כעס', fill='#F6D3D1', size=13) + f'<path d="M66 200 l6 -8 l6 8 M100 200 l6 -8 l6 8" stroke="{RED}" stroke-width="2" fill="none"></path>' + lbl(171, 30, 'הגוף לא משתף פעולה', size=11)
S[7] = P + f'<rect width="342" height="360" fill="#F6D3D1" opacity=".35"></rect>' + switch(171, 170, True, 3.2) + lbl(171, 330, 'קליק', fill='#FFFFFF', size=16)
S[8] = seat('flat') + wall_switch(True) + f'<rect x="0" y="0" width="342" height="360" fill="{RED}" opacity=".06"></rect>' + lbl(171, 30, 'מתג המאבק נדלק', fill='#F6D3D1')
S[9] = seat('flat') + wall_switch(True) + stack(290, SW + EX, 300) + lbl(171, 30, 'נוספו גם התסכול והכעס', size=11)
S[10] = seat('flat') + wall_switch(True) + stack(290, SW + EX, 300) + thought_card(150, 70, 'מה אם לא אסתדר בכוחות עצמי?', w=190) + thought_card(140, 110, 'מה אם ירחמו עלי?', w=120) + thought_card(170, 150, 'אני לא רוצה להיות מעמסה על כולם', w=210)
S[11] = seat('flat') + wall_switch(True) + stack(290, SW + EX + [('מחשבות', 'card'), ('עוד מתח', 'grey')], 300) + battery(40, 90, 0.12, w=26, h=42, label=False) + lbl(150, 40, 'יותר מקום · יותר מאמץ ואנרגיה', size=10)
S[12] = land() + stones(PATH) + ruth(110, 'stand') + block(176, 266, 46, 26) + arrow(196, 266, 240, 266, '#5BAA6A') + lbl(171, 40, 'בעיה שאפשר לפתור', fill='#E3F4F0') + lbl(171, 80, 'המאמץ יכול לעזור', size=11)
S[13] = P + ruth(100, 'stand', 'flat') + push(140, 200) + f'<ellipse cx="240" cy="190" rx="70" ry="54" fill="#B7BEC6" stroke="{INK}" stroke-width="2"></ellipse>' + lbl(171, 40, 'מנסים בכוח שייעלם', size=12) + lbl(240, 300, 'קורה ההפך', fill='#FFF1CC', size=11)
S[14] = (P + stack(260, SW + EX + [('לחץ', 'grey'), ('פחד', 'grey'), ('עייפות', 'grey'), ('רעד', 'grey')], 320) + heart(80, 180, 12) + lbl(80, 220, 'מה שחשוב לנו', size=10)
         + battery(80, 300, 0.15, w=26, h=40, label=False) + lbl(171, 30, 'אי אפשר לפקוד', size=12))
S[15] = P + switch(110, 170, True, 2.2) + ''.join(f'<g transform="translate({x} 150) scale(.5)">{ruth(0, "stand")}</g>' + switch(x + 16, 220, True, 0.5) for x in (210, 260, 310)) + lbl(171, 40, 'מנגנון אנושי וטבעי', fill='#E3F4F0') + lbl(110, 300, 'שוב ושוב', size=11)
S[16] = seat() + wall_switch(True) + f'<circle cx="230" cy="190" r="40" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 5"></circle>' + lbl(171, 30, 'לזהות כשהמתג נדלק', fill='#E3F4F0')
S[17] = P + switch(110, 170, True, 2.4) + thought_card(240, 170, 'היה כאן קליק?', 'kind', w=150)
S[18] = seat() + wall_switch(True) + switch(270, 100, True, 0.6) + cross(270, 100, 18) + lbl(171, 30, 'לא חייבים מיד לעשות משהו', size=11) + lbl(200, 150, 'לא להיאבק גם במאבק', fill='#FFF1CC', size=10)
S[19] = (seat() + wall_switch(True) + f'<path d="M140 90 C120 90 116 70 132 64 C130 46 156 40 164 54 C172 40 198 46 196 64 C212 68 210 90 190 90Z" fill="#F1D9A6" stroke="{INK}" stroke-width="1.5"></path>'
         + thought_card(230, 140, 'זה הגיוני.', 'kind', w=90) + thought_card(250, 180, 'קשה לי', 'kind', w=70) + lbl(171, 30, 'ממקום מבין ורך', fill='#E3F4F0'))
S[20] = seat() + wall_switch(True) + thought_card(200, 90, 'מה אני צריך עכשיו?', 'kind', w=150) + thought_card(200, 140, 'מה יכול לעזור לי ברגע הזה?', 'kind', w=190)
S[21] = seat('happy') + switch(230, 196, False, 0.9, dim=0.05) + lbl(230, 150, '5%', fill='#FFF1CC', size=14) + heart(116, 250, 9) + lbl(171, 30, 'לכיוון של תמיכה בעצמנו', fill='#E3F4F0', size=11)
S[22] = seat('happy') + switch(230, 196, False, 0.9, dim=0.05) + stack(300, SW, 300) + f'<circle cx="90" cy="240" r="70" fill="{AMBER}" opacity=".15"></circle>' + lbl(171, 30, 'מעט מרחב · רגע לנשום', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · The switch', [1, 2, 3], 'Something unpleasant comes; fighting it only adds more. Ariel names the struggle switch: imagine a switch that clicks on when we start fighting what happens to us.'),
  (2, 'Act 2 · A hard morning', [4, 5, 6], 'An important day; Ruth wakes tired, low on energy, symptoms stronger. Anxious thoughts, then frustration and anger at her body.'),
  (3, 'Act 3 · Click', [7, 8], 'The switch flips on.'),
  (4, 'Act 4 · It piles up', [9, 10, 11], 'Now it\'s not just the physical difficulty and the anxiety: frustration, anger, more worries stack up beside her, take more room and drain her battery.'),
  (5, 'Act 5 · Effort that backfires', [12, 13, 14], 'Effort helps with a problem that can be solved; turned on what we feel inside, it can do the opposite and leave less for what matters.'),
  (6, 'Act 6 · Noticing the click', [15, 16, 17], 'No one can just switch it off; it happens to all of us, again and again. But we can learn to notice it: was there a click?'),
  (7, 'Act 7 · Softening it', [18, 19, 20, 21, 22], 'No rush, no fighting the fight: notice, speak kindly, ask what would help. Turn it down five percent, toward supporting ourselves, and a little room opens to breathe.'),
]
SHOT = {
 1: ('Ruth in her armchair; a grey cloud of something unpleasant drifts in; she pushes at it and it swells: המאבק רק מוסיף קושי. A light switch sits on the wall by the door, off.', 'Ruth\'s room.', 'Cloud grows as she pushes.'),
 2: ('Close on the wall switch; Ariel beside it presenting it: מתג המאבק · ACT.', 'Ariel from session 3; the switch is the new anchor.', 'Push in on the switch.'),
 3: ('A small demonstration: Ruth tenses and pushes → the switch flips on, red light; she lets go → it rests. נדלק כשמתחילים להיאבק.', 'Switch.', 'Switch flips on her push.'),
 4: ('Back in the room, morning: a calendar with a starred day (אירוע חשוב). Ruth slumps in her chair, battery low, tremor marks.', 'Battery from session 5, tremor marks from 3a, calendar from 3a.', 'Battery drains on עייפים.'),
 5: ('Two thought cards rise over her: מה אם זה יחמיר? · איך אצליח לעבור את היום?', 'Thought cards from session 4.', 'Cards rise on each question.'),
 6: ('Red tags תסכול and כעס flare; red tension marks at her shoulders; she frowns at her own hands: הגוף לא משתף פעולה.', 'Tension marks from session 14.', 'Tags flare.'),
 7: ('A big close-up of the switch: it snaps on with a flash and a shake. קליק.', 'Switch.', 'Hard snap, a beat of stillness.'),
 8: ('Back in the room: the switch\'s red light glows; a faint warm-red tint: מתג המאבק נדלק.', 'Switch, room.', 'Pull back out.'),
 9: ('A stack forms beside her: grey slabs קושי גופני, חרדה, then red slabs תסכול, כעס drop on top.', 'Effort blocks from session 2.', 'Slabs drop on their words.'),
 10: ('Three more thought cards: מה אם לא אסתדר בכוחות עצמי? · מה אם ירחמו עלי? · אני לא רוצה להיות מעמסה על כולם.', 'Thought cards.', 'Cards pop one by one.'),
 11: ('The stack grows slowly, then fast, crowding her; her battery drains: יותר מקום · יותר מאמץ ואנרגיה.', 'Stack, battery.', 'Stack climbs; battery falls.'),
 12: ('On her path: a block in the way; Ruth pushes it aside and the way is clear: בעיה שאפשר לפתור · המאמץ יכול לעזור.', 'The path from session 1; effort block.', 'Cut to the path; block slides off.'),
 13: ('Back to the cloud of feelings: she pushes at it hard and it swells instead: מנסים בכוח שייעלם · קורה ההפך.', 'The cloud from shot 1.1.', 'Cloud balloons.'),
 14: ('Stress, fear, frustration, tiredness, tremor as slabs: commanding them away doesn\'t work. The stack crowds out the heart (what matters, from session 9); the battery runs low.', 'Heart from session 9, battery.', 'Heart shrinks as the stack grows.'),
 15: ('Ruth reaches to switch it off; it springs back on. Small figures (Ruth, friends, Ariel) each with their own switch blinking on: מנגנון אנושי וטבעי · שוב ושוב.', 'Friends from session 5.', 'Switch flips back.'),
 16: ('In the room the circle of attention (session 3a) lands on the switch: Ruth notices it: לזהות כשהמתג נדלק.', 'Circle of attention.', 'Circle draws.'),
 17: ('A warm question card beside the switch: היה כאן קליק?', 'Cards.', 'Card turns over.'),
 18: ('Ruth sits back; a second switch trying to fight the first is crossed out: לא חייבים מיד לעשות משהו · לא להיאבק גם במאבק.', 'Switch.', 'Cross draws.'),
 19: ('Her inner voice warms (session 4): kind cards זה הגיוני · קשה לי · אני רוצה שהקושי הזה יעבור.', 'Inner voice from session 4.', 'Voice turns warm.'),
 20: ('Two questions appear: מה אני צריך עכשיו? · מה יכול לעזור לי ברגע הזה?', 'Cards.', 'Cards rise.'),
 21: ('The switch becomes a dimmer; Ruth turns it down a touch (5%); her pushing hand moves to her heart: לכיוון של תמיכה בעצמנו.', 'Switch → dimmer.', 'Plate morphs.'),
 22: ('The stack shrinks back to its first two slabs; space opens around her; a slow warm breath: מעט מרחב · רגע לנשום.', 'Stack, room.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', P + switch(110, 180, False, 2.4) + switch(240, 180, True, 2.4), '<strong>The struggle switch.</strong> A wall switch in Ruth\'s room: off, then on with a red light when she starts fighting what she feels.')
legend2 = ('0 0 342 360', P + stack(171, SW + EX + [('מחשבות', 'card')], 280), '<strong>The pile.</strong> Session 2\'s grey effort blocks, labelled with what Ariel names; red ones are what the switch adds.')
legend3 = ('0 0 342 360', P + switch(171, 180, False, 3, dim=0.05) + lbl(171, 300, '5%', fill='#FFF1CC'), '<strong>The dimmer.</strong> No off button, but it can be turned down a little.')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, the battery (session 5), thought cards and the warm inner voice (session 4), effort blocks (session 2), the path, the heart of what matters (session 9), the circle of attention, Ariel and friends.',
           '<strong>Only Ariel\'s words</strong> on screen: the event, the thoughts and feelings are his; Ruth\'s kind lines use his own wording.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses; the click lands on his "קליק".']
rows = build(B + 'S16Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 16 · מתג המאבק',
      'Fighting what we feel inside switches on a second layer of difficulty (frustration, anger, more worry) that takes room and energy. We can\'t simply switch it off, but we can notice the click, meet ourselves kindly, and soften the struggle a little.',
      'A switch on Ruth\'s wall → a hard morning: tired, anxious, angry at her body → click, it\'s on → a stack of extra weight piles up and drains her battery → effort clears a solvable problem but makes feelings swell → it can\'t be switched off, it happens to everyone → she notices the click, talks to herself kindly → turns it down five percent, and has room to breathe.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S16Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":5680'))
print('rows', rows)
