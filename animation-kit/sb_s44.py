# Session 44 storyboard: doing things that do us good — small good things are the first squeezed out of a full day; noticing them and giving them a little room is a skill that grows.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S44.dc.html')
assert len(times) == 20
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
GREY = '#9AA3AD'

def tok(x, y, r=12, glyph=''):
    o = f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFE2A8" stroke="{INK}" stroke-width="1.5"></circle>'
    return o + (glyph or f'<circle cx="{x}" cy="{y}" r="{r * .5:.0f}" fill="{AMBER}"></circle>')

def gb(x, y, w=30, h=20): return block(x, y, w, h, fill=GREY)

def note(x, y):
    return f'<path d="M{x} {y} v-14 l8 -3 v14" fill="none" stroke="{INK}" stroke-width="1.8"></path><circle cx="{x - 3}" cy="{y}" r="3.5" fill="{INK}"></circle><circle cx="{x + 5}" cy="{y - 3}" r="3.5" fill="{INK}"></circle>'

def mini_mug(x, y): return f'<rect x="{x - 6}" y="{y - 6}" width="12" height="12" rx="2" fill="#FFFFFF" stroke="{INK}" stroke-width="1.2"></rect>'
def mini_friend(x, y): return f'<circle cx="{x}" cy="{y - 2}" r="5" fill="{SKIN}" stroke="{INK}" stroke-width="1.2"></circle><path d="M{x - 7} {y + 9} q7 -10 14 0" fill="#C98B6B" stroke="{INK}" stroke-width="1.2"></path>'

THREE = lambda y: tok(250, y, glyph=mini_mug(250, y)) + tok(171, y, glyph=note(170, y + 6)) + tok(92, y, glyph=mini_friend(92, y))

def balcony(mood='happy'):
    return (land(sun=True) + f'<rect x="0" y="300" width="342" height="60" fill="#D8CDBB"></rect><line x1="0" y1="300" x2="342" y2="300" stroke="{INK}" stroke-width="2"></line>'
            + f'<rect x="0" y="232" width="342" height="8" fill="#B9A58C" stroke="{INK}" stroke-width="1.5"></rect>'
            + ''.join(f'<line x1="{x}" y1="240" x2="{x}" y2="300" stroke="{INK}" stroke-width="2"></line>' for x in range(14, 342, 28))
            + chair() + ruth(150, mood=mood) + mug(206, 250))

def hourglass(x, y):
    return f'<path d="M{x - 26} {y - 40} h52 M{x - 26} {y + 40} h52 M{x - 22} {y - 40} q0 30 22 40 q-22 10 -22 40 M{x + 22} {y - 40} q0 30 -22 40 q22 10 22 40" fill="none" stroke="{INK}" stroke-width="2.5"></path><path d="M{x - 14} {y + 36} q14 -16 28 0Z" fill="{AMBER}"></path>'

def arm(x, y, k=1.0):
    return (f'<path d="M{x + 50} {y + 30} L{x} {y + 30} Q{x - 20} {y + 30} {x - 22} {y + 6} L{x - 26} {y - 30}" fill="none" stroke="{PLUM}" stroke-width="{18 * k:.0f}" stroke-linecap="round"></path>'
            f'<circle cx="{x - 4}" cy="{y + 12}" r="{14 * k:.0f}" fill="{PLUM}" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x - 26}" cy="{y - 36}" r="10" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle>')

def card(x, y, w, h, inner='', text=None):
    o = f'<rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + inner
    return o + (lbl(x, y + h / 2 - 2, text, size=10) if text else '')

def lens(x, y): return f'<circle cx="{x}" cy="{y}" r="24" fill="#FFFFFF" fill-opacity=".3" stroke="{INK}" stroke-width="3"></circle><line x1="{x + 17}" y1="{y + 17}" x2="{x + 34}" y2="{y + 34}" stroke="{INK}" stroke-width="5" stroke-linecap="round"></line>'

def balloon(x, y):
    return f'<path d="M{x - 30} {y + 14} C{x - 46} {y + 14} {x - 46} {y - 10} {x - 28} {y - 12} C{x - 26} {y - 34} {x + 4} {y - 38} {x + 10} {y - 20} C{x + 24} {y - 34} {x + 46} {y - 22} {x + 40} {y - 4} C{x + 52} {y + 2} {x + 48} {y + 14} {x + 36} {y + 14}Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path>'

ROOM = room() + chair()
FULL = lambda y: ''.join(gb(x, y, 44, 24) for x in (276, 226, 176, 126, 76))
S = {}
S[1] = balcony() + day_line(70, curve=False) + THREE(70) + lbl(250, 102, 'קפה במרפסת', size=10) + lbl(171, 124, 'שיר', size=10) + lbl(92, 102, 'מפגש עם חבר', size=10) + lbl(171, 24, 'מפגש 44 · לעשות דברים שעושים לנו טוב', fill='#E3F4F0', size=11)
S[2] = ROOM + ruth(150, mood='happy') + day_line(92, curve=False) + THREE(92) + lbl(250, 40, 'לא חייבים', size=12) + lbl(110, 140, 'אבל טוב לנו יותר', fill='#FFF1CC', size=12)
S[3] = ROOM + ruth(150) + day_line(92, curve=False) + gb(276, 92, 50, 26) + arrow(240, 92, 214, 92, '#7B8794') + tok(190, 92, glyph=mini_mug(190, 92)) + tok(130, 92, glyph=note(129, 98)) + tok(50, 130, glyph=mini_friend(50, 130)) + arrow(80, 100, 60, 116, '#7B8794') + lbl(171, 40, 'הראשונים שיידחקו הצידה', fill='#FFF1CC')
S[4] = (ROOM + ruth(150, mood='flat') + day_line(92, curve=False) + FULL(92) + lbl(171, 40, 'משימות · דברים לזכור · אנשים', size=11)
        + lbl(100, 136, 'תרופות · תורים · טיפולים', fill='#FFF1CC', size=11))
S[5] = room(clock=True) + chair() + ruth(150, mood='flat') + day_line(100, curve=False) + FULL(100) + lbl(171, 140, 'היום מתמלא', fill='#FFF1CC')
S[6] = ROOM + ruth(110) + phone_guide(196, 196) + lbl(220, 120, 'כמה דקות עכשיו', fill='#E3F4F0', size=12)
S[7] = P + hourglass(171, 160) + lbl(171, 60, 'זמן מבוזבז', size=13) + strike(171, 60, 110) + lbl(171, 260, 'הזמן שאנחנו מקדישים לעצמנו', fill='#FFF1CC', size=12) + tok(250, 160) + tok(92, 160)
S[8] = (ROOM + ruth(150, mood='happy') + day_line(92, curve=False) + gb(276, 92, 44, 24) + gb(226, 92, 44, 24) + tok(171, 92) + gb(116, 92, 44, 24) + gb(66, 92, 44, 24)
        + f'<path d="M140 60 q15 -10 30 0 t30 0 M150 46 q12 -8 24 0 t24 0" stroke="#4FA3A0" stroke-width="3" fill="none" stroke-linecap="round"></path>' + arrow(171, 132, 171, 112, AMBER)
        + lbl(171, 24, 'אוויר בתוך יום עמוס', fill='#E3F4F0', size=12) + lbl(270, 150, 'מי אנחנו · מה חשוב לנו', size=10))
S[9] = (P + card(262, 160, 120, 80) + f'<text x="262" y="165" text-anchor="middle" font-size="10" font-weight="600" fill="{INK}">לדעת מה עושה לנו טוב</text>' + arrow(196, 160, 150, 160, AMBER)
        + card(86, 160, 120, 80) + f'<text x="86" y="165" text-anchor="middle" font-size="10" font-weight="600" fill="{INK}">שיהיו חלק מהחיים</text>' + lbl(171, 260, 'יכולת בפני עצמה', fill='#FFF1CC') + lbl(171, 300, 'לא מובנת מאליה', size=11))
S[10] = P + arm(250, 160, .7) + arm(110, 160, 1.2) + arrow(200, 180, 170, 180, AMBER) + tok(270, 260, 8) + tok(150, 260, 8) + tok(124, 260, 8) + tok(98, 260, 8) + lbl(171, 50, 'מחזקים את השריר', fill='#E3F4F0') + lbl(171, 310, 'עם הזמן, קצת יותר', size=11)
S[11] = ROOM + ruth(110, mood='flat') + phone_guide(196, 196) + lbl(220, 120, 'קל יותר להגיד מלעשות', size=12)
S[12] = (ROOM + ruth(150, mood='flat') + balloon(270, 80) + thought(160, 196, 250, 96) + lbl(270, 130, 'הראש במקום אחר', size=10)
         + battery(80, 100, 0.15, w=30, h=50, label=False) + lbl(80, 146, 'חצי שעה · אין כוח', size=10))
S[13] = P + f'<rect x="111" y="80" width="120" height="160" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><rect x="146" y="70" width="50" height="20" rx="6" fill="{GREY}" stroke="{INK}" stroke-width="1.5"></rect>' + lbl(171, 140, 'עוד פרויקט', size=12) + strike(171, 140, 100) + lbl(171, 190, 'עוד משימה', size=12) + strike(171, 190, 100)
S[14] = ROOM + ruth(150, mood='happy') + day_line(92, curve=False) + gb(276, 92) + tok(226, 92) + gb(176, 92) + tok(126, 92) + tok(76, 92) + ''.join(f'<circle cx="{x}" cy="92" r="22" fill="{SPARK}" opacity=".35"></circle>' for x in (226, 126, 76)) + lbl(171, 40, 'כבר דואגים לעצמנו', fill='#FFF1CC') + lbl(171, 140, 'בלי לקרוא לזה ככה', size=11)
S[15] = ROOM + ruth(150) + day_line(92, curve=False) + gb(276, 92) + tok(226, 92) + gb(176, 92) + tok(126, 92) + lens(126, 92) + lbl(240, 40, 'לזהות', fill='#E3F4F0') + lbl(110, 150, 'מה הם נותנים לנו?', size=11)
G = [(276, 90, 'תשבץ', ''.join(f'<rect x="{262 + i * 10}" y="{70 + j * 10}" width="10" height="10" fill="{"#3B4450" if (i + j) % 3 == 0 else "#FFFFFF"}" stroke="{INK}" stroke-width="1"></rect>' for i in range(3) for j in range(3))),
     (171, 90, 'כמה עמודים מספר', f'<path d="M151 70 q10 -6 20 0 v28 q-10 -6 -20 0Z M171 70 q10 -6 20 0 v28 q-10 -6 -20 0Z" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></path>'),
     (66, 90, 'ללטף את הכלב', f'<ellipse cx="66" cy="84" rx="20" ry="11" fill="#C9A27A" stroke="{INK}" stroke-width="1.5"></ellipse><circle cx="46" cy="76" r="9" fill="#C9A27A" stroke="{INK}" stroke-width="1.5"></circle>'),
     (226, 210, 'שהייה בטבע', f'<path d="M206 220 l20 -36 l20 36Z" fill="#7FB58E" stroke="{INK}" stroke-width="1.5"></path>'),
     (116, 210, 'תחביב', f'<circle cx="116" cy="200" r="14" fill="#FFE2A8" stroke="{INK}" stroke-width="1.5"></circle><path d="M106 194 q10 12 20 0" stroke="{INK}" stroke-width="1.2" fill="none"></path>')]
S[16] = P + ''.join(card(x, y, 90, 96, art, txt) for x, y, txt, art in G) + lbl(171, 310, 'נחת · עניין · קשר · הנאה', fill='#FFF1CC', size=12)
S[17] = (P + ''.join(card(x, 150, 88, 120, f'<line x1="{x - 34}" y1="150" x2="{x + 34}" y2="150" stroke="{INK}" stroke-width="1.5"></line>' + gb(x - 14 + k * 6, 150, 18, 12) + tok(x + 18 - k * 22, 150, 8)) for k, x in enumerate((262, 171, 80)))
         + lbl(171, 50, 'לשמור להם מקום', fill='#E3F4F0') + lbl(171, 250, 'בימים ובמצבים שונים', size=12))
S[18] = (ROOM + ruth(110) + card(200, 250, 50, 60, ''.join(f'<line x1="186" y1="{236 + i * 12}" x2="214" y2="{236 + i * 12}" stroke="{SLATE}" stroke-width="1.5"></line>' for i in range(3)))
         + friend(290) + lbl(171, 40, 'מהם הדברים שעושים לי טוב?', fill='#FFF1CC', size=12) + lbl(240, 160, 'לכתוב · לדבר עם מישהו קרוב', size=10))
S[19] = ROOM + ruth(150) + day_line(92, curve=False) + gb(276, 92) + gb(226, 92) + f'<circle cx="176" cy="92" r="14" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4 3"></circle>' + tok(176, 150) + arrow(176, 134, 176, 110, AMBER) + gb(126, 92) + gb(76, 92) + lbl(171, 40, 'דבר אחד · אפילו בקטן', fill='#E3F4F0')
S[20] = balcony() + day_line(70, curve=False) + gb(276, 70) + tok(226, 70) + gb(176, 70) + tok(126, 70) + gb(76, 70) + f'<circle cx="126" cy="70" r="22" fill="{SPARK}" opacity=".35"></circle>' + lbl(171, 130, 'מגיע להם מקום', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · Small good things', [1, 2], 'Ruth on her balcony with morning coffee; a song, a friend. Not musts, but life is better with them: three warm tokens on her day line.'),
  (2, 'Act 2 · First to go', [3, 4, 5], 'Grey blocks of tasks, and with Parkinson\'s pills, appointments and treatments, push the warm tokens off the day.'),
  (3, 'Act 3 · Not wasted time', [6, 7, 8], 'Ariel stops the clock for a few minutes. Time for ourselves isn\'t wasted; it is air in a busy day.'),
  (4, 'Act 4 · A muscle', [9, 10, 11, 12], 'Knowing what does us good and giving it room is a skill that grows like a muscle. Easier said than done: days slip by, the head is elsewhere, no energy.'),
  (5, 'Act 5 · Not another project', [13, 14, 15, 16], 'No new task: the warm tokens are already there. Notice them and what they give: the crossword, a book, the dog, nature, a hobby.'),
  (6, 'Act 6 · Give them a place', [17, 18, 19, 20], 'Keep a place for them on different days; think of them, choose one, fit it in small. Back on the balcony: they deserve a place.'),
]
SHOT = {
 1: ('Morning. Ruth on her balcony with coffee; a day line above holds three warm tokens: קפה במרפסת · שיר · מפגש עם חבר. Title: מפגש 44 · לעשות דברים שעושים לנו טוב.', 'Ruth; the warm tokens and day line (42).', 'Door opens onto the balcony (as session 7 ended).'),
 2: ('Back in the room: the three tokens sit lightly on her day: לא חייבים · אבל טוב לנו יותר.', 'Day line.', 'Tokens settle.'),
 3: ('A grey block slides in and pushes the tokens off the edge of the line: הראשונים שיידחקו הצידה.', 'Grey blocks (2, 42).', 'Block shoves; tokens tumble.'),
 4: ('More grey blocks drop: משימות · דברים לזכור · אנשים לדאוג להם, then תרופות · תורים · טיפולים.', 'Day line; pill mark from 3a.', 'Each drops on its word.'),
 5: ('The line is full; the wall clock spins; Ruth sags: היום מתמלא.', 'Clock from session 7.', 'Clock hands race.'),
 6: ('Ariel on Ruth\'s phone; the clock stops: כמה דקות עכשיו.', 'Ariel on the phone (3).', 'Clock halts.'),
 7: ('An hourglass; "זמן מבוזבז" is struck through; warm tokens either side.', 'Hourglass from 3a.', 'Strike draws on.'),
 8: ('Between the grey blocks a gap opens and a breeze blows through; a warm token rises: אוויר בתוך יום עמוס · מי אנחנו · מה חשוב לנו.', 'Air tool badge (1).', 'Blocks part; breeze lines draw.'),
 9: ('Two cards, right to left: לדעת מה עושה לנו טוב → לדאוג שיהיו חלק מהחיים. יכולת בפני עצמה.', 'Cards.', 'Arrow draws.'),
 10: ('An arm flexes; the muscle grows as warm tokens are placed one by one: מחזקים את השריר.', 'Warm tokens.', 'Muscle swells with each token.'),
 11: ('Ariel on the phone, nodding: קל יותר להגיד מלעשות.', 'Ariel.', 'Hold.'),
 12: ('Days slip past; Ruth\'s thought drifts off like a balloon (הראש במקום אחר); half an hour opens but her battery is low.', 'Balloon (6), battery (5).', 'Balloon floats; battery blinks low.'),
 13: ('A clipboard: עוד פרויקט · עוד משימה, both struck through.', 'Struck tag (4, 7).', 'Strikes draw.'),
 14: ('Warm tokens already on her day glow: כבר דואגים לעצמנו · בלי לקרוא לזה ככה.', 'Day line (42).', 'Glow passes along.'),
 15: ('A magnifier stops on one warm token: לזהות · מה הם נותנים לנו?', 'Day line.', 'Lens slides on.'),
 16: ('Five small cards, right to left: תשבץ · כמה עמודים מספר · ללטף את הכלב · שהייה בטבע · תחביב; then: נחת · עניין · קשר · הנאה.', 'Cards.', 'Each pops on its word.'),
 17: ('Three different days; on each a warm token keeps its place at a different time: לשמור להם מקום · בימים ובמצבים שונים.', 'Day cards (3a).', 'Cards deal in.'),
 18: ('Ruth pauses, then writes a short list: מהם הדברים שעושים לי טוב? · לכתוב · לדבר עם מישהו קרוב.', 'Room.', 'Lines write on.'),
 19: ('One warm token is picked and set into a small dashed gap on her day line: דבר אחד · אפילו בקטן.', 'Day line.', 'Token clicks into place.'),
 20: ('Back on the balcony with her coffee; on the day line the warm token glows in its place: מגיע להם מקום.', 'Balcony from shot 1.', 'Slow push-in; hold.'),
}
legend1 = ('0 40 342 110', P + day_line(92, curve=False) + gb(276, 92) + tok(226, 92) + gb(176, 92) + tok(126, 92) + gb(76, 92), '<strong>Ruth\'s day line.</strong> As in session 42: warm tokens are the things that do her good, grey blocks the demands that push them out.')
legend2 = ('0 0 342 360', balcony(), '<strong>The balcony.</strong> Morning coffee: the film starts and ends here.')
legend3 = ('0 60 342 240', P + arm(171, 160, 1.1), '<strong>The muscle.</strong> Ariel\'s image: giving good things room grows with practice.')
carried = ['<strong>Kept:</strong> Ruth\'s room, the day line with warm tokens and grey blocks (42), Ariel on the phone (3), the clock (7), the balloon (6), the battery (5).',
           '<strong>Examples</strong> are exactly the ones Ariel names.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S44Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 44 · לעשות דברים שעושים לנו טוב',
      'Small things that do us good are the first to be pushed out of a full day. Time for them isn\'t wasted; it gives air. Knowing them and giving them a little room is a skill that grows with practice, not another task.',
      'Coffee on the balcony → warm tokens on her day → grey tasks and Parkinson\'s push them off → a pause; air in the day → a muscle that grows → they are already there; notice what they give → one finds its place → back to the balcony.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
# preview height measured with headless Chrome (content height of the board)
f = B + 'S44Story.dc.html'; page = open(f, encoding='utf-8').read(); open(f, 'w', encoding='utf-8').write(page.replace('"height":4700', '"height":5016'))
