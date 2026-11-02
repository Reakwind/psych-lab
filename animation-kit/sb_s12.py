# Session 12 storyboard: sharing the journey — a close friend walks beside Ruth's path; she sees the outside of the backpack, not how it feels inside. Talking makes support something they find together.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S12.dc.html')
assert len(times) == 16
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
FR = ('#8DB7A2', '#6B4E3D')   # the close friend (friend a from sessions 5 and 63)

def fr(x):
    return friend(x, *FR)

def walker(x, xray=False, mood='calm', pose='stand'):
    """Ruth on the path with her backpack from session 1."""
    return ruth(x, pose, mood) + pack(x - 20, 236, xray=xray, items=GREYS, heavy=xray)

def path(lit=()):
    return land(sun=True) + stones([(x + 40, y, r) for x, y, r in PATH], lit=lit)

def seat2(mood='calm', fmood=None):
    """Ruth in her armchair, her friend on a chair beside her, two mugs."""
    return room() + chair() + ruth(130, mood=mood) + f'<rect x="216" y="262" width="60" height="12" rx="5" fill="#C9805A" stroke="{INK}" stroke-width="2"></rect>' + fr(246) + mug(196, 300)

def dial(x, y, a, r=60):
    import math
    o = f'<path d="M{x - r} {y} A{r} {r} 0 0 1 {x + r} {y}" fill="#FFFFFF" stroke="{INK}" stroke-width="2.5"></path>'
    ax = x + (r - 14) * math.cos(math.radians(180 + a)); ay = y + (r - 14) * math.sin(math.radians(180 + a))
    return o + f'<line x1="{x}" y1="{y}" x2="{ax:.0f}" y2="{ay:.0f}" stroke="{INK}" stroke-width="4" stroke-linecap="round"></line><circle cx="{x}" cy="{y}" r="6" fill="{AMBER}"></circle>'

def figure(x, y, col, s=1):
    return f'<g transform="translate({x} {y}) scale({s})"><circle cy="-22" r="12" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle><path d="M-18 14 q0 -24 18 -24 q18 0 18 24Z" fill="{col}" stroke="{INK}" stroke-width="1.5"></path></g>'

S = {}
S[1] = (path() + walker(140, xray=True) + fr(250) + lbl(171, 30, 'מפגש 12 · לשתף מישהו קרוב בדרך', fill='#E3F4F0') + lbl(250, 150, 'רואים הרבה', size=11) + lbl(110, 110, 'איך זה מרגיש מבפנים', fill='#FFF1CC', size=11))
S[2] = path() + walker(110) + fr(240) + bubble(250, 130, '?', w=40) + lbl(171, 40, 'לא תמיד יכול לדעת מה אתם צריכים', fill='#FFF1CC', size=11)
S[3] = (room(door_open=True) + ruth(214, 'stand', 'happy') + f'<line x1="171" y1="60" x2="171" y2="330" stroke="{INK}" stroke-width="2" stroke-dasharray="5 5"></line>'
        + chair().replace('M110 318', 'M30 318').replace('Q110 222 126 222 L194 222 Q210 222 210 238 L210 318', 'Q30 222 46 222 L114 222 Q130 222 130 238 L130 318').replace('x="102"', 'x="22"') + ruth(70, mood='flat')
        + bubble(70, 150, 'תזכורת', w=70, fill='#D7DCE2') + bubble(240, 120, 'תזכורת', w=70) + lbl(256, 40, 'עוזר להתחיל', fill='#E3F4F0', size=11) + lbl(86, 40, 'מרגיש כמו לחץ', fill='#FFF1CC', size=11))
S[4] = (path() + walker(130) + fr(200) + lbl(171, 34, 'מישהו מצטרף · או לבד', size=11)
        + tool(250, 120, 4, 16) + lbl(250, 150, 'יקשיב', size=10) + lbl(171, 110, 'יתעניין', size=10) + tool(171, 80, 2, 16) + tool(92, 120, 3, 16) + lbl(92, 150, 'יעודד', size=10))
S[5] = seat2('happy') + bubble(110, 120, '…', w=50) + lbl(250, 60, 'מה עוזר לכם', size=11) + lbl(171, 92, 'מה פחות', size=11) + lbl(92, 60, 'ומה הייתם רוצים לנסות', size=10) + lbl(171, 30, 'אפשר וכדאי לדבר על זה', fill='#E3F4F0', size=11)
S[6] = seat2() + bubble(246, 120, '…', w=50) + lbl(171, 40, 'מה האדם שמולכם יכול ורוצה לתת', fill='#FFF1CC', size=11) + tool(150, 150, 3, 14)
S[7] = (path(lit=(1,)) + walker(120) + fr(220) + f'<path d="M150 200 Q171 180 196 200" fill="none" stroke="{AMBER}" stroke-width="3" stroke-dasharray="4 4"></path>'
        + lbl(171, 30, 'ממשהו שעושים בשבילכם', size=11) + lbl(171, 62, 'למשהו שמוצאים יחד', fill='#FFF1CC', size=11))
S[8] = (room() + chair() + ruth(110) + dial(250, 190, 60) + lbl(196, 206, 'מעט', size=10) + lbl(250, 112, 'הרבה', size=10) + lbl(300, 222, 'לא בכלל', size=10)
        + lbl(171, 30, 'הבחירה תמיד שלכם', fill='#FFF1CC') + lbl(250, 250, 'את מי · במה · כמה', size=11))
S[9] = path(lit=(0,)) + walker(150, pose='step') + fr(260) + arrow(180, 300, 226, 300, AMBER) + lbl(171, 34, 'קצת יותר קרוב', size=11) + lbl(171, 66, 'להתחיל בצעד קטן', fill='#FFF1CC', size=11)
S[10] = (path() + walker(100) + f'<path d="M80 236 C80 160 150 120 200 110" fill="none" stroke="{SLATE}" stroke-dasharray="3 5" stroke-width="2"></path>'
         + f'<rect x="230" y="84" width="28" height="22" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect>' + tool(244, 150, 1, 16) + f'<circle cx="244" cy="210" r="16" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></circle><path d="M244 222 C244 210 246 202 252 196" stroke="#6E9E58" stroke-width="3" fill="none"></path>'
         + lbl(244, 120, 'משהו שלמדתם באפליקציה', size=9) + lbl(244, 178, 'תרגול שעזר לכם', size=9) + lbl(244, 238, 'משהו שאתם מנסים לעשות אחרת', size=9) + lbl(171, 30, 'במה אפשר לשתף?', fill='#E3F4F0'))
S[11] = (path() + walker(130, mood='happy') + fr(210) + f'<circle cx="171" cy="200" r="90" fill="#4FA3A0" opacity=".12"></circle>'
         + lbl(270, 40, 'לתרגול נשימה', size=10) + lbl(171, 40, 'לתנועה', size=10) + lbl(72, 40, 'להליכה', size=10))
S[12] = (room() + chair() + ruth(110) + f'<path d="M160 70 C150 40 190 24 214 40 C240 20 290 34 290 66 C318 76 312 120 282 122 L176 122 C150 122 140 92 160 70Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path>'
         + figure(270, 92, '#8DB7A2', .8) + figure(226, 92, '#B07AA1', .8) + figure(182, 92, '#C9CED6', .8) + thought(130, 196, 180, 126)
         + lbl(270, 150, 'חבר', size=10) + lbl(226, 172, 'בן משפחה', size=10) + lbl(182, 150, 'סומכים עליו', size=10))
S[13] = (room() + chair() + ruth(110) + f'<path d="M160 70 C150 40 190 24 214 40 C240 20 290 34 290 66 C318 76 312 120 282 122 L176 122 C150 122 140 92 160 70Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path>'
         + f'<rect x="210" y="62" width="36" height="28" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect><circle cx="228" cy="76" r="18" fill="{SPARK}" opacity=".3"></circle>' + thought(130, 196, 180, 126) + lbl(228, 150, 'משהו אחד לחלוק', fill='#FFF1CC', size=11))
S[14] = (P + bubble(171, 90, 'שיחה גדולה', w=140, fill='#D7DCE2') + strike(171, 90, 120) + figure(270, 220, '#8DB7A2') + f'<rect x="152" y="196" width="36" height="28" rx="4" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect>'
         + bubble(72, 210, '…', w=40) + lbl(270, 270, 'אדם אחד', size=11) + lbl(171, 270, 'דבר אחד', size=11) + lbl(72, 270, 'שיתוף אחד', size=11))
S[15] = path(lit=(0, 1)) + ruth(150, 'stand', 'happy') + pack(130, 236) + fr(200) + f'<circle cx="176" cy="230" r="70" fill="{SPARK}" opacity=".15"></circle>' + lbl(171, 40, 'קצת יותר ביחד בתוך הדרך הזאת', fill='#FFF1CC', size=11)
S[16] = path(lit=(0, 1, 2, 3, 4)) + ruth(130, 'step', 'happy') + pack(110, 236) + fr(200) + lbl(171, 40, 'ופתאום לא תרצו להפסיק', fill='#E3F4F0', size=12)

ACTS = [
  (1, 'Act 1 · Seen from outside', [1, 2], 'On her path, Ruth walks with her backpack; a close friend beside her sees a lot, but not how it feels inside, nor what she needs.'),
  (2, 'Act 2 · What helps differs', [3, 4], 'The same reminder to go for a walk can help her start, or feel like pressure. Someone joining, or doing it alone and someone listening, asking, cheering.'),
  (3, 'Act 3 · Talk about it', [5, 6, 7], 'Over tea, Ruth says what helps, what less, what she\'d like to try, and hears what her friend can and wants to give. Support stops being done for her and becomes found together.'),
  (4, 'Act 4 · Your choice', [8, 9], 'A dial: whom, what and how much is hers to choose, from a lot to not at all. If someone could be a little closer, one small step.'),
  (5, 'Act 5 · What to share', [10, 11], 'From her backpack: something learned in the app, a practice that helped, something she\'s trying differently. Or invite someone to breathe, move, walk.'),
  (6, 'Act 6 · One person, one thing', [12, 13, 14], 'Think of one person; one thing to share. No big conversation: one person, one thing, one share.'),
  (7, 'Act 7 · Together on the way', [15, 16], 'The two walk Ruth\'s path together; the stones light ahead, one after another.'),
]
SHOT = {
 1: ('Ruth on her path of stones with her backpack; her friend walks alongside. On "מבפנים" the backpack turns see-through for us: the weights inside, which the friend can\'t see. Title: מפגש 12 · לשתף מישהו קרוב בדרך.', 'The path, stones and backpack from session 1; the friend from sessions 5 and 63.', 'Fade in on the path; x-ray fades in on "מבפנים".'),
 2: ('The friend looks at Ruth with a question mark over her head: what does she need?', 'Path, friend.', 'Question balloon pops.'),
 3: ('A reminder bubble arrives twice, side by side, right first: Ruth stands at the open door, shoes on (עוזר להתחיל); Ruth in her armchair under a heavy grey bubble (מרגיש כמו לחץ).', 'Ruth\'s room, the door and shoes.', 'Split opens down the middle.'),
 4: ('On the path the friend falls in beside Ruth (מצטרף). Then Ruth walks on alone while three small badges float from the friend: listen, ask, cheer.', 'Tool badge style from session 1.', 'Badges pop on each word.'),
 5: ('Ruth\'s room, the friend on a chair, two mugs. Ruth talks: מה עוזר לכם · מה פחות · ומה הייתם רוצים לנסות.', 'Room, mug from session 5.', 'Tags pop on each phrase.'),
 6: ('The friend talks, Ruth listens: a small heart in the friend\'s hands. מה האדם שמולכם יכול ורוצה לתת.', 'Same.', 'Turn of the head.'),
 7: ('Back on the path: first the friend carries Ruth\'s backpack for her (בשבילכם); then Ruth takes it back and they step together onto a stone that lights warm (יחד).', 'Path, backpack, lit stone.', 'Bag passes hands, then a stone lights.'),
 8: ('Ruth in her armchair, a dial beside her from לא בכלל through מעט to הרבה; the pointer moves with each word. את מי · במה · כמה.', 'Dial from session 3a.', 'Pointer swings on each word.'),
 9: ('On the path the friend waits a little way ahead; Ruth takes one small step toward her; the stone under her foot lights.', 'Path and lit stones.', 'Step on "צעד קטן".'),
 10: ('Ruth opens her backpack: a lesson note (learned in the app), the breath badge (a practice that helped), the reed (something done differently) rise out, one per phrase.', 'Backpack and tool badges from session 1; the lesson note; the reed from sessions 3a and 7.', 'Items rise one by one.'),
 11: ('The two together: a breathing circle behind them, arms lifting, then walking side by side.', 'Pacer circle from session 3b.', 'Three quick beats on the three words.'),
 12: ('Ruth in her armchair, eyes closed: a thought cloud with three silhouettes, friend, family, someone trusted; in the pause one of them warms.', 'Thought cloud.', 'Silhouettes appear on each word; slow hold in the pause.'),
 13: ('In the cloud, one small note glows: one thing to share.', 'Lesson note.', 'Note glows; pause holds.'),
 14: ('A big talk bubble is struck out; three beats right to left: אדם אחד, דבר אחד, שיתוף אחד.', 'Struck tags.', 'Each beat pops on its words.'),
 15: ('Ruth and the friend walk her path side by side, a warm glow between them.', 'Path, backpack, friend.', 'Camera drifts with them.'),
 16: ('Stone after stone lights ahead of them; Ruth smiles: ופתאום לא תרצו להפסיק.', 'Lit stones.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', path() + walker(140, xray=True), '<strong>The backpack seen from inside.</strong> Session 1\'s backpack: the friend sees the outside, we see how it feels.')
legend2 = ('0 0 342 360', P + fr(171), '<strong>The close friend.</strong> Friend a from sessions 5 and 63; stands for anyone Ruth trusts.')
legend3 = ('0 0 342 360', path(lit=(0, 1, 2)), '<strong>The path, lighting up.</strong> Steps taken together light the stones of the program\'s path.')
carried = ['<strong>Kept:</strong> Ruth\'s path, stones and backpack, her room, the friend, the dial, the tool badges, the reed.', '<strong>No invented lines:</strong> tags carry only Nira\'s words; nobody speaks a made-up sentence.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S12Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 12 · לשתף מישהו קרוב בדרך',
      'People close to us see a lot but can\'t know how it feels inside or what we need. Talking about what helps, what less and what we\'d like to try, and hearing what they can give, turns support into something found together; the choice is ours, and one small share can be enough to start.',
      'Ruth walks her path, a friend beside her who can\'t see inside the backpack → the same reminder helps or presses → they talk over tea → a dial for how much → one small step → things from the backpack to share → breathe, move, walk together → one person, one thing → stones light as they walk on.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S12Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":5840'))
print('rows', rows)
