# Session 64 storyboard: flexible thinking — one thought gets loud, Ruth notices it, steps back and chooses; then the ways to practise.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S64.dc.html')
assert len(times) == 13
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
LOUD = 'הכול אצלי כישלון!!!'

def card(x, y, text, kind='harsh', w=None, size=11):
    return thought_card(x, y, text, kind, w=w).replace('font-size="13"', f'font-size="{size}"')

def heavy(x, y, text=LOUD, w=150, size=12):
    return card(x, y, text, w=w, size=size).replace('#D7DCE2', '#7B8794').replace(f'fill="{INK}" direction', 'fill="#FFFFFF" direction')

def balloon(x, y, s=1, op=1):
    return (f'<g transform="translate({x} {y}) scale({s})" opacity="{op}"><path d="M-22 8 C-30 8 -30 -6 -20 -6 C-20 -18 -4 -20 0 -12 C6 -20 20 -16 20 -4 C28 -4 28 8 20 8Z" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></path>'
            f'<circle cx="-8" cy="1" r="2" fill="{INK}"></circle><circle cx="0" cy="1" r="2" fill="{INK}"></circle><circle cx="8" cy="1" r="2" fill="{INK}"></circle></g>')

def voice(x, y, warm=False):
    return (f'<path d="M{x - 26} {y + 10} C{x - 38} {y + 10} {x - 40} {y - 6} {x - 30} {y - 12} C{x - 32} {y - 28} {x - 14} {y - 34} {x - 6} {y - 26} C{x} {y - 40} {x + 22} {y - 38} {x + 24} {y - 24} C{x + 38} {y - 28} {x + 46} {y - 12} {x + 36} {y - 2} C{x + 42} {y + 6} {x + 36} {y + 12} {x + 28} {y + 12}Z" fill="{"#F2C784" if warm else "#C9CED6"}" stroke="{INK}" stroke-width="1.5"></path>'
            f'<circle cx="{x}" cy="{y - 8}" r="2.5" fill="{INK}"></circle><circle cx="{x + 14}" cy="{y - 8}" r="2.5" fill="{INK}"></circle>'
            f'<path d="M{x - 2} {y + 4} Q{x + 7} {y + (8 if warm else -1)} {x + 16} {y + 4}" stroke="{INK}" stroke-width="1.5" fill="none"></path>')

def reed(x, y, r=26):
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFF1CC" stroke="{INK}" stroke-width="2"></circle>'
            f'<path d="M{x} {y + r * .7} C{x} {y + r * .2} {x + r * .1} {y - r * .3} {x + r * .4} {y - r * .65}" stroke="#4E8B5F" stroke-width="3.5" fill="none" stroke-linecap="round"></path>'
            f'<path d="M{x + r * .4} {y - r * .65} c8 -2 10 4 8 7 c-5 0 -8 -3 -8 -7Z" fill="#4E8B5F"></path>')

def gap(x1, x2, y):
    return f'<path d="M{x1} {y} H{x2} M{x1} {y - 8} v16 M{x2} {y - 8} v16" stroke="{INK}" stroke-width="2" fill="none"></path>'

def bigphone(inner=''):
    return (f'<rect x="96" y="40" width="150" height="290" rx="22" fill="{INK}"></rect><rect x="106" y="56" width="130" height="258" rx="12" fill="#F4F1EA"></rect>' + inner)

S = {}
S[1] = (room() + chair() + ruth(150) + balloon(86, 96, .9, .5) + balloon(256, 80, .8, .45) + balloon(176, 60, .7, .35)
        + heavy(230, 140, w=140, size=10) + lbl(171, 22, 'מפגש 64 · טיפוח חשיבה גמישה', fill='#E3F4F0', size=11))
S[2] = room() + chair() + ruth(150, mood='flat') + voice(244, 150) + heavy(200, 82, w=150, size=11) + lbl(171, 30, 'תקיף · ביקורתי · שיפוטי', fill='#FFFFFF', size=11)
S[3] = (room() + chair() + ruth(150, mood='flat') + heavy(150, 70, w=140, size=10) + arrow(170, 96, 210, 140) + lbl(240, 150, 'איך שנרגיש', size=10)
        + arrow(250, 170, 250, 270) + lbl(200, 290, 'מה שנבחר לעשות', size=10))
S[4] = (room() + chair() + ruth(150) + friend(60) + friend(286, '#B07AA1', '#8A8F99') + balloon(150, 140, .9) + balloon(60, 140, .8) + balloon(286, 140, .8)
        + lbl(171, 40, 'מחשבות פשוט מגיעות, לכולנו', fill='#E3F4F0', size=11))
S[5] = (room() + chair() + ruth(150) + heavy(240, 110, w=140, size=10)
        + lbl(70, 40, 'להעלים', size=11) + strike(70, 40, 50) + lbl(171, 40, 'להתווכח', size=11) + strike(171, 40, 56) + lbl(272, 40, 'לתקן', size=11) + strike(272, 40, 40)
        + lbl(240, 150, 'לשים לב', fill='#FFF1CC', size=11))
S[6] = (P + heavy(171, 150, LOUD, w=230, size=15) + f'<circle cx="104" cy="150" r="24" fill="none" stroke="{AMBER}" stroke-width="3"></circle>'
        + lbl(104, 210, 'יותר מדי סימני קריאה', fill='#FFF1CC', size=11) + lbl(240, 250, 'כמו פקודות', size=11) + lbl(171, 310, 'רק לשים לב, זה כבר המון', fill='#E3F4F0', size=11))
S[7] = (room() + ruth(80, 'stand') + card(250, 140, 'הכול אצלי כישלון', w=120, size=10) + lbl(286, 104, 'מחשבה', fill='#FFF1CC', size=10) + gap(104, 188, 230)
        + lbl(276, 26, 'לעצור', size=10) + lbl(206, 26, 'לשים לב', size=10) + lbl(126, 26, 'לקחת מרחק', size=10) + lbl(52, 26, 'לבחור', fill='#FFF1CC', size=10))
S[8] = (room() + ruth(80, 'stand') + card(250, 140, 'הכול אצלי כישלון', w=120, size=10) + lbl(171, 50, 'להקשיב לה עכשיו, או לא?', fill='#FFF1CC', size=12)
        + arrow(110, 250, 200, 200) + arrow(110, 250, 120, 300))
S[9] = room() + ruth(130, 'stand') + f'<path d="M113 220 L96 176 M147 220 L164 176" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>' + reed(250, 140) + lbl(250, 196, 'גמישות מחשבתית', fill='#FFF1CC', size=11) + lbl(171, 40, 'כמו אימון גופני', size=11)
S[10] = room() + ruth(150, 'stand', mood='happy') + battery(260, 140, 0.8, label=False) + lbl(110, 60, 'להרגיש יותר טוב', fill='#E3F4F0', size=11) + lbl(240, 60, 'לתפקד יותר טוב', fill='#E3F4F0', size=11)
S[11] = (room() + chair() + ruth(150) + tool(270, 50, 0, r=18) + tool(171, 50, 2, r=18) + tool(72, 50, 3, r=18)
         + lbl(270, 86, 'להסתכל על המחשבות', size=9) + lbl(171, 86, 'להתחבר לרגע', size=9) + lbl(72, 86, 'יותר הבנה', size=9) + voice(240, 160, warm=True))
S[12] = room() + chair() + ruth(150) + friend(250) + bubble(200, 120, '…', w=50) + tool(171, 50, 4, r=18) + lbl(171, 86, 'לדבר עם מישהו', fill='#E3F4F0', size=11)
S[13] = bigphone(tool(171, 100, 0, r=18) + tool(171, 150, 2, r=18) + tool(171, 200, 3, r=18) + tool(171, 250, 4, r=18)) + reed(290, 70, 20) + lbl(171, 340, 'איך הכי מתאים לי היום?', fill='#FFF1CC', size=12)

ACTS = [
  (1, 'Act 1 · A thought gets loud', [1, 2, 3], 'In her armchair, small thoughts drift in the background. One of them swells into a heavy card with exclamation marks and won\'t let go. The grey inner voice says it; it drags her mood down and she stays in her chair.'),
  (2, 'Act 2 · Thoughts just come', [4, 5], 'Thought balloons drift over Ruth and over her two friends too. Making them vanish, arguing, fixing: struck through. Noticing: yes.'),
  (3, 'Act 3 · Notice, pause, step back, choose', [6, 7, 8], 'The exclamation marks are circled. She pauses, labels it "a thought", steps back to arm\'s length, and asks whether to listen to it now.'),
  (4, 'Act 4 · Flexibility, like a workout', [9, 10], 'Ruth stretches; the reed badge bends without breaking: mental flexibility. She feels and functions better: she waters her plant, battery up.'),
  (5, 'Act 5 · Ways to practise', [11, 12, 13], 'Tool badges for each way: looking at thoughts, reconnecting with the moment, a kinder voice, talking with someone. They wait on her phone: which fits today?'),
]
SHOT = {
 1: ('Ruth in her armchair. A few small, faint thought balloons drift high in the background. Then one swells, darkens and becomes a heavy card: "הכול אצלי כישלון!!!". It shakes and hovers by her head, following her when she turns. Title: מפגש 64 · טיפוח חשיבה גמישה.', 'Ruth\'s room and armchair; thought cards (sessions 4, 7).', 'Open on the room; the balloon grows into the card.'),
 2: ('The grey inner voice pops up by her head and says it again, louder; three tags pop by it: תקיף · ביקורתי · שיפוטי. Ruth\'s face drops.', 'The inner voice (session 4).', 'Voice pops in beside the card.'),
 3: ('A short arrow from the card to her chest (she sags, mouth flat): איך שנרגיש. Then she glances at her shoes by the door and settles back in the chair: מה שנבחר לעשות.', 'Shoes by the door (room).', 'Same shot; she sinks.'),
 4: ('Balloons keep drifting in from the edges, over Ruth and over her two friends, who appear at the sides: מחשבות פשוט מגיעות, לכולנו.', 'The friends (session 5).', 'Pull back a little; friends slide in.'),
 5: ('The friends slide out. The heavy card returns by Ruth. Three tags over it are struck through one by one: להעלים · להתווכח · לתקן. A warm tag: לשים לב.', 'Struck tags (sessions 4, 7).', 'Strikes draw on the words.'),
 6: ('Close on the card. The "!!!" are circled in amber: יותר מדי סימני קריאה. A second line shows it reads like an order: כמו פקודות. Then: רק לשים לב, זה כבר המון.', 'The same card.', 'Push in on the card.'),
 7: ('Ruth stands. Four steps light up across the top, right to left, on Nira\'s words: לעצור · לשים לב · לקחת מרחק · לבחור. The card stops shaking; a tag "מחשבה" pins on it; she steps back and the gap is measured; the exclamation marks fade.', 'Arm\'s length (sessions 4, 7); the "מחשבה" label (7).', 'Each step lights as she does it.'),
 8: ('At arm\'s length she looks at the card and asks: להקשיב לה עכשיו, או לא? Two soft arrows: towards it, or past it.', 'Same shot.', 'Hold; question tag.'),
 9: ('Ruth raises her arms in a gentle stretch, like her exercises; beside her the reed badge bends and springs back: גמישות מחשבתית · כמו אימון גופני.', 'The reed badge (session 7).', 'Stretch on "אימונים".'),
 10: ('She lowers her arms, smiles, waters the plant; her battery rises: להרגיש יותר טוב · לתפקד יותר טוב.', 'Battery (session 5), the plant and watering can (session 2).', 'Same room.'),
 11: ('Back in the chair. Three tool badges come in at the top, right to left, each with a tiny vignette below: she looks at the cards at a distance (thoughts), the circle of attention around her and the mug (the moment), the inner voice turns warm (more understanding, less criticism).', 'Tool badges (session 1), circle of attention (3a, 6), the inner voice (4).', 'Each badge pops on its words.'),
 12: ('A friend sits beside her; they talk, a speech bubble; the fourth badge (people) joins the row: לדבר עם מישהו.', 'Friend (session 5); the people badge (1).', 'Friend slides in.'),
 13: ('The four badges fly onto her phone as options; the reed badge above. Tag: איך הכי מתאים לי היום?', 'The phone (sessions 7, 58).', 'Phone rises; badges drop into it.'),
}
legend1 = ('66 50 210 50', card(171, 75, 'הכול אצלי כישלון!!!', w=200, size=13).replace('#D7DCE2', '#7B8794').replace(f'fill="{INK}" direction', 'fill="#FFFFFF" direction'), '<strong>The loud thought.</strong> One heavy card (from the Inner Voice deck), with too many exclamation marks. It changes, it never cuts.')
legend2 = ('40 100 262 160', room() + ruth(80, 'stand') + card(250, 140, 'מחשבה', w=80) + gap(104, 188, 230), '<strong>Arm\'s length.</strong> She steps back from the thought, as in sessions 4 and 7.')
legend3 = ('40 20 262 60', tool(270, 50, 0, r=22) + tool(205, 50, 2, r=22) + tool(140, 50, 3, r=22) + tool(75, 50, 4, r=22), '<strong>The tool badges.</strong> The ways to practise are the program\'s tools (session 1).')
carried = ['<strong>Kept:</strong> Ruth\'s room and armchair, thought cards and arm\'s length (4, 7), the inner voice (4), the reed (7), the battery (5), the friends (5), the circle of attention (3a, 6), the tool badges (1).',
           '<strong>Content:</strong> every tag is Nira\'s words; the one thought on screen is from the Inner Voice deck ("Balanced thoughts").', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S64Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 64 · טיפוח חשיבה גמישה',
      'We can\'t control which thoughts come, and we don\'t have to erase, argue with or fix them. We can notice when one gets too loud — too many exclamation marks, like orders — and that moment lets us pause, step back and choose how to respond. That is mental flexibility, and it can be trained.',
      'Small thoughts drift by → one swells into a heavy, shouting card and drags Ruth down → thoughts come to everyone; no erasing or arguing → she notices the exclamation marks, pauses, labels it, steps back, chooses → a stretch and a bending reed → four tool badges → her phone: which fits today?',
      [legend1, legend2, legend3], carried, 'How it fits the program')
H = 4560
p = B + 'S64Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))  # set_height
print('rows', rows)
