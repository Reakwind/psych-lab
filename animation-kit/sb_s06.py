# Session 6 storyboard: grounding — attention drifts off like a balloon; the senses gently bring it back to the room.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S06.dc.html')
assert len(times) == 12
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def balloon(x, y, inner=''):
    return (f'<path d="M{x - 30} {y + 14} C{x - 46} {y + 14} {x - 46} {y - 10} {x - 28} {y - 12} C{x - 26} {y - 34} {x + 4} {y - 38} {x + 10} {y - 20} C{x + 24} {y - 34} {x + 46} {y - 22} {x + 40} {y - 4} C{x + 52} {y + 2} {x + 48} {y + 14} {x + 36} {y + 14}Z" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></path>' + inner)

def string(x1, y1, x2, y2):
    return f'<path d="M{x1} {y1} C{(x1 + x2) / 2} {y1 - 30} {(x1 + x2) / 2} {y2 + 30} {x2} {y2}" fill="none" stroke="{SLATE}" stroke-width="1.6" stroke-dasharray="4 4"></path>'

def glow(x, y, rx, ry):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{SPARK}" opacity=".35" stroke="{AMBER}" stroke-width="2"></ellipse>'

def sound(x, y):
    return f'<path d="M{x} {y - 10} q8 10 0 20 M{x + 8} {y - 18} q14 18 0 36" fill="none" stroke="{AMBER}" stroke-width="3" stroke-linecap="round"></path>'

def roots(x, y):
    return f'<path d="M{x - 10} {y} q-8 14 -24 18 M{x - 10} {y} q0 16 -6 26 M{x + 10} {y} q8 14 24 18 M{x + 10} {y} q0 16 6 26" stroke="#8C6A4A" stroke-width="2.5" fill="none" stroke-linecap="round"></path>'

S = {}
S[1] = room() + chair() + ruth(150) + string(160, 196, 290, 70) + balloon(292, 62) + lbl(171, 40, 'מפגש 6 · מבוא לקרקוע', fill='#E3F4F0') + lbl(110, 140, 'הגוף כאן', size=11) + lbl(270, 110, 'הראש שם', size=11)
S[2] = (room() + chair() + ruth(150, mood='flat') + string(160, 196, 280, 80)
        + balloon(282, 70, f'<path d="M262 66 q6 -10 12 0 t12 0" stroke="{INK}" stroke-width="2" fill="none"></path>') + lbl(260, 120, 'דאגה · מחשבה · עומס', size=10))
S[3] = (room() + chair() + ruth(150) + string(160, 196, 200, 140) + balloon(204, 128) + arrow(240, 110, 210, 130, AMBER)
        + roots(160, 316) + roots(176, 316) + lbl(171, 40, 'Grounding · קרקוע', fill='#FFF1CC') + lbl(250, 300, 'להתחבר לקרקע', size=11))
S[4] = room() + chair() + ruth(150) + lbl(80, 110, 'הגוף', size=11) + lbl(171, 80, 'החושים', size=11) + lbl(262, 110, 'הסביבה', size=11) + lbl(171, 40, 'לרגע הנוכחי', fill='#E3F4F0')
S[5] = (room() + glow(160, 262, 56, 24) + chair() + ruth(150) + glow(168, 316, 26, 8) + glow(158, 262, 10, 8) + sound(90, 176) + f'<path d="M150 186 L80 270" stroke="{SLATE}" stroke-width="1.5" stroke-dasharray="3 4"></path>'
        + lbl(250, 230, 'הכיסא תומך', size=11) + lbl(90, 140, 'צלילים', size=11) + lbl(250, 300, 'כפות רגליים', size=11) + lbl(171, 40, 'דברים פשוטים שכבר כאן', fill='#E3F4F0'))
S[6] = room() + chair() + ruth(150) + f'<rect x="230" y="100" width="80" height="90" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><circle cx="270" cy="135" r="12" fill="{SKIN}"></circle>' + cross(270, 145, 34) + lbl(171, 40, 'לא צריך לחכות לשקט', fill='#FFF1CC')
S[7] = (room() + chair() + ruth(150) + tremor(180, 270) + f'<circle cx="160" cy="250" r="110" fill="{SPARK}" opacity=".12" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 6"></circle>'
        + sound(70, 176) + lbl(171, 40, 'גם זה חלק ממה שקורה', fill='#E3F4F0') + lbl(272, 270, 'רעד · עייפות', size=11))
S[8] = room() + chair() + ruth(150, mood='flat') + f'<path d="M136 170 l6 -10 l6 10 l6 -10 l6 10 l6 -10" stroke="#C0392B" stroke-width="3" fill="none"></path>' + roots(160, 316) + lbl(171, 40, 'מתוחים · מפוזרים · דואגים', fill='#FFF1CC')
S[9] = (land(sun=True) + ruth(130, 'stand', 'happy') + friend(210) + roots(122, 316) + roots(138, 316) + lbl(171, 40, 'גם ברגעים טובים', fill='#E3F4F0'))
S[10] = P + day_line(250, pills=(), curve=False) + ''.join(f'<circle cx="{x}" cy="250" r="9" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>' for x in (270, 210, 150, 90)) + lbl(171, 40, 'דקה פה ושם', fill='#FFF1CC') + lbl(171, 300, 'נעשה מוכר', size=11)
S[11] = room() + chair() + ruth(150, mood='happy') + f'<path d="M232 110 l10 10 l20 -22" stroke="#9AA3AD" stroke-width="4" fill="none"></path>' + strike(250, 110, 50) + lbl(171, 40, 'שמים לב למה שיש', fill='#E3F4F0')
S[12] = (room() + chair() + ruth(150) + roots(160, 316) + roots(176, 316) + glow(168, 318, 40, 10) + lbl(171, 40, 'בואו ננסה יחד', fill='#FFF1CC'))

ACTS = [
  (1, 'Act 1 · Here, and somewhere else', [1, 2], 'Ruth sits in her room while her attention floats off like a balloon on a string, into worry and overload.'),
  (2, 'Act 2 · Grounding', [3, 4], 'The string draws the balloon back; small roots at her feet: connecting to the ground through body, senses and surroundings.'),
  (3, 'Act 3 · What is already here', [5], 'The chair holding her, hands and feet, sounds and sights light up one by one.'),
  (4, 'Act 4 · No need to be calm first', [6, 7], 'The perfect-calm picture is crossed out again; tremor and tiredness sit inside the circle with everything else.'),
  (5, 'Act 5 · Any moment works', [8, 9, 10], 'Tense moments, and good ones too: outside, with someone she loves. A minute here and there makes it familiar.'),
  (6, 'Act 6 · Let\'s try', [11, 12], 'No right or wrong, just noticing. The camera settles on her feet on the floor, into the practice.'),
]
SHOT = {
 1: ('Ruth in her chair; a balloon on a dashed string floats from her head out to the corner: הגוף כאן, הראש שם. Title: מפגש 6 · מבוא לקרקוע.', 'Room. The balloon is the drifting thought from session 3a.', 'Balloon drifts up and away.'),
 2: ('Inside the balloon, a worry squiggle; it tugs at Ruth: דאגה · מחשבה · עומס.', 'Same balloon.', 'Squiggle tightens.'),
 3: ('The string gently draws the balloon back toward her; small roots grow from her feet into the floor. Grounding · קרקוע, להתחבר לקרקע.', 'Balloon; roots are the session\'s new anchor.', 'Roots draw down on "קרקע".'),
 4: ('Three soft labels around Ruth: הגוף, החושים, הסביבה.', 'Room.', 'Labels pop in order.'),
 5: ('One by one things light up: the chair under her, her hands and feet, a sound from the window, the plant she sees.', 'Room, the plant.', 'Each glow on its words.'),
 6: ('The perfect-calm picture from 3a is crossed out: לא צריך לחכות לשקט.', 'Picture from session 3a.', 'Cross draws on.'),
 7: ('The circle of attention around Ruth holds her tremor and tiredness along with the sounds and the chair.', 'Circle of attention from 3a.', 'Circle widens.'),
 8: ('A tense moment (zig-zag, flat mouth): grounding helps here — the roots return.', 'Tension mark from session 1.', 'Roots draw on.'),
 9: ('Outside on the path in the sun with a friend: grounding in good moments too.', 'Path world.', 'Cut outdoors.'),
 10: ('The day line with small grounding dots: דקה פה ושם; they light up as it becomes familiar.', 'Day line.', 'Dots light in turn.'),
 11: ('No grades: a check mark fades out: שמים לב למה שיש.', 'Room.', 'Check fades.'),
 12: ('The camera lowers to Ruth\'s feet on the floor, roots glowing: בואו ננסה יחד. The grounding practice follows.', 'Roots; leads into the practice.', 'Tilt down to the floor.'),
}
legend1 = ('0 0 342 360', room() + chair() + ruth(150) + string(160, 196, 290, 70) + balloon(292, 62), '<strong>The balloon on a string.</strong> Attention drifting off; grounding draws it gently back.')
legend2 = ('0 0 342 360', room() + roots(160, 316) + roots(176, 316) + chair() + ruth(150), '<strong>Roots.</strong> Small roots from her feet: connecting to the ground, through body, senses and surroundings.')
legend3 = ('0 0 342 360', room() + glow(160, 262, 56, 24) + chair() + ruth(150) + sound(90, 176), '<strong>Lighting up.</strong> Ordinary things already here (chair, feet, sounds) glow as she notices them.')
carried = ['<strong>Kept:</strong> Ruth\'s room, Ariel\'s voice, the balloon and the circle of attention from 3a, the day line.', '<strong>New:</strong> roots and the glow of noticing; the grounding practice that follows can use both.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S06Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 6 · מבוא לקרקוע',
      'When the mind is somewhere else, grounding brings some attention back to what is right here, through the body, the senses and the room. It needs nothing special, works with tremor and tiredness, and any moment is a good one to practise.',
      'Ruth\'s attention floats off like a balloon → the string brings it back, roots at her feet → the chair, her feet, sounds light up → tremor is part of it → tense or happy moments, a minute at a time → into the practice.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
