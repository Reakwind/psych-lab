# Session 11 storyboard: the conversation cards — the sides that make Ruth who she is get buried under the day's load; opening a question card uncovers them again.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S11.dc.html')
assert len(times) == 15
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
CARD = '#FFF6E0'; ACT = '#DDEFD9'

def qcard(x, y, text, w=150, h=96, fill=CARD, size=11, rot=0):
    """A question card from the deck, face up."""
    words = text.split(' '); rows, cur = [], ''
    for wd in words:
        if len(cur) + len(wd) > w / (size * 0.62): rows.append(cur); cur = wd
        else: cur = (cur + ' ' + wd).strip()
    rows.append(cur)
    t = ''.join(f'<text x="{x}" y="{y - (len(rows) - 1) * 8 + k * 16 + 4}" text-anchor="middle" font-size="{size}" font-weight="600" fill="{INK}" direction="rtl">{r}</text>' for k, r in enumerate(rows))
    return (f'<g transform="rotate({rot} {x} {y})"><rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - w / 2 + 5}" y="{y - h / 2 + 5}" width="{w - 10}" height="{h - 10}" rx="7" fill="none" stroke="{AMBER}" stroke-width="1.2"></rect>{t}</g>')

def back(x, y, w=24, h=34, rot=0):
    """A card face down: the deck's back."""
    return (f'<g transform="rotate({rot} {x} {y})"><rect x="{x - w / 2}" y="{y - h / 2}" width="{w}" height="{h}" rx="6" fill="{PLUM}" stroke="{INK}" stroke-width="2"></rect>'
            f'<circle cx="{x}" cy="{y}" r="{w / 5}" fill="none" stroke="#F3E3F0" stroke-width="2"></circle></g>')

def deck(x, y, n=4):
    return ''.join(back(x + k * 1.5, y - k * 3) for k in range(n))

def table(x=250, y=300):
    return f'<rect x="{x - 40}" y="{y - 6}" width="80" height="10" rx="4" fill="#C9805A" stroke="{INK}" stroke-width="2"></rect><path d="M{x - 30} {y + 4} V318 M{x + 30} {y + 4} V318" stroke="{INK}" stroke-width="4"></path>'

SIDES = [('#D6EBC8', 'people'), ('#FFDEA3', 'palette'), ('#A9C4FF', 'photo'), ('#FFD7F3', 'compass')]
def side(x, y, k, r=20, grey=False):
    """One side of who we are, as a round badge: people, interests, experiences, values."""
    c = '#C9CED6' if grey else SIDES[k][0]
    g = ['<circle cx="-6" cy="-5" r="4" fill="#3B4450"></circle><circle cx="6" cy="-5" r="4" fill="#3B4450"></circle><path d="M-13 10 q0 -9 7 -9 q7 0 7 9Z M-1 10 q0 -9 7 -9 q7 0 7 9Z" fill="#3B4450"></path>',
         '<path d="M-10 6 C-14 -8 4 -14 10 -6 C14 0 6 2 4 6 C2 10 -6 12 -10 6Z" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></path><circle cx="-3" cy="-5" r="2" fill="#D9534F"></circle><circle cx="4" cy="-4" r="2" fill="#4FA3A0"></circle>',
         '<rect x="-11" y="-9" width="22" height="18" rx="2" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></rect><path d="M-9 7 l6 -8 l5 5 l3 -3 l4 6Z" fill="#6E9E58"></path>',
         '<circle r="10" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></circle><path d="M0 -8 L3 0 L0 8 L-3 0Z" fill="#C0392B"></path>'][k]
    return f'<g transform="translate({x} {y})"><circle r="{r}" fill="{c}" stroke="{INK}" stroke-width="1.5"></circle><g transform="scale({r / 20})">{g}</g></g>'

def ring(xs=((268, 120), (214, 74), (128, 74), (74, 120)), grey=False):
    return ''.join(side(x, y, k, grey=grey) for k, (x, y) in enumerate(xs))

def seat(x=150, mood='calm'):
    return room() + chair() + ruth(x, mood=mood)

def bigphone(x=171, y=180):
    return f'<rect x="{x - 70}" y="{y - 130}" width="140" height="250" rx="18" fill="{INK}"></rect><rect x="{x - 62}" y="{y - 116}" width="124" height="222" rx="10" fill="#F4F1EA"></rect>'

def tally(x, y, w=36):
    return ''.join(block(x, y - k * 18, w, 16) for k in range(3))

S = {}
S[1] = seat(110, 'happy') + table() + deck(250, 282) + qcard(236, 140, 'מי תמיד מצליח להצחיק אתכם?') + lbl(171, 30, 'מפגש 11 · קלפי שיחה', fill='#E3F4F0')
S[2] = (seat(110) + table() + deck(250, 282) + qcard(236, 120, 'לאיזה מקום או רגע הייתם שמחים לחזור?', rot=-4)
        + f'<g transform="translate(60 40) scale(.3)">{land(sun=True)}{stones(PATH)}</g>' + thought(110, 196, 110, 150))
S[3] = (seat(110) + table() + deck(250, 282) + qcard(236, 120, 'ומה תמיד רציתם ללמוד אבל עוד לא יצא לכם?', w=170, rot=3) + spark(110, 130, 'lit') + thought(110, 196, 110, 150))
S[4] = (seat(171) + ring() + lbl(282, 156, 'האנשים שבחיינו', size=10) + lbl(214, 40, 'תחומי העניין שלנו', size=10)
        + lbl(128, 108, 'חוויות שחווינו', size=10) + lbl(76, 156, 'הערכים שמובילים אותנו', size=10) + lbl(171, 340, 'מה שהופך אותנו למי שאנחנו', fill='#FFF1CC', size=12))
S[5] = (seat(171, 'flat') + ring(grey=True) + ''.join(tally(x, y + 26) for x, y in ((268, 120), (214, 74), (128, 74), (74, 120)))
        + lbl(171, 30, 'כל מה שמעסיק אותנו ביום־יום', fill='#FFF1CC', size=12) + lbl(171, 340, 'אפשר אפילו לשכוח שהם קיימים', size=11))
S[6] = (seat(110) + table() + ''.join(back(150 + k * 18, 200 - abs(k - 1.5) * 4, rot=(k - 1.5) * 10) for k in range(4))
        + f'<rect x="200" y="176" width="22" height="32" rx="4" fill="{ACT}" stroke="{INK}" stroke-width="1.5" transform="rotate(20 211 192)"></rect><rect x="118" y="178" width="22" height="32" rx="4" fill="{CARD}" stroke="{INK}" stroke-width="1.5" transform="rotate(-20 129 194)"></rect>'
        + lbl(171, 30, 'שיחה קצת אחרת עם עצמנו', fill='#E3F4F0') + lbl(171, 130, 'חפיסת קלפים', size=11))
S[7] = (seat(171) + ring(grey=True).replace('#C9CED6', '#C9CED6') + side(268, 120, 0) + side(128, 74, 2) + tally(214, 100) + tally(74, 146)
        + f'<circle cx="198" cy="98" r="60" fill="{AMBER}" opacity=".13" stroke="{AMBER}" stroke-dasharray="5 5"></circle>'
        + lbl(290, 156, 'אנשים', size=11) + lbl(128, 110, 'זיכרונות', size=11) + lbl(214, 30, 'מקומות', size=11))
S[8] = (seat(171, 'happy') + ring() + tally(74, 146).replace('#8996A5', '#B8BFC8')
        + lbl(214, 30, 'מה שאנחנו אוהבים לעשות', size=10) + lbl(70, 160, 'מה שחשוב לנו', size=10) + lbl(171, 340, 'ומשהו כיפי לחשוב עליו', fill='#FFF1CC', size=11))
S[9] = seat(150, 'happy') + ring() + battery(286, 220, 0.85, w=36, h=60) + arrow(286, 290, 286, 256, '#5BAA6A') + lbl(171, 340, 'מה שנעים, שונה או נותן לנו כוח', fill='#FFF1CC', size=11)
S[10] = (seat(110) + table() + deck(250, 282) + lbl(240, 70, 'תשובה נכונה', size=12) + strike(240, 70, 80) + qcard(236, 150, '?', w=100, h=70, size=22)
         + thought(110, 196, 200, 150) + lbl(171, 30, 'פשוט פותחים קלף', fill='#E3F4F0'))
S[11] = (seat(171) + f'<path d="M262 120 C252 100 232 108 240 124 C246 134 262 142 262 142 C262 142 278 134 284 124 C292 108 272 100 262 120Z" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>'
         + bubble(171, 100, '…', w=50) + f'<rect x="64" y="96" width="36" height="46" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><path d="M70 110 h24 M70 120 h20 M70 130 h14" stroke="{SLATE}" stroke-width="2"></path>'
         + lbl(262, 170, 'בלב', size=12) + lbl(171, 64, 'בקול', size=12) + lbl(82, 170, 'בכתב', size=12) + lbl(171, 30, 'קחו את הזמן', fill='#FFF1CC'))
S[12] = (P + bigphone() + qcard(171, 120, 'מה תמיד רציתם ללמוד?', w=110, h=80, size=10) + lbl(171, 214, 'עוד רעיונות', fill='#FFF1CC', size=11) + lbl(171, 254, 'לשאלה הבאה', size=11)
         + f'<circle cx="214" cy="222" r="10" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle>')
S[13] = (room() + chair() + ruth(130, mood='happy') + friend(236, '#8DB7A2', '#6B4E3D') + qcard(184, 120, 'קלף', w=60, h=44)
         + bubble(110, 80, '…', w=44) + bubble(250, 80, '…', w=44) + spark(184, 64, 'lit') + lbl(171, 340, 'לשתף מישהו נוסף · שיחה מפתיעה', fill='#FFF1CC', size=11))
S[14] = (seat(110) + table() + deck(250, 282) + qcard(236, 140, 'קלף פעולה', fill=ACT, size=13)
         + f'<path d="M226 168 h20 M236 158 v20" stroke="{INK}" stroke-width="3"></path>' + lbl(171, 30, 'פעולה קטנה ומיטיבה', fill='#E3F4F0'))
S[15] = seat(110, 'happy') + ring() + table() + deck(250, 282) + qcard(236, 200, '?', w=80, h=60, size=20, rot=-6) + f'<circle cx="236" cy="200" r="52" fill="{SPARK}" opacity=".25"></circle>' + lbl(171, 30, 'נפתח קלף ונראה מה עולה', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · Three questions', [1, 2, 3], 'Ruth turns over the first cards; each question takes her somewhere: someone who makes her laugh, a place, something she always wanted to learn.'),
  (2, 'Act 2 · What makes us who we are', [4, 5], 'Four bright sides circle Ruth: people, interests, experiences, values. The day\'s grey load piles over them until they almost disappear.'),
  (3, 'Act 3 · The deck', [6, 7, 8, 9], 'A deck of cards of different kinds. Each card turns her attention back to one side: the blocks lift, the badges light, her battery charges.'),
  (4, 'Act 4 · How to play', [10, 11, 12, 13, 14], 'No right answers. Answer in the heart, aloud or in writing; on the phone ask for more ideas or skip; play with someone; action cards for a small kind act.'),
  (5, 'Act 5 · Open a card', [15], 'Ruth smiles and turns over the next card.'),
]
SHOT = {
 1: ('Ruth in her armchair, a small table with a face-down deck. She turns over the first card: the question, word for word. Title: מפגש 11 · קלפי שיחה.', 'Room and armchair; the deck is new and stays all film.', 'Fade in; the card flips on the question.'),
 2: ('Second card. A dashed thought from Ruth opens on the path landscape with the sun: a place to go back to.', 'The path world from session 1, as a memory.', 'Card flips; the thought opens.'),
 3: ('Third card. A spark of curiosity in her thought.', 'The spark from session 2.', 'Card flips; spark glows.'),
 4: ('The cards settle; four round badges rise around Ruth, one per word: האנשים שבחיינו, תחומי העניין שלנו, חוויות שחווינו, הערכים שמובילים אותנו (right to left).', 'Badges in the style of the session 1 tool badges: the session\'s anchor.', 'Each badge pops on its words.'),
 5: ('Grey task blocks (session 2\'s effort blocks) drop in front of each badge; the badges go grey and almost vanish. Ruth\'s smile flattens.', 'Effort blocks from session 2.', 'Blocks stack up one after another.'),
 6: ('Ruth picks up the deck: it fans out in her hands; cards of a few colours, kinds of questions.', 'The deck.', 'Fan opens on "חפיסת קלפים".'),
 7: ('A card turns its light (the circle of attention) onto the buried badges: blocks lift off the people and experiences badges. Tags: זיכרונות · אנשים · מקומות.', 'Circle of attention from session 3a.', 'Light sweeps; blocks slide away.'),
 8: ('The next cards lift the blocks off interests and values; a small smile badge for "something fun".', 'Badges, blocks.', 'Blocks slide away one by one.'),
 9: ('All four badges bright again around Ruth; the battery (session 5) beside her charges. מה שנעים, שונה או נותן לנו כוח.', 'Battery from session 5.', 'Level rises.'),
 10: ('"תשובה נכונה" is struck through. Ruth turns a card; a dashed thought line leads where the question takes her.', 'Struck tags (sessions 7, 10).', 'Strike draws; card flips.'),
 11: ('Three ways to answer, right to left: a heart at her chest (בלב), a speech bubble (בקול), a notebook (בכתב). An hourglass: קחו את הזמן; small balloons drift in.', 'Hourglass and thought balloons from sessions 3a and 10.', 'Each pops on its word.'),
 12: ('The game on the phone: the question card, and two buttons, עוד רעיונות and לשאלה הבאה; a finger taps each.', 'Big phone from session 4.', 'Taps on "כאן" and "כאן".'),
 13: ('Ruth\'s friend sits beside her; they look at one card together; talk bubbles and a spark between them.', 'Friend from sessions 5 and 63.', 'Friend slides in from the right.'),
 14: ('A green action card comes up from the deck: קלף פעולה, פעולה קטנה ומיטיבה.', 'The deck.', 'Card pops up and glows.'),
 15: ('Ruth, smiling, turns over the top card; it glows; the four badges bright around her.', 'Everything from the film.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', P + deck(171, 200, 5) + qcard(171, 120, 'שאלה', w=120, h=70), '<strong>The deck.</strong> Question cards, face up when a question is asked; the game itself.')
legend2 = ('0 0 342 360', P + ring(((250, 150), (200, 110), (142, 110), (92, 150))), '<strong>Four sides of who we are.</strong> People, interests, experiences, values; buried by the day, uncovered by the cards.')
legend3 = ('0 0 342 360', P + tally(171, 220, 80), '<strong>The day\'s load.</strong> Session 2\'s grey effort blocks, here piled over what matters.')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, the friend, the battery, the circle of attention, the big phone, the spark.', '<strong>Questions on cards</strong> are exactly the ones Nira reads; no answers are written for Ruth.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S11Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 11 · קלפי שיחה',
      'The things that make us who we are (people, interests, experiences, values) get buried by the busy day. A deck of question cards opens a different conversation with ourselves and turns attention back to them; there are no right answers, you just open a card and see.',
      'Ruth turns question cards → four bright badges around her → grey blocks bury them → each card lifts a block, the badges light, her battery charges → heart, voice or notebook; the phone game; a friend joins; an action card → she opens the next card, smiling.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S11Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":4200'))
print('rows', rows)
