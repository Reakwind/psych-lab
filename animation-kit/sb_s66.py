# Session 66 storyboard: attention and emotional balance — the circle of attention gets caught on a worry, then Ruth learns to move it and widen it; the scale holds the hard feelings and more.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S66.dc.html')
assert len(times) == 11
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def attn(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".18" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 4"></circle>'

def worry(x, y, s=1):
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-26 10 C-36 10 -38 -6 -28 -12 C-30 -28 -12 -34 -4 -26 C2 -40 24 -38 26 -24 C40 -28 46 -12 36 -2 C42 6 36 12 28 12Z" fill="#9AA3AD" stroke="{INK}" stroke-width="1.5"></path>'
            f'<circle cx="0" cy="-8" r="2.2" fill="{INK}"></circle><circle cx="14" cy="-8" r="2.2" fill="{INK}"></circle><path d="M-2 4 Q7 -1 16 4" stroke="{INK}" stroke-width="1.5" fill="none"></path></g>')

def photo(x, y):
    return (f'<rect x="{x - 18}" y="{y - 22}" width="36" height="30" rx="3" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect><circle cx="{x - 6}" cy="{y - 10}" r="4" fill="#C98B6B"></circle><circle cx="{x + 6}" cy="{y - 10}" r="4" fill="#B07AA1"></circle>'
            f'<path d="M{x} {y + 2} c-6 -4 -4 -9 0 -6 c4 -3 6 2 0 6Z" fill="#E66A7A"></path>')

def scene_room(ruth_mood='calm', extras=True):
    o = room(shoes=False) + chair() + ruth(150, mood=ruth_mood)
    if extras: o += photo(50, 146) + mug(226, 262)
    return o

S = {}
S[1] = scene_room() + attn(150, 200, 70) + lbl(171, 26, 'מפגש 66 · מבוא לחיזוק הקשב והאיזון הרגשי', fill='#E3F4F0', size=10)
S[2] = scene_room('flat') + worry(250, 110, 1.6) + attn(250, 110, 56) + arrow(190, 180, 226, 140, SLATE) + lbl(171, 40, 'נתפס במשהו שמדאיג', size=11)
S[3] = room(shoes=False) + ruth(150, 'stand') + f'<path d="M133 220 L116 176 M167 220 L184 176" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>' + attn(260, 130, 40) + arrow(190, 180, 240, 140) + lbl(171, 40, 'כמו שריר', fill='#FFF1CC', size=12)
S[4] = scene_room() + worry(250, 110, 1.2) + attn(171, 200, 150) + lbl(171, 26, 'מה שעוד נמצא שם', fill='#E3F4F0', size=11)
S[5] = (scene_room() + worry(250, 110, 1.0) + attn(50, 146, 30) + attn(226, 262, 30) + attn(60, 280, 30)
        + lbl(60, 104, 'מה שחשוב לנו', size=9) + lbl(250, 220, 'משהו נעים עכשיו', size=9) + lbl(90, 330, 'דבר קטן שמעריכים', size=9))
S[6] = scene_room() + worry(250, 110, 1.0) + attn(171, 200, 160) + lbl(171, 26, 'לא כדי להתעלם ממה שקשה', size=10) + lbl(171, 340, 'לחוות עוד דברים', fill='#FFF1CC', size=11)
S[7] = P + scale(171, 120, 14, right_items=('big',), left_items=(), right_label='רגשות קשים', left_label='') + lbl(171, 40, 'רגועים או חיוביים כל הזמן', size=11) + strike(171, 40, 150)
S[8] = P + scale(171, 120, 0, right_items=('big',), left_items=('heart', 'glow', 'compass'), right_label='רגשות קשים', left_label='עוד דברים') + lbl(171, 40, 'מקום לכל הרגשות', fill='#FFF1CC', size=12)
S[9] = scene_room() + attn(80, 220, 40) + attn(171, 200, 100) + lbl(250, 40, 'להפנות', size=11) + lbl(171, 40, 'לייצב', size=11) + lbl(92, 40, 'להרחיב', size=11)
S[10] = room(shoes=False) + ruth(130, 'stand', 'happy') + friend(220) + attn(171, 230, 100) + lbl(171, 40, 'נוכחים · במה שחשוב', fill='#E3F4F0', size=11)
S[11] = (f'<rect x="96" y="40" width="150" height="290" rx="22" fill="{INK}"></rect><rect x="106" y="56" width="130" height="258" rx="12" fill="#F4F1EA"></rect>'
         + attn(171, 110, 22) + f'<path d="M140 180 H202 M171 170 v20" stroke="{INK}" stroke-width="3"></path>' + photo(171, 240) + lbl(171, 340, 'מה מרגיש לי הכי מתאים היום?', fill='#FFF1CC', size=12))

ACTS = [
  (1, 'Act 1 · Where attention goes', [1, 2], 'The circle of attention floats around Ruth\'s room. A grey worry cloud appears; the circle snaps onto it and the worry swells to fill it.'),
  (2, 'Act 2 · Like a muscle', [3, 4, 5, 6], 'She stretches; now she moves the circle herself. It widens to take in more of the room with the worry still in it, then visits what matters (a photo), something pleasant now (her tea), a small thing she appreciates (a new leaf).'),
  (3, 'Act 3 · Emotional balance', [7, 8], 'The scale: hard feelings sit heavy on one pan. Not "calm or positive all the time". The hard ones stay; more things go on the other pan and the beam evens out.'),
  (4, 'Act 4 · Practice makes it steadier', [9, 10, 11], 'Direct, steady, widen. Ruth present with a friend in the room. Her phone: which practice fits today?'),
]
SHOT = {
 1: ('Ruth in her armchair. The warm dashed circle of attention appears around her and drifts a little. Title: מפגש 66 · מבוא לחיזוק הקשב והאיזון הרגשי.', 'The circle of attention (3a, 6).', 'Open on the room.'),
 2: ('A grey worry cloud pops up by the door. The circle slides over to it by itself, snaps on, and the worry swells until it fills most of the circle. Ruth\'s face drops: נתפס במשהו שמדאיג · חלק גדול מהקשב.', 'Grey cloud like the inner voice (4).', 'The circle slides on "נתפסת".'),
 3: ('Ruth stands and does a small arm stretch; then she points and the circle follows her hand, off the worry: כמו שריר.', 'The stretch from session 64.', 'She takes over the circle.'),
 4: ('The circle grows from the worry to take in the plant, the window light, the mug and the photo; the worry is still inside, smaller: מה שעוד נמצא שם · להרחיב.', 'Same room.', 'Circle widens.'),
 5: ('The circle moves to three things in turn: the photo of her friends (מה שחשוב לנו), the steaming tea (משהו נעים עכשיו), a new leaf on the plant (דבר קטן שמעריכים).', 'Ruth\'s plant and mug.', 'One move per phrase.'),
 6: ('Wide again: the worry and the good things together in one big circle: לא כדי להתעלם ממה שקשה · לחוות עוד דברים.', 'Same room.', 'Circle opens.'),
 7: ('The scale. The grey worry cloud drops onto the right pan and it sinks: רגשות קשים. A tag "רגועים או חיוביים כל הזמן" is struck through.', 'The scale (session 2), now for feelings.', 'Cloud drops on the pan.'),
 8: ('The grey stays. Warm tokens from act 2 (heart, tea, leaf) drop on the left pan one by one and the beam evens out: מקום לכל הרגשות · ובמקביל, עוד דברים.', 'Same scale; the things from act 2.', 'Tokens drop; beam levels.'),
 9: ('Back in the room: the circle moves (להפנות), holds still (לייצב), and grows (להרחיב), each on Nira\'s word.', 'The circle of attention.', 'Three beats.'),
 10: ('Ruth stands with a friend, smiling, the circle steady around them both: נוכחים · במה שחשוב · להרגיש ולתפקד יותר טוב.', 'The friend (5).', 'Friend joins.'),
 11: ('Her phone rises with the options as icons (the circle, the scale, the photo): מה מרגיש לי הכי מתאים היום?', 'The phone (sessions 7, 58, 64).', 'Phone rises.'),
}
legend1 = ('80 130 182 140', attn(171, 200, 60) + worry(171, 200, 1.2), '<strong>The circle of attention.</strong> From sessions 3a and 6: it gets caught, then moves, steadies and widens.')
legend2 = ('60 90 222 120', scale(171, 120, 0, right_items=('big',), left_items=('heart', 'glow'), right_label='', left_label=''), '<strong>The scale.</strong> Hard feelings stay on one pan; more things join on the other.')
legend3 = ('20 120 260 180', photo(60, 160) + mug(150, 160) + f'<path d="M230 190 c-8 -20 0 -40 20 -44 c4 20 -6 36 -20 44Z" fill="#4E8B5F"></path>', '<strong>The good things.</strong> What matters, something pleasant now, a small thing she appreciates: all in Ruth\'s room.')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, the circle of attention (3a, 6), the scale (2), the plant, the mug (5), the friend (5), the phone.',
           '<strong>Content:</strong> every tag is Nira\'s words. The photo, tea and leaf are her three examples drawn as objects in the room.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S66Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 66 · מבוא לחיזוק הקשב והאיזון הרגשי',
      'Attention often gets caught on what worries us. Like a muscle, we can train it: widen it to include more, and turn it to what matters, what is pleasant, what we appreciate. Emotional balance isn\'t being calm all the time: hard feelings keep their place, and other things get room too.',
      'The circle of attention drifts in Ruth\'s room → a grey worry grabs it and swells → she stretches and moves the circle herself → it widens over the room, then visits a photo, her tea, a new leaf → the worry drops onto a scale, warm things join the other pan and it evens → move, steady, widen → present with a friend → her phone.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
H = 3600
p = B + 'S66Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))  # set_height
print('rows', rows)
