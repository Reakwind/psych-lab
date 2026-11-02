# Session 30 storyboard: a trail through tall grass. Walking it again and again flattens the grass into a path; the brain works the same way
# (neuroplasticity). Each time Ruth notices her attention drifted and brings it back, she walks the trail once more — until it becomes her path.
import sys
sys.path.insert(0, '.')
from sb_s25to37_kit import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S30.dc.html')
assert len(times) == 19

GRASS = '#7FAF7E'; GRASS_DK = '#5E9460'
TRAIL = [(171, 352), (160, 320), (180, 290), (164, 262), (178, 240), (168, 222), (176, 208)]

def field(wear=0.0, stones_on=False, sun=True):
    """Tall grass over the land; wear 0..1 flattens a trail up the middle."""
    o = land(sun=sun) + f'<rect x="0" y="236" width="342" height="124" fill="#A9CBB8"></rect>'
    if wear > 0:
        d = 'M' + ' L'.join(f'{x} {y}' for x, y in TRAIL)
        o += f'<path d="{d}" fill="none" stroke="#D9CBB0" stroke-width="{10 + 26 * wear:.0f}" stroke-linecap="round" stroke-linejoin="round" opacity="{0.35 + 0.65 * wear:.2f}"></path>'
    for row, y in enumerate(range(246, 364, 14)):
        for x in range(-6 + (row % 2) * 9, 350, 18):
            near = min(abs(x - tx) for tx, ty in TRAIL if abs(ty - y) < 30) if any(abs(ty - y) < 30 for tx, ty in TRAIL) else 99
            h = 10 + (y - 236) * 0.12
            if near < 10 + 12 * wear: h *= (1 - 0.8 * wear)
            o += f'<path d="M{x - 3} {y} q2 {-h} 5 {-h * 1.1:.1f} q-1 {h * 0.6:.1f} 2 {h * 1.1:.1f}Z" fill="{GRASS if (x + row) % 3 else GRASS_DK}"></path>'
    if stones_on: o += stones(PATH, lit=(0, 1, 2))
    return o

def walker(x, y, s=1.0):
    """Ruth from behind, small, walking (as in session 1)."""
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-9 0 L-11 22 M9 0 L11 22" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>'
            f'<rect x="-14" y="-40" width="28" height="42" rx="10" fill="{PLUM}" stroke="{INK}" stroke-width="2"></rect><rect x="-12" y="-36" width="24" height="26" rx="8" fill="{PACK}" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<circle cx="0" cy="-52" r="12" fill="#C8CCD2" stroke="{INK}" stroke-width="2"></circle></g>')

def profile_head(path_w=0.0, pulse=False, regions=False, lock=None, sprout=False):
    """Ruth's head in side profile with the brain cut away (session 2); a lit path runs between two neurons."""
    o = (f'<rect width="342" height="360" fill="#E6EFEC"></rect><circle cx="171" cy="180" r="150" fill="#F5F1E8"></circle>'
         f'<path d="M80 250 C60 140 120 70 190 70 C250 70 290 110 292 170 L306 200 L292 206 C296 230 290 250 270 254 C240 270 200 272 170 262 C130 252 96 270 80 250Z" fill="{SKIN}" stroke="{INK}" stroke-width="2"></path>'
         f'<path d="M78 252 C54 150 110 60 190 60 C240 60 280 90 290 130 C250 110 210 110 180 120 C130 130 110 180 116 240Z" fill="#C8CCD2" stroke="{INK}" stroke-width="1.5"></path>'
         f'<ellipse cx="180" cy="150" rx="78" ry="58" fill="#2F3E44" stroke="{INK}" stroke-width="2"></ellipse>'
         f'<path d="M116 160 C112 120 150 102 186 104 C220 104 248 120 250 150 C252 176 230 196 200 194 C180 204 150 202 136 190 C120 184 116 172 116 160Z" fill="#F0C987"></path>'
         f'<ellipse cx="262" cy="176" rx="14" ry="12" fill="none" stroke="{INK}" stroke-width="2.5"></ellipse>')
    n = [(136, 166), (162, 132), (198, 120), (232, 146), (210, 180), (172, 178)]
    o += f'<path d="M136 166 C150 140 170 120 198 120 C220 120 236 132 232 146" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 4" opacity=".7"></path>'
    if path_w > 0:
        o += f'<path d="M136 166 C150 140 170 120 198 120 C220 120 236 132 232 146" fill="none" stroke="{SPARK}" stroke-width="{2 + 8 * path_w:.1f}" stroke-linecap="round"></path>'
    o += ''.join(f'<circle cx="{x}" cy="{y}" r="6" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle>' for x, y in n)
    if pulse: o += f'<circle cx="198" cy="120" r="10" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>'
    if sprout: o += f'<path d="M210 180 C220 196 240 196 250 186" fill="none" stroke="{SPARK}" stroke-width="4" stroke-linecap="round"></path><circle cx="250" cy="186" r="6" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle>'
    if regions: o += glow(160, 140, 30, 22) + glow(214, 172, 28, 20)
    if lock: o += (f'<rect x="166" y="70" width="34" height="28" rx="5" fill="#C0C6CE" stroke="{INK}" stroke-width="2"></rect>'
                   f'<path d="M172 70 v-10 a11 11 0 0 1 22 0' + (' v10' if lock == 'shut' else ' v-4') + f'" fill="none" stroke="{INK}" stroke-width="3"></path>')
    return o

def arms_up(x, k=1):
    """Ruth standing with both arms raised (exercise)."""
    return ruth(x, 'stand') + f'<path d="M{x - 16} 214 L{x - 30} {214 - 34 * k} M{x + 16} 214 L{x + 30} {214 - 34 * k}" stroke="{PLUM}" stroke-width="8" stroke-linecap="round"></path>'

def tally(x, y, n, lit):
    return ''.join(f'<circle cx="{x + (i - (n - 1) / 2) * 18}" cy="{y}" r="6" fill="{AMBER if i < lit else "#FFFFFF"}" stroke="{INK}" stroke-width="1.5"></circle>' for i in range(n))

def sunmoon(x, y, k):
    return ''.join((f'<circle cx="{x + i * 44}" cy="{y}" r="12" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>' if i < k else f'<circle cx="{x + i * 44}" cy="{y}" r="12" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5" stroke-dasharray="3 3"></circle>') for i in range(3))

def leaf(x, y, a, c='#6E9E58'):
    return f'<path d="M{x} {y} q{12 * a} -18 {26 * a} -6 q-10 14 -{26 * a} 6Z" fill="{c}" stroke="{INK}" stroke-width="1.2"></path>'

ROOM = room() + chair()
S = {}
S[1] = (field(0) + walker(171, 330, 0.9) + lbl(171, 40, 'מפגש 30 · מיינדפולנס ונוירופלסטיות', fill='#E3F4F0', size=12) + lbl(171, 90, 'אין ממש שביל', size=12))
S[2] = (field(0.7) + walker(170, 268, 0.6) + walker(160, 318, 0.8) + tally(171, 140, 4, 4) + lbl(171, 40, 'שוב ושוב באותו מסלול', fill='#E3F4F0') + lbl(171, 90, 'השביל נעשה ברור וקל יותר', size=11))
S[3] = profile_head(0.5) + lbl(70, 300, 'לחשוב', size=11) + lbl(171, 320, 'להרגיש', size=11) + lbl(270, 300, 'לפעול', size=11) + lbl(171, 34, 'המסלול נעשה מוכר למוח', fill='#E3F4F0')
S[4] = profile_head(0.5, sprout=True) + lbl(171, 34, 'נוירופלסטיות', fill='#FFF1CC') + lbl(171, 320, 'המוח משתנה ומסתגל', size=12)
S[5] = (profile_head(0.3, lock='open') + lbl(171, 34, 'פעם חשבו: המוח מפסיק להשתנות', size=11) + strike(171, 34, 200) + lbl(171, 320, 'היום יודעים: זה לא נכון', fill='#E3F4F0'))
S[6] = (ROOM + ruth(150, mood='happy') + f'<path d="M38 292 C38 250 40 220 46 190" stroke="#4E8B5F" stroke-width="3" fill="none"></path>'
        + leaf(40, 270, 1) + leaf(42, 245, -1) + leaf(44, 222, 1) + leaf(46, 200, -1, '#9CC5A1')
        + lbl(171, 40, 'המוח ממשיך ללמוד לאורך החיים', fill='#E3F4F0', size=12) + lbl(250, 110, 'גם בגיל מבוגר', size=11) + lbl(250, 150, 'גם עם פרקינסון', size=11))
S[7] = (ROOM.replace(chair(), '') + arms_up(110) + tally(110, 130, 5, 4) + f'<g transform="translate(176 0) scale(.5)">{profile_head(0.8)}</g>'
        + lbl(110, 40, 'חוזרים על תנועה', size=11) + lbl(260, 220, 'המוח לומד', fill='#FFF1CC', size=11) + lbl(110, 90, 'לא רק השרירים', size=11))
S[8] = (ROOM + ruth(150) + closed_eyes(150, 212) + calm_disc(150, 250, 70) + lbl(171, 40, 'גם יכולות מנטליות אפשר לאמן', fill='#E3F4F0', size=12) + lbl(171, 90, 'מיינדפולנס', size=12))
S[9] = (ROOM + ruth(150) + closed_eyes(150, 212) + spotlight(150, 256, 40, 0.2) + lbl(171, 40, 'לרגע הזה', fill='#E3F4F0')
        + lbl(80, 110, 'בפתיחות', size=11) + lbl(262, 110, 'בסקרנות', size=11) + lbl(171, 150, 'לשפוט', size=11) + strike(171, 150, 50))
S[10] = (ROOM + ruth(150) + closed_eyes(150, 212) + string(160, 196, 260, 110) + balloon(266, 96) + lbl(171, 40, 'תשומת הלב נודדת · וזה טבעי', fill='#E3F4F0', size=12))
S[11] = (ROOM + ruth(150, mood='happy') + string(160, 196, 210, 150) + balloon(214, 140) + spark(196, 190, 'lit') + arrow(200, 160, 170, 196, AMBER)
         + lbl(171, 40, 'ומחזירים בעדינות: זה התרגול עצמו', fill='#FFF1CC', size=11) + lbl(171, 300, 'לא רגע שבו התרגול השתבש', size=11))
S[12] = profile_head(0.9, pulse=True) + lbl(171, 34, 'זאת נוירופלסטיות · למידה מוחית', fill='#FFF1CC', size=12) + lbl(90, 320, 'שמים לב', size=11) + lbl(250, 320, 'ומחזירים', size=11)
S[13] = (ROOM + ruth(150, mood='happy') + meter(280, 190, 0.3) + arrow(310, 120, 310, 190, '#5BAA6A')
         + lbl(80, 90, 'מתח', size=11) + lbl(80, 126, 'חרדה', size=11) + lbl(80, 162, 'מצב הרוח', size=11) + lbl(171, 290, 'איכות החיים', fill='#E3F4F0', size=11) + lbl(171, 40, 'נחקר, גם אצל אנשים עם פרקינסון', fill='#FFF1CC', size=11))
S[14] = profile_head(0.6, regions=True) + lbl(110, 300, 'קשב', size=12) + lbl(240, 300, 'ויסות רגשי', size=12) + lbl(171, 34, 'שינויים בפעילות המוחית', fill='#E3F4F0', size=12)
S[15] = (land(sun=True) + stones(PATH) + walker(171, 300, 1.1) + tool(214, 250, 2, 14)
         + lbl(171, 40, 'מיינדפולנס אינו מרפא פרקינסון', size=12) + lbl(171, 90, 'אבל עוזר להתאמן בהתמודדות', fill='#E3F4F0', size=11))
S[16] = (ROOM + ruth(150, mood='happy') + perfect(270, 120) + cross(270, 120, 30) + lbl(171, 40, 'לא צריך לתרגל בצורה מושלמת', fill='#FFF1CC', size=12))
S[17] = (field(0.6) + walker(170, 300, 0.8) + f'<circle cx="166" cy="320" r="5" fill="{SPARK}"></circle><circle cx="176" cy="290" r="5" fill="{SPARK}"></circle><circle cx="164" cy="262" r="5" fill="{SPARK}"></circle>'
         + lbl(171, 40, 'מחזירים את הקשב', size=11) + lbl(171, 80, 'שמים לב לפני שמגיבים', size=11) + lbl(171, 120, 'פוגשים את עצמנו בסבלנות', size=11) + lbl(171, 170, 'אתם מתרגלים', fill='#FFF1CC', size=11))
S[18] = (field(0.4) + walker(168, 290, 0.7) + sunmoon(127, 150, 1) + lbl(171, 40, 'לא ביום אחד', fill='#E3F4F0', size=12) + lbl(171, 100, 'אי אפשר ביום אחד', size=11))
S[19] = (field(1.0, stones_on=True) + walker(176, 236, 0.45) + sunmoon(127, 150, 3) + lbl(171, 40, 'מוכרת · ברורה · נגישה', fill='#FFF1CC'))

ACTS = [
  (1, 'Act 1 · A trail in the grass', [1, 2], 'Ruth wades into a field of tall grass where no path exists. She walks the same way again and again; the grass lies flat and a clear trail appears.'),
  (2, 'Act 2 · The brain does it too', [3, 4, 5, 6], 'Into the head cutaway: thinking, feeling and acting walk paths between brain cells, and repetition lights them up. Neuroplasticity. The old idea (the brain locks once grown up) is crossed out; Ruth\'s plant keeps growing.'),
  (3, 'Act 3 · Training the mind', [7, 8, 9], 'Ruth repeats a movement and the path in her brain gets brighter. Mental skills train the same way: mindfulness, attention on this moment, open and curious, without judging.'),
  (4, 'Act 4 · Drifting and coming back', [10, 11, 12], 'Attention drifts off on its balloon; noticing and bringing it back is the practice itself, and inside the head, each return walks the trail once more.'),
  (5, 'Act 5 · What research says', [13, 14, 15], 'Studied, also with Parkinson\'s: less stress, anxiety and low mood, better quality of life, change in attention and emotion areas. It doesn\'t cure Parkinson\'s; it\'s a tool in Ruth\'s backpack for the way.'),
  (6, 'Act 6 · One walk at a time', [16, 17, 18, 19], 'No need to be perfect: every return, every pause before reacting, every bit of patience is a step on the trail. Not in one day: day after day the trail becomes Ruth\'s path of stones.'),
]
SHOT = {
 1: ('A wide meadow (session 1\'s hills), but knee-high grass. Ruth, seen from behind with her backpack, pushes into it; no path ahead. Title: מפגש 30 · מיינדפולנס ונוירופלסטיות. Tag on "אין ממש שביל".', 'Ruth from behind with the backpack (1); the landscape of the path (1).', 'Grass sways; she wades in on "לפלס".'),
 2: ('Ruth walks the same line again and again (ghost copies, a small tally); each pass the grass lies flatter and a pale trail forms: שוב ושוב באותו מסלול → השביל נעשה ברור וקל יותר.', 'Same field.', 'Grass flattens on "העשב"; trail lightens on "ברור".'),
 3: ('The camera moves into Ruth\'s head (session 2\'s profile cutaway). Brain cells as dots; a faint dotted way between them. As לחשוב · להרגיש · לפעול appear, a pulse travels the same way again and again and it turns into a lit path: המסלול נעשה מוכר למוח.', 'The head cutaway from session 2 (bulb hidden).', 'Field trail dissolves into the brain path.'),
 4: ('A new little branch grows from the path to another cell: נוירופלסטיות (big tag), המוח משתנה ומסתגל.', 'Same cutaway.', 'Branch draws on "להשתנות ולהסתגל".'),
 5: ('A padlock sits on the head: פעם חשבו: המוח מפסיק להשתנות (struck through on "היום"). The lock springs open: היום יודעים: זה לא נכון.', 'Same.', 'Lock clicks open on "לא נכון".'),
 6: ('Back in Ruth\'s room: she smiles in her armchair while the plant by the window grows new leaves: המוח ממשיך ללמוד לאורך החיים · גם בגיל מבוגר · גם עם פרקינסון.', 'Room and the plant (every session).', 'A leaf on each phrase.'),
 7: ('Ruth stands and raises her arms, again and again (a tally counts); an inset of her head shows the movement path brightening: חוזרים על תנועה · לא רק השרירים · המוח לומד.', 'Arms that rise (session 5).', 'Inset pops on "המוח מתרגל".'),
 8: ('Ruth sits, eyes closed, inside the circle of attention: גם יכולות מנטליות אפשר לאמן · מיינדפולנס.', 'Circle of attention (3a).', 'Circle draws around her.'),
 9: ('The beam of attention (sessions 28–29) rests on this moment: לרגע הזה, then בפתיחות · בסקרנות; לשפוט appears and is struck through.', 'Beam (28–29), struck tags.', 'Strike on "לשפוט".'),
 10: ('A thought balloon floats off on its string: תשומת הלב נודדת · וזה טבעי.', 'Balloon (3a, 29).', 'Balloon drifts.'),
 11: ('A spark (session 2) as she notices; she reels the balloon gently back: ומחזירים בעדינות: זה התרגול עצמו. Then: לא רגע שבו התרגול השתבש (השתבש struck).', 'Spark (2), balloon.', 'Spark pops; string reels.'),
 12: ('Inside the head again: on שמים לב a pulse starts, on ומחזירים it runs the path, which glows brighter: זאת נוירופלסטיות · זאת למידה מוחית.', 'Head cutaway; the same path as Act 2.', 'Two pulses, on the two words.'),
 13: ('Ruth in her chair; research cards stack beside her; the tension meter (3b) sinks as מתח · חרדה · מצב הרוח appear, then איכות החיים. Tag: נחקר, גם אצל אנשים עם פרקינסון.', 'Meter from 3b.', 'Meter drops on "לעזור".'),
 14: ('Head cutaway: two regions glow, קשב and ויסות רגשי: שינויים בפעילות המוחית.', 'Head cutaway.', 'Regions glow on their words.'),
 15: ('Out on the path of stones: מיינדפולנס אינו מרפא פרקינסון (stated plainly, no animation trick). Then the mindfulness tool badge (session 1) clips onto Ruth\'s backpack: אבל עוזר להתאמן בהתמודדות.', 'Path, backpack and tool badges (1).', 'Badge flies to the backpack.'),
 16: ('The picture-perfect meditator (3a) fades out; Ruth, relaxed and imperfect, smiles: לא צריך לתרגל בצורה מושלמת.', 'Perfect picture (3a).', 'Frame falls away.'),
 17: ('The meadow again: Ruth walks the trail; each "אתם מתרגלים" leaves a bright footprint: מחזירים את הקשב · שמים לב לפני שמגיבים · פוגשים את עצמנו בסבלנות.', 'Field, trail.', 'A footprint on each phrase.'),
 18: ('Sun and moon pass over the meadow: day one, the trail is only partly worn: לא צריך ליצור את כל השביל ביום אחד → אי אפשר ביום אחד.', 'Day/night sky.', 'A day passes.'),
 19: ('Days pass; Ruth walks it each time; the trail becomes clear and turns into her path of stepping stones from session 1, lighting up: מוכרת · ברורה · נגישה.', 'The path of stones (1).', 'Stones rise out of the trail.'),
}
legend1 = ('0 0 342 360', field(0.6) + walker(170, 300, 0.8), '<strong>The trail in the grass.</strong> New for this film, built on session 1\'s landscape: each walk flattens the grass; by the end the trail is Ruth\'s path of stones.')
legend2 = ('0 0 342 360', profile_head(0.7), '<strong>The path in the brain.</strong> Session 2\'s head cutaway: a pulse runs between brain cells; every repetition makes it brighter.')
legend3 = ('0 0 342 360', ROOM + ruth(150) + string(160, 196, 260, 110) + balloon(266, 96), '<strong>The balloon.</strong> Attention drifting (3a, 28–29); noticing and coming back is one more walk along the trail.')
carried = ['<strong>Kept:</strong> the landscape and path of stones, Ruth from behind with the backpack and tool badges (1), the head cutaway and spark (2), circle of attention and perfect picture (3a), meter (3b), arms that rise (5), the plant, the beam and balloon (28–29).',
           '<strong>One metaphor, both ways:</strong> the field trail and the brain path are drawn alike (a pale line that brightens with each pass), so the cut between them reads as the same idea.',
           '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice. "Does not cure Parkinson\'s" is stated plainly.']
rows = build(B + 'S30Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 30 · מיינדפולנס ונוירופלסטיות',
      'Walk the same way through tall grass again and again and a trail appears. The brain does the same: what we repeat becomes a familiar path (neuroplasticity), at any age and with Parkinson\'s. In mindfulness every drift-and-return is one more walk; it doesn\'t need to be perfect, and it can\'t be done in a day.',
      'Ruth wades through tall grass → walking it again flattens a trail → the same kind of path lights up inside her head → an old lock on the brain springs open → she exercises and the path brightens → her attention drifts and she brings it back; the path glows → day after day the trail becomes her path of stones.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
set_height(B + 'S30Story.dc.html', 5230)
