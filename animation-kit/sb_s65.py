# Session 65 storyboard: the uninvited guest — a party in Ruth's living room, a loud grey guest at the door, and the choice to stop guarding the door.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S65.dc.html')
assert len(times) == 16
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
GUEST = '#9AA3AD'

def guest(x, y=316, s=1, soft=False, loud=True, op=1):
    """The uninvited guest: a round grey figure with a frown; zigzag noise lines when loud."""
    col = '#C9CED6' if soft else GUEST
    o = (f'<g transform="translate({x} {y}) scale({s})" opacity="{op}"><path d="M-8 -30 L-10 0 M8 -30 L10 0" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>'
         f'<path d="M-30 -36 C-40 -70 -30 -104 0 -106 C30 -104 40 -70 30 -36 C20 -24 -20 -24 -30 -36Z" fill="{col}" stroke="{INK}" stroke-width="2"></path>'
         f'<circle cx="-9" cy="-76" r="2.5" fill="{INK}"></circle><circle cx="9" cy="-76" r="2.5" fill="{INK}"></circle><path d="M-10 -84 l6 3 M10 -84 l-6 3" stroke="{INK}" stroke-width="1.5"></path>'
         f'<path d="M-8 {-60 if loud else -62} Q0 {-66 if loud else -60} 8 {-60 if loud else -62}" stroke="{INK}" stroke-width="1.8" fill="none"></path>')
    if loud: o += f'<path d="M34 -84 l8 -4 l-4 8 l10 -4 M-34 -84 l-8 -4 l4 8 l-10 -4" stroke="#D9534F" stroke-width="2" fill="none" stroke-linecap="round"></path>'
    return o + '</g>'

def notes(x, y, op=1):
    return f'<g opacity="{op}"><path d="M{x} {y} v-18 l10 -3 v18" stroke="{INK}" stroke-width="2" fill="none"></path><circle cx="{x - 3}" cy="{y}" r="3.5" fill="{INK}"></circle><circle cx="{x + 7}" cy="{y - 3}" r="3.5" fill="{INK}"></circle></g>'

def snacks(x=120):
    return (f'<rect x="{x - 30}" y="262" width="60" height="8" rx="3" fill="#C9805A" stroke="{INK}" stroke-width="1.5"></rect><path d="M{x - 24} 270 v46 M{x + 24} 270 v46" stroke="{INK}" stroke-width="3"></path>'
            f'<ellipse cx="{x - 10}" cy="258" rx="14" ry="5" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></ellipse><circle cx="{x - 14}" cy="253" r="4" fill="{AMBER}"></circle><circle cx="{x - 6}" cy="254" r="4" fill="#E66A7A"></circle>'
            f'<rect x="{x + 8}" y="244" width="10" height="16" rx="2" fill="#DCEBF2" stroke="{INK}" stroke-width="1.5"></rect>')

def party(ruth_x=None, mood='happy', dim=False, open_door=False):
    o = room(door_open=open_door, shoes=False) + snacks(120) + friend(60) + friend(190, '#B07AA1', '#8A8F99') + notes(150, 150, .4 if dim else 1) + notes(100, 120, .4 if dim else 1)
    if not dim: o += bubble(60, 150, '…', w=40) + bubble(190, 150, '…', w=40)
    if ruth_x: o += ruth(ruth_x, 'stand', mood)
    return o

def attn(x, y, r):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".18" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 4"></circle>'

S = {}
S[1] = party(140) + lbl(171, 26, 'מפגש 65 · מטאפורת האורח הלא מוזמן', fill='#E3F4F0', size=11)
S[2] = party(140, 'flat', open_door=True) + guest(292) + lbl(250, 70, 'רועש · לא נעים', size=11)
S[3] = party(None, open_door=True) + ruth(240, 'stand', 'flat') + guest(300) + f'<path d="M254 236 L278 236" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>' + lbl(240, 70, 'מסרב ללכת', fill='#FFF1CC', size=11)
S[4] = party(None, dim=True) + ruth(240, 'stand', 'flat') + guest(300) + attn(270, 230, 60) + lbl(171, 40, 'כל תשומת הלב אליו', size=11)
S[5] = party(None) + ruth(200, 'stand') + guest(300) + arrow(196, 140, 120, 140) + lbl(171, 40, 'לתת לו להיות שם', fill='#FFF1CC', size=11)
S[6] = (party(150) + guest(300) + f'<path d="M30 300 h60 v-30 h-60Z" fill="#B9A6C9" stroke="{INK}" stroke-width="1.5"></path>'
        + lbl(100, 80, 'לאהוב אותו', size=10) + strike(100, 80, 60) + lbl(240, 80, 'להסכים איתו', size=10) + strike(240, 80, 70) + lbl(171, 40, 'הספה הכי נוחה', size=10) + strike(171, 40, 80))
S[7] = party(150) + guest(300) + attn(120, 230, 90) + lbl(171, 40, 'האורח עדיין שם', size=11) + lbl(120, 100, 'מה שחשוב', fill='#FFF1CC', size=10)
S[8] = (P + guest(171, 220, 1.1) + tool(80, 110, 0, r=22) + tool(171, 70, 3, r=22) + tool(262, 110, 2, r=22).replace(TOOLS[2][1], '#F7C9D4')
        + lbl(80, 146, 'מחשבות', size=10) + lbl(171, 104, 'רגשות', size=10) + lbl(262, 146, 'תחושות בגוף', size=10) + lbl(171, 300, 'ACT', fill='#E3F4F0', size=12))
S[9] = room(door_open=True, shoes=False) + guest(260) + lbl(260, 80, 'מבוכה', size=11) + lbl(171, 120, 'דאגה', size=11) + lbl(90, 80, 'רעד', size=11) + ruth(110, 'stand', 'flat') + tremor(130, 250)
S[10] = (party(None, dim=True, open_door=True) + ruth(230, 'stand', 'flat') + guest(300) + f'<path d="M248 230 L280 226" stroke="{INK}" stroke-width="5" stroke-linecap="round"></path>'
         + lbl(90, 40, 'לדחוק הצידה', size=10) + lbl(190, 40, 'להילחם', size=10) + lbl(280, 40, 'להימנע', size=10))
S[11] = room() + chair() + ruth(150) + day_line(90, pills=(220,), curve=False) + f'<path d="M226 130 l6 6 l12 -12" stroke="#5BAA6A" stroke-width="3" fill="none"></path>' + lbl(171, 40, 'מה שבשליטתנו', fill='#E3F4F0', size=11)
S[12] = party(None, dim=True) + ruth(240, 'stand', 'flat') + guest(300) + battery(171, 90, 0.18, w=36, h=60, label=False) + lbl(171, 150, 'קשב ואנרגיה', size=10) + lbl(90, 220, 'נפספס את המסיבה', fill='#FFF1CC', size=10)
S[13] = party(150) + guest(300, soft=True, loud=False) + f'<rect x="280" y="296" width="40" height="20" rx="4" fill="#C9805A" stroke="{INK}" stroke-width="1.5"></rect>' + lbl(171, 40, 'קבלה · לתת לו קצת מקום', fill='#FFF1CC', size=11)
S[14] = party(150) + guest(300, soft=True, loud=False) + lbl(110, 40, 'ויתרנו', size=10) + strike(110, 40, 50) + lbl(230, 40, 'הוא כבר כאן', size=10) + lbl(171, 80, 'להיאבק בו קצת פחות', fill='#E3F4F0', size=10)
S[15] = party(150) + guest(300, soft=True, loud=False) + lbl(300, 196, 'מבוכה', size=9) + bubble(171, 70, 'אני יכולה להרגיש קצת מבוכה ועדיין לקחת חלק', w=290, size=10, fill='#FFF1CC')
S[16] = party(None) + chair().replace('#B9A6C9', '#B9A6C9') + ruth(160, 'sit', 'happy') + guest(310, s=.75, soft=True, loud=False) + lbl(171, 40, 'הוא לא חייב להפוך לבעל הבית', fill='#FFF1CC', size=11)

ACTS = [
  (1, 'Act 1 · The party', [1], 'Ruth hosts friends in her living room: food on a little table, music from the radio, chat.'),
  (2, 'Act 2 · The guest at the door', [2, 3, 4], 'The door swings open on a loud grey guest. Ruth goes to the door, argues, pushes, checks again and again. The party carries on behind her; all her attention is on him.'),
  (3, 'Act 3 · Let him be there', [5, 6, 7], 'She stops pushing and walks back to her friends. She doesn\'t like him, agree with him, or give him the best seat. He\'s still there, still noisy, but she\'s back with her people.'),
  (4, 'Act 4 · Who the guest is', [8, 9], 'ACT: the guest stands for thoughts, feelings and body sensations. With Parkinson\'s: embarrassment, worry, tremor.'),
  (5, 'Act 5 · Fighting costs the party', [10, 11, 12], 'Pushing aside, fighting, avoiding. What is in her control she does (her pill on time). But guarding the door drains her battery, and she misses the party.'),
  (6, 'Act 6 · A little room', [13, 14, 15, 16], 'Acceptance: a small stool for the guest, and he softens. Not giving up, struggling a little less. She feels the embarrassment and still takes part. He\'s in the house, not the master of it.'),
]
SHOT = {
 1: ('Ruth\'s living room as a party: friends a and b chatting, a little table with snacks and drinks, music notes from a radio on the windowsill, the armchair. Ruth stands among them smiling. Title: מפגש 65 · מטאפורת האורח הלא מוזמן.', 'Ruth\'s room; the friends (session 5).', 'Open on the party.'),
 2: ('The door swings open: a round grey guest with a frown, red zigzag noise lines: רועש · לא נעים. Ruth turns, her smile drops.', 'The door of her room.', 'Door opens on "מגיע".'),
 3: ('Ruth hurries to the door. She argues (zigzag bubble), pushes with both hands, peeks back again and again; the guest doesn\'t budge: מסרב ללכת.', 'Same room, camera drifts to the door.', 'Pushes on "לדחוק", peeks on "שוב ושוב".'),
 4: ('The circle of attention closes around Ruth and the guest at the door. Behind her the party goes on, a little blurred and faded; her back is to it: כל תשומת הלב אליו.', 'The circle of attention (3a, 6).', 'Circle tightens.'),
 5: ('Ruth lowers her hands, turns and walks back towards her friends. The guest stays by the door: לתת לו להיות שם.', 'Same room.', 'She turns on "מאפשרים".'),
 6: ('Three tags struck through on Nira\'s words: לאהוב אותו · להסכים איתו · הספה הכי נוחה (the guest stays off the armchair). Ruth rejoins the chat.', 'Struck tags (4, 7); the armchair.', 'Strikes draw on the words.'),
 7: ('The circle of attention widens over Ruth and her friends. The guest is still in the corner, still noisy: האורח עדיין שם · מה שחשוב.', 'The circle of attention.', 'Circle opens to the party.'),
 8: ('The room fades; the guest alone in the middle. Three badges around him: thoughts (cloud), feelings (heart), body sensations: מחשבות · רגשות · תחושות בגוף. Tag: ACT.', 'Tool badges (session 1).', 'Room fades out around him.'),
 9: ('The guest by the door changes look for each example: blush (מבוכה), a worried wobble (דאגה), shaking lines (רעד). Ruth\'s hand trembles.', 'Tremor marks (3a).', 'Tag swaps on each word.'),
 10: ('Back at the door: Ruth pushes him aside, squares up to him, then shuts herself away from the party: לדחוק הצידה · להילחם · להימנע.', 'Same room.', 'One beat per verb.'),
 11: ('In her armchair Ruth takes her pill on time on the day line: a green tick: מה שבשליטתנו.', 'The day line and pills (session 5).', 'Cut to the chair.'),
 12: ('Back at the door, guarding it. Her battery drains; behind her the friends wave goodbye and the music stops: נפספס את המסיבה.', 'Battery (5).', 'Battery drains as the party fades.'),
 13: ('She brings a small stool and sets it by the door for him. His grey softens, his noise lines shrink: קבלה · לתת לו קצת מקום.', 'Same room.', 'She sets the stool.'),
 14: ('A tag "ויתרנו" is struck through. Ruth nods at the guest (הוא כבר כאן) and her shoulders drop: להיאבק בו קצת פחות.', 'Same room.', 'Strike, then a nod.'),
 15: ('Back with her friends, a small blush on her cheeks (the guest\'s tag reads מבוכה). A warm card: "אני יכולה להרגיש קצת מבוכה ועדיין לקחת חלק."', 'Warm card (session 4, 7).', 'Card rises from her.'),
 16: ('Wide shot: Ruth in her armchair among friends, music back on; the guest small on his stool by the door: הוא לא חייב להפוך לבעל הבית.', 'The armchair, the whole room.', 'Pull back; hold.'),
}
legend1 = ('0 120 342 200', party(140), '<strong>The party.</strong> Ruth\'s own living room, with friends, snacks and music. What matters to her.')
legend2 = ('230 190 140 140', guest(300), '<strong>The guest.</strong> A round grey figure with a frown and noise lines. He softens when given a little room, but never leaves.')
legend3 = ('120 160 220 160', attn(270, 230, 60) + guest(300) + ruth(240, 'stand', 'flat'), '<strong>The circle of attention.</strong> Where Ruth\'s attention is: on the door, or on her people.')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, the friends and battery (5), the circle of attention (3a, 6), struck tags (4, 7), the day line and pills (5), tremor marks (3a), the tool badges (1).',
           '<strong>Content:</strong> every tag is Nira\'s words; Ruth\'s sentence is Nira\'s example in Ruth\'s voice (feminine).', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S65Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 65 · מטאפורת האורח הלא מוזמן',
      'Hard thoughts, feelings and symptoms are like an uninvited guest. Fighting to throw him out takes all our attention and energy and we miss the party. Giving him a little room, without liking or agreeing with him, lets us go back to the people and things that matter. He is in the house, but not its master.',
      'A party in Ruth\'s room → a loud grey guest at the door; she pushes and argues, the party goes on without her → she lets him be and goes back → he is thoughts, feelings, sensations; embarrassment, worry, tremor → fighting drains her battery and the party ends → a stool for the guest, he softens; she takes part → he sits small in the corner while she hosts.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
H = 5100
p = B + 'S65Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))  # set_height
print('rows', rows)
