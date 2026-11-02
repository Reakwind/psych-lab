# Session 42 storyboard: self-care — a day of things that lift and things that drain; making a little room for the ones that lift.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S42.dc.html')
assert len(times) == 14
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
GREY = '#9AA3AD'

def tok(x, y, r=12, heart=False):
    """A warm token (the reward token from session 2): something that lifts."""
    o = f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFE2A8" stroke="{INK}" stroke-width="1.5"></circle>'
    if heart: return o + f'<path d="M{x} {y + 5} C{x - 9} {y - 1} {x - 5} {y - 9} {x} {y - 4} C{x + 5} {y - 9} {x + 9} {y - 1} {x} {y + 5}Z" fill="#E66A7A"></path>'
    return o + f'<circle cx="{x}" cy="{y}" r="{r * .5:.0f}" fill="{AMBER}"></circle>'

def gb(x, y, w=30, h=20):
    """A grey block (the effort block from session 2): something that drains or demands."""
    return block(x, y, w, h, fill=GREY)

def neutral(x, y):
    return f'<rect x="{x - 13}" y="{y - 10}" width="26" height="20" rx="6" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'

def strip(y=92, items=''):
    return day_line(y, curve=False) + items

def up(x, y): return arrow(x, y, x, y - 22, AMBER)
def down(x, y): return arrow(x, y, x, y + 22, '#7B8794')

def voice(x, y, warm):
    c = '#FFD9A0' if warm else '#C9CED6'
    mouth = f'M{x - 7} {y + 6} Q{x} {y + 12} {x + 7} {y + 6}' if warm else f'M{x - 7} {y + 9} Q{x} {y + 3} {x + 7} {y + 9}'
    return (f'<path d="M{x - 30} {y + 16} C{x - 46} {y + 16} {x - 46} {y - 8} {x - 28} {y - 10} C{x - 26} {y - 32} {x + 4} {y - 36} {x + 10} {y - 18} C{x + 24} {y - 32} {x + 46} {y - 20} {x + 40} {y - 2} C{x + 52} {y + 4} {x + 48} {y + 16} {x + 36} {y + 16}Z" fill="{c}" stroke="{INK}" stroke-width="2"></path>'
            f'<circle cx="{x - 8}" cy="{y - 2}" r="2.5" fill="{INK}"></circle><circle cx="{x + 8}" cy="{y - 2}" r="2.5" fill="{INK}"></circle><path d="{mouth}" stroke="{INK}" stroke-width="2" fill="none"></path>')

def pot(x, y):
    return f'<path d="M{x - 20} {y - 12} h40 v14 q0 10 -10 10 h-20 q-10 0 -10 -10Z" fill="#8996A5" stroke="{INK}" stroke-width="1.5"></path><path d="M{x - 26} {y - 10} h6 M{x + 20} {y - 10} h6" stroke="{INK}" stroke-width="3"></path><path d="M{x - 5} {y - 18} q4 -6 0 -12 M{x + 5} {y - 18} q4 -6 0 -12" stroke="{SLATE}" stroke-width="1.5" fill="none"></path>'

def daycard(x, y, txt, sun=True):
    s = f'<circle cx="{x}" cy="{y - 6}" r="12" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>' if sun else f'<path d="M{x - 16} {y} q0 -14 14 -12 q6 -10 16 -2 q10 0 8 14Z" fill="#C9CED6" stroke="{INK}" stroke-width="1.5"></path>'
    return f'<rect x="{x - 40}" y="{y - 40}" width="80" height="78" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + s + lbl(x, y + 24, txt, size=11)

ROW = [(276, 'gb'), (226, 'tok'), (176, 'gb'), (126, 'tok'), (76, 'gb')]
def sorted_row(y=92, dy=0):
    o = ''
    for x, k in ROW:
        o += (tok(x, y - dy) + (up(x, y - dy - 16) if dy else '')) if k == 'tok' else (gb(x, y + dy) + (down(x, y + dy + 14) if dy else ''))
    return o

S = {}
S[1] = room() + chair() + ruth(150) + lbl(171, 40, 'מפגש 42 · מבוא ללדאוג לעצמי', fill='#E3F4F0') + bubble(240, 112, 'מה זה בעצם אומר?', w=140)
S[2] = room() + chair() + ruth(150) + strip(92, ''.join(neutral(x, 92) for x, _ in ROW)) + lbl(171, 40, 'מקדישים את הזמן שלנו', fill='#FFF1CC') + lbl(300, 124, 'בוקר', size=10) + lbl(40, 124, 'שינה', size=10)
S[3] = (room() + chair() + ruth(150) + strip(100, sorted_row(100, 26)) + battery(296, 236, 0.6, w=34, h=58)
        + lbl(240, 30, 'מרימים · ממלאים', fill='#FFF1CC', size=12) + lbl(171, 160, 'מרוקנים · מורידים', size=12))
S[4] = (room() + chair() + ruth(150, mood='happy') + strip(92, tok(250, 92) + tok(171, 92) + tok(92, 92, heart=True))
        + lbl(250, 124, 'ספורט', size=11) + lbl(171, 124, 'תחביב', size=11) + lbl(92, 124, 'זמן עם מישהו', size=11) + lbl(171, 40, 'לוודא שיש מספיק כאלה', fill='#E3F4F0'))
S[5] = (P + mug(270, 110) + lbl(270, 150, 'לקחת הפסקה', size=11)
        + gb(92, 104, 90, 18) + f'<line x1="72" y1="92" x2="72" y2="116" stroke="#C0392B" stroke-width="3" stroke-dasharray="4 3"></line>' + lbl(92, 150, 'לקצר פעילות', size=11)
        + f'<path d="M232 248 q20 -18 40 0" stroke="{INK}" stroke-width="5" fill="none" stroke-linecap="round"></path><circle cx="232" cy="250" r="7" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle><circle cx="272" cy="250" r="7" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle>' + lbl(252, 290, 'לבקש עזרה', size=11)
        + tok(92, 246, 18, heart=True) + lbl(92, 290, 'להקל על עצמנו', size=11))
S[6] = (land() + ruth(240, 'stand', 'happy') + friend(100) + pot(240, 250) + pot(100, 250)
        + tok(240, 130) + up(240, 112) + gb(100, 130) + lbl(240, 70, 'נעים ותומך', fill='#FFF1CC', size=12) + lbl(100, 70, 'עוד מטלה', size=12)
        + f'<line x1="171" y1="20" x2="171" y2="330" stroke="{INK}" stroke-width="1.5" stroke-dasharray="4 5"></line>')
S[7] = (P + daycard(250, 110, 'היום') + tok(250, 60) + daycard(92, 110, 'מחר', sun=False) + f'<text x="92" y="66" text-anchor="middle" font-size="22" font-weight="700" fill="{SLATE}">?</text>'
        + battery(60, 250, 0.4, w=30, h=50, label=False) + lbl(60, 300, 'אנרגיה', size=10) + head(140, 250, 16, 'flat') + lbl(140, 300, 'מצב רוח', size=10)
        + tremor(196, 250) + lbl(214, 300, 'סימפטומים', size=10) + f'<rect x="270" y="232" width="34" height="34" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><line x1="270" y1="242" x2="304" y2="242" stroke="{INK}" stroke-width="1.5"></line>' + lbl(288, 300, 'מה שקורה', size=10))
S[8] = (room() + chair() + ruth(150, mood='flat') + strip(92, ''.join(gb(x, 92, 40, 22) for x in (276, 222, 168, 114, 60)))
        + lbl(276, 128, 'סימפטומים', size=10) + lbl(200, 150, 'תרגולים', size=10) + lbl(150, 128, 'תורים', size=10) + lbl(96, 150, 'משימות', size=10) + lbl(46, 128, 'אחריות', size=10) + lbl(171, 40, 'כבר דורש לא מעט', fill='#FFF1CC'))
S[9] = (room() + chair() + ruth(150) + strip(92, gb(276, 92, 40, 22) + gb(222, 92, 40, 22) + gb(114, 92, 40, 22) + gb(60, 92, 40, 22) + tok(168, 92, 14))
        + gb(168, 150, 40, 22) + arrow(168, 106, 168, 134, '#7B8794') + lbl(260, 150, 'לוותר על משהו', size=10) + lbl(168, 40, 'לפנות מקום למשהו שחשוב', fill='#E3F4F0'))
S[10] = room() + chair() + ruth(150, mood='happy') + voice(250, 110, False) + arrow(214, 112, 196, 112) + voice(110, 110, True) + lbl(171, 40, 'פחות ביקורת · יותר הבנה וחמלה', fill='#E3F4F0', size=12)
S[11] = (room() + chair() + ruth(150, mood='happy') + strip(92, gb(276, 92) + tok(226, 92) + gb(176, 92) + tok(126, 92, heart=True) + tok(76, 92))
         + ''.join(f'<circle cx="{x}" cy="92" r="22" fill="{SPARK}" opacity=".35"></circle>' for x in (226, 126, 76)) + lbl(150, 140, '"לדאוג לעצמי"', size=12) + lbl(171, 40, 'בלי לחשוב עליהם ככה', fill='#FFF1CC'))
S[12] = (room() + chair() + ruth(150) + bubble(250, 60, 'מה עוזר לי?', size=11) + bubble(96, 60, 'מתי זה עוזר לי?', size=11)
         + bubble(240, 120, 'מה או מי גורם לי להרגיש טוב יותר?', w=200, size=10) + bubble(96, 172, 'מה מרים אותי?', size=11))
S[13] = (land() + stones(PATH, lit=(0,)) + ruth(150, 'stand') + pack(150, 236) + tool(250, 120, 3, 18) + tool(92, 120, 0, 18)
         + lbl(250, 160, 'מה שבוחרים לעשות', size=11) + lbl(92, 160, 'איך שמתייחסים לעצמנו', size=11) + lbl(171, 40, 'דרכים שונות לדאוג לעצמנו', fill='#E3F4F0'))
S[14] = (land(sun=True) + stones(PATH, lit=(0, 1, 2)) + ruth(150, 'step', 'happy') + lbl(250, 60, 'עוד משימה', size=12) + strike(250, 60, 90)
         + lbl(110, 110, 'צעד אחר צעד', fill='#FFF1CC') + lbl(110, 140, 'מה מרגיש נכון', size=11))

ACTS = [
  (1, 'Act 1 · What does it mean?', [1, 2], 'Ruth in her room. Her day appears as a line, morning to night, holding all the things she spends her time on.'),
  (2, 'Act 2 · Lift or drain', [3, 4, 5], 'Some things lift and fill her (warm tokens, the battery rises); some drain her (grey blocks). Self-care: making sure there are enough warm ones, or easing the load.'),
  (3, 'Act 3 · Not the same for everyone', [6, 7], 'The same meal is warm for one person and a chore for another; what helps today may not fit tomorrow.'),
  (4, 'Act 4 · A full day', [8, 9, 10], 'Parkinson\'s fills the day with grey blocks; the warm ones get squeezed out. Making room, letting go of something, and a kinder inner voice.'),
  (5, 'Act 5 · You may already have some', [11, 12], 'Warm tokens already in her day light up; four questions to ask herself.'),
  (6, 'Act 6 · Step by step', [13, 14], 'Back on the path: ways to care for herself in what she does and how she treats herself. Not another task: one stone at a time.'),
]
SHOT = {
 1: ('Ruth in her chair. Title: מפגש 42 · מבוא ללדאוג לעצמי. A question bubble: מה זה בעצם אומר?', 'Ruth\'s room.', 'Fade in; bubble pops on "מה זה".'),
 2: ('A day line draws above her, sun (morning) on the right to moon (night) on the left; five blank items drop onto it.', 'The day line from sessions 3a and 5.', 'Line draws right to left; items drop in.'),
 3: ('The items sort themselves: warm tokens float up (מרימים · ממלאים), grey blocks sink (מרוקנים · מורידים). Her battery fills with each warm one and dips with each grey one.', 'Tokens and blocks from session 2\'s scale; the battery from session 5.', 'Up on "מרימים", down on "מרוקנים".'),
 4: ('Three warm tokens, labelled with the narration: ספורט · תחביב · זמן עם מישהו. Tag: לוודא שיש מספיק כאלה.', 'Same day line.', 'Tokens pop on each word.'),
 5: ('Four small easings, one per phrase: a mug (הפסקה), a grey bar cut shorter (לקצר פעילות), two hands (לבקש עזרה), a warm heart token (להקל על עצמנו).', 'Grey block, warm token.', 'Each appears on its phrase.'),
 6: ('Two people side by side, each at the same pot. Right: warm token, נעים ותומך. Left: grey block, עוד מטלה.', 'Ruth and her friend from session 5.', 'Split slides in.'),
 7: ('Two day cards, היום and מחר; the warm token sits on today, tomorrow is a question mark. Four small gauges: battery, mood face, tremor, calendar.', 'Battery (5), day cards (3a).', 'Cards flip; gauges tick in on each word.'),
 8: ('The day line fills with grey blocks: סימפטומים · תרגולים · תורים · משימות · אחריות. Ruth sinks a little.', 'Day line.', 'Blocks thud in one by one.'),
 9: ('A warm token is squeezed off the full line; then a less important grey block lifts away and the token slides back into the gap.', 'Same line.', 'Block lifts on "לוותר"; token returns on "לפנות מקום".'),
 10: ('Ruth\'s inner voice beside her: the grey critic cloud warms. Tag: פחות ביקורת · יותר הבנה וחמלה.', 'Inner voice from session 4.', 'Grey cross-fades to warm.'),
 11: ('Warm tokens already on her day line glow; the words "לדאוג לעצמי" settle over them in quotes.', 'Day line.', 'Glow passes from token to token.'),
 12: ('Ruth pauses; four questions pop one by one: מה עוזר לי? · מתי זה עוזר לי? · מה או מי גורם לי להרגיש טוב יותר? · מה מרים אותי?', 'Room.', 'Each pops on its question.'),
 13: ('The path of stones ahead; two tool badges light: the heart (מה שבוחרים לעשות) and the head (איך שמתייחסים לעצמנו).', 'Path, backpack, tool badges from session 1.', 'Room dissolves to the path.'),
 14: ('"עוד משימה" struck through; Ruth steps from stone to stone and each one lights: צעד אחר צעד · מה מרגיש נכון.', 'Path.', 'Stones light under her steps.'),
}
legend1 = ('0 40 342 110', P + strip(92, sorted_row(92, 20)), '<strong>Ruth\'s day.</strong> A line from morning to night. Warm tokens lift her, grey blocks drain her.')
legend2 = ('0 0 342 360', P + battery(171, 180, 0.6, w=80, h=150, label=False), '<strong>The battery.</strong> From session 5: it rises with what lifts her and falls with what drains her.')
legend3 = ('0 0 342 360', land() + stones(PATH, lit=(0, 1)) + ruth(150, 'stand'), '<strong>The path.</strong> Session 1\'s stepping stones: self-care learned step by step.')
carried = ['<strong>Kept:</strong> Ruth\'s room, the day line (3a, 5), the battery (5), the warm tokens and grey blocks (2), the inner voice (4), the path and tool badges (1).',
           '<strong>Every label</strong> on screen is a word Nira says.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S42Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 42 · מבוא ללדאוג לעצמי',
      'Self-care just means making sure the day holds enough of the things that lift us. It looks different for each person and each day, and with Parkinson\'s those things are easily squeezed out. It isn\'t another task, but a chance to find, step by step, what feels right.',
      'A day line fills with things → some lift (warm), some drain (grey) → the same thing differs between people and days → Parkinson\'s grey blocks crowd the warm ones out → she lets one go and makes room → warm ones she already has light up → step by step along the path.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
# preview height measured with headless Chrome (content height of the board)
f = B + 'S42Story.dc.html'; page = open(f, encoding='utf-8').read(); open(f, 'w', encoding='utf-8').write(page.replace('"height":4700', '"height":4952'))
