# Session 43 storyboard: a pleasant moment — the birds were always there; what changes is attention. Explore one pleasant moment in feeling, body and thoughts.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S43.dc.html')
assert len(times) == 22
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
GREY = '#9AA3AD'

def tree(x=250):
    return (f'<rect x="{x - 8}" y="150" width="16" height="130" fill="#8C6A4A" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<path d="M{x} 200 L{x - 50} 170 M{x} 180 L{x + 46} 150" stroke="#8C6A4A" stroke-width="6" stroke-linecap="round"></path>'
            f'<circle cx="{x - 30}" cy="120" r="44" fill="#7FB58E" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x + 30}" cy="110" r="40" fill="#8CC09A" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x}" cy="80" r="40" fill="#97C9A4" stroke="{INK}" stroke-width="1.5"></circle>')

def bird(x, y, col=GREY, s=1.0, fly=False, ghost=False):
    op = ' opacity=".35"' if ghost else ''
    if fly:
        return f'<path d="M{x - 12 * s} {y} q{6 * s} {-8 * s} {12 * s} 0 q{6 * s} {-8 * s} {12 * s} 0" fill="none" stroke="{col if col != GREY else INK}" stroke-width="2.5" stroke-linecap="round"{op}></path>'
    return (f'<g{op}><path d="M{x + 8 * s} {y + 2 * s} l{14 * s} {6 * s} l{-12 * s} {2 * s}Z" fill="{col}" stroke="{INK}" stroke-width="1.2"></path>'
            f'<ellipse cx="{x}" cy="{y}" rx="{11 * s}" ry="{8 * s}" fill="{col}" stroke="{INK}" stroke-width="1.5"></ellipse>'
            f'<circle cx="{x - 9 * s}" cy="{y - 7 * s}" r="{6 * s}" fill="{col}" stroke="{INK}" stroke-width="1.5"></circle>'
            f'<path d="M{x - 15 * s} {y - 8 * s} l{-6 * s} {2 * s} l{6 * s} {2 * s}" fill="{AMBER}" stroke="{INK}" stroke-width="1"></path><circle cx="{x - 10 * s}" cy="{y - 8 * s}" r="1.4" fill="{INK}"></circle></g>')

def attn(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".18" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 6"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 6"></circle>'

def note(x, y):
    return f'<path d="M{x} {y} v-14 l8 -3 v14" fill="none" stroke="{INK}" stroke-width="1.8"></path><circle cx="{x - 3}" cy="{y}" r="3.5" fill="{INK}"></circle><circle cx="{x + 5}" cy="{y - 3}" r="3.5" fill="{INK}"></circle>'

def tok(x, y, r=10):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFE2A8" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x}" cy="{y}" r="{r * .5:.0f}" fill="{AMBER}"></circle>'

def heart(x, y, k=1.0, col='#E66A7A'):
    return f'<path d="M{x} {y + 12 * k} C{x - 22 * k} {y - 2 * k} {x - 12 * k} {y - 20 * k} {x} {y - 8 * k} C{x + 12 * k} {y - 20 * k} {x + 22 * k} {y - 2 * k} {x} {y + 12 * k}Z" fill="{col}" stroke="{INK}" stroke-width="1.5"></path>'

def cloud(x, y, inner='', fill='#FFFFFF'):
    return (f'<path d="M{x - 30} {y + 14} C{x - 46} {y + 14} {x - 46} {y - 10} {x - 28} {y - 12} C{x - 26} {y - 34} {x + 4} {y - 38} {x + 10} {y - 20} C{x + 24} {y - 34} {x + 46} {y - 22} {x + 40} {y - 4} C{x + 52} {y + 2} {x + 48} {y + 14} {x + 36} {y + 14}Z" fill="{fill}" stroke="{INK}" stroke-width="2"></path>' + inner)

def glow(x, y, r=20):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".45"></circle>'

def channels(lit=(0, 1, 2)):
    """Feeling, body, thoughts around seated Ruth (right to left: heart, body glow, thought cloud)."""
    o = heart(262, 120, 1.1, '#E66A7A' if 0 in lit else '#D7DCE2') + lbl(262, 158, 'רגש', size=11)
    if 1 in lit: o += glow(150, 250, 34)
    o += lbl(171, 300, 'גוף', size=11)
    o += cloud(86, 120, '', '#FFF1CC' if 2 in lit else '#FFFFFF') + lbl(86, 158, 'מחשבות', size=11)
    return o

def card(x, y, w, h, inner='', text=None):
    o = f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + inner
    if text: o += lbl(x, y + h / 2 - 2, text, size=10)
    return o

def radar(x, y, r):
    return (f'<path d="M{x - r} {y} A{r} {r} 0 0 1 {x + r} {y}Z" fill="#DDE6E3" stroke="{INK}" stroke-width="2"></path><path d="M{x - r * .6} {y} A{r * .6} {r * .6} 0 0 1 {x + r * .6} {y}" fill="none" stroke="{SLATE}" stroke-width="1.2"></path>'
            f'<line x1="{x}" y1="{y}" x2="{x + r * .7}" y2="{y - r * .7}" stroke="#4FA3A0" stroke-width="3"></line>')

ROOM = room() + chair()
SCENE = land() + tree(250)
S = {}
S[1] = SCENE + ruth(96, 'stand') + attn(250, 120, 70) + lbl(171, 30, 'מפגש 43 · להתבונן בחוויה נעימה', fill='#E3F4F0', size=12)
S[2] = SCENE + ruth(96, 'stand') + bird(220, 162) + lbl(220, 196, 'ציפור', size=12)
S[3] = (SCENE + ruth(96, 'stand', 'happy') + bird(220, 162, '#5B8DB8') + bird(290, 140, '#E66A7A', .8) + bird(250, 200, SPARK, .8) + note(306, 110) + note(186, 120)
        + bird(120, 70, INK, 1, True) + bird(160, 50, INK, .8, True) + lbl(290, 30, 'זנים · צבעים', size=11) + lbl(120, 30, 'קולות · מעוף', size=11))
S[4] = (SCENE + ruth(96, 'stand') + bird(220, 162, GREY, 1, ghost=True) + bird(290, 140, GREY, .8, ghost=True) + bird(250, 200, GREY, .8, ghost=True) + attn(250, 160, 60)
        + lbl(171, 30, 'הן היו שם כל הזמן', fill='#FFF1CC') + lbl(110, 110, 'מה שהשתנה: הקשב', size=11))
S[5] = (SCENE + ruth(96, 'stand', 'flat') + bird(220, 162, '#5B8DB8', ghost=True) + bird(290, 140, '#E66A7A', .8, ghost=True)
        + cloud(90, 70, '', '#C9CED6') + attn(90, 70, 50) + arrow(200, 120, 140, 90, AMBER) + lbl(171, 330, 'פחות ססגוניים מציפורים', size=12))
S[6] = bighead(f'<circle cx="171" cy="150" r="22" fill="#D9534F" stroke="{INK}" stroke-width="2"></circle><path d="M150 120 q-14 -14 0 -30 M192 120 q14 -14 0 -30" stroke="#D9534F" stroke-width="3" fill="none"></path>') + lbl(171, 300, 'הטיה מובנית', fill='#FFF1CC') + lbl(171, 334, 'מנגנון הישרדותי', size=12)
S[7] = (land() + f'<rect width="342" height="60" fill="#F6C9A8" opacity=".5"></rect>' + f'<ellipse cx="90" cy="300" rx="60" ry="14" fill="#B8DDB0" opacity=".6"></ellipse>'
        + f'<path d="M210 280 q-10 -50 30 -60 q20 -30 50 -6 q36 0 30 50 q0 20 -20 16Z" fill="#6E9E7C" stroke="{INK}" stroke-width="2"></path><circle cx="250" cy="250" r="3" fill="{INK}"></circle><circle cx="262" cy="250" r="3" fill="{INK}"></circle>'
        + attn(260, 250, 60) + lbl(260, 180, 'תנועה בין השיחים', fill='#FFF1CC', size=12) + lbl(90, 76, 'צבע יפה בשמיים', size=10) + lbl(90, 330, 'דשא נעים', size=10))
S[8] = (P + day_line(110, curve=False) + block(250, 110, 46, 30, GREY) + block(130, 110, 46, 30, GREY) + tok(196, 132, 7) + tok(80, 132, 7)
        + radar(171, 300, 110) + f'<line x1="40" y1="300" x2="302" y2="300" stroke="{INK}" stroke-width="1.5"></line>' + tok(120, 316, 8) + tok(220, 316, 8)
        + lbl(171, 40, 'הרגעים הנעימים נדחקים הצידה', fill='#FFF1CC', size=12) + lbl(171, 342, 'מתחת לרדאר', size=11))
S[9] = (P + day_line(160, curve=False) + block(250, 160, 46, 30, GREY) + block(130, 160, 46, 30, GREY) + tok(196, 160) + tok(80, 160)
        + f'<ellipse cx="171" cy="160" rx="150" ry="60" fill="{SPARK}" opacity=".16" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 6"></ellipse>'
        + phone_guide(290, 250) + lbl(171, 40, 'לאזן מעט את ההטיה', fill='#E3F4F0') + lbl(150, 270, 'לאמן את הקשב', size=12))
S[10] = ROOM + ruth(150) + channels() + lbl(171, 40, 'תרגול מיינדפולנס קצר', fill='#E3F4F0')
S[11] = (P + card(276, 150, 70, 90, f'<circle cx="276" cy="140" r="10" fill="{SPARK}"></circle>') + card(171, 150, 70, 90, tok(171, 140)) + card(66, 150, 70, 90, '')
         + attn(171, 142, 40) + lbl(171, 60, 'רגע נעים מהימים האחרונים', fill='#FFF1CC', size=12) + lbl(171, 240, 'לא צריך להיות רגע גדול', size=12))
G = [(276, 110, 'קפה', mug(276, 104)), (171, 110, 'הודעה', f'<rect x="160" y="84" width="22" height="34" rx="4" fill="{INK}"></rect><rect x="163" y="88" width="16" height="24" rx="2" fill="#FFF1CC"></rect>'),
     (66, 110, 'שיחה טובה', head(54, 104, 11, 'happy') + head(80, 104, 11, 'happy')), (276, 250, 'משהו שסיימתם', f'<path d="M262 244 l10 10 l20 -22" stroke="#5BAA6A" stroke-width="5" fill="none" stroke-linecap="round"></path>'),
     (171, 250, 'כמה דקות בשמש', f'<circle cx="171" cy="240" r="16" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>'), (66, 250, 'מחשבה נעימה', cloud(66, 246, '', '#FFF1CC'))]
S[12] = P + ''.join(card(x, y, 96, 110, art, txt) for x, y, txt, art in G)
S[13] = (ROOM + ruth(110) + card(250, 110, 120, 120, mug(250, 106) + f'<circle cx="276" cy="78" r="12" fill="{SPARK}"></circle>') + thought(130, 196, 200, 150)
         + f'<circle cx="230" cy="190" r="24" fill="#FFFFFF" fill-opacity=".3" stroke="{INK}" stroke-width="3"></circle><line x1="214" y1="206" x2="196" y2="224" stroke="{INK}" stroke-width="5" stroke-linecap="round"></line>' + lbl(171, 30, 'לחקור קצת יותר מקרוב', fill='#E3F4F0'))
S[14] = ROOM + ruth(150, mood='happy') + channels(lit=(0,)) + bubble(200, 40, 'אילו רגשות הרגשתי באותו רגע?', w=210, size=11, tail=False)
S[15] = ROOM + ruth(150, mood='happy') + channels(lit=(1,)) + bubble(171, 40, 'איפה הרגשתי את זה בגוף?', w=190, size=11, tail=False)
S[16] = ROOM + ruth(150, mood='happy') + channels(lit=(2,)) + bubble(171, 40, 'ומה עבר לי בראש?', w=150, size=11, tail=False)
S[17] = (P + card(260, 130, 120, 70) + f'<text x="260" y="134" text-anchor="middle" font-size="10" font-weight="600" fill="{INK}">לדעת שזו חוויה נעימה</text>' + arrow(196, 130, 150, 130, AMBER)
         + card(86, 130, 120, 70, '', None) + f'<text x="86" y="134" text-anchor="middle" font-size="10" font-weight="600" fill="{INK}">לשים לב איך אני חווה</text>'
         + heart(260, 250, .9) + glow(171, 250, 22) + cloud(86, 250, '', '#FFF1CC') + lbl(260, 290, 'רגש', size=10) + lbl(171, 290, 'גוף', size=10) + lbl(86, 290, 'מחשבות', size=10))
S[18] = (ROOM + ruth(150, mood='flat') + card(260, 110, 90, 90, f'<text x="260" y="122" text-anchor="middle" font-size="34" font-weight="700" fill="{SLATE}">?</text>') + heart(86, 110, 1, '#D7DCE2')
         + f'<text x="86" y="114" text-anchor="middle" font-size="16" font-weight="700" fill="{INK}">?</text>' + lbl(171, 30, 'זה יכול לקחת זמן', fill='#FFF1CC'))
S[19] = (ROOM + ruth(150) + card(240, 110, 120, 110, mug(240, 108) + f'<path d="M184 150 q28 -12 56 0 t56 0" stroke="#5B8DB8" stroke-width="4" fill="none"></path>') + lbl(90, 90, 'עצב · געגוע', size=11)
         + lbl(171, 30, 'העיקר זה החקירה', fill='#E3F4F0'))
S[20] = (P + day_line(160, curve=False) + tok(250, 160) + tok(171, 160) + tok(92, 160) + attn(171, 160, 36) + glow(250, 160, 18)
         + head(171, 250, 22, 'happy') + lbl(171, 40, 'בזמן שהם קורים', fill='#FFF1CC') + lbl(171, 300, 'הקשב נעשה מיומן', size=12))
S[21] = (SCENE + ruth(96, 'stand', 'happy') + bird(220, 162, '#5B8DB8') + bird(290, 140, '#E66A7A', .8) + bird(250, 200, SPARK, .8) + bird(120, 70, INK, 1, True)
         + tok(40, 240, 8) + tok(70, 270, 8) + lbl(171, 30, 'נוחות · עניין · הנאה · חיבור', fill='#FFF1CC', size=12) + lbl(150, 330, 'בדיוק כמו עם הציפורים', size=11))
S[22] = SCENE + ruth(96, 'stand', 'happy') + bird(150, 140, '#5B8DB8') + attn(150, 140, 30) + lbl(171, 30, 'טבע שני', fill='#E3F4F0') + lbl(250, 330, 'בואו נתחיל', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · Birds everywhere', [1, 2, 3, 4], 'Ruth by a tree on her path. At first just a bird; once she\'s interested, colours, songs and flight everywhere. They were always there: her attention changed.'),
  (2, 'Act 2 · Built to spot danger', [5, 6, 7, 8], 'Attention drifts to the grey. Inside the head, the alarm from session 7: rustling bushes beat a pink sky. Pleasant moments slip under the radar.'),
  (3, 'Act 3 · The practice', [9, 10, 11, 12], 'Ariel introduces a short practice: one pleasant moment from recent days, felt in feeling, body and thoughts. Small moments count.'),
  (4, 'Act 4 · Look closer', [13, 14, 15, 16, 17], 'Ruth recalls one moment and explores it, one channel at a time: feeling, body, thoughts. From knowing it was pleasant to noticing how.'),
  (5, 'Act 5 · It takes time', [18, 19], 'Sometimes nothing comes, or no words; sometimes sadness or longing come along too. The exploring is what counts.'),
  (6, 'Act 6 · A trained eye', [20, 21, 22], 'With practice, attention catches pleasant moments as they happen, like the birds, until it is second nature.'),
]
SHOT = {
 1: ('Ruth on her path beside a tree; the circle of attention hovers over it. Title: מפגש 43 · להתבונן בחוויה נעימה.', 'The path world (1) and the circle of attention (3a).', 'Fade in from the room window to the path.'),
 2: ('One small grey bird on a branch. Tag: ציפור.', 'Same tree.', 'Bird hops on on "ציפור".'),
 3: ('The bird gains colour; more birds in different colours, notes for their songs, wings in flight. Tags: זנים · צבעים · קולות · מעוף.', 'Same tree.', 'Each appears on its word.'),
 4: ('Rewind: the same tree, the birds faint but already there. The circle of attention passes over and they light up. הן היו שם כל הזמן · מה שהשתנה: הקשב.', 'Circle of attention.', 'Colour drains, then returns under the circle.'),
 5: ('The circle drifts away from the birds to a grey cloud: פחות ססגוניים מציפורים.', 'Circle of attention.', 'Circle slides away; birds fade.'),
 6: ('Into the head: the alarm light from session 7 flashes. Tags: הטיה מובנית · מנגנון הישרדותי.', 'Head cutaway and alarm (2, 7).', 'Dip into the head.'),
 7: ('Back outside: a bush rustles and the circle snaps onto it; the pink sky and a soft patch of grass fade unseen. תנועה בין השיחים.', 'Circle of attention.', 'Bush shakes; circle snaps.'),
 8: ('A day line: grey moments loom large; warm ones are pushed down, slipping under a radar sweep. מתחת לרדאר.', 'Day line, warm tokens and grey blocks (42).', 'Warm tokens slide below the sweep.'),
 9: ('Ariel on Ruth\'s phone. The circle of attention widens to take in the warm tokens too: לאזן מעט את ההטיה · לאמן את הקשב.', 'Ariel on the phone (3).', 'Circle widens.'),
 10: ('Ruth in her chair with three channels around her, right to left: heart (רגש), a glow in her body (גוף), a thought cloud (מחשבות).', 'Room; channels as in session 6.', 'Channels light one by one.'),
 11: ('Three day cards from recent days; the circle picks a small one: לא צריך להיות רגע גדול.', 'Day cards (3a).', 'Cards deal in; circle settles.'),
 12: ('Six small cards, one per example, right to left: קפה · הודעה · שיחה טובה · משהו שסיימתם · כמה דקות בשמש · מחשבה נעימה.', 'Same cards.', 'Each pops on its word.'),
 13: ('Ruth recalls one card, the coffee in the sun, as a memory bubble; a magnifier moves over it: לחקור קצת יותר מקרוב.', 'Room; the mug from session 5.', 'Card floats up into her thought.'),
 14: ('The heart channel lights warm: אילו רגשות הרגשתי באותו רגע?', 'Channels.', 'Heart glows.'),
 15: ('A soft glow spreads in Ruth\'s body: איפה הרגשתי את זה בגוף?', 'Channels.', 'Glow spreads.'),
 16: ('The thought cloud lights: ומה עבר לי בראש?', 'Channels.', 'Cloud glows.'),
 17: ('Two cards: לדעת שזו חוויה נעימה → לשים לב איך אני חווה אותה, with all three channels lit beneath.', 'Channels.', 'Arrow draws right to left.'),
 18: ('A memory card with only a question mark; a grey heart with "?": זה יכול לקחת זמן.', 'Channels.', 'Card flips, stays blank.'),
 19: ('The coffee memory, with a blue wave through its warmth: עצב · געגוע. Tag: העיקר זה החקירה.', 'Memory card.', 'Blue wave washes in, card stays.'),
 20: ('Ruth\'s day passes; the circle of attention now catches warm tokens as they happen: בזמן שהם קורים.', 'Day line, circle.', 'Circle pings each token.'),
 21: ('Small warm moments: נוחות · עניין · הנאה · חיבור; then back to the tree, full of birds: בדיוק כמו עם הציפורים.', 'Tree and birds from Act 1.', 'Cut back to the tree.'),
 22: ('A coloured bird lands near Ruth; she notices it at once. טבע שני · בואו נתחיל.', 'Tree, circle.', 'Bird lands; hold.'),
}
legend1 = ('0 40 342 220', SCENE + bird(220, 162, '#5B8DB8') + bird(290, 140, '#E66A7A', .8), '<strong>The birds.</strong> Always there; seen once attention turns to them. The film opens and closes with them.')
legend2 = ('0 0 342 360', P + attn(171, 180, 120), '<strong>The circle of attention.</strong> From session 3a: where Ruth\'s attention goes, things light up.')
legend3 = ('0 60 342 260', ROOM + ruth(150) + channels(), '<strong>Feeling, body, thoughts.</strong> Three places a pleasant moment shows up, lit one at a time.')
carried = ['<strong>Kept:</strong> Ruth\'s room and path, the circle of attention (3a), the head cutaway and alarm (2, 7), the day line with warm tokens and grey blocks (42), Ariel on the phone (3).',
           '<strong>Examples</strong> are exactly the ones Ariel names.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S43Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 43 · להתבונן בחוויה נעימה',
      'Pleasant moments are like the birds: always there, but our attention, built to spot danger, lets them slip by. Stopping to explore one pleasant moment in feeling, body and thoughts trains attention to notice them as they happen.',
      'One grey bird → birds everywhere once she is interested → they were always there → attention drifts to danger and the grey → one pleasant moment, explored: heart, body, thought → with practice the circle catches warm moments → the tree full of birds.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
# preview height measured with headless Chrome (content height of the board)
f = B + 'S43Story.dc.html'; page = open(f, encoding='utf-8').read(); open(f, 'w', encoding='utf-8').write(page.replace('"height":4700', '"height":4960'))
