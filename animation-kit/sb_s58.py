# Session 58 storyboard: "a moment, this matters to me" — one thing that matters, four short questions, and one small step to give it room.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S58.dc.html')
assert len(times) == 12
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
WARM = '#E66A7A'

def heart(x, y, s=1.0, glow=True):
    g = f'<circle cx="{x}" cy="{y}" r="{26 * s:.0f}" fill="{SPARK}" opacity=".3"></circle>' if glow else ''
    return g + f'<path transform="translate({x} {y}) scale({s * 1.6:.2f})" d="M0 7 C-10 0 -6 -9 0 -4 C6 -9 10 0 0 7Z" fill="{WARM}" stroke="{INK}" stroke-width="1"></path>'

def blocks(y, n=7, x0=300, gap=4, w=34, lit=(), room_at=None):
    """Ruth's day as a strip of grey task blocks, morning on the right."""
    o, x = '', x0
    for k in range(n):
        if room_at is not None and k == room_at:
            o += f'<rect x="{x - w}" y="{y - 14}" width="{w}" height="28" rx="6" fill="#FFF1CC" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4 3"></rect>'
        else:
            o += block(x - w / 2, y, w, 28, GREYS[k % 4])
        if k in lit: o += heart(x - w / 2, y - 26, 0.5, glow=False)
        x -= w + gap
    return o

def stone(x, y, r, lit=False):
    return f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r * .42:.0f}" fill="{SPARK if lit else STONE}" stroke="{INK}" stroke-width="1.5"></ellipse>'

def hourglass(x, y):
    return (f'<path d="M{x - 12} {y - 18} H{x + 12} M{x - 12} {y + 18} H{x + 12} M{x - 10} {y - 18} L{x + 10} {y - 18} L{x} {y} L{x + 10} {y + 18} L{x - 10} {y + 18} L{x} {y}Z" fill="#FFF3C4" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 5} {y + 16} L{x + 5} {y + 16} L{x} {y + 8}Z" fill="{AMBER}"></path>')

def icon(k, x, y):
    """The five things that matter, as round badges: people, a hobby, independence, helping others, feeling more ourselves."""
    c = ['#D6EBC8', '#A9C4FF', '#FFDEA3', '#FFD7F3', '#FFF1CC'][k]
    g = [f'<path d="M-14 13 q0 -11 8 -11 q8 0 8 11Z" fill="{PLUM}" stroke="{INK}" stroke-width="1.2"></path><path d="M-2 13 q0 -11 8 -11 q8 0 8 11Z" fill="#4FA3A0" stroke="{INK}" stroke-width="1.2"></path><circle cx="-6" cy="-7" r="5" fill="{SKIN}" stroke="{INK}" stroke-width="1.2"></circle><circle cx="6" cy="-7" r="5" fill="{SKIN}" stroke="{INK}" stroke-width="1.2"></circle>',
         f'<path d="M-9 9 L6 -8" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path><circle cx="8" cy="-10" r="4" fill="{WARM}"></circle>',
         f'<circle cx="-4" cy="0" r="6" fill="none" stroke="{INK}" stroke-width="2.5"></circle><path d="M2 0 H12 M8 0 v5 M12 0 v4" stroke="{INK}" stroke-width="2.5"></path>',
         f'<path d="M-11 4 q11 10 22 0" fill="none" stroke="{INK}" stroke-width="2.5"></path><path d="M0 1 C-7 -4 -4 -11 0 -7 C4 -11 7 -4 0 1Z" fill="{WARM}"></path>',
         f'<path d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3Z" fill="{SPARK}" stroke="{INK}" stroke-width="1.2"></path>'][k]
    return f'<g transform="translate({x} {y})"><circle r="20" fill="{c}" stroke="{INK}" stroke-width="1.8"></circle>{g}</g>'

def qcard(x, y, text, w=230, on=True):
    return (f'<rect x="{x - w / 2}" y="{y - 22}" width="{w}" height="44" rx="12" fill="{"#FFFFFF" if on else "#EFEAE0"}" stroke="{INK}" stroke-width="2"></rect>'
            f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-size="12" font-weight="600" fill="{INK}" direction="rtl">{html.escape(text)}</text>')

def app_phone(x, y, inner=''):
    return f'<rect x="{x - 40}" y="{y - 70}" width="80" height="140" rx="12" fill="{INK}"></rect><rect x="{x - 33}" y="{y - 60}" width="66" height="118" rx="7" fill="#F4F1EA"></rect>' + inner

S = {}
S[1] = room() + chair() + ruth(150) + blocks(80, n=6, x0=296) + heart(36, 80, 0.7) + lbl(171, 34, 'מפגש 58 · רגע, זה חשוב לי', fill='#E3F4F0')
S[2] = (P + ruth(171, 'stand') + ''.join(icon(k, x, y) for k, (x, y) in enumerate([(286, 120), (228, 80), (171, 66), (114, 80), (56, 120)]))
        + lbl(286, 160, 'קשר עם אנשים', size=10) + lbl(228, 120, 'תחביב', size=10) + lbl(171, 106, 'עצמאות', size=10) + lbl(114, 120, 'עזרה לאחרים', size=10) + lbl(56, 160, 'יותר אנחנו', size=10))
S[3] = (P + ruth(171, 'stand') + icon(0, 120, 230) + f'<g opacity=".25">{icon(1, 228, 80)}{icon(2, 171, 66)}{icon(3, 114, 80)}{icon(4, 56, 120)}</g>'
        + hourglass(260, 220) + lbl(171, 40, 'דבר אחד · כמה רגעים', fill='#FFF1CC'))
S[4] = room() + chair() + ruth(150).replace('r="4" fill="none"', 'r="0.1" fill="none"') + f'<circle cx="236" cy="100" r="46" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><circle cx="184" cy="160" r="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle>' + icon(0, 236, 100) + lbl(171, 40, 'משהו שבאמת חשוב לנו', fill='#E3F4F0')
S[5] = (P + app_phone(250, 170, qcard(250, 130, '?', w=50) + qcard(250, 180, '?', w=50) + qcard(250, 230, '?', w=50, on=False)) + icon(0, 90, 120) + blocks(290, n=5, x0=180, w=26)
        + f'<path d="M90 140 L90 270" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="5 5"></path>' + lbl(171, 40, 'איך הוא פוגש את החיים שלנו עכשיו', size=11, fill='#FFF1CC'))
S[6] = P + qcard(171, 70, 'למה הדבר הזה חשוב?') + icon(0, 171, 200).replace('r="20"', 'r="40"') + f'<circle cx="171" cy="200" r="70" fill="{SPARK}" opacity=".25"></circle>'
S[7] = P + qcard(171, 70, 'איך הוא בא לידי ביטוי בחיים שלי?') + blocks(220, n=8, x0=316, lit=(1, 4, 6)) + icon(0, 171, 300)
S[8] = (P + qcard(171, 70, 'מתי לאחרונה הצלחתי לתת לו מקום?', w=250) + blocks(220, n=8, x0=316, lit=(6,)) + arrow(250, 270, 110, 270, SLATE))
S[9] = (P + qcard(171, 60, 'ואיזה צעד קטן אוכל לעשות?', w=230) + blocks(140, n=7, x0=300, room_at=3)
        + ruth(110, 'stand') + stone(200, 312, 34, lit=True) + lbl(250, 220, 'עוד קצת מקום', fill='#FFF1CC'))
S[10] = (land() + stone(270, 250, 34, lit=True) + stone(171, 250, 34, lit=True) + stone(72, 250, 34, lit=True)
         + phone(259, 180, 'שיחת טלפון') + f'<path d="M171 200 l-10 22 M171 200 l10 22 M171 186 v14 M158 196 l26 -4" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path><circle cx="171" cy="176" r="9" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle>'
         + bubble(72, 190, 'מילה טובה', w=86, size=11) + lbl(171, 300, 'כמה דקות של תנועה', size=10))
S[11] = (land() + f'<path d="M210 290 Q216 200 270 196 Q326 200 330 290Z" fill="#9AA3AD" stroke="{INK}" stroke-width="2"></path>' + cross(270, 240, 20)
         + stone(110, 290, 40, lit=True) + lbl(110, 230, 'נגיש ואפשרי', fill='#FFF1CC') + lbl(171, 40, 'צעד לא צריך להיות גדול', fill='#E3F4F0'))
S[12] = land(sun=True) + stones(PATH, lit=(0,)) + f'<g transform="translate(0 6)">{ruth(160, "step")}</g>' + lbl(171, 60, 'מה חשוב לי?', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · No room for it', [1, 2], 'Ruth\'s day is a strip of grey task blocks; a small warm heart waits at its edge. The things that matter pop up around her.'),
  (2, 'Act 2 · Pick one', [3, 4, 5], 'One badge stays, the rest fade. She closes her eyes and holds it in mind; short question cards wait on her phone.'),
  (3, 'Act 3 · Four questions', [6, 7, 8, 9], 'Each question is a card. Why it matters (the badge glows), where it shows up in her day, when it last had room, and what small step could give it more.'),
  (4, 'Act 4 · One small step', [10, 11, 12], 'Three small steps as three warm stones; a boulder isn\'t needed. Ruth steps onto the first stone of her path.'),
]
SHOT = {
 1: ('Ruth in her chair. Above her, her day as a strip of grey task blocks, packed edge to edge; a small warm heart sits outside it, no room. Title: מפגש 58 · רגע, זה חשוב לי.', 'Ruth\'s room; the day runs right to left like the day line (3a).', 'Blocks slide in and close up; the heart is left out.'),
 2: ('Five round badges pop up around Ruth, right to left, on each phrase: קשר עם אנשים · תחביב · עצמאות · עזרה לאחרים · יותר אנחנו (her spark from session 2).', 'Badge look of the tool badges (session 1); the spark (session 2).', 'Badges pop in on Ariel\'s words.'),
 3: ('One badge (קשר עם אנשים) floats down to Ruth; the other four fade back. An hourglass turns: דבר אחד · כמה רגעים.', 'Same badges.', 'Others fade; hourglass flips.'),
 4: ('Back in the chair, Ruth closes her eyes; the chosen badge sits in a thought bubble above her: משהו שבאמת חשוב לנו.', 'Room, chair; the badge.', 'Bubble grows from her head.'),
 5: ('Her phone (the app) shows a short stack of question cards. A dashed line runs from the badge down to her day strip: איך הוא פוגש את החיים שלנו עכשיו.', 'Ruth\'s phone and the app look (sessions 4, 7).', 'Cards slide up; line draws.'),
 6: ('Card 1: למה הדבר הזה חשוב? The badge grows and glows warmer.', 'Question card; the badge.', 'Card flips in; glow swells.'),
 7: ('Card 2: איך הוא בא לידי ביטוי בחיים שלי? Small hearts light up here and there between the grey blocks of her day.', 'The day strip from shot 1.', 'Hearts blink on along the strip.'),
 8: ('Card 3: מתי לאחרונה הצלחתי לתת לו מקום? The strip slides back through earlier days until it finds the last little heart.', 'Same strip.', 'Strip scrolls back.'),
 9: ('Card 4: ואיזה צעד קטן…? Two blocks shuffle apart and open a gap; a warm stepping stone settles in it: עוד קצת מקום.', 'The stepping stones of Ruth\'s path (session 1).', 'Gap opens; stone drops in.'),
 10: ('Outside on the path, three warm stones, right to left, each with its step: a phone call, a few minutes of movement, a kind word to someone.', 'The path and stones (session 1); her phone.', 'Stones light one by one.'),
 11: ('A grey boulder is crossed out; a small warm stone stays: נגיש ואפשרי.', 'Stones.', 'Boulder fades, stone glows.'),
 12: ('Ruth steps onto the first warm stone of her path. Tag: מה חשוב לי?', 'Ruth\'s path from session 1.', 'Camera follows her step; hold.'),
}
legend1 = ('0 60 342 120', P + blocks(110, n=8, x0=316) + heart(40, 112, 0.7), '<strong>The full day.</strong> Grey task blocks edge to edge; what matters is left outside until she makes room.')
legend2 = ('0 30 342 160', P + icon(0, 171, 100).replace('r="20"', 'r="40"'), '<strong>The badge of what matters.</strong> Ruth picks one (people) and the four questions turn around it.')
legend3 = ('0 200 342 160', land() + stones(PATH, lit=(0,)), '<strong>A warm stone.</strong> The small step is one stone on her path: reachable, possible.')
carried = ['<strong>Kept:</strong> Ruth\'s room and path of stones (session 1), the day running right to left (3a), the spark (session 2), the phone and app.', '<strong>Words on screen</strong> are only Ariel\'s: the five things that matter, the four questions, the three example steps.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S58Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 58 · רגע, זה חשוב לי',
      'Things that matter don\'t always get room in a busy day. Picking one, asking four short questions about it, and finding one small, possible step gives it a little more room.',
      'Ruth\'s day is packed with grey blocks and a warm heart is left out → five things that matter, she picks one → four question cards → blocks shift and a warm stone fits in → three small steps → she steps onto the first stone.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
# preview height measured from a headless render of the board
H = 3540
p = B + 'S58Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))  # set_height
print('rows', rows)
