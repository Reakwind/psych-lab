# Session 14 storyboard: stress, anxiety and calming the body — a tension meter beside Ruth rises with what stress does to body and mind; four calming tools bring it down a little, laid along her path to try one by one.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S14.dc.html')
assert len(times) == 16
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def meter(x, y, level, h=110):
    """The tension meter from session 3b: red fill, level 0..1."""
    fh = (h - 10) * level
    return (f'<rect x="{x - 12}" y="{y - h}" width="24" height="{h}" rx="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - 7}" y="{y - 5 - fh:.0f}" width="14" height="{fh:.0f}" rx="7" fill="#D9534F"></rect>')

CALM = [('#B3EFE4', 'breath'), ('#D6EBC8', 'roots'), ('#FFDEA3', 'attn'), ('#E3D7F3', 'image')]
def calm(x, y, k, r=18):
    """The four calming tools as badges: breathing and relaxation, grounding, mindfulness, guided imagery."""
    g = ['<path d="M-9 -3 q4 -6 9 0 t9 0 M-9 4 q4 -6 9 0 t9 0" fill="none" stroke="#3B4450" stroke-width="2"></path>',
         '<path d="M0 -10 V2 M0 2 C-2 8 -8 8 -10 12 M0 2 C2 8 8 8 10 12 M0 2 V12" fill="none" stroke="#3B4450" stroke-width="2"></path>',
         '<circle r="9" fill="none" stroke="#3B4450" stroke-width="2" stroke-dasharray="3 3"></circle><circle r="3" fill="#3B4450"></circle>',
         '<path d="M-10 6 C-14 6 -14 -2 -9 -2 C-9 -8 -1 -10 1 -5 C4 -9 11 -6 10 -1 C14 0 13 6 9 6Z" fill="#FFFFFF" stroke="#3B4450" stroke-width="1.5"></path><circle cx="4" cy="-8" r="3" fill="#E8A33D"></circle>'][k]
    return f'<g transform="translate({x} {y})"><circle r="{r}" fill="{CALM[k][0]}" stroke="{INK}" stroke-width="1.5"></circle><g transform="scale({r / 18})">{g}</g></g>'

def seat(x=130, mood='calm'):
    return room() + chair() + ruth(x, mood=mood)

def tense(x, y=212):
    return f'<path d="M{x - 26} {y + 20} l6 -6 l6 6 M{x + 14} {y + 20} l6 -6 l6 6" stroke="#D9534F" stroke-width="2" fill="none"></path>'

def balloons(x, y, n=3, col='#D7DCE2'):
    return ''.join(f'<ellipse cx="{x + k * 26}" cy="{y - (k % 2) * 14}" rx="14" ry="10" fill="{col}" stroke="{INK}" stroke-width="1.5"></ellipse>' for k in range(n))

def bell(x, y):
    return f'<path d="M{x - 16} {y + 10} C{x - 14} {y - 6} {x - 12} {y - 18} {x} {y - 20} C{x + 12} {y - 18} {x + 14} {y - 6} {x + 16} {y + 10}Z" fill="{AMBER}" stroke="{INK}" stroke-width="1.5"></path><circle cx="{x}" cy="{y + 14}" r="4" fill="{INK}"></circle>'

def loop(x1, y1, x2, y2):
    return arrow(x1, y1, x2, y2, '#4FA3A0') + arrow(x2 + 10, y2, x1 + 10, y1, '#4FA3A0')

S = {}
S[1] = seat() + meter(250, 280, 0.25) + f'<line x1="96" y1="206" x2="166" y2="206" stroke="{AMBER}" stroke-width="3"></line>' + lbl(171, 30, 'מפגש 14 · מתח, חרדה והרגעת הגוף', fill='#E3F4F0', size=12) + lbl(171, 70, 'מה שקורה בגוף', size=11)
S[2] = (seat(mood='flat') + meter(270, 290, 0.65) + tense(130) + wave(150, 200, 30, 4, 4) + balloons(96, 110) + f'<rect x="18" y="150" width="64" height="56" rx="4" fill="#3F4A63" stroke="{INK}" stroke-width="2"></rect>'
        + lbl(250, 40, 'נשימה מהירה', size=10) + lbl(250, 70, 'שרירים מתכווצים', size=10) + lbl(110, 40, 'מחשבות רצות', size=10) + lbl(110, 70, 'קשה להירדם', size=10) + lbl(250, 100, 'קשה להתרכז', size=10))
S[3] = (P + ruth(171, 'stand') + f'<circle cx="171" cy="186" r="26" fill="{AMBER}" opacity=".3"></circle><rect x="148" y="200" width="46" height="70" rx="10" fill="{AMBER}" opacity=".25"></rect>' + loop(210, 190, 210, 250)
        + lbl(260, 180, 'תודעה', size=11) + lbl(260, 250, 'גוף', size=11) + bell(70, 120) + lbl(70, 160, 'קושי · דאגה · חוסר ודאות', size=9) + lbl(171, 40, 'חלק מלהיות בן אדם', fill='#FFF1CC'))
S[4] = (bighead(f'<circle cx="171" cy="150" r="10" fill="#4FA3A0" opacity=".5"></circle><circle cx="140" cy="140" r="6" fill="#4FA3A0" opacity=".3"></circle>') + meter(250, 250, 0.5, 80)
        + lbl(171, 300, 'החרדה עצמה: גם סימפטום', fill='#FFF1CC', size=11) + lbl(171, 334, 'השינויים במוח משפיעים על מצב הרוח', size=10))
S[5] = (P + day_line(250, pills=(272, 150)) + meter(200, 180, 0.6, 70) + lbl(200, 40, 'כשהתרופה מתחילה לרדת', size=10) + f'<rect x="90" y="196" width="22" height="22" rx="3" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'
        + lbl(100, 80, 'מצבי חיים מסוימים', size=10) + lbl(171, 300, 'ולפעמים בלי סיבה ברורה', fill='#FFF1CC', size=11))
S[6] = seat() + phone_guide(200, 230) + meter(270, 290, 0.4) + bubble(110, 110, 'איך זה אצלי?', w=110) + lbl(171, 30, 'מתח נפשי ↔ סימפטומים', fill='#E3F4F0', size=12)
S[7] = (seat(mood='flat') + f'<rect x="18" y="150" width="64" height="56" rx="4" fill="#3F4A63" stroke="{INK}" stroke-width="2"></rect><path d="M58 164 a10 10 0 1 0 0 20 a7 7 0 1 1 0 -20Z" fill="#E9E4C8"></path>'
        + balloons(150, 110, 2) + battery(270, 240, 0.25, w=30, h=50) + lbl(171, 30, 'כשאתם מודאגים', size=11) + lbl(200, 70, 'אחרי לילה שלא ישנתם טוב', size=10))
S[8] = seat() + f'<circle cx="130" cy="240" r="100" fill="{AMBER}" opacity=".12" stroke="{AMBER}" stroke-dasharray="5 5"></circle>' + loop(180, 200, 180, 260) + lbl(171, 30, 'פשוט להתחיל לשים לב', fill='#FFF1CC') + lbl(250, 230, 'גוף ↔ תודעה', size=11)
S[9] = (P + ruth(171, 'stand', 'flat') + meter(171, 120, 0.7, 70) + tremor(186, 250) + ''.join(arrow(171, 130, x, y, '#D9534F', 2) for x, y in ((270, 130), (250, 70), (92, 70), (72, 130), (171, 30)))
        + lbl(290, 150, 'נשימה', size=10) + lbl(250, 90, 'שרירים', size=10) + lbl(171, 46, 'שינה', size=10) + lbl(92, 90, 'מצב רוח', size=10) + lbl(60, 150, 'אנרגיה', size=10) + lbl(171, 340, 'הסימפטומים עלולים להתגבר', fill='#FFF1CC', size=11))
S[10] = (P + calm(270, 170, 0, 26) + calm(200, 170, 1, 26) + calm(130, 170, 2, 26) + calm(60, 170, 3, 26) + lbl(270, 216, 'נשימה והרפיה', size=9) + lbl(200, 240, 'קרקוע', size=9) + lbl(130, 216, 'מיינדפולנס', size=9)
         + lbl(60, 240, 'דמיון מודרך', size=9) + lbl(171, 80, 'נחקרו ונמצאו יעילים', fill='#E3F4F0'))
S[11] = seat(mood='happy') + meter(270, 290, 0.3) + arrow(300, 190, 300, 240, '#5BAA6A') + balloons(180, 90, 2, '#EEF0F2') + lbl(171, 30, 'להפחית מעט את הדריכות', size=11) + lbl(200, 130, 'רגע של הפוגה', fill='#FFF1CC', size=11)
S[12] = land() + stones(PATH) + ruth(90, 'stand') + calm(150, 300, 0) + calm(176, 270, 1, 15) + calm(158, 248, 2, 13) + calm(178, 228, 3, 11) + lbl(171, 40, 'וזה מה שנעשה במהלך התכנית', fill='#FFF1CC', size=11)
S[13] = (room() + ruth(130, 'stand', 'happy') + f'<rect x="138" y="240" width="18" height="16" rx="3" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect>' + calm(190, 200, 0, 14) + arrow(160, 240, 180, 214, AMBER, 2)
         + lbl(171, 30, 'כלים פשוטים לשלוף מהכיס', fill='#E3F4F0', size=11) + lbl(250, 120, 'רגע של שקט', size=11))
S[14] = (P + lbl(100, 60, 'תרופת פלא', size=12) + strike(100, 60, 80) + lbl(240, 60, 'רגיעה לפי דרישה', size=12) + strike(240, 60, 110) + ruth(171, 'stand', 'happy')
         + f'<path d="M160 316 C150 330 130 336 120 350 M182 316 C192 330 212 336 222 350 M171 316 V350" stroke="#6E9E58" stroke-width="3" fill="none"></path>' + lbl(171, 120, 'קצת יותר יציבות', fill='#FFF1CC'))
S[15] = (P + day_line(200, pills=()) + f'<circle cx="270" cy="200" r="12" fill="#FFDEA3" stroke="{INK}" stroke-width="1.5"></circle><rect x="196" y="190" width="24" height="18" rx="4" fill="#B9A6C9" stroke="{INK}" stroke-width="1.5"></rect>' + battery(140, 200, 0.7, w=18, h=28, label=False)
         + f'<path d="M80 192 a8 8 0 1 0 0 16 a6 6 0 1 1 0 -16Z" fill="#8E9AB0"></path>' + lbl(270, 240, 'להתמקד', size=10) + lbl(208, 160, 'לנוח', size=10) + lbl(140, 240, 'להתאושש', size=10) + lbl(80, 160, 'לשינה', size=10)
         + lbl(171, 310, 'כמה דקות לעצמנו', fill='#FFF1CC', size=12))
S[16] = (land(sun=True) + stones(PATH, lit=(0, 1)) + ruth(120, 'stand', 'happy') + ariel(230) + calm(150, 300, 0) + calm(176, 270, 1, 15) + calm(158, 248, 2, 13) + calm(178, 228, 3, 11)
         + lbl(171, 40, 'נגלה אילו מהן עובדות בשבילכם', fill='#E3F4F0', size=11))

ACTS = [
  (1, 'Act 1 · What stress does', [1, 2, 3], 'A tension meter beside Ruth rises with each sign: faster breath, tight muscles, scattered focus, racing thoughts, a sleepless night. Body and mind both; a human alarm.'),
  (2, 'Act 2 · Parkinson\'s and anxiety', [4, 5], 'Inside her head: the brain changes of Parkinson\'s also touch mood; anxiety can be a symptom. On the day line it may rise as a pill wears off, in some situations, or for no clear reason.'),
  (3, 'Act 3 · How is it for you?', [6, 7, 8], 'Ariel on her phone invites Ruth to look at her own pattern: after worry, after a bad night. No right answer, just notice; body and mind affect each other.'),
  (4, 'Act 4 · The chain', [9], 'Stress spreads to breathing, muscles, sleep, mood and energy, and the Parkinson\'s symptoms can grow.'),
  (5, 'Act 5 · Calming tools', [10, 11, 12, 13], 'Four tools that research found effective. They ease the alarm a little, release some tension, give a pause. Laid along her path: the program will try them, plus small tools for the pocket.'),
  (6, 'Act 6 · Not a magic cure', [14, 15, 16], 'Not a cure or calm on demand, but sometimes steadier: to focus, rest, recover, prepare for sleep, or just a few minutes for herself. Over time, find which work for you.'),
]
SHOT = {
 1: ('Ruth in her armchair; the tension meter from session 3b stands beside her, low. A soft scan line passes down her body. Title: מפגש 14 · מתח, חרדה והרגעת הגוף.', 'Room, Ruth, the tension meter: the session\'s anchor.', 'Fade in; scan line sweeps down.'),
 2: ('Each sign appears on its words and the meter climbs: quick breath lines at her mouth, shoulders hunched with tension marks, a swirl over her head, thought balloons racing round, the window turning to night.', 'Meter; swirl and balloons from sessions 3a and 10.', 'One sign per phrase; meter steps up.'),
 3: ('Ruth standing: a glow at her head (תודעה) and her body (גוף) linked by a two-way arrow. A small alarm bell rings on קושי, דאגה, חוסר ודאות. חלק מלהיות בן אדם.', 'Bell from session 3a.', 'Glows pulse; bell rings on each word.'),
 4: ('The profile head cutaway from session 2: the nerve dots flicker; a small mood meter inside wavers. Tags: החרדה עצמה: גם סימפטום · השינויים במוח משפיעים על מצב הרוח.', 'The head cutaway from session 2.', 'Zoom into the head.'),
 5: ('The day line with pills: as a pill wears off the curve dips and the meter rises; a calendar mark for life situations; a "?" for no clear reason.', 'Day line and pills from sessions 3a and 5.', 'Each mark drops in on its phrase.'),
 6: ('Back in the room; Ariel on Ruth\'s phone. Ruth thinks: איך זה אצלי? A two-way arrow: מתח נפשי ↔ סימפטומים.', 'Phone with Ariel from session 3.', 'Thought pops; the pause holds.'),
 7: ('A grey worry balloon over her; then night in the window and a tired morning, the battery low.', 'Battery from session 5; window night look from session 5.', 'Window darkens, then dawn.'),
 8: ('The circle of attention opens around Ruth; the head ↔ body arrows turn gently.', 'Circle of attention from session 3a.', 'Circle widens.'),
 9: ('Ruth standing, the meter above her; red arrows spread to five badges: נשימה, שרירים, שינה, מצב רוח, אנרגיה. Tremor marks grow at her hand: הסימפטומים עלולים להתגבר.', 'Tremor marks from session 3a.', 'Arrows draw one by one.'),
 10: ('Four calm badges pop in right to left on their words: נשימה והרפיה, קרקוע, מיינדפולנס, דמיון מודרך. נחקרו ונמצאו יעילים with a check.', 'Badge style of the session 1 tools: the new anchor.', 'Badges pop on each name.'),
 11: ('Ruth in her armchair: the meter drops a little, her shoulders relax, the racing balloons slow and drift away: רגע של הפוגה.', 'Meter, balloons.', 'Meter eases down.'),
 12: ('The four badges each move a little differently, then settle onto the stones of her path: וזה מה שנעשה במהלך התכנית.', 'The path from session 1.', 'Badges fly onto the stones.'),
 13: ('Ruth standing; small tools slip into her cardigan pocket; on "לשלוף" she pulls one out and breathes: רגע של שקט.', 'Breath badge.', 'Badge pops out of the pocket.'),
 14: ('"תרופת פלא" and "רגיעה לפי דרישה" struck through. Then roots grow from Ruth\'s feet (grounding, session 6): קצת יותר יציבות.', 'Struck tags; roots from session 6.', 'Strikes draw; roots grow.'),
 15: ('The day line from sun to moon with four moments: focus (attention circle), rest (armchair), recover (battery refills), sleep (moon). Then a small clock: כמה דקות לעצמנו.', 'Day line, battery.', 'Marks drop in along the day.'),
 16: ('On the path, Ruth and Ariel walk up together past the four badges on the stones; the stones light as she passes.', 'Path, Ariel, badges.', 'Hold, then fade.'),
}
legend1 = ('0 0 342 360', P + meter(171, 300, 0.6, 220), '<strong>The tension meter.</strong> Session 3b\'s meter: rises with stress, eases a little with the tools, never to zero.')
legend2 = ('0 0 342 360', P + calm(250, 180, 0, 34) + calm(171, 120, 1, 34) + calm(92, 180, 2, 34) + calm(171, 250, 3, 34), '<strong>Four calming tools.</strong> Breathing and relaxation, grounding, mindfulness, guided imagery: badges laid along her path.')
legend3 = ('0 0 342 360', bighead(''), '<strong>Inside the head.</strong> The head cutaway from session 2, here for mood and anxiety.')
carried = ['<strong>Kept:</strong> Ruth\'s room and path, the meter, the head cutaway, the day line and pills, the battery, the circle of attention, roots, Ariel.', '<strong>Only Ariel\'s words</strong> on screen: signs, tools and uses are the ones he names.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S14Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 14 · מתח, חרדה והרגעת הגוף',
      'Stress and anxiety act on both body and mind; with Parkinson\'s they can also be a symptom and make other symptoms stronger. Calming tools (breathing and relaxation, grounding, mindfulness, guided imagery) ease the alarm a little; they aren\'t magic, and over the program we\'ll find which work for you.',
      'A meter beside Ruth climbs with each sign of stress → body and mind linked → inside her head, the day line → she asks how it is for her → stress spreads to breath, muscles, sleep, mood, energy, symptoms → four calm badges ease the meter → laid on her path, one in her pocket → not magic, but steadier → she walks on with Ariel.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S14Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":5190'))
print('rows', rows)
