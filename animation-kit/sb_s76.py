# Session 76 storyboard: putting it all together — the many tools in Ruth's backpack become five stones on her path:
# notice, steady, choose, take a step, acknowledge. One day she doesn't want to exercise; we walk the five stones with her. The last film of the program.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S76.dc.html')
assert len(times) == 18
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
WARM = '#E66A7A'
STEPS = ['לשים לב', 'להתייצב', 'לבחור', 'לקחת צעד', 'לפרגן']
SX = [306, 238, 171, 104, 36]

def step_icon(k, x, y, r=16, on=True):
    """The five steps as round badges: notice (the eye tool), steady (the breath waves), choose (the compass), a step (a lit stone), acknowledge (a warm heart)."""
    c = ['#FFDEA3', '#B3EFE4', '#B7D3C6', '#FFF1CC', '#FFD7F3'][k] if on else '#E3E6EA'
    g = ['<ellipse rx="9" ry="5.5" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.8"></ellipse><circle r="2.8" fill="#3B4450"></circle>',
         '<path d="M-9 -3 q4 -6 9 0 t9 0 M-9 4 q4 -6 9 0 t9 0" fill="none" stroke="#3B4450" stroke-width="2"></path>',
         f'<circle r="10" fill="#FBFAF7" stroke="#3B4450" stroke-width="1.5"></circle><path d="M0 -8 L2.5 0 L-2.5 0Z" fill="{AMBER}"></path><path d="M0 8 L2.5 0 L-2.5 0Z" fill="#9AA3AD"></path>',
         f'<ellipse cx="0" cy="3" rx="11" ry="5" fill="{SPARK}" stroke="#3B4450" stroke-width="1.5"></ellipse><path d="M-3 -4 l3 -6 l3 6" fill="none" stroke="#3B4450" stroke-width="1.5"></path>',
         f'<path d="M0 8 C-12 0 -7 -10 0 -4 C7 -10 12 0 0 8Z" fill="{WARM}" stroke="#3B4450" stroke-width="1.2"></path>'][k]
    return f'<g transform="translate({x} {y}) scale({r / 16})" opacity="{1 if on else .55}"><circle r="16" fill="{c}" stroke="{INK}" stroke-width="1.6"></circle>{g}</g>'

def strip(cur=None, y=30):
    o = ''.join(step_icon(k, x, y, 14, on=(cur is None or k <= cur)) for k, x in enumerate(SX))
    if cur is not None: o += lbl(SX[cur], y + 32, STEPS[cur], fill='#FFF1CC', size=11)
    return o

def seat(mood='calm', x=150):
    return room() + chair() + ruth(x, mood=mood)

def dumbbell(x, y, s=1.0):
    return f'<g transform="translate({x} {y}) scale({s})"><rect x="-14" y="-3" width="28" height="6" rx="3" fill="{SLATE}"></rect><rect x="-22" y="-10" width="9" height="20" rx="3" fill="{INK}"></rect><rect x="13" y="-10" width="9" height="20" rx="3" fill="{INK}"></rect></g>'

def mat(x, y, w=90):
    return f'<rect x="{x - w / 2}" y="{y}" width="{w}" height="8" rx="4" fill="#B7D3C6" stroke="{INK}" stroke-width="1.5"></rect>'

def tools7(cx=171, cy=140, R=110):
    """Seven ways practised over the program, as badges in an arc: thoughts, attention, calm, energy, starting, what matters, kindness."""
    cols = ['#A9C4FF', '#FFDEA3', '#B3EFE4', '#CFE6CF', '#FFF1CC', '#B7D3C6', '#FFD7F3']
    o = ''
    for k in range(7):
        a = math.radians(180 - k * 30)
        x, y = cx + R * math.cos(a) * -1, cy - R * math.sin(a) * 0.6
        o += f'<circle cx="{x:.0f}" cy="{y:.0f}" r="15" fill="{cols[k]}" stroke="{INK}" stroke-width="1.5"></circle>'
    return o

def compass(x, y, r=30, a=0):
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#B7D3C6" stroke="{INK}" stroke-width="2.5"></circle><circle cx="{x}" cy="{y}" r="{r * .78}" fill="#FBFAF7" stroke="{INK}" stroke-width="1"></circle>'
            f'<g transform="rotate({a} {x} {y})"><path d="M{x} {y - r * .7} L{x + r * .16} {y} L{x - r * .16} {y}Z" fill="{AMBER}" stroke="{INK}" stroke-width="1.2"></path><path d="M{x} {y + r * .7} L{x + r * .16} {y} L{x - r * .16} {y}Z" fill="#9AA3AD" stroke="{INK}" stroke-width="1.2"></path></g>')

def row_stones(lit=-1, y=300):
    return ''.join(f'<ellipse cx="{x}" cy="{y}" rx="30" ry="12" fill="{SPARK if k <= lit else STONE}" stroke="{INK}" stroke-width="1.5"></ellipse>' for k, x in enumerate(SX))

def attn(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".18" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 4"></circle>'

def clock5(x, y):
    return f'<circle cx="{x}" cy="{y}" r="18" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><path d="M{x} {y} L{x} {y - 16} A16 16 0 0 1 {x + 8} {y - 13.9}Z" fill="{AMBER}"></path><path d="M{x} {y} v-12" stroke="{INK}" stroke-width="2"></path>'

def trophy(x, y):
    return f'<path d="M{x - 16} {y - 20} H{x + 16} V{y - 6} Q{x + 16} {y + 8} {x} {y + 10} Q{x - 16} {y + 8} {x - 16} {y - 6}Z" fill="{AMBER}" stroke="{INK}" stroke-width="1.5"></path><rect x="{x - 10}" y="{y + 12}" width="20" height="8" fill="{SLATE}"></rect>'

def hourglass(x, y):
    return (f'<path d="M{x - 12} {y - 18} H{x + 12} M{x - 12} {y + 18} H{x + 12} M{x - 10} {y - 18} L{x + 10} {y - 18} L{x} {y} L{x + 10} {y + 18} L{x - 10} {y + 18} L{x} {y}Z" fill="#FFF3C4" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 5} {y + 16} L{x + 5} {y + 16} L{x} {y + 8}Z" fill="{AMBER}"></path>')

def battery_low(x, y):
    return battery(x, y, 0.2, w=26, h=44, label=False)

S = {}
S[1] = room() + ruth(171, 'stand') + pack(171, 238) + bubble(250, 120, 'באיזה כלי, ומתי?', w=130) + lbl(171, 30, 'מפגש 76 · לשים לב → להתייצב → לבחור → לעשות צעד → לפרגן', fill='#E3F4F0', size=8)
S[2] = room() + ruth(171, 'stand') + pack(171, 238, xray=True, items=('#A9C4FF', '#FFDEA3', '#B3EFE4', '#FFD7F3')) + tools7() + lbl(171, 30, 'מחשבות ורגשות · קשב · להירגע · אנרגיה · …', size=9)
S[3] = room() + ruth(171, 'stand', 'flat') + f'<rect x="230" y="40" width="80" height="200" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + ''.join(f'<line x1="244" y1="{60 + k * 20}" x2="296" y2="{60 + k * 20}" stroke="{SLATE}" stroke-width="3"></line>' for k in range(9)) + bubble(110, 130, '?', w=36) + lbl(171, 300, 'לא זוכרים רשימות בעל פה', size=10)
S[4] = land(sun=True, far=True) + row_stones(4) + ''.join(step_icon(k, x, 250, 16) for k, x in enumerate(SX)) + ''.join(lbl(x, 210 - (k % 2) * 30, STEPS[k], size=9) for k, x in enumerate(SX)) + lbl(171, 40, 'חמישה שלבים פשוטים', fill='#FFF1CC', size=12)
S[5] = land(sun=True) + row_stones(4) + ''.join(step_icon(k, x, 250, 16) for k, x in enumerate(SX)) + ''.join(arrow(x - 18, 230, x - 50, 230, AMBER) for x in SX[:4]) + ruth(238, 'step').replace('202', '202') + lbl(171, 40, 'כל שלב מוביל לשלב הבא', fill='#FFF1CC', size=11)
S[6] = seat('flat') + mat(250, 310) + dumbbell(250, 290, 2.4) + battery_low(300, 120) + lbl(171, 40, 'היום ממש לא רוצים להתאמן', size=11) + lbl(200, 220, 'יותר מדי', size=10)
S[7] = seat('flat') + strip(0, 300).replace('y="', 'y="') + thought_card(171, 90, 'אני ממש לא רוצה להתאמן עכשיו.', 'plain', w=230) + thought_card(171, 140, 'קשה לי להתחיל.', 'plain', w=130)
S[8] = seat('flat') + thought_card(171, 100, 'קשה לי להתחיל.', 'plain', w=130) + attn(171, 100, 60) + lbl(70, 190, 'בלי לשפוט', size=10) + strike(70, 190, 70) + lbl(260, 190, 'פשוט לשים לב', fill='#FFF1CC', size=10)
S[9] = seat() + strip(1, 40) + attn(150, 220, 120) + f'<path d="M190 200 q8 6 0 12 M200 194 q14 12 0 24" stroke="#4FA3A0" stroke-width="2.5" fill="none"></path>' + lbl(270, 140, 'נשימה איטית', size=10) + lbl(70, 140, 'מה מסביב', size=10)
S[10] = seat() + strip(1, 40) + hourglass(240, 220) + lbl(100, 110, 'רוגע מוחלט', size=10) + strike(100, 110, 70) + lbl(240, 150, 'רגע לפני שמחליטים', fill='#FFF1CC', size=10)
S[11] = seat() + strip(2, 40) + compass(171, 140, 34, 60) + dumbbell(270, 140, 1.4) + lbl(270, 180, 'להישאר פעילים', size=10) + lbl(171, 200, 'מה חשוב לי כאן?', fill='#FFF1CC', size=11)
S[12] = seat() + strip(2, 40) + compass(171, 140, 34, -60) + battery_low(70, 140) + lbl(70, 190, 'דחפתי מספיק היום', size=10) + lbl(240, 200, 'קצת פחות', fill='#FFF1CC', size=11)
S[13] = room() + ruth(171, 'stand', 'happy') + strip(3, 40) + mat(171, 312, 110) + lbl(171, 150, 'צעד שמתאים · מה שאפשרי היום', size=10)
S[14] = room() + ruth(110, 'stand', 'happy') + mat(150, 312, 130) + strip(3, 40) + clock5(270, 120) + dumbbell(270, 180, 0.9) + friend(250) + lbl(270, 90, 'חמש דקות', size=9) + lbl(171, 110, 'רמה קלה יותר', size=9) + lbl(220, 330, 'ביחד', size=9)
S[15] = seat('happy') + strip(4, 40) + trophy(270, 140) + strike(270, 140, 50) + lbl(100, 120, 'עצרתם ✓', size=9) + lbl(100, 150, 'שמתם לב ✓', size=9) + lbl(100, 180, 'בחרתם ✓', size=9) + lbl(100, 210, 'מצאתם צעד ✓', size=9)
S[16] = seat('happy') + strip(4, 40) + thought_card(171, 140, 'היה לי קשה להתחיל היום, ובכל זאת מצאתי משהו שעבד בשבילי.', 'kind', w=300).replace('font-size="13"', 'font-size="9"')
S[17] = land(sun=False) + f'<path d="M0 120 Q120 90 240 110 T342 100 V0 H0Z" fill="#C9D3DA" opacity=".7"></path>' + row_stones(4) + ''.join(step_icon(k, x, 250, 16) for k, x in enumerate(SX)) + ruth(36, 'stand', 'happy') + lbl(171, 40, 'ביום אחר, במצב אחר', size=11)
S[18] = land(sun=True) + stones(PATH, lit=tuple(range(7))) + ruth(120, 'stand', 'happy') + nira(220) + lbl(171, 40, 'גאים בעצמנו', fill='#FFF1CC', size=12) + lbl(171, 80, 'עדיין כאן · מחויבים ומשקיעים', size=10)

ACTS = [
  (1, 'Act 1 · So many tools', [1, 2, 3], 'Ruth with her backpack of tools from session 1. Seven ways she has practised fly out around her; too many to keep as a list.'),
  (2, 'Act 2 · Five stones', [4, 5], 'The list folds into five stones on her path, each with its badge: notice, steady, choose, take a step, acknowledge. Each leads to the next.'),
  (3, 'Act 3 · Notice', [6, 7, 8], 'One day she doesn\'t want to exercise; the dumbbell looks huge. Step 1: she says it to herself on a card, and just notices, no judging.'),
  (4, 'Act 4 · Steady', [9, 10], 'A slow breath, the circle of attention takes in the room, a moment to settle. Not total calm: a moment before deciding.'),
  (5, 'Act 5 · Choose', [11, 12], 'Her compass asks what matters here. Staying active, a way to care for herself; or she has pushed enough today and needs a bit less.'),
  (6, 'Act 6 · Take a step', [13, 14], 'A step that fits: five minutes, an easier level, or a friend to do it with.'),
  (7, 'Act 7 · Acknowledge', [15, 16], 'Not a trophy for a perfect result: credit for stopping, noticing, choosing, finding a step. Her warm words to herself.'),
  (8, 'Act 8 · Another day', [17, 18], 'Another day, different weather; the five stones again, one by one. Then the whole path behind her lit, Nira beside her: be proud.'),
]
SHOT = {
 1: ('Ruth standing in her room, wearing her backpack from session 1. Title: מפגש 76 · לשים לב → להתייצב → לבחור → לעשות צעד → לפרגן. A question bubble: באיזה כלי, ומתי?', 'Ruth\'s room and backpack (session 1).', 'Open on the room.'),
 2: ('The backpack opens (x-ray look); seven badges fly out into an arc, each on its words: מחשבות ורגשות · הקשב · להירגע · האנרגיה · לפעול בלי מוטיבציה · מה שחשוב · טובים לעצמנו.', 'Tool badges (1), battery (5), spark (2), compass (73), heart (4).', 'One badge per phrase.'),
 3: ('The badges line up into a long list that keeps growing; Ruth frowns, a "?" over her: לא זוכרים רשימות בעל פה.', 'Badges.', 'List grows and wobbles.'),
 4: ('The list folds into five stones across her path, right to left; each lights with its badge and tag on Nira\'s word: לשים לב · להתייצב · לבחור · לקחת צעד · לפרגן.', 'The path of stones (1).', 'Cut outdoors; stones light one by one.'),
 5: ('Arrows draw from stone to stone and Ruth walks across them: כל שלב מוביל לשלב הבא.', 'Same.', 'Arrows draw.'),
 6: ('Back home: Ruth in her armchair, her exercise mat and dumbbell by the door; the dumbbell swells, her battery low: היום ממש לא רוצים להתאמן · אפילו להתחיל מרגיש יותר מדי.', 'Battery (5); the room.', 'Dumbbell grows.'),
 7: ('The five badges sit small across the top; the first lights (לשים לב). Her thought appears on a card: "אני ממש לא רוצה להתאמן עכשיו." then "קשה לי להתחיל."', 'Step strip; thought cards (4).', 'Cards appear on her words.'),
 8: ('A judge\'s tag "לשפוט" is struck; a hand that would push the feeling away is struck too; the circle of attention settles softly around the card: פשוט לשים לב.', 'Circle of attention (3a).', 'Circle settles.'),
 9: ('Step 2 lights (להתייצב): a slow breath (her chest rises and falls), the circle of attention widens to the plant and window, a moment to settle.', 'Breath, circle of attention.', 'Circle widens.'),
 10: ('"רוגע מוחלט" struck; an hourglass turns once: רגע לפני שמחליטים.', 'Hourglass (3a).', 'Hourglass turns.'),
 11: ('Step 3 lights (לבחור): her compass rises; the needle points to the dumbbell: להישאר פעילים · דרך לדאוג לעצמנו.', 'Compass (73).', 'Needle swings right.'),
 12: ('Or the needle swings to the armchair and her low battery: היום כבר דחפתי מספיק · לעשות קצת פחות.', 'Battery (5).', 'Needle swings left.'),
 13: ('Step 4 lights (לקחת צעד): Ruth stands and the mat rolls out: צעד שמתאים למה שבחרתם ולמה שאפשרי היום.', 'Mat; step strip.', 'Mat unrolls.'),
 14: ('Three small options pop up: a clock with five minutes, a lighter dumbbell (רמה קלה יותר), a friend coming in (ביחד). Ruth starts gently.', 'Clock (5), the friend (5).', 'One option per "maybe".'),
 15: ('Step 5 lights (לפרגן). A shiny trophy (תוצאה מושלמת) is struck; four warm ticks pop on her words: עצרתם · שמתם לב · בחרתם · מצאתם צעד שמתאים.', 'Trophy (25).', 'Ticks pop.'),
 16: ('Ruth smiles; her inner voice, warm now, holds a card with her words: "היה לי קשה להתחיל היום, ובכל זאת מצאתי משהו שעבד בשבילי."', 'The inner voice turning warm (4, 64).', 'Card appears.'),
 17: ('Out on the path under a different sky, the five stones again; Ruth steps across them as Nira repeats the steps, each badge lighting on its word.', 'Path, step badges.', 'Weather changes; stones light.'),
 18: ('Ruth on her path with Nira; every stone behind her lit up, the sun out: עדיין כאן · מחויבים ומשקיעים בעצמנו · גאים בעצמנו.', 'The path (1), Nira (1).', 'Hold; fade out.'),
}
legend1 = ('0 0 342 60', P + strip(None, 30), '<strong>The five steps.</strong> Notice, steady, choose, take a step, acknowledge: five badges built from the program\'s anchors.')
legend2 = ('0 200 342 160', P + row_stones(4, 300) + ''.join(step_icon(k, x, 250, 16) for k, x in enumerate(SX)), '<strong>Five stones.</strong> The steps laid on Ruth\'s path from session 1; each leads to the next.')
legend3 = ('100 200 180 140', P + mat(171, 312, 110) + dumbbell(171, 290, 2.0), '<strong>The workout.</strong> Nira\'s example, one day she doesn\'t want to exercise, walked through all five steps.')
carried = ['<strong>Kept:</strong> Ruth\'s room, backpack and path (1), tool badges (1), battery (5), spark (2), compass (73), thought cards and inner voice (4), circle of attention (3a), friends (5), Nira.',
           '<strong>Content:</strong> every tag is Nira\'s words; her quotes appear exactly as she says them.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S76Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 76 · לשים לב → להתייצב → לבחור → לעשות צעד → לפרגן לעצמנו',
      'We don\'t remember lists of tools, but we can remember five steps that lead into each other: notice, steady, choose, take a step, acknowledge. Walking one ordinary hard moment through them shows the logic; on another day they will look different, and we deserve credit for still being here.',
      'Ruth\'s backpack spills many tools → too many to remember → they fold into five stones on her path → one day she doesn\'t want to exercise → notice the thought → steady with a breath → her compass: stay active, or do less → a small step: five minutes, easier, together → no trophy, credit for the process, warm words → another day, the five stones again → the whole path lit, be proud.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
H = 6660
p = B + 'S76Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))
print('rows', rows)
