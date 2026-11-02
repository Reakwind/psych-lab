# Session 9 storyboard: the bus driver — Ruth drives her bus along the path toward what matters; inner experiences ride as passengers; she keeps her hands on the wheel.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S09.dc.html')
assert len(times) == 15
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
BUS = '#E8A33D'; BUS_DK = '#C9862A'; GREY = '#C3C9D0'; WARM = '#F6C77A'
_ids = [0]

def heart_pin(x, y, r=12):
    return (f'<path d="M{x} {y + r * 1.6} C{x - r * 1.4} {y + r * .4} {x - r} {y - r} {x} {y - r * .4} C{x + r} {y - r} {x + r * 1.4} {y + r * .4} {x} {y + r * 1.6}Z" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>')

def road_land(dest=True, branch=False):
    """Ruth's path landscape with a road winding up to the far end, where what matters waits."""
    o = land(sun=True) + f'<path d="M120 360 C150 320 250 300 220 270 C196 248 150 240 170 222 C184 210 200 206 196 200" fill="none" stroke="#B8B2A6" stroke-width="30" stroke-linecap="round"></path>'
    o += f'<path d="M120 360 C150 320 250 300 220 270 C196 248 150 240 170 222 C184 210 200 206 196 200" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="8 8"></path>'
    if branch: o += f'<path d="M214 280 C260 270 300 280 342 300" fill="none" stroke="#B8B2A6" stroke-width="24"></path><path d="M214 280 C260 270 300 280 342 300" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="8 8"></path>'
    if dest: o += heart_pin(196, 176, 12)
    return o

def pax(x, y, kind='grey', loud=False, s=1.0):
    """A passenger: a small inner-voice cloud with a face (session 4); grey = hard, warm = pleasant."""
    fill = GREY if kind == 'grey' else WARM
    d = f'M{x - 18 * s} {y + 8 * s} C{x - 26 * s} {y + 8 * s} {x - 28 * s} {y - 4 * s} {x - 20 * s} {y - 8 * s} C{x - 22 * s} {y - 20 * s} {x - 8 * s} {y - 24 * s} {x - 2 * s} {y - 16 * s} C{x + 4 * s} {y - 26 * s} {x + 22 * s} {y - 22 * s} {x + 20 * s} {y - 8 * s} C{x + 28 * s} {y - 4 * s} {x + 26 * s} {y + 8 * s} {x + 18 * s} {y + 8 * s}Z'
    mouth = (f'<ellipse cx="{x}" cy="{y + 2 * s}" rx="{4 * s}" ry="{3.5 * s}" fill="{INK}"></ellipse>' if loud else
             f'<path d="M{x - 5 * s} {y + 1 * s} Q{x} {y + 5 * s} {x + 5 * s} {y + 1 * s}" fill="none" stroke="{INK}" stroke-width="1.5"></path>')
    o = f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="1.5"></path><circle cx="{x - 6 * s}" cy="{y - 6 * s}" r="{2 * s}" fill="{INK}"></circle><circle cx="{x + 6 * s}" cy="{y - 6 * s}" r="{2 * s}" fill="{INK}"></circle>' + mouth
    if loud: o += f'<path d="M{x + 24 * s} {y - 14 * s} l8 -6 M{x + 26 * s} {y - 4 * s} l10 0" stroke="{INK}" stroke-width="1.5" stroke-linecap="round"></path>'
    return o

def bus_side(px=(), x0=26, y0=160, door=False):
    """The bus from the side, heading left (front on the left, Ruth at the wheel); px = [(kind, loud)] for the six windows."""
    o = (f'<rect x="{x0}" y="{y0}" width="290" height="110" rx="18" fill="{BUS}" stroke="{INK}" stroke-width="2.5"></rect>'
         f'<rect x="{x0}" y="{y0 + 80}" width="290" height="12" fill="{BUS_DK}"></rect>'
         f'<rect x="{x0 + 8}" y="{y0 + 14}" width="46" height="48" rx="8" fill="#DCEBF2" stroke="{INK}" stroke-width="2"></rect>')
    o += f'<circle cx="{x0 + 32}" cy="{y0 + 40}" r="11" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle><path d="M{x0 + 21} {y0 + 38} Q{x0 + 32} {y0 + 22} {x0 + 43} {y0 + 38}" fill="#C8CCD2" stroke="{INK}" stroke-width="1.2"></path><circle cx="{x0 + 18}" cy="{y0 + 54}" r="9" fill="none" stroke="{INK}" stroke-width="2.5"></circle>'
    for i in range(6):
        wx = x0 + 64 + i * 37
        o += f'<rect x="{wx}" y="{y0 + 14}" width="32" height="40" rx="6" fill="#DCEBF2" stroke="{INK}" stroke-width="2"></rect>'
        if i < len(px) and px[i]:
            kind, loud = px[i]
            o += pax(wx + 16, y0 + 38, kind, loud, .62)
    if door: o += f'<rect x="{x0 + 64 + 2 * 37}" y="{y0 + 14}" width="32" height="76" rx="4" fill="#FFF3C4" stroke="{INK}" stroke-width="2"></rect>'
    o += f'<circle cx="{x0 + 60}" cy="{y0 + 112}" r="18" fill="{INK}"></circle><circle cx="{x0 + 60}" cy="{y0 + 112}" r="7" fill="#9AA3AD"></circle><circle cx="{x0 + 240}" cy="{y0 + 112}" r="18" fill="{INK}"></circle><circle cx="{x0 + 240}" cy="{y0 + 112}" r="7" fill="#9AA3AD"></circle>'
    return o

def side_scene(px=(), door=False):
    return (f'<rect width="342" height="360" fill="#E7F0EE"></rect><path d="M0 200 Q120 160 220 190 T342 180 V360 H0Z" fill="{HILL}"></path>'
            f'<rect y="290" width="342" height="70" fill="#B8B2A6"></rect><path d="M0 326 H342" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="14 12"></path>' + bus_side(px, door=door))

def cab(nav=False, turned=False, mirror=False, ahead=None):
    """Inside the bus, over Ruth's shoulder: the windshield shows the road to what matters; hands on the wheel."""
    _ids[0] += 1; cid = f'ws{_ids[0]}'
    o = (f'<rect width="342" height="360" fill="#E8DCC8"></rect><clipPath id="{cid}"><rect x="16" y="24" width="310" height="180" rx="14"></rect></clipPath>'
         f'<g clip-path="url(#{cid})"><g transform="translate(16 -60) scale(.906 .75)">{ahead or road_land()}</g></g><rect x="16" y="24" width="310" height="180" rx="14" fill="none" stroke="{INK}" stroke-width="4"></rect>'
         f'<rect x="0" y="204" width="342" height="40" fill="#8A7F70" stroke="{INK}" stroke-width="2"></rect>')
    if mirror:
        o += f'<rect x="210" y="30" width="96" height="36" rx="8" fill="#DCEBF2" stroke="{INK}" stroke-width="2"></rect>' + pax(236, 50, 'grey', True, .5) + pax(260, 50, 'warm', False, .5) + pax(284, 50, 'grey', False, .5)
    if nav:
        o += f'<rect x="232" y="150" width="76" height="52" rx="8" fill="{INK}"></rect><rect x="237" y="155" width="66" height="42" rx="5" fill="#EAF2E6"></rect><path d="M246 192 C262 180 258 168 280 164" stroke="#4FA3A0" stroke-width="3" fill="none" stroke-dasharray="4 3"></path>' + heart_pin(284, 160, 6)
    if turned:
        o += f'<circle cx="120" cy="250" r="54" fill="none" stroke="{INK}" stroke-width="9"></circle>' + f'<path d="M80 360 Q80 300 140 296 Q196 300 196 360Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>' + head(150, 268, r=24, mood='flat')
    else:
        o += (f'<path d="M100 360 Q100 300 160 296 Q220 300 220 360Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>'
              f'<circle cx="160" cy="262" r="26" fill="#C8CCD2" stroke="{INK}" stroke-width="2"></circle>'
              f'<circle cx="160" cy="250" r="56" fill="none" stroke="{INK}" stroke-width="9"></circle>'
              f'<ellipse cx="108" cy="250" rx="11" ry="9" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></ellipse><ellipse cx="212" cy="250" rx="11" ry="9" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></ellipse>')
    return o

def eye_badge(x, y): return tool(x, y, 2, 20)
def breath_badge(x, y): return tool(x, y, 1, 20)

def sign(x, y, glyph):
    return (f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y + 34}" stroke="{INK}" stroke-width="3"></line><circle cx="{x}" cy="{y}" r="16" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle>'
            f'<text x="{x}" y="{y + 5}" text-anchor="middle" font-size="14">{glyph}</text>')

S = {}
S[1] = cab(mirror=True) + lbl(171, 16, 'מפגש 9 · נהג האוטובוס', fill='#E3F4F0') + lbl(110, 120, 'בכיסא הנהג', size=11)
S[2] = (side_scene([('warm', False), ('grey', True), None, ('warm', False), ('grey', True), ('grey', False)], door=True) + pax(178, 316, 'grey', True, .8) + pax(150, 316, 'warm', False, .8)
        + lbl(100, 60, 'נחמדים ומנומסים', size=11) + lbl(240, 90, 'קולניים · תובעניים · נודניקים', size=10))
S[3] = side_scene([('warm', False), ('grey', True), ('warm', False), ('grey', False), ('grey', True), None]) + bubble(220, 60, '"אין מצב שאתה תצליח לעשות את זה.."', w=230, size=11) + bubble(140, 112, '"תסתובב חזרה הביתה זה לא ייגמר טוב."', w=240, size=11)
S[4] = cab(nav=True) + lbl(171, 16, 'האוטובוס · החיים שלנו', fill='#E3F4F0') + lbl(250, 120, 'היעד: מה שחשוב לנו', fill='#FFF1CC', size=11)
S[5] = (side_scene([('grey', False)] * 6) + lbl(100, 40, 'מחשבות אוטומטיות', size=10) + lbl(232, 40, 'רגשות', size=10) + lbl(90, 76, 'זיכרונות', size=10)
        + lbl(170, 76, 'עייפות', size=10) + lbl(262, 76, 'תחושות בגוף', size=10) + lbl(171, 112, 'סימפטומים', size=10))
S[6] = (side_scene([('grey', True)] * 5 + [('warm', False)]) + lbl(70, 50, 'חרדה', size=11) + lbl(140, 50, 'תסכול', size=11) + lbl(210, 50, 'מבוכה', size=11) + lbl(280, 50, 'בושה', size=11)
        + lbl(171, 90, 'ביקורת עצמית', size=11) + lbl(171, 130, 'הנוסעים הרועשים', fill='#FFF1CC', size=11))
S[7] = cab(turned=True) + pax(260, 290, 'grey', True, 1.4) + lbl(90, 40, 'להשתיק', size=11) + lbl(240, 40, 'להתווכח', size=11) + lbl(90, 80, 'לשכנע לרדת', size=11) + lbl(240, 80, 'עסקאות', fill='#FFF1CC', size=11)
S[8] = cab(turned=True) + pax(260, 290, 'grey', True, 1.4) + lbl(262, 238, 'מבוכה', size=11) + bubble(171, 60, '"רוצה שאני ארד מהאוטובוס? סבבה,', w=260, size=11, tail=False) + bubble(171, 104, 'אז תפסיק ללכת לאירועים משפחתיים."', w=260, size=11)
S[9] = (road_land(branch=True) + f'<g transform="translate(250 230) scale(.22)">{bus_side([("grey", True)] * 6, 0, 0)}</g>' + arrow(270, 260, 330, 290, '#D9534F')
        + battery(60, 90, 0.15, w=36, h=60) + lbl(171, 30, 'הנוסעים קובעים את המסלול', fill='#FFF1CC', size=12) + lbl(80, 150, 'אין אנרגיה לנווט', size=11))
S[10] = side_scene([('grey', True), ('grey', False), ('warm', False), ('grey', True), None, ('grey', False)]) + lbl(171, 40, 'ACT · ממשיכים לנהוג', fill='#E3F4F0') + bubble(250, 112, '…', w=40, size=12) + arrow(60, 140, 20, 140)
S[11] = cab(mirror=True, nav=True) + lbl(110, 120, 'נוסעים, לא נהגים', size=11) + bubble(171, 50, 'לאן חשוב לי לנסוע עכשיו?', w=200, fill='#FFF1CC')
S[12] = (side_scene([('grey', True), ('grey', False), ('warm', False), ('grey', False), ('grey', False), ('warm', False)])
         + f'<circle cx="116" cy="198" r="26" fill="{SPARK}" opacity=".35"></circle>' + eye_badge(116, 120) + lbl(116, 80, 'מיינדפולנס', size=11) + breath_badge(240, 120) + lbl(240, 80, 'נשימה', size=11)
         + lbl(171, 30, 'איזה נוסע מדבר?', fill='#FFF1CC', size=11))
S[13] = (side_scene([('warm', False), ('grey', False), ('warm', False), ('warm', False), ('grey', False), ('warm', False)])
         + ''.join(f'<circle cx="{26 + 64 + i * 37 + 16}" cy="198" r="22" fill="{SPARK}" opacity=".35"></circle>' for i in (0, 2, 3, 5))
         + lbl(110, 60, 'רגעים נעימים', size=11) + lbl(240, 60, 'הכרת תודה', size=11) + lbl(171, 110, 'גם נוסעים נעימים', fill='#FFF1CC', size=11))
S[14] = (road_land() + sign(60, 250, '🚶') + sign(110, 300, '✋') + sign(276, 250, '🗣') + sign(300, 310, '📱')
         + lbl(196, 120, 'עצמאות', size=11) + lbl(110, 150, 'קשר עם אנשים', size=11) + lbl(280, 150, 'תחביבים', size=11) + lbl(171, 30, 'חלק מהדרך', fill='#E3F4F0'))
S[15] = (road_land(branch=True) + f'<g transform="translate(150 240) scale(.22)">{bus_side([("grey", False), ("warm", False), ("grey", True), None, ("warm", False), None], 0, 0)}</g>'
         + arrow(160, 236, 186, 210, '#5BAA6A') + lbl(171, 30, 'בוחרים את הפנייה הבאה', fill='#FFF1CC'))

ACTS = [
  (1, 'Act 1 · The bus', [1, 2, 3], 'Ruth in the driver\'s seat, hands on the wheel, the road ahead. Passengers get on and off; some kind, some loud, saying exactly what Nira quotes.'),
  (2, 'Act 2 · What the bus stands for', [4, 5, 6], 'The navigation app holds the destination: what matters to us. The passengers are inner experiences, the loudest among them named.'),
  (3, 'Act 3 · Fighting the passengers', [7, 8, 9], 'Ruth turns around to silence, argue, bargain. Embarrassment offers a deal. Meanwhile the passengers steer the bus off course and drain her battery.'),
  (4, 'Act 4 · Keep driving', [10, 11], 'ACT: keep driving with the passengers aboard. They are passengers, not drivers; the wheel is in her hands.'),
  (5, 'Act 5 · What helps', [12, 13, 14], 'Mindfulness notices which passenger is talking, breath steadies the hands; pleasant passengers too; the program\'s activities line the road to what matters.'),
  (6, 'Act 6 · The next turn', [15], 'She can\'t choose every passenger or the whole road, but she can stay in the seat and choose the next turn.'),
]
SHOT = {
 1: ('Over Ruth\'s shoulder: hands on the wheel, the road through her path landscape to a heart at the far end. In the mirror, passengers. Title: מפגש 9 · נהג האוטובוס.', 'Ruth\'s path world, now with a road; the bus is the session\'s anchor.', 'Fade in on the road; mirror faces appear on "לא לבד".'),
 2: ('From the side at a stop: passengers (small inner-voice clouds with faces) step on and off. Warm ones smile: נחמדים ומנומסים. Grey ones shout: קולניים · תובעניים · נודניקים.', 'Inner-voice cloud from session 4, grey and warm.', 'Door opens; passengers hop on and off.'),
 3: ('Two grey passengers lean forward with Nira\'s exact quotes in speech bubbles.', 'Same bus.', 'Bubbles pop in turn.'),
 4: ('Back in the cab: a phone on the dashboard runs a navigation app; the route ends at the heart: היעד: מה שחשוב לנו.', 'Ruth\'s phone; the heart from the tool badges.', 'Route draws on.'),
 5: ('Labels settle on the passengers one by one: מחשבות אוטומטיות, רגשות, זיכרונות, עייפות, תחושות בגוף, סימפטומים.', 'Passengers.', 'Labels drop on each word.'),
 6: ('The loud ones swell and turn greyer: חרדה, תסכול, מבוכה, בושה, ביקורת עצמית.', 'Passengers.', 'Each one puffs up on its name.'),
 7: ('Ruth twists round in her seat, one hand off the wheel, facing a big grey passenger: להשתיק · להתווכח · לשכנע לרדת · עסקאות.', 'Cab view.', 'Tags pop on each verb.'),
 8: ('The passenger labelled מבוכה makes its offer, quoted word for word.', 'Same.', 'Bubble types on.'),
 9: ('From above: the bus drifts onto a side road away from the heart; Ruth\'s battery drains: הנוסעים קובעים את המסלול · אין אנרגיה לנווט.', 'The battery from session 5.', 'Bus veers; battery level falls.'),
 10: ('Side view: Ruth faces forward and drives on; passengers still murmur (…). ACT · ממשיכים לנהוג.', 'Bus.', 'Bus rolls on; murmurs continue.'),
 11: ('Over her shoulder: both hands on the wheel, the heart on the nav screen. נוסעים, לא נהגים. She asks: לאן חשוב לי לנסוע עכשיו?', 'Cab view, nav phone.', 'Question bubble rises.'),
 12: ('A soft light picks out the passenger who is talking: מיינדפולנס (eye badge). Then the breath badge: נשימה; her hands steady on the wheel.', 'Tool badges from session 1.', 'Badges pop in turn.'),
 13: ('Warm passengers light up: רגעים נעימים · הכרת תודה · גם נוסעים נעימים.', 'Passengers.', 'Glows on each warm face.'),
 14: ('The road from above, lined with four signposts: walking, a hand, speech, the app; at the far end עצמאות · קשר עם אנשים · תחביבים.', 'The road through the path world.', 'Signs pop up along the road.'),
 15: ('A junction: Ruth signals and turns the bus toward the heart. בוחרים את הפנייה הבאה.', 'Bus, road, heart.', 'Bus takes the turn; hold.'),
}
legend1 = ('0 0 342 360', cab(mirror=True, nav=True), '<strong>The driver\'s seat.</strong> Over Ruth\'s shoulder: her hands on the wheel, the road to what matters, passengers in the mirror.')
legend2 = ('0 0 342 360', side_scene([('warm', False), ('grey', True), ('warm', False), ('grey', False), ('grey', True), ('warm', False)]), '<strong>The passengers.</strong> Inner-voice clouds from session 4: grey for the hard ones, warm for the pleasant.')
legend3 = ('0 0 342 360', road_land(), '<strong>The road.</strong> Through Ruth\'s path landscape to a heart: the destination set in the navigation app.')
carried = ['<strong>Kept:</strong> Ruth\'s path landscape, the inner voice (session 4), the battery (session 5), the tool badges (session 1), her phone.', '<strong>Words on screen</strong> are Nira\'s: the quotes, the passenger names, the activities.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S09Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 9 · מטאפורת נהג האוטובוס',
      'Life is a bus heading toward what matters. Thoughts, feelings, memories and symptoms ride along as passengers, some loud. Fighting them lets them steer; we can keep our hands on the wheel, notice who is talking, and choose the next turn.',
      'Ruth drives toward a heart → passengers climb aboard, some shouting → she turns round to argue, the bus veers off and her battery drains → she faces forward, hands on the wheel → a light on who\'s talking, a breath, warm passengers too → she takes the turn toward the heart.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S09Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":5050'))
print('rows', rows)
