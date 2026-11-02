# Session 60 storyboard: role changes — the role and the way we fill it are not the same thing; the way can change shape.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S60.dc.html')
assert len(times) == 14
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
WARM = '#E66A7A'
ROLES = ['בני זוג', 'הורים', 'סבים וסבתות', 'חברים', 'עובדים', 'מתנדבים', 'קהילה']
RC = ['#FFD7F3', '#FFDEA3', '#D6EBC8', '#A9C4FF', '#E7DCCB', '#B3EFE4', '#EDE7F6']

def badge(x, y, k, r=18, dim=False, crack=False):
    o = f'<circle cx="{x}" cy="{y}" r="{r}" fill="{"#E3E3E3" if dim else RC[k]}" stroke="{INK}" stroke-width="1.8"></circle>'
    o += f'<path transform="translate({x} {y}) scale({r / 18:.2f})" d="M0 6 C-8 0 -5 -7 0 -3 C5 -7 8 0 0 6Z" fill="{"#B9B9B9" if dim else WARM}"></path>'
    if crack: o += f'<path d="M{x - 4} {y - r} l6 10 l-5 6 l7 10" stroke="{INK}" stroke-width="1.6" fill="none"></path>'
    return o

def ring(cx=171, cy=236, R=140, labels=True, dim=(), size=9):
    import math as m
    o = ''
    for k in range(7):
        a = m.pi * (0.06 + k / 6 * 0.88)  # right to left across the top
        x, y = cx + R * m.cos(a), cy - R * m.sin(a)
        o += badge(round(x), round(y), k, dim=k in dim)
        if labels: o += lbl(round(x), round(y) + (30 if k % 2 == 0 else -30), ROLES[k], size=size)
    return o

def ring_pts(cx=171, cy=236, R=140):
    import math as m
    return [(round(cx + R * m.cos(m.pi * (0.06 + k / 6 * 0.88))), round(cy - R * m.sin(m.pi * (0.06 + k / 6 * 0.88)))) for k in range(7)]

def card2(x, y, top, bottom, morph=False):
    """The role card: the role on top (solid), the way below (dashed, can change shape)."""
    shape = (f'<rect x="{x - 70}" y="{y + 4}" width="140" height="50" rx="{25 if morph else 6}" fill="#FFF1CC" stroke="{AMBER}" stroke-width="2.5" stroke-dasharray="6 4"></rect>')
    return (f'<rect x="{x - 70}" y="{y - 50}" width="140" height="48" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2.5"></rect>' + shape
            + f'<text x="{x}" y="{y - 21}" text-anchor="middle" font-size="12" font-weight="700" fill="{INK}" direction="rtl">{html.escape(top)}</text>'
            + f'<text x="{x}" y="{y + 34}" text-anchor="middle" font-size="11" font-weight="600" fill="{INK}" direction="rtl">{html.escape(bottom)}</text>')

def car(x, y, ruth_drives=True):
    o = (f'<path d="M{x - 90} {y} L{x - 80} {y - 30} Q{x - 60} {y - 60} {x - 20} {y - 60} L{x + 30} {y - 60} Q{x + 60} {y - 58} {x + 80} {y - 30} L{x + 92} {y} Z" fill="#5B8DB8" stroke="{INK}" stroke-width="2"></path>'
         f'<path d="M{x - 64} {y - 30} Q{x - 50} {y - 52} {x - 20} {y - 52} L{x - 2} {y - 52} L{x - 2} {y - 30}Z M{x + 6} {y - 30} L{x + 6} {y - 52} L{x + 28} {y - 52} Q{x + 54} {y - 50} {x + 66} {y - 30}Z" fill="#DCEBF2" stroke="{INK}" stroke-width="1.5"></path>'
         f'<circle cx="{x - 52}" cy="{y + 2}" r="14" fill="{INK}"></circle><circle cx="{x + 56}" cy="{y + 2}" r="14" fill="{INK}"></circle>')
    # Ruth's head in the driver's seat (front = right) or the passenger seat with a map
    hx = x + 40 if ruth_drives else x - 34
    o += head(hx, y - 38, r=11)
    if not ruth_drives:
        o += f'<rect x="{x - 46}" y="{y - 30}" width="26" height="16" fill="#FFF1CC" stroke="{INK}" stroke-width="1.2"></rect><path d="M{x - 42} {y - 24} l6 4 l6 -6 l6 4" stroke="#5BAA6A" stroke-width="1.5" fill="none"></path>'
        o += f'<circle cx="{x + 40}" cy="{y - 38}" r="11" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle><path d="M{x + 28} {y - 40} C{x + 26} {y - 56} {x + 54} {y - 56} {x + 52} {y - 40}Z" fill="#3B2A24"></path>'
    return o

def kid(x, y=316):
    return (f'<path d="M{x - 10} {y - 30} L{x - 10} {y - 54} Q{x - 10} {y - 62} {x} {y - 62} Q{x + 10} {y - 62} {x + 10} {y - 54} L{x + 10} {y - 30}Z" fill="#5BAA6A" stroke="{INK}" stroke-width="1.8"></path>'
            f'<path d="M{x - 4} {y - 30} v30 M{x + 4} {y - 30} v30" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path><circle cx="{x}" cy="{y - 72}" r="11" fill="{SKIN}" stroke="{INK}" stroke-width="1.8"></circle>')

def hourglass(x, y):
    return f'<path d="M{x - 10} {y - 18} L{x + 10} {y - 18} L{x} {y} L{x + 10} {y + 18} L{x - 10} {y + 18} L{x} {y}Z" fill="#FFF3C4" stroke="{INK}" stroke-width="2"></path>'

def keys(x, y):
    return f'<circle cx="{x}" cy="{y}" r="7" fill="none" stroke="{AMBER}" stroke-width="3"></circle><path d="M{x + 7} {y} h14 m-4 0 v5 m-5 -5 v4" stroke="{AMBER}" stroke-width="3" fill="none"></path>'

def box(x, y):
    return f'<path d="M{x - 40} {y - 20} L{x + 40} {y - 20} L{x + 34} {y + 30} L{x - 34} {y + 30}Z" fill="#E7DCCB" stroke="{INK}" stroke-width="2"></path>'

S = {}
S[1] = P + ring() + ruth(171, 'stand') + lbl(171, 340, 'מפגש 60 · שינויים בתפקידים שלנו', fill='#E3F4F0', size=12)
S[2] = (P + ''.join(f'<path d="M{x} {y} Q{(x + 171) / 2} {(y + 230) / 2 + 20} 171 232" stroke="{AMBER}" stroke-width="1.5" fill="none" stroke-dasharray="3 3"></path>' for x, y in ring_pts()) + ring(labels=False)
        + ruth(171, 'stand') + lbl(70, 300, 'איך אנחנו רואים את עצמנו', size=9) + lbl(270, 300, 'הקשרים שלנו', size=9) + lbl(171, 340, 'תורמים לאחרים', size=9))
S[3] = P + ring(labels=False, dim=(1, 4)) + ruth(171, 'stand', mood='flat') + hourglass(250, 260) + battery(90, 260, 0.2, w=34, h=60, label=False) + lbl(250, 300, 'יותר זמן', size=10) + lbl(90, 310, 'יותר אנרגיה', size=10)
S[4] = room() + ruth(110, 'stand', mood='flat') + friend(240) + keys(176, 230) + arrow(150, 240, 210, 240, SLATE, 2) + lbl(171, 40, 'השינויים האלה עלולים לכאוב', fill='#FFF1CC', size=12)
S[5] = (room() + f'<rect x="120" y="70" width="100" height="120" rx="8" fill="#FFFFFF" stroke="{INK}" stroke-width="2.5"></rect>' + head(170, 120, r=20) + badge(200, 160, 0, r=12, crack=True)
        + ruth(150, 'stand', mood='flat') + lbl(171, 40, 'איך אנחנו רואים את עצמנו', fill='#E3F4F0', size=12))
S[6] = P + card2(171, 170, 'התפקיד עצמו', 'הדרך שבה ממלאים אותו') + lbl(171, 60, 'יש הבדל', fill='#FFF1CC')
S[7] = (P + card2(171, 120, 'התפקיד', '', morph=True) + badge(171, 150, 2, r=16)
        + bubble(270, 240, 'מה חשוב לי בו?', w=110, size=10, tail=False) + bubble(171, 290, 'על איזה חלק לשמור?', w=124, size=10, tail=False) + bubble(70, 240, 'צורה אחרת?', w=90, size=10, tail=False))
S[8] = (land() + f'<g transform="translate(0 -60)">{car(171, 200, ruth_drives=False)}</g>' + lbl(171, 30, 'לתכנן את הטיול ולנווט', fill='#E3F4F0', size=12)
        + f'<g transform="translate(86 172) scale(.5)">{room()}{ruth(140)}{kid(220)}</g>' + lbl(171, 166, 'מפגש קצר יותר · פעילות שקטה יותר', size=10))
S[9] = room() + ruth(110, 'stand', mood='happy') + friend(230, col='#5B8DB8', hair='#2B2B2B') + f'<rect x="150" y="190" width="54" height="40" rx="4" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><path d="M158 202 h38 M158 212 h30 M158 222 h24" stroke="{SLATE}" stroke-width="2"></path>' + lbl(171, 40, 'ליווי והדרכה של אחרים', fill='#E3F4F0', size=12)
S[10] = (room() + chair() + ruth(130) + friend(240) + f'<g transform="translate(250 60) scale(.4)">{friend(0)}<rect x="-40" y="140" width="80" height="60" fill="#E7DCCB" stroke="{INK}" stroke-width="3"></rect></g>' + cross(270, 110, 22)
         + lbl(120, 70, 'עושה הכול במקומנו?', size=10))
S[11] = room() + chair() + ruth(130) + friend(240) + bubble(90, 90, 'במה אנחנו רוצים עזרה', w=140, size=11) + bubble(110, 140, 'מה חשוב לנו לעשות בעצמנו', w=170, size=10, fill='#FFF1CC')
S[12] = f'<g opacity=".9">{room(dim=True)}</g>' + chair() + ruth(150, mood='flat') + box(270, 290) + badge(270, 262, 4, r=16) + lbl(171, 40, 'אובדן אמיתי', fill='#EDE7F6')
S[13] = P + ''.join(f'<path d="M{x} {y} L171 230" stroke="{WARM}" stroke-width="2"></path>' for x, y in ring_pts()[::2]) + ring(labels=False) + ruth(171, 'stand', mood='happy') + lbl(171, 340, 'מחוברים למה שחשוב לנו', fill='#FFF1CC', size=12)
S[14] = room() + chair() + ruth(150) + bubble(250, 90, 'איזה תפקידים חשובים לי?', w=150, size=10) + bubble(100, 130, 'מה חשוב לי בהם?', w=120, size=10) + bubble(240, 160, 'בצורה קצת שונה?', w=120, size=10)

ACTS = [
  (1, 'Act 1 · Our roles', [1, 2], 'A ring of role badges around Ruth, each with a small heart. Threads tie them to her: how she sees herself, her ties, what she gives.'),
  (2, 'Act 2 · When roles change', [3, 4, 5], 'Two badges dim: more time, more energy. The car keys pass to someone else, and it hurts; her portrait\'s badge cracks.'),
  (3, 'Act 3 · The role and the way', [6, 7], 'One card in two layers: the role on top stays; the way below is dashed and can change shape. Three questions about it.'),
  (4, 'Act 4 · Another shape', [8, 9], 'The examples Nira gives: plan and navigate instead of driving; a shorter, quieter visit with the grandchildren; guiding others.'),
  (5, 'Act 5 · Together, and honest', [10, 11, 12], 'Help isn\'t someone doing everything. Ruth says what she wants help with and what she still does herself. Some roles are put away: a real loss.'),
  (6, 'Act 6 · Still connected', [13, 14], 'The threads to the hearts hold, in new shapes. Three questions for you.'),
]
SHOT = {
 1: ('Ruth stands centre. Seven round badges pop in around her, right to left, on each word: בני זוג · הורים · סבים וסבתות · חברים · עובדים · מתנדבים · קהילה. Each has a small heart. Title: מפגש 60 · שינויים בתפקידים שלנו.', 'Ruth; the badge look of the tool badges (session 1).', 'Badges pop in on Nira\'s words.'),
 2: ('Thin threads run from every badge to Ruth. Three tags: איך אנחנו רואים את עצמנו · הקשרים שלנו · תורמים לאחרים.', 'Same ring.', 'Threads draw in.'),
 3: ('Two badges dim. An hourglass runs slowly and her battery drains: יותר זמן · יותר אנרגיה.', 'The battery (session 5).', 'Badges fade; sand runs.'),
 4: ('In her room, Ruth hands her car keys to a family member. Her face falls: השינויים האלה עלולים לכאוב.', 'Ruth\'s room; the friend figure (session 5).', 'Keys pass hand to hand.'),
 5: ('A framed portrait of Ruth on the wall, wearing a badge for years; the badge cracks: איך אנחנו רואים את עצמנו.', 'Room.', 'Calendar pages flutter, then the crack.'),
 6: ('A card in two layers. Top (solid): התפקיד עצמו. Bottom (dashed): הדרך שבה ממלאים אותו. Tag: יש הבדל.', 'The role card: used again in acts 4 and 6.', 'Card splits into two layers.'),
 7: ('The heart sits inside the card while the dashed lower layer changes shape. Three question bubbles, right to left: מה חשוב לי בו? · על איזה חלק לשמור? · צורה אחרת?', 'Same card; the heart from the badges.', 'Questions pop on each.'),
 8: ('A family trip: Ruth moves from the driver\'s seat to the passenger seat, map in hand: לתכנן את הטיול ולנווט. Then, in her room with a grandchild: a shorter visit, a quieter shared activity.', 'The car keys from 2.2; the role card\'s lower layer swaps under each picture.', 'Seat swap; cut to the room.'),
 9: ('Ruth beside a younger colleague, showing pages: ליווי והדרכה של אחרים.', 'Role card.', 'Pages pass across.'),
 10: ('Ruth and the family member on the sofa. A small picture of someone carrying everything for her is crossed out: עושה הכול במקומנו?', 'Friend figure; room.', 'Picture pops, then the cross.'),
 11: ('Ruth speaks; two bubbles: במה אנחנו רוצים עזרה · מה חשוב לנו לעשות בעצמנו.', 'Same.', 'Bubbles on each phrase.'),
 12: ('The room dims slightly. One badge is set gently into a box on the shelf. Ruth sits with it; nothing replaces it: אובדן אמיתי.', 'Room, chair.', 'Slow; the light lowers; hold.'),
 13: ('Back to the ring: the hearts still have threads to Ruth, some badges reshaped: מחוברים למה שחשוב לנו.', 'Ring from act 1.', 'Threads glow warm.'),
 14: ('Ruth in her chair; three questions appear: איזה תפקידים חשובים לי? · מה חשוב לי בהם? · בצורה קצת שונה?', 'Room, chair.', 'Bubbles on each question; hold.'),
}
legend1 = ('0 70 342 200', P + ring(labels=False), '<strong>The ring of roles.</strong> Seven badges with a heart in each, tied to Ruth by threads.')
legend2 = ('60 100 222 130', P + card2(171, 170, 'התפקיד עצמו', 'הדרך'), '<strong>The role card.</strong> The role on top stays; the way underneath can take another shape.')
legend3 = ('0 120 342 140', land() + car(171, 220, ruth_drives=False), '<strong>Nira\'s examples.</strong> Navigating instead of driving, shorter visits, guiding others.')
carried = ['<strong>Kept:</strong> Ruth\'s room, the friend figure and battery (session 5), the badge look of the tools (session 1).', '<strong>Words on screen</strong> are Nira\'s: the roles, the questions and her three examples, nothing added.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S60Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 60 · שינויים בתפקידים שלנו',
      'Our roles are part of who we are. Parkinson\'s can change how we fill them, and that can hurt. But the role and the way we fill it are different things: the way can take another shape, with the people around us, while we stay connected to what matters in it. And some losses are simply real.',
      'A ring of role badges around Ruth → two dim, the keys pass, it hurts → a card: the role on top, the way below → she navigates instead of driving, a shorter quieter visit, guiding others → talking with family about help → one badge put away → the threads still hold.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
# preview height measured from a headless render of the board
H = 5060
p = B + 'S60Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))  # set_height
print('rows', rows)
