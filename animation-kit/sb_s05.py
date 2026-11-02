# Session 5 storyboard: energy as a battery — notice it, pace with it, be flexible with it.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S05.dc.html')
assert len(times) == 19
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def nira_phone(x, y):
    return (f'<rect x="{x}" y="{y}" width="40" height="64" rx="7" fill="{INK}"></rect><rect x="{x + 4}" y="{y + 6}" width="32" height="50" rx="4" fill="#FFE9C2"></rect>'
            f'<circle cx="{x + 20}" cy="{y + 26}" r="8" fill="{SKIN}"></circle><path d="M{x + 11} {y + 26} C{x + 9} {y + 12} {x + 31} {y + 12} {x + 29} {y + 26}Z" fill="#5A3A2E"></path><path d="M{x + 10} {y + 52} v-12 q10 -8 20 0 v12Z" fill="{NIRA}"></path>')

def win(night=False):
    return (f'<rect x="18" y="150" width="64" height="56" rx="4" fill="{"#3F4A63" if night else "#FFF1C4"}" stroke="{INK}" stroke-width="2"></rect>'
            + (f'<path d="M58 164 a10 10 0 1 0 0 20 a7 7 0 1 1 0 -20Z" fill="#E9E4C8"></path>' if night else f'<circle cx="50" cy="178" r="10" fill="{SPARK}"></circle>'))

def task(x, y, text, w=None, fill='#FFFFFF'):
    return lbl(x, y, text, fill=fill, size=11)

S = {}
S[1] = (room() + win() + chair() + ruth(160, mood='flat') + battery(250, 190, 0.7) + lbl(171, 40, 'מפגש 5 · ניהול אנרגיה', fill='#E3F4F0') + lbl(250, 248, 'בוקר', size=11)
        + bubble(110, 110, 'ומחר?', w=70))
S[2] = room() + chair() + ruth(150) + nira_phone(168, 232) + bubble(86, 100, 'מה?', w=56) + bubble(171, 74, 'איך?', w=56) + bubble(256, 100, 'מתי?', w=60)
S[3] = (P + day_line(250, pills=()) + lbl(258, 120, 'ערניים · יציבים', size=11) + lbl(120, 200, 'הכול דורש יותר', size=11) + lbl(171, 40, 'האנרגיה משתנה', fill='#FFF1CC'))
S[4] = P + day_line(250, pills=(272, 186, 96)) + lbl(186, 300, 'זמני התרופות', fill='#FFF1CC')
S[5] = (room() + chair() + ruth(110) + f'<rect x="190" y="90" width="130" height="150" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
        + f'<path d="M210 120 a10 10 0 1 0 0 20 a7 7 0 1 1 0 -20Z" fill="#8E9AB0"></path><rect x="238" y="122" width="18" height="9" rx="4.5" fill="#E66A7A"></rect><circle cx="290" cy="128" r="12" fill="none" stroke="{INK}" stroke-width="2"></circle><path d="M290 120 v8 l5 4" stroke="{INK}" stroke-width="2" fill="none"></path>'
        + lbl(254, 170, 'שינה · תרופות · שעה', size=10) + lbl(254, 210, 'הדפוס שלי', fill='#FFF1CC', size=11))
S[6] = (room() + chair() + ruth(150) + battery(250, 170, 0.6) + arrow(300, 120, 300, 220, '#D9534F') + arrow(206, 220, 206, 120, '#5BAA6A')
        + lbl(300, 240, 'מרוקן', size=11) + lbl(196, 100, 'מטעין', size=11) + lbl(171, 40, 'האנרגיה כמו סוללה', fill='#FFF1CC'))
S[7] = (P + ''.join(battery(x, 170, l) + lbl(x, 250, d, size=11) for x, l, d in ((270, 0.8, 'יום א׳'), (171, 0.45, 'יום ב׳'), (72, 0.65, 'יום ג׳'))) + lbl(171, 40, 'כל בוקר אחוז אחר', fill='#E3F4F0'))
S[8] = (land() + ruth(171, 'stand') + battery(171, 90, 0.55, w=40, h=64) + friend(270) + friend(72, '#8DB7A2', '#6B4E3D')
        + arrow(250, 120, 205, 120, '#D9534F') + arrow(92, 120, 137, 120, '#5BAA6A') + lbl(171, 340, 'שונה מאדם לאדם', size=11))
S[9] = P + f'<circle cx="171" cy="180" r="70" fill="#FFFFFF" stroke="{INK}" stroke-width="3"></circle>' + battery(171, 180, 0.6, label=False) + lbl(171, 290, 'Pacing · ניהול קצב ואנרגיה', fill='#FFF1CC')
S[10] = room() + chair() + ruth(150) + battery(250, 170, 0.55) + bubble(110, 100, 'מה מצב הסוללה?', w=130) + lbl(171, 40, 'לבדוק מדי פעם', fill='#E3F4F0')
S[11] = (room() + ruth(140, 'stand', 'happy') + f'<path d="M210 318 h40 l-6 -40 h-28Z" fill="#C9805A" stroke="{INK}" stroke-width="2"></path><path d="M230 278 q-20 -40 0 -60 q20 20 0 60" fill="#6E9E58"></path>'
         + battery(80, 150, 0.85) + lbl(171, 40, 'יש אנרגיה? משימה גדולה', fill='#E3F4F0'))
S[12] = (room() + chair() + ruth(150) + mug(214, 260) + battery(80, 150, 0.25) + block(270, 120, 50, 40) + arrow(270, 146, 270, 170) + block(250, 190, 22, 18) + block(276, 190, 22, 18) + block(302, 190, 22, 18)
         + lbl(171, 40, 'סוללה נמוכה: להתאים', fill='#FFF1CC') + lbl(270, 230, 'לחלק', size=11) + lbl(80, 210, 'לא לרוקן', size=11))
S[13] = (room() + ruth(140, 'stand') + battery(80, 150, 0.8) + ''.join(block(250, 270 - k * 26, 70, 22) for k in range(6)) + bubble(170, 110, 'רגע…', w=60) + lbl(171, 40, 'קשובים לעצמכם', fill='#E3F4F0'))
S[14] = P + battery(171, 170, 1.0, w=70, h=120, label=False) + f'<line x1="130" y1="170" x2="212" y2="170" stroke="{INK}" stroke-width="2" stroke-dasharray="5 4"></line>' + lbl(260, 140, 'בשימוש', size=11) + lbl(260, 200, 'רזרבה', size=11) + lbl(171, 40, 'לא חייבים להשתמש בכולו', fill='#FFF1CC')
S[15] = (room() + chair() + ruth(110, mood='happy') + f'<path d="M230 120 l14 -28 l14 28 l30 4 l-22 20 l6 30 l-28 -14 l-28 14 l6 -30 l-22 -20Z" fill="{SPARK}" stroke="{INK}" stroke-width="2"></path>'
         + battery(60, 150, 0.1) + lbl(260, 220, 'מטרה חשובה', size=11) + lbl(171, 40, 'ואז לנוח קצת יותר', fill='#E3F4F0'))
S[16] = (land() + ruth(100, 'stand', 'flat') + battery(100, 100, 0.3, w=36, h=56) + friend(200, '#B8C3CE', '#6C7884') + friend(270, '#C9CED6', '#6C7884') + lbl(171, 40, 'זה יכול להרגיש לא הוגן', fill='#FFF1CC'))
S[17] = room() + chair() + ruth(150, mood='happy') + tool(250, 150, 3, 20) + battery(250, 150, 0.6, w=24, h=36, label=False) + lbl(171, 40, 'משהו שיכול לעזור', fill='#E3F4F0')
S[18] = P + day_line(250, pills=()) + ''.join(f'<circle cx="{x}" cy="250" r="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle>' + battery(x, 300, 0.6, w=20, h=30, label=False) for x in (230, 120)) + lbl(171, 40, 'לעצור פעם או פעמיים · רק לשים לב', fill='#FFF1CC')
S[19] = (room() + ruth(110, 'stand', 'happy') + battery(110, 100, 0.65, w=36, h=56) + f'<path d="M140 110 C190 90 220 120 240 150" stroke="{AMBER}" stroke-width="4" fill="none" stroke-dasharray="6 6"></path>'
         + tool(260, 170, 3, 20) + tool(300, 230, 4, 18) + lbl(171, 40, 'לדברים הכי חשובים', fill='#E3F4F0'))

ACTS = [
  (1, 'Act 1 · How is your energy?', [1, 2], 'Ruth\'s day starts with a battery level beside her; the question of what to do, how and when.'),
  (2, 'Act 2 · It changes', [3, 4, 5], 'The day line from session 3: energy rises and falls with the hours and the pills; Ruth already knows some of her own pattern.'),
  (3, 'Act 3 · The battery', [6, 7, 8], 'Some things drain it, some charge it; every morning starts at a different level; the same visit can drain one day and fill another.'),
  (4, 'Act 4 · Pacing', [9, 10, 11, 12], 'Check the battery now and then. High: a bigger task. Low: adapt, rest, split the task, recharge, never run it to zero.'),
  (5, 'Act 5 · Flexible with it', [13, 14, 15], 'Even when it\'s full, listen and keep a reserve; for something important it\'s fine to spend more, and rest after.'),
  (6, 'Act 6 · It can feel unfair', [16, 17], 'Others don\'t seem to carry a battery; that can feel unfair. Pacing can still help: one more tool.'),
  (7, 'Act 7 · Today: just notice', [18, 19], 'Stop once or twice today and check. Knowing it helps spend energy on what matters most.'),
]
SHOT = {
 1: ('Morning in Ruth\'s room: a battery beside her shows today\'s level. Title: מפגש 5 · ניהול אנרגיה. Tomorrow\'s level is a question mark.', 'Room, Ruth. The battery is the session\'s anchor.', 'Fade in; the battery fills to its level.'),
 2: ('Ruth with her phone, Nira on screen; three small questions float up: מה? איך? מתי?', 'Phone and Nira from session 1.', 'Questions pop one by one.'),
 3: ('The day line from session 3a, now as energy: peaks (ערניים, יציבים) and dips (הכול דורש יותר).', 'Day line from 3a.', 'Curve draws across the day.'),
 4: ('Pill marks drop onto the day line; the curve lifts after each.', 'Same line.', 'Pills pop in on "התרופות".'),
 5: ('Ruth in her chair with a small notebook: moon (sleep), pill, clock — הדפוס שלי.', 'Room.', 'Icons appear on each word.'),
 6: ('The battery over Ruth: one arrow drains it (red), one charges it (green).', 'Battery.', 'Level dips, then rises.'),
 7: ('Three mornings, three batteries: 80%, 45%, 65%.', 'Battery.', 'Cards deal in.'),
 8: ('On the path, Ruth meets two friends: with one her battery drops, with the other it fills. שונה מאדם לאדם, ומיום ליום.', 'Path world from session 1.', 'Arrows draw; the level follows.'),
 9: ('A title card: the battery in a dial: Pacing · ניהול קצב ואנרגיה.', 'Battery.', 'Card pops.'),
 10: ('Ruth pauses and taps the battery: מה מצב הסוללה שלי עכשיו?', 'Battery.', 'Tap, then the level glows.'),
 11: ('High battery: Ruth stands and repots a plant, the bigger task.', 'Room; the plant from every session.', 'Battery full; she gets up.'),
 12: ('Low battery: she adapts — a cup of tea, a big block split into three small ones; the red zone at the bottom is never reached.', 'Battery.', 'Block splits on "לחלק".'),
 13: ('Full battery, but tasks pile up fast; Ruth pauses (רגע…) and listens to herself.', 'Same.', 'Stack grows, then stops.'),
 14: ('A full battery with a dashed line: the top half used, the bottom half kept in reserve.', 'Battery.', 'Line draws across.'),
 15: ('For something important (a star), Ruth spends below her usual line, then rests longer after.', 'Battery, armchair.', 'Battery dips low, then slowly refills as she rests.'),
 16: ('On the path, people pass without batteries; Ruth\'s is showing. Caption: זה יכול להרגיש לא הוגן.', 'Path world.', 'Passers-by walk through.'),
 17: ('The battery joins the tool badges: something that can help, to try at the right moment.', 'Tool badges from session 1.', 'Battery shrinks into a badge.'),
 18: ('The day line with two small pause marks, each with a mini battery: לעצור פעם או פעמיים · רק לשים לב.', 'Day line.', 'Marks drop in.'),
 19: ('Ruth\'s energy flows from the battery toward what matters most to her (heart, people).', 'Battery and tool badges.', 'Dashed flow draws on.'),
}
legend1 = ('0 0 342 360', P + battery(171, 180, 0.6, w=80, h=150, label=False), '<strong>The battery.</strong> Today\'s energy beside Ruth: drains, charges, starts each day at a different level.')
legend2 = ('0 0 342 360', P + day_line(250, pills=(272, 186, 96)), '<strong>The day line.</strong> From session 3a: energy across the day and around the pills.')
legend3 = ('0 0 342 360', room() + chair() + ruth(160), '<strong>Ruth\'s room and path.</strong> Home base and the outside world from sessions 1–2; Nira narrates.')
carried = ['<strong>Kept:</strong> Ruth\'s room and path, Nira, the day line and tool badges.', '<strong>New:</strong> the battery, used again whenever energy comes up later.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S05Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 5 · ניהול אנרגיה ואנלוגיית הבטריה',
      'Energy works like a battery that drains and charges and starts every day at a different level. Pacing means checking it now and then and adjusting, flexibly, so there\'s enough left for what matters.',
      'A battery beside Ruth → it rises and falls through the day → things drain or charge it → she checks it and adapts the task → keeps a reserve, spends more for what matters → stops today to check.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
