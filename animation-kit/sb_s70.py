# Session 70 storyboard: calming the body — Ruth's body holds tension she doesn't notice (brow, jaw, held breath, shoulders);
# the tension meter from sessions 3b and 14 climbs; a scan finds it and she lets some go; simple everyday things help; not total calm, just a lower gear.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S70.dc.html')
assert len(times) == 12
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
RED = '#D9534F'

def meter(x, y, level, h=110):
    """The tension meter from sessions 3b and 14: red fill, level 0..1."""
    fh = (h - 10) * level
    return (f'<rect x="{x - 12}" y="{y - h}" width="24" height="{h}" rx="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - 7}" y="{y - 5 - fh:.0f}" width="14" height="{fh:.0f}" rx="7" fill="{RED}"></rect>')

def tense(x, y=212):
    return f'<path d="M{x - 26} {y + 20} l6 -6 l6 6 M{x + 14} {y + 20} l6 -6 l6 6" stroke="{RED}" stroke-width="2" fill="none"></path>'

def scanline(x, y, w=70):
    return f'<rect x="{x - w / 2}" y="{y - 5}" width="{w}" height="10" rx="5" fill="{AMBER}" opacity=".35"></rect><line x1="{x - w / 2}" y1="{y}" x2="{x + w / 2}" y2="{y}" stroke="{AMBER}" stroke-width="2.5"></line>'

def seat(x=150, mood='calm', lvl=0.5, marks=False):
    o = room() + chair() + ruth(x, mood=mood) + meter(300, 300, lvl)
    if marks: o += tense(x)
    return o

def bigface(brow=False, jaw=False, puff=False):
    """A close-up of Ruth's face (her own drawing, closer), with a furrowed brow and a clenched jaw."""
    o = (P + f'<path d="M60 360 Q60 250 171 246 Q282 250 282 360Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>'
         f'<path d="M95 150 Q92 70 171 66 Q250 70 247 150 Q240 110 171 104 Q102 110 95 150Z" fill="#C8CCD2" stroke="{INK}" stroke-width="2"></path>'
         f'<ellipse cx="171" cy="166" rx="74" ry="80" fill="{SKIN}" stroke="{INK}" stroke-width="2"></ellipse>'
         f'<path d="M97 140 Q100 84 171 80 Q242 84 245 140 Q220 104 171 102 Q122 104 97 140Z" fill="#C8CCD2" stroke="{INK}" stroke-width="2"></path>'
         f'<circle cx="146" cy="160" r="20" fill="none" stroke="{INK}" stroke-width="3"></circle><circle cx="196" cy="160" r="20" fill="none" stroke="{INK}" stroke-width="3"></circle><circle cx="146" cy="160" r="4" fill="{INK}"></circle><circle cx="196" cy="160" r="4" fill="{INK}"></circle>'
         + ('' if jaw else f'<path d="M156 204 Q171 212 186 204" stroke="{INK}" stroke-width="3" fill="none" stroke-linecap="round"></path>'))
    if brow: o += f'<path d="M126 128 L156 140 M216 128 L186 140 M166 112 v14 M176 112 v14" stroke="{INK}" stroke-width="3" fill="none" stroke-linecap="round"></path>' + f'<path d="M120 96 l6 -8 l6 8 l6 -8 M210 96 l6 -8 l6 8 l6 -8" stroke="{RED}" stroke-width="2.5" fill="none"></path>'
    if jaw: o += f'<path d="M150 206 H192" stroke="{INK}" stroke-width="4" stroke-linecap="round"></path><path d="M98 196 l6 -6 l6 6 M234 196 l6 -6 l6 6" stroke="{RED}" stroke-width="2.5" fill="none"></path>'
    if puff: o += f'<path d="M250 200 q14 8 0 18 M266 194 q20 14 0 32" stroke="#4FA3A0" stroke-width="3" fill="none" stroke-linecap="round"></path>'
    return o

def badge(x, y, k, r=18):
    """Everyday helpers as round badges: breath, stretch, music, shower, a walk outside; then rest, recover, sleep."""
    c = ['#B3EFE4', '#D6EBC8', '#FFDEA3', '#DCEBF2', '#E3F4F0', '#F1D9A6', '#CFE6CF', '#D7DCE2'][k]
    g = ['<path d="M-9 -3 q4 -6 9 0 t9 0 M-9 4 q4 -6 9 0 t9 0" fill="none" stroke="#3B4450" stroke-width="2"></path>',
         '<circle cx="0" cy="-6" r="3.5" fill="#3B4450"></circle><path d="M0 -2 V8 M0 8 l-5 7 M0 8 l5 7 M0 0 l-8 -9 M0 0 l8 -9" stroke="#3B4450" stroke-width="2" fill="none" stroke-linecap="round"></path>',
         '<path d="M-3 8 V-8 L8 -10 V5" fill="none" stroke="#3B4450" stroke-width="2"></path><circle cx="-6" cy="8" r="3.5" fill="#3B4450"></circle><circle cx="5" cy="5" r="3.5" fill="#3B4450"></circle>',
         '<path d="M-8 -6 Q0 -14 8 -6Z" fill="#3B4450"></path><path d="M-5 0 v3 M0 1 v4 M5 0 v3 M-3 7 v3 M3 7 v3" stroke="#4FA3A0" stroke-width="2" stroke-linecap="round"></path>',
         '<ellipse cx="-4" cy="6" rx="7" ry="3" fill="#D9CBB0" stroke="#3B4450" stroke-width="1.2"></ellipse><ellipse cx="5" cy="-3" rx="5" ry="2.4" fill="#D9CBB0" stroke="#3B4450" stroke-width="1.2"></ellipse><circle cx="6" cy="-10" r="3" fill="#E8A33D"></circle>',
         '<path d="M-9 8 V-2 Q-9 -6 -5 -6 H5 Q9 -6 9 -2 V8Z" fill="#E7DCCB" stroke="#3B4450" stroke-width="1.5"></path>',
         '<rect x="-5" y="-9" width="10" height="17" rx="2" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></rect><rect x="-3" y="-3" width="6" height="9" fill="#5BAA6A"></rect>',
         '<path d="M2 -9 a9 9 0 1 0 6 13 a7 7 0 1 1 -6 -13Z" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></path>'][k]
    return f'<g transform="translate({x} {y})"><circle r="{r}" fill="{c}" stroke="{INK}" stroke-width="1.5"></circle><g transform="scale({r / 18})">{g}</g></g>'

def dial(x, y, a):
    return (f'<path d="M{x - 40} {y} A40 40 0 0 1 {x + 40} {y}" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path><path d="M{x + 28} {y - 28} A40 40 0 0 1 {x + 40} {y}" fill="none" stroke="{RED}" stroke-width="5"></path>'
            f'<line x1="{x}" y1="{y}" x2="{x + 34 * math.cos(math.radians(180 + a)):.0f}" y2="{y + 34 * math.sin(math.radians(180 + a)):.0f}" stroke="{INK}" stroke-width="3" stroke-linecap="round"></line><circle cx="{x}" cy="{y}" r="5" fill="{AMBER}"></circle>')

def can(x, y):
    return f'<path d="M{x} {y} h22 l-2 20 h-18Z" fill="#B7D3C6" stroke="{INK}" stroke-width="1.5"></path><path d="M{x + 22} {y + 4} l16 -8" stroke="{INK}" stroke-width="2"></path>'

def calendar(x, y):
    return f'<rect x="{x - 16}" y="{y - 14}" width="32" height="30" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><rect x="{x - 16}" y="{y - 14}" width="32" height="8" rx="3" fill="{AMBER}"></rect>'

S = {}
S[1] = bigface(brow=True, jaw=True) + lbl(171, 26, 'מפגש 70 · להרגיע את הגוף', fill='#E3F4F0', size=12) + lbl(80, 70, 'המצח מכווץ', size=11) + lbl(270, 250, 'הלסתות מהודקות', size=11)
S[2] = bigface(puff=True) + lbl(171, 40, 'נשימה ממש גדולה', fill='#FFF1CC', size=12) + lbl(171, 300, 'החזקנו את האוויר בלי לשים לב', size=10)
S[3] = (seat(lvl=0.75, marks=True) + f'<path d="M232 120 C220 120 218 104 228 100 C226 88 244 84 250 92 C256 82 274 86 272 98 C282 100 280 116 268 116Z" fill="#9AA3AD" stroke="{INK}" stroke-width="1.5"></path>'
        + tremor(178, 250) + f'<rect x="18" y="150" width="64" height="56" rx="4" fill="#3F4A63"></rect>' + lbl(250, 70, 'לחץ', size=11) + lbl(171, 40, 'הגוף מחזיק מתח', fill='#FFF1CC', size=12) + lbl(196, 150, 'סימפטומים', size=10) + lbl(52, 130, 'יום קשה', size=10))
S[4] = room() + ruth(110, 'stand', 'flat') + tense(110, 184) + can(128, 236) + f'<circle cx="160" cy="300" r="2" fill="#4FA3A0"></circle><circle cx="170" cy="310" r="2" fill="#4FA3A0"></circle>' + meter(300, 300, 0.75) + lbl(171, 40, 'דרוכים', size=12) + lbl(200, 110, 'משפיע על התפקוד', size=11)
S[5] = (room() + ruth(110, 'stand', 'happy') + scanline(110, 230) + can(128, 236) + f'<path d="M160 270 l4 20 M168 268 l4 22" stroke="#4FA3A0" stroke-width="2" stroke-dasharray="3 3"></path>' + meter(300, 300, 0.5)
        + lbl(80, 110, 'לזהות', fill='#FFF1CC', size=11) + lbl(200, 110, 'לשחרר חלק', fill='#FFF1CC', size=11) + lbl(171, 40, 'ההרגשה · התפקוד', size=11) + lbl(171, 340, 'עם הזמן, הגוף לומד בעצמו', fill='#E3F4F0', size=10))
S[6] = (room(door_open=True) + ruth(171, 'stand', 'happy') + f'<path d="M154 214 L136 176 M188 214 L206 176" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>'
        + ''.join(badge(x, 70, k) for k, x in enumerate([300, 236, 171, 106, 42])) + lbl(300, 104, 'נשימה או אנחה', size=8) + lbl(236, 128, 'מתיחה או תנועה', size=8) + lbl(171, 104, 'מוזיקה', size=8) + lbl(106, 128, 'מקלחת', size=8) + lbl(42, 104, 'סיבוב בחוץ', size=8))
S[7] = room() + ruth(90, 'stand', 'happy') + friend(171) + friend(252, '#B07AA1', '#8A8F99') + badge(90, 150, 2) + badge(171, 150, 4) + badge(252, 150, 1) + lbl(171, 40, 'לכל אחד עוזר משהו אחר', fill='#FFF1CC', size=11)
S[8] = seat(lvl=0.45) + dial(230, 110, 140) + arrow(256, 96, 244, 120, SLATE) + lbl(230, 40, 'להוריד הילוך', fill='#FFF1CC', size=11) + lbl(80, 80, 'רוגע מוחלט', size=10) + strike(80, 80, 70)
S[9] = P + day_line(240, curve=False) + badge(260, 140, 5, 22) + badge(171, 140, 6, 22) + badge(82, 140, 7, 22) + ruth(171, 'stand').replace('186', '186') + lbl(260, 100, 'הפסקה', size=10) + lbl(171, 100, 'להתאושש', size=10) + lbl(82, 100, 'לשינה', size=10)
S[10] = seat(lvl=0.6, marks=True) + scanline(150, 230) + lbl(80, 40, 'לזהות', fill='#FFF1CC', size=11) + lbl(240, 40, 'לשחרר קצת', fill='#FFF1CC', size=11)
S[11] = seat(lvl=0.35) + calendar(176, 70) + scanline(150, 200) + lbl(171, 130, 'המוח והגוף לומדים', size=10) + lbl(171, 340, 'יותר בקלות ובטבעיות', fill='#FFF1CC', size=11)
S[12] = (room() + chair() + ruth(80) + f'<rect x="170" y="40" width="130" height="250" rx="20" fill="{INK}"></rect><rect x="180" y="56" width="110" height="220" rx="10" fill="#F4F1EA"></rect>'
         + badge(235, 100, 0) + badge(235, 160, 1) + scanline(235, 220, 50) + lbl(171, 330, 'איזה בא לכם לנסות?', fill='#FFF1CC', size=12))

ACTS = [
  (1, 'Act 1 · Without noticing', [1, 2], 'Close on Ruth in her armchair: her brow furrows and her jaw clenches on Ariel\'s words; then she lets out a big breath she was holding.'),
  (2, 'Act 2 · The body holds it', [3, 4], 'The camera pulls back to the room and the tension meter. Stress, symptoms or a hard day: each raises the meter and tightens her shoulders. On guard, even watering the plant is stiff.'),
  (3, 'Act 3 · Notice and let go', [5], 'A soft scan line finds the tension; she lets some of it go, the meter drops a notch, and the watering flows. With time the body learns to do it by itself.'),
  (4, 'Act 4 · Simple, everyday', [6, 7], 'Five everyday helpers pop up as badges while Ruth acts them out: a sigh, a stretch, music, a shower, a walk outside. Each person finds a different one.'),
  (5, 'Act 5 · A lower gear', [8, 9], 'Not total calm: the dial just shifts down a notch. Across the day: a break, recovering after effort, getting ready for sleep.'),
  (6, 'Act 6 · Practise', [10, 11, 12], 'Back in the armchair: the scan finds tension, she releases a little. Day after day it comes easier. Her phone: which one to try?'),
]
SHOT = {
 1: ('Close on Ruth in her armchair. On "המצח" two brow lines pull together with small red marks; on "והלסתות" her mouth sets in a tight line with marks at the jaw. Title: מפגש 70 · להרגיע את הגוף.', 'Ruth\'s room and armchair; red tension marks (session 14).', 'Open close on her face.'),
 2: ('Still close: she sits frozen for a moment, cheeks held; on "נשימה גדולה" her chest lifts, then a long breath out with breath lines. Tags: נשימה ממש גדולה · החזקנו את האוויר בלי לשים לב.', 'Breath lines (session 14).', 'Camera pulls back at the end.'),
 3: ('The whole room; the tension meter at the right with its "מתח" tag. Red marks at her shoulders. A grey worry cloud (לחץ), tremor at her hand (סימפטומים), the window going dark (יום קשה): the meter climbs on each.', 'Tension meter (3b, 14), worry cloud (66), tremor (3a), night window (14).', 'One cause per phrase.'),
 4: ('Ruth stands to water the plant, shoulders up, the can shaking; drops miss the pot. Tags: דרוכים · משפיע על איך שאנחנו מתפקדים.', 'Watering can and plant (session 1).', 'She rises from the chair.'),
 5: ('A soft scan line passes down her body; the marks glow (לזהות), then melt away (לשחרר חלק): shoulders drop, meter falls a notch, the water flows into the pot and the plant perks up (ההרגשה · התפקוד). Then the scan passes by itself and the marks fade sooner: עם הזמן, הגוף לומד לעשות את זה בעצמו.', 'Scan line (session 14); meter.', 'Scan sweeps, marks fade.'),
 6: ('Five badges pop across the top, right to left, each with its tag while Ruth acts it out: a long sigh, arms up in a stretch, the radio plays notes, a shower badge, the door opens to the light outside.', 'Badge style of the tools (sessions 1, 14); the room\'s door and radio.', 'One badge per phrase.'),
 7: ('Ruth with her two friends; one badge settles over each, a different one for each: פשוטים ויום־יומיים · לכל אחד עוזר משהו אחר.', 'The friends (session 5).', 'Badges float down.'),
 8: ('Back in the armchair. A tag "רוגע מוחלט" is struck through; a dial beside the meter shifts down a notch and the meter dips: להוריד הילוך.', 'Meter; the dial (3a).', 'Pointer drops a notch.'),
 9: ('The day line, sun to moon; Ruth walks under three badges as they pop: לקחת הפסקה · להתאושש אחרי מאמץ · להתכונן לשינה.', 'Day line and the use badges from session 14.', 'Badges pop on each phrase.'),
 10: ('Armchair again: the scan line passes, the marks glow and then fade: לזהות · לשחרר קצת.', 'Scan, meter.', 'Scan sweeps.'),
 11: ('The wall calendar flips day after day; each time the scan passes, the marks fade sooner and the meter dips more easily: המוח והגוף לומדים · יותר בקלות ובטבעיות.', 'Calendar (3a); meter.', 'Pages flip.'),
 12: ('Her phone rises with three practice cards (a scan, a breath, a stretch): איזה בא לכם לנסות?', 'The phone with choices (sessions 64, 66).', 'Phone rises; hold.'),
}
legend1 = ('0 0 342 360', seat(lvl=0.7, marks=True), '<strong>Ruth and the tension meter.</strong> The meter from sessions 3b and 14 and red marks where her body holds tension.')
legend2 = ('0 0 342 360', P + scanline(171, 180, 200) + head(171, 120, r=30), '<strong>The scan line.</strong> Noticing where the body holds tension, as in session 14; then letting some of it go.')
legend3 = ('0 40 342 80', P + ''.join(badge(x, 70, k, 22) for k, x in enumerate([300, 236, 171, 106, 42])), '<strong>Everyday helpers.</strong> Ariel\'s five examples, as badges in the tool style.')
carried = ['<strong>Kept:</strong> Ruth\'s room, armchair and plant, the tension meter, red tension marks, scan line, the day line and the use badges (session 14), the friends (5), the dial (3a).',
           '<strong>Content:</strong> every tag is Ariel\'s words; the helpers and uses are the ones he names.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S70Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 70 · להרגיע את הגוף',
      'Our bodies often hold tension without our noticing: a furrowed brow, a clenched jaw, a held breath. Noticing it and helping the body let some of it go can help how we feel and function. Simple everyday things can help; the aim isn\'t total calm, just a lower gear, and with practice it comes more easily.',
      'Ruth\'s brow and jaw tighten, then a big held breath → the tension meter rises with stress, symptoms, a hard day → stiff, she struggles to water the plant → a scan finds the tension, she lets some go, the water flows → five everyday helpers → each person a different one → not zero, a lower gear → a break, recovery, sleep → with practice it comes easier → her phone: which one?',
      [legend1, legend2, legend3], carried, 'How it fits the program')
H = 5220
p = B + 'S70Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))
print('rows', rows)
