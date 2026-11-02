# Session 45 storyboard: a moment of self-compassion — the warm words Ruth gives the people she loves, turned back toward herself.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S45.dc.html')
assert len(times) == 15
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
GREY = '#9AA3AD'

def voice(x, y, warm=False, s=1, frown=False):
    """Ruth's inner voice (session 4): a small speech-cloud character; grey when critical, warm when kind."""
    c = '#FFE3A8' if warm else '#E4E8ED'
    m = f'M-6 14 q7 -5 14 0' if frown else 'M-6 10 q7 5 14 0'
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-26 6 q-4 -24 18 -26 q8 -14 24 -6 q18 0 14 18 q10 10 -2 20 h-46 q-12 0 -8 -6Z" fill="{c}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M-8 22 l-8 12 l14 -12Z" fill="{c}" stroke="{INK}" stroke-width="1.5"></path><circle cx="-6" cy="2" r="2.4" fill="{INK}"></circle><circle cx="8" cy="2" r="2.4" fill="{INK}"></circle>'
            f'<path d="{m}" fill="none" stroke="{INK}" stroke-width="1.6"></path></g>')

def rain(x, y, s=1):
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-22 0 C-32 0 -32 -14 -20 -15 C-20 -28 0 -32 6 -20 C14 -28 30 -22 28 -10 C38 -9 38 0 28 0Z" fill="#B9C1CA" stroke="{INK}" stroke-width="1.5"></path>'
            f'<path d="M-12 6 l-3 8 M0 6 l-3 8 M12 6 l-3 8" stroke="#5B8DB8" stroke-width="2" stroke-linecap="round"></path></g>')

def man(x, mood='calm'):
    """A friend of Ruth's: a grey-haired man in a terracotta shirt."""
    return friend(x, '#C9805A', '#A3A7AE')

def card(x, y, text, kind='kind', w=None, size=10):
    return thought_card(x, y, text, kind, w=w).replace('font-size="13"', f'font-size="{size}"')

def lines_card(x, y, warm=False, w=90):
    c = '#FFF1CC' if warm else '#FFFFFF'
    return (f'<rect x="{x - w / 2}" y="{y - 20}" width="{w}" height="40" rx="10" fill="{c}" stroke="{INK}" stroke-width="2"></rect>'
            f'<path d="M{x - w / 2 + 12} {y - 6} H{x + w / 2 - 12} M{x - w / 2 + 12} {y + 6} H{x + w / 2 - 30}" stroke="{SLATE}" stroke-width="3" stroke-linecap="round"></path>')

def heart(x, y, k=1.0, col='#E66A7A'):
    return f'<path d="M{x} {y + 12 * k} C{x - 22 * k} {y - 2 * k} {x - 12 * k} {y - 20 * k} {x} {y - 8 * k} C{x + 12 * k} {y - 20 * k} {x + 22 * k} {y - 2 * k} {x} {y + 12 * k}Z" fill="{col}" stroke="{INK}" stroke-width="1.5"></path>'

def attn(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".16"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 6"></circle>'

def weight(x, y, col='#4A525C'):
    return f'<ellipse cx="{x}" cy="{y}" rx="12" ry="9" fill="{col}" stroke="{INK}" stroke-width="1.5"></ellipse>'

def window_tile(x, y, who):
    return (f'<rect x="{x - 34}" y="{y - 34}" width="68" height="68" rx="8" fill="#F1EADF" stroke="{INK}" stroke-width="1.5"></rect>'
            f'<g transform="translate({x - 171 * .22} {y - 34 - 150 * .22}) scale(.22)">{who}</g>' + rain(x + 14, y - 22, .45))

ROOM = room() + chair()
LAND = land() + stones(PATH)
S = {}
S[1] = ROOM + ruth(130) + voice(200, 150) + lbl(171, 34, 'מפגש 45 · רגע של חמלה עצמית', fill='#E3F4F0', size=12) + lbl(171, 70, 'הדרך שבה אנחנו מדברים לעצמנו', size=11)
S[2] = (room() + ruth(270, 'stand') + friend(170) + man(80) + rain(170, 150, .8) + rain(80, 150, .8) + heart(220, 140, .7, '#F5B26B') + heart(200, 110, .6, '#F5B26B')
        + lbl(171, 40, 'מילים של הבנה ותמיכה', fill='#FFF1CC', size=12) + lbl(171, 74, 'שאנחנו כאן בשבילו', size=11))
S[3] = (room() + ruth(270, 'stand', 'happy') + friend(170) + man(80) + card(110, 70, 'אתה עושה כמיטב יכולתך', w=150) + card(210, 120, 'תני לעצמך קצת קרדיט, זה באמת לא פשוט', w=200, size=9))
S[4] = (ROOM + ruth(150, mood='flat') + rain(150, 150, .9) + voice(220, 170, frown=True)
        + f'<rect x="40" y="56" width="262" height="60" rx="12" fill="#6C7884" stroke="{INK}" stroke-width="2"></rect><text x="171" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#FFFFFF" direction="rtl">״למה אני עושה מזה כזה עניין,</text><text x="171" y="98" text-anchor="middle" font-size="10" font-weight="700" fill="#FFFFFF" direction="rtl">מה לא בסדר איתי?״</text>')
S[5] = (ROOM + ruth(150, mood='flat') + rain(150, 150, .9) + voice(220, 170, frown=True) + card(60, 100, 'זה באמת לא פשוט', w=110) + arrow(110, 110, 135, 140, AMBER)
        + cross(140, 140, 8) + lbl(171, 40, 'קצת עידוד', fill='#FFF1CC') + lbl(171, 300, 'קשה להציע אותו לעצמנו', size=11))
S[6] = ROOM + ruth(150) + voice(220, 170) + phone_guide(270, 200) + lbl(171, 40, 'נעצור לרגע', fill='#E3F4F0') + lbl(171, 74, 'לפגוש את עצמנו קצת אחרת', size=11)
S[7] = (P + window_tile(171, 180, room() + chair() + ruth(150)) + window_tile(91, 180, room() + friend(171)) + window_tile(251, 180, room() + man(171))
        + window_tile(91, 100, room() + ruth(171, 'stand')) + window_tile(251, 100, room() + friend(171)) + window_tile(171, 100, room() + man(171))
        + window_tile(91, 260, room() + man(171)) + window_tile(251, 260, room() + friend(171)) + window_tile(171, 260, room() + friend(171))
        + lbl(171, 30, 'לא לבד', fill='#FFF1CC') + lbl(171, 336, 'קושי הוא חלק מהחוויה האנושית', size=11))
S[8] = (ROOM + ruth(150, mood='happy') + voice(220, 170, warm=True) + thought(110, 196, 70, 120) + f'<circle cx="70" cy="100" r="34" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle>'
        + head(70, 100, 13, 'happy') + card(230, 90, 'זה באמת לא פשוט', w=110) + lbl(171, 300, 'חמלה · רכות · הבנה', fill='#FFF1CC'))
S[9] = LAND + ruth(171, 'step') + pack(171, 238, heavy=True) + lbl(171, 40, 'התמודדות והסתגלות מחדש', fill='#E3F4F0') + lbl(171, 74, 'מספיק קשה בפני עצמו', size=11)
S[10] = (LAND + ruth(171, 'stand', 'happy') + pack(171, 238) + voice(230, 150, warm=True) + weight(250, 110) + arrow(250, 124, 250, 96, AMBER)
         + lbl(171, 40, 'קצת פחות קשים עם עצמנו', fill='#FFF1CC') + lbl(171, 74, 'בתוך ההתמודדות', size=11))
S[11] = ROOM + ruth(150) + phone_guide(270, 200) + lines_card(240, 90) + lines_card(130, 70, True) + lines_card(80, 130) + lbl(171, 30, 'כמה משפטים מנחים', fill='#E3F4F0') + lbl(171, 310, 'מילים של הבנה ותמיכה', size=11)
S[12] = (ROOM + ruth(150) + lines_card(250, 110, True) + f'<path d="M232 140 l8 8 l14 -16" stroke="#5BAA6A" stroke-width="4" fill="none"></path>' + lines_card(90, 110)
         + lbl(250, 60, 'טבעיים', fill='#FFF1CC', size=11) + lbl(90, 60, 'ואחרים פחות', size=11) + lbl(171, 300, 'פשוט מקשיבים ושמים לב', fill='#E3F4F0', size=11))
S[13] = ROOM + ruth(130, mood='happy') + voice(220, 140, warm=True, s=1.5) + ''.join(f'<path d="M{250 + k * 12} {110 - k * 4} q10 20 0 40" fill="none" stroke="{AMBER}" stroke-width="2.5"></path>' for k in range(3)) + lbl(171, 40, 'הקול התומך · עוד הזדמנות להישמע', fill='#FFF1CC', size=11)
S[14] = (ROOM + ruth(150, mood='happy') + f'<text x="171" y="110" text-anchor="middle" font-size="44" font-weight="700" fill="{INK}">5%</text>'
         + f'<rect x="50" y="130" width="242" height="16" rx="8" fill="#D7DCE2" stroke="{INK}" stroke-width="1.5"></rect><rect x="280" y="130" width="12" height="16" rx="6" fill="{AMBER}"></rect>'
         + lbl(171, 40, 'חמישה אחוזים יותר נחמדים לעצמנו', fill='#FFF1CC', size=11) + lbl(171, 170, 'התחלה טובה', size=11))
S[15] = room(door_open=True) + chair() + ruth(150, mood='happy') + voice(220, 160, warm=True) + lbl(171, 40, 'בואו ננסה', fill='#E3F4F0')

ACTS = [
  (1, 'Act 1 · Kind to others', [1, 2, 3], 'Something odd about how we talk to ourselves. When people Ruth loves struggle, warm words come easily.'),
  (2, 'Act 2 · Hard on ourselves', [4, 5], 'When Ruth struggles, the inner voice turns grey and harsh; the encouragement she gave so easily can\'t reach her.'),
  (3, 'Act 3 · Meet ourselves differently', [6, 7, 8], 'Ariel\'s practice: notice it is hard, remember she is not alone, then speak to herself as to someone dear.'),
  (4, 'Act 4 · On the path', [9, 10], 'Parkinson\'s asks for coping and readjusting; harshness only adds weight. Compassion lifts that extra weight, not the path.'),
  (5, 'Act 5 · The practice', [11, 12, 13, 14, 15], 'A few guiding sentences; some fit and some don\'t; just listen. Each time, the supportive voice gets heard a little more. Five percent is a good start.'),
]
SHOT = {
 1: ('Ruth in her armchair; her inner voice (session 4) pops up beside her, neutral. Title, then: הדרך שבה אנחנו מדברים לעצמנו.', 'Room, Ruth, the inner voice (4).', 'Fade in; voice pops on "משונה".'),
 2: ('Ruth stands with two friends she loves, a woman and a man, each under a small rain cloud. Warm hearts drift from her to them: מילים של הבנה ותמיכה · שאנחנו כאן בשבילו.', 'Friends from session 5; a new friend, a grey-haired man.', 'Friends walk in; hearts float on "מילים".'),
 3: ('Two warm speech cards, right to left: "אתה עושה כמיטב יכולתך" over the man, "תני לעצמך קצת קרדיט, זה באמת לא פשוט" over the woman. Their clouds clear; they look up.', 'Warm thought cards (4).', 'Each card lands on its quote.'),
 4: ('The friends leave; now the rain cloud is over Ruth. Her inner voice turns grey and frowns; a heavy card: "למה אני עושה מזה כזה עניין, מה לא בסדר איתי?"', 'Heavy card from session 4.', 'Cloud drifts over her; card drops.'),
 5: ('The warm card "זה באמת לא פשוט" floats toward Ruth but stops short at the grey voice and drifts back: קצת עידוד · קשה להציע אותו לעצמנו.', 'Same warm card as shot 1.3.', 'Card bounces off.'),
 6: ('Ariel on Ruth\'s phone. The heavy card fades; Ruth turns to her voice, which softens: נעצור לרגע · לפגוש את עצמנו קצת אחרת.', 'Ariel on the phone (3).', 'Card fades on "נעצור".'),
 7: ('The circle of attention settles on Ruth: לשים לב · משהו קשה לנו. The camera pulls back: her room is one window among many, each with someone under a small cloud: לא לבד · קושי הוא חלק מהחוויה האנושית.', 'Circle of attention (3a).', 'Zoom out from the room.'),
 8: ('Back in: Ruth remembers her friend; the warm card she gave her ("זה באמת לא פשוט") turns toward Ruth herself; her inner voice warms. Tags right to left: חמלה · רכות · הבנה.', 'Memory bubble (43), warm card (1.3).', 'Zoom in; card flies to her.'),
 9: ('On her path of stepping stones (1), seen from behind with her backpack; one stone shifts and she adjusts her step: התמודדות והסתגלות מחדש · מספיק קשה בפני עצמו. The grey voice drops one extra weight on top.', 'Path and backpack (1).', 'Cut to the path.'),
 10: ('The voice turns warm and lifts the extra weight away; the backpack stays, Ruth straightens and walks on: קצת פחות קשים עם עצמנו · בתוך ההתמודדות.', 'Path, backpack, voice.', 'Weight lifts off.'),
 11: ('Back in the room: from Ariel on the phone, a few sentence cards (lines only) float out and warm as they reach her: כמה משפטים מנחים · מילים של הבנה ותמיכה.', 'Phone (3).', 'Cards fan out.'),
 12: ('Cards arrive one at a time: one glows and she nods (טבעיים), one stays pale and drifts by (ואחרים פחות). No pushing: לא צריך להכריח. She closes her eyes: פשוט מקשיבים ושמים לב.', 'Same cards.', 'Each card on its words.'),
 13: ('Her warm inner voice speaks again and again, a little bigger each time: הקול התומך · עוד הזדמנות להישמע.', 'Inner voice (4).', 'Three pulses.'),
 14: ('A long grey bar; a small warm sliver fills from the right: 5% · חמישה אחוזים יותר נחמדים לעצמנו · התחלה טובה.', 'Room.', 'Sliver fills.'),
 15: ('Ruth smiles, warm voice beside her; the door opens a crack of light: בואו ננסה.', 'Door from session 7.', 'Door opens; hold.'),
}
legend1 = ('0 0 342 360', ROOM + ruth(150) + voice(220, 170, warm=True), '<strong>The inner voice.</strong> Session 4\'s little cloud: grey and harsh when Ruth struggles, warm when she turns kind.')
legend2 = ('0 40 342 300', room() + ruth(270, 'stand') + friend(170) + rain(170, 150, .8), '<strong>The warm words.</strong> What Ruth says to people she loves, finally said to herself.')
legend3 = ('0 0 342 360', LAND + ruth(171, 'step') + pack(171, 238, heavy=True), '<strong>The path and the backpack.</strong> Parkinson\'s is hard enough; harshness only adds weight.')
carried = ['<strong>Kept:</strong> Ruth\'s room and chair, the inner voice and thought cards (4), friends (5), the circle of attention (3a), the path and backpack (1), Ariel on the phone (3), the door (7).',
           '<strong>Quotes on screen</strong> are exactly the ones Ariel says; the guiding sentences are shown as cards with lines, since their words are not in the script.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S45Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 45 · רגע של חמלה עצמית',
      'We find warm, supportive words easily for the people we love, and harsh ones for ourselves just when we need encouragement most. Self-compassion turns those same warm words back toward ourselves: notice it is hard, remember we are not alone, speak kindly.',
      'Ruth comforts two friends → alone and struggling, her inner voice turns grey and harsh → she pauses, notices, sees she is not alone → the warm words come back to her → on her path, harshness was extra weight; kindness lifts it → guiding sentences, some fit → the warm voice grows; 5% is a start.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
f = B + 'S45Story.dc.html'; page = open(f, encoding='utf-8').read(); open(f, 'w', encoding='utf-8').write(page.replace('"height":4700', '"height":4350'))
