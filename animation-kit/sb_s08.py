# Session 8 storyboard: balancing thoughts — hard thoughts light only one corner of the picture; balanced thinking widens the light, the hard part stays, more colours join it.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S08.dc.html')
assert len(times) == 14
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
TAL = '#6E8FB0'; TAL_HAIR = '#4A3A30'

def card(x, y, text, kind='harsh', w=None, size=11):
    return thought_card(x, y, text, kind, w=w).replace('font-size="13"', f'font-size="{size}"')

def spot(cx, cy, r, a=.62):
    """Everything dark except one circle of light."""
    return f'<path d="M0 0 H342 V360 H0Z M{cx - r} {cy} a{r} {r} 0 1 0 {2 * r} 0 a{r} {r} 0 1 0 {-2 * r} 0Z" fill="#1F2A33" fill-opacity="{a}" fill-rule="evenodd"></path>'

_pic = [0]
def picture(lit=None, colour=False, x=46, y=70, w=250, h=180):
    """A framed picture of Ruth's path landscape (inner box x, y, w, h); lit = (cx, cy, r) in full-size coordinates leaves only that part in the light."""
    _pic[0] += 1; cid = f'pic{_pic[0]}'
    k = w / 250
    inner = (f'<g transform="scale({w / 342:.3f} {h / 360:.3f})">{land(sun=True)}{stones(PATH)}</g>'
             f'<g transform="scale({k:.3f}) translate(-46 -70)"><path d="M226 92 C214 92 214 76 228 74 C230 60 250 58 256 70 C266 62 282 70 278 82 C290 84 290 98 276 98Z" fill="#9AA3AD" stroke="{INK}" stroke-width="1.5"></path>'
             f'<path d="M236 104 l-4 10 M250 104 l-4 10 M264 104 l-4 10" stroke="#6C7884" stroke-width="2" stroke-linecap="round"></path></g>')
    if not colour and lit is None:
        inner = f'<g opacity=".55" style="filter: grayscale(1)">{inner}</g>'
    o = (f'<rect x="{x - 8}" y="{y - 8}" width="{w + 16}" height="{h + 16}" rx="6" fill="#C9805A" stroke="{INK}" stroke-width="2.5"></rect>'
         f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}"></rect></clipPath><g clip-path="url(#{cid})"><g transform="translate({x} {y})">{inner}</g>')
    if lit:
        cx, cy, r = lit
        o += f'<path d="M{x} {y} H{x + w} V{y + h} H{x}Z M{cx - r} {cy} a{r} {r} 0 1 0 {2 * r} 0 a{r} {r} 0 1 0 {-2 * r} 0Z" fill="#1F2A33" fill-opacity=".7" fill-rule="evenodd"></path>'
    return o + '</g>'

def wall():
    return (f'<rect width="342" height="360" fill="#F6EFE4"></rect><rect y="300" width="342" height="60" fill="{FLOOR}"></rect><line x1="0" y1="300" x2="342" y2="300" stroke="{INK}" stroke-width="2"></line>'
            f'<rect x="230" y="70" width="70" height="60" rx="4" fill="#DCEBF2" stroke="{INK}" stroke-width="2"></rect>')

def table(x1=50, x2=292, y=262, dishes=2, plates=4):
    o = f'<rect x="{x1}" y="{y}" width="{x2 - x1}" height="14" rx="5" fill="#C9805A" stroke="{INK}" stroke-width="2"></rect><path d="M{x1 + 14} {y + 14} V300 M{x2 - 14} {y + 14} V300" stroke="{INK}" stroke-width="5"></path>'
    for k in range(plates):
        px = x1 + 30 + k * (x2 - x1 - 60) / max(plates - 1, 1)
        o += f'<ellipse cx="{px:.0f}" cy="{y - 2}" rx="15" ry="4" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></ellipse>'
    for k in range(dishes):
        dx = (x1 + x2) / 2 - 24 + k * 48
        o += f'<path d="M{dx - 16} {y - 2} Q{dx} {y - 22} {dx + 16} {y - 2}Z" fill="{AMBER}" stroke="{INK}" stroke-width="1.5"></path>'
    return o

def tal(x, mood='calm', tag=True):
    f = friend(x, TAL, TAL_HAIR)
    if mood == 'flat': f = f.replace(f'Q{x} 197 {x + 5} 192', f'L{x} 193 {x + 5} 193')
    return f + (lbl(x, 152, 'טל', fill='#FFFFFF', size=12) if tag else '')

def family(xs, cols=(('#8DB7A2', '#6B4E3D'), ('#B07AA1', '#8A8F99'), ('#E3B26B', '#3B2A24'))):
    return ''.join(friend(x, *cols[k % len(cols)]) for k, x in enumerate(xs))

def pots(x, y, n=4):
    o = ''
    for k in range(n):
        px = x + (k % 2) * 34 - 17; py = y - (k // 2) * 26
        o += f'<rect x="{px - 16}" y="{py - 20}" width="32" height="22" rx="4" fill="#8996A5" stroke="{INK}" stroke-width="1.5"></rect><path d="M{px - 22} {py - 14} h6 M{px + 16} {py - 14} h6" stroke="{INK}" stroke-width="2"></path>'
    return o

def bowl(x, y):
    return f'<path d="M{x - 16} {y} Q{x} {y + 18} {x + 16} {y}Z" fill="{AMBER}" stroke="{INK}" stroke-width="1.5"></path>'

def reed_badge(x, y):
    return (f'<circle cx="{x}" cy="{y}" r="30" fill="#FFF1CC" stroke="{INK}" stroke-width="2"></circle><path d="M{x} {y + 22} C{x} {y + 6} {x + 4} {y - 8} {x + 12} {y - 20}" stroke="#6E9E58" stroke-width="5" fill="none" stroke-linecap="round"></path>'
            f'<path d="M{x + 12} {y - 20} C{x + 20} {y - 22} {x + 24} {y - 16} {x + 21} {y - 12} C{x + 16} {y - 12} {x + 13} {y - 15} {x + 12} {y - 20}Z" fill="#6E9E58"></path>')

def nira_phone(x, y):
    return (f'<rect x="{x}" y="{y}" width="40" height="64" rx="7" fill="{INK}"></rect><rect x="{x + 4}" y="{y + 6}" width="32" height="50" rx="4" fill="#FFE9C2"></rect>'
            f'<circle cx="{x + 20}" cy="{y + 26}" r="8" fill="{SKIN}"></circle><path d="M{x + 11} {y + 26} C{x + 9} {y + 12} {x + 31} {y + 12} {x + 29} {y + 26}Z" fill="#5A3A2E"></path><path d="M{x + 10} {y + 52} v-12 q10 -8 20 0 v12Z" fill="{NIRA}"></path>')

DINNER = wall() + family((86, 140, 254)) + tal(196) + table()

S = {}
S[1] = (room() + chair() + ruth(150, mood='flat') + lbl(171, 30, 'מפגש 8 · איזון מחשבות', fill='#E3F4F0')
        + card(250, 76, '"זה לא יהיה כמו פעם"', w=150) + card(92, 120, '"אני לא אצליח"', w=120) + card(244, 140, '"בשביל מה בכלל לנסות?"', w=160))
S[2] = P + picture(lit=(250, 86, 40)) + lbl(171, 34, 'רק חלק מהתמונה', fill='#FFF1CC') + lbl(171, 290, 'קשה · מתסכל · מדאיג', size=12)
S[3] = (land() + stones(PATH) + ruth(96, 'stand', 'flat') + arrow(130, 300, 112, 300, '#D9534F')
        + lbl(262, 70, 'איך שמרגישים', size=11) + lbl(262, 104, 'הביטחון', size=11) + lbl(262, 138, 'המוטיבציה', size=11) + lbl(262, 172, 'לנסות בכלל?', fill='#FFF1CC', size=11))
S[4] = DINNER + lbl(171, 30, 'ניקח לדוגמה את טל', fill='#E3F4F0') + lbl(80, 100, 'להכין', size=11) + lbl(150, 72, 'לארח', size=11) + lbl(90, 130, 'כולם יחד סביב השולחן', size=11)
S[5] = wall() + tal(120, 'flat') + pots(230, 290, 6) + lbl(230, 150, 'ארוחה שלמה לבד', size=12) + lbl(171, 30, 'משימה קשה יותר', fill='#FFF1CC')
S[6] = (room(door_open=True, shoes=False, plant=False) + tal(120) + family((210, 286)) + bowl(226, 236) + bowl(270, 236)
        + lbl(220, 120, 'כל אחד יביא משהו', size=12) + lbl(171, 30, 'בני המשפחה מציעים לעזור', fill='#E3F4F0'))
S[7] = (wall() + tal(80, 'flat', tag=False) + pots(150, 300, 4) + spot(100, 230, 80)
        + card(230, 70, '"אם אי אפשר לארח כמו פעם, אז מה הטעם?"', w=200, size=10) + card(230, 128, '"אף אחד לא ייהנה."', w=150) + card(222, 186, '"שום דבר כבר לא מצליח לי"', w=170))
S[8] = (wall() + f'<circle cx="150" cy="240" r="90" fill="{SPARK}" opacity=".18"></circle>' + tal(150, 'flat') + pots(260, 300, 4)
        + lbl(171, 40, 'אפשר להבין מאיפה זה מגיע', fill='#FFF1CC') + lbl(250, 110, 'משהו חשוב השתנה', size=11))
S[9] = P + scale(171, 150, 0, right_items=('big', 'small'), left_items=('heart', 'glow'), right_label='הקושי', left_label='מה עוד יש') + lbl(171, 40, 'האם זה כל מה שיש בתמונה?', size=12) + lbl(171, 90, 'חשיבה מאוזנת', fill='#FFF1CC')
S[10] = (P + lbl(100, 40, '"הכל בסדר"', size=13) + strike(100, 40, 90) + lbl(240, 40, 'אין קושי', size=13) + strike(240, 40, 80)
         + picture(lit=(171, 160, 100)) + bubble(171, 304, 'מה יש עוד בסיפור הזה?', w=190, fill='#FFF1CC', tail=False))
S[11] = (DINNER + spot(171, 230, 150, .35) + card(171, 40, '"מאוד קשה לי שכבר אי אפשר להכין הכל לבד.', 'kind', w=260, size=10)
         + card(171, 92, 'הלוואי שזה היה אחרת. ובכל זאת…', 'kind', w=220, size=10) + card(171, 144, '…הדבר שהכי חשוב לי הוא שנהיה כולנו יחד."', 'kind', w=280, size=10))
S[12] = (DINNER + pots(310, 300, 2).replace('#8996A5', '#9AA3AD') + f'<circle cx="80" cy="120" r="18" fill="{SPARK}" opacity=".6"></circle><circle cx="262" cy="110" r="14" fill="#E66A7A" opacity=".5"></circle><circle cx="170" cy="96" r="12" fill="#7FB7A8" opacity=".7"></circle>'
         + lbl(171, 34, 'עוד צבעים בתמונה', fill='#FFF1CC') + lbl(250, 336, 'הקושי עדיין שם', size=11))
S[13] = room() + chair() + ruth(110) + card(250, 120, '"זה לא יהיה כמו פעם"', w=150) + f'<path d="M150 170 H196 M150 162 v16 M196 162 v16" stroke="{INK}" stroke-width="2"></path>' + reed_badge(250, 210) + lbl(171, 34, 'דרך גמישה יותר להסתכל', fill='#E3F4F0')
S[14] = room() + chair() + ruth(150, mood='happy') + nira_phone(200, 232) + lbl(171, 34, 'עוד רגע תתרגלו', fill='#FFF1CC') + picture(colour=True, x=116, y=70, w=110, h=80)

ACTS = [
  (1, 'Act 1 · Only part of the picture', [1, 2, 3], 'Familiar thoughts rise around Ruth. A picture goes dark except its hard corner; again and again, it touches confidence, motivation, the choice to try.'),
  (2, 'Act 2 · Tal\'s family meal', [4, 5, 6, 7], 'Tal loved cooking and hosting. A whole meal alone is harder now; the family offers to bring something each. Tal\'s thoughts shrink the light to the pots.'),
  (3, 'Act 3 · Is that all there is?', [8, 9, 10], 'It\'s understandable. Balanced thinking: not "all is fine", not pretending, but seeing what else is in the story.'),
  (4, 'Act 4 · More colours', [11, 12], 'Tal\'s balanced thought, word for word; the light widens to the whole table. The hard part stays, and colours join it.'),
  (5, 'Act 5 · A skill to practise', [13, 14], 'Back with Ruth: stopping to look at a thought gives the brain a chance to practise a more flexible view. The practice follows.'),
]
SHOT = {
 1: ('Ruth in her chair; three grey thought cards rise, one per quote. Title: מפגש 8 · איזון מחשבות.', 'Room, Ruth, thought cards (sessions 4 and 7).', 'Cards rise on each quote.'),
 2: ('A framed picture of the path landscape. The light shrinks to one corner: a grey rain cloud. קשה · מתסכל · מדאיג.', 'The path world from session 1, now as a picture: the session\'s anchor.', 'Dark closes in around the cloud.'),
 3: ('Ruth at the first stone of her path; she hesitates and steps back. Tags: איך שמרגישים, הביטחון, המוטיבציה, לנסות בכלל?', 'Path and stones.', 'Tags pop on each word; her foot pulls back on "לנסות".'),
 4: ('A wipe to Tal\'s home: Tal (name tag טל) serves a set table, family around it. להכין · לארח · כולם יחד סביב השולחן.', 'New character from the narration: Tal, drawn in the same style as Ruth\'s friends.', 'Wipe right-to-left from Ruth\'s room.'),
 5: ('Tal alone beside a pile of pots: ארוחה שלמה לבד, now a harder task.', 'Tal.', 'Pots stack up.'),
 6: ('The door opens; family members come in, each carrying a dish: כל אחד יביא משהו.', 'Ruth\'s room door look.', 'Door swings open; dishes arrive.'),
 7: ('Tal\'s three thoughts as grey cards; the light closes in until only Tal and the pots are lit, the family in the dark.', 'Thought cards; the spotlight from shot 2.', 'Dark closes in with each card.'),
 8: ('A soft warm glow around Tal: understandable. משהו חשוב השתנה, frustrating.', 'Tal, the glow of noticing (session 6).', 'Glow fades in.'),
 9: ('"Is that everything in the picture?" The scale from session 2 settles level: הקושי | מה עוד יש. Title: חשיבה מאוזנת.', 'Ruth\'s scale from session 2, used for balance.', 'Beam swings, then settles level.'),
 10: ('"הכל בסדר" and "אין קושי" are struck through; the picture\'s light widens: מה יש עוד בסיפור הזה?', 'Struck tags (session 7), the picture.', 'Strikes draw; light widens.'),
 11: ('Back at Tal\'s table: the balanced thought appears as three warm cards, word for word; the light opens onto the whole family.', 'Warm card look from the Inner Voice game.', 'Cards rise in turn; light widens.'),
 12: ('The whole table in colour; the pots stay grey in the corner (הקושי עדיין שם). עוד צבעים בתמונה.', 'Tal\'s table.', 'Colours fill in, one patch at a time.'),
 13: ('Back in Ruth\'s room: she stops and holds her own card at arm\'s length; the reed badge sways: דרך גמישה יותר להסתכל.', 'Arm\'s length (session 4), the reed (sessions 3a, 7).', 'Wipe back to the room.'),
 14: ('Ruth smiles, phone in hand with Nira; the small picture on her wall now in colour: עוד רגע תתרגלו.', 'Room, phone, the picture.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', P + picture(lit=(250, 86, 40)), '<strong>The picture and the light.</strong> Hard thoughts light only one corner; balanced thinking widens the light without hiding the hard part.')
legend2 = ('0 0 342 360', DINNER, '<strong>Tal\'s family table.</strong> Nira\'s example, told as a short story inside the film.')
legend3 = ('0 0 342 360', P + scale(171, 150, 0, right_items=('big',), left_items=('heart',), right_label='הקושי', left_label='מה עוד יש'), '<strong>The level scale.</strong> Session 2\'s scale: the difficulty and what else is there, side by side.')
carried = ['<strong>Kept:</strong> Ruth\'s room and path, thought cards and arm\'s length (sessions 4, 7), the scale (session 2), the reed.', '<strong>Thoughts on screen</strong> are exactly the ones Nira says; Tal\'s dishes carry no invented words.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S08Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 8 · איזון מחשבות',
      'Hard thoughts are natural, but they can light only the hard part of the picture. Balanced thinking doesn\'t erase the difficulty or pretend it away; it widens the view to what else is in the story, and that\'s a skill the brain can practise.',
      'Grey thoughts around Ruth → a picture lit only in its hard corner → Tal\'s family meal: too hard alone, family offers help, grey thoughts narrow the light → level scale → the light widens to the whole table, the pots still there → Ruth practises.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
import re as _re
_p = B + 'S08Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":4250'))
print('rows', rows)
