# Session 48 storyboard: self-validation — a child with a broken toy shows two ways to answer a feeling; Ruth learns to answer her own the second way, in three steps.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S48.dc.html')
assert len(times) == 17
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def voice(x, y, warm=False, s=1, frown=False):
    c = '#FFE3A8' if warm else '#E4E8ED'
    m = f'M-6 14 q7 -5 14 0' if frown else 'M-6 10 q7 5 14 0'
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-26 6 q-4 -24 18 -26 q8 -14 24 -6 q18 0 14 18 q10 10 -2 20 h-46 q-12 0 -8 -6Z" fill="{c}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M-8 22 l-8 12 l14 -12Z" fill="{c}" stroke="{INK}" stroke-width="1.5"></path><circle cx="-6" cy="2" r="2.4" fill="{INK}"></circle><circle cx="8" cy="2" r="2.4" fill="{INK}"></circle>'
            f'<path d="{m}" fill="none" stroke="{INK}" stroke-width="1.6"></path></g>')

def rain(x, y, s=1):
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-22 0 C-32 0 -32 -14 -20 -15 C-20 -28 0 -32 6 -20 C14 -28 30 -22 28 -10 C38 -9 38 0 28 0Z" fill="#B9C1CA" stroke="{INK}" stroke-width="1.5"></path>'
            f'<path d="M-12 6 l-3 8 M0 6 l-3 8 M12 6 l-3 8" stroke="#5B8DB8" stroke-width="2" stroke-linecap="round"></path></g>')

def child(x, mood='sad'):
    """A small boy: big head, striped shirt, shorts; standing on the floor line."""
    m = {'sad': f'M{x - 5} 266 q5 -4 10 0', 'calm': f'M{x - 5} 263 q5 4 10 0'}[mood]
    tear = f'<path d="M{x + 7} 258 q2 6 0 8" stroke="#5B8DB8" stroke-width="2.5" fill="none"></path>' if mood == 'sad' else ''
    return (f'<rect x="{x - 14}" y="278" width="28" height="22" rx="6" fill="#5B8DB8" stroke="{INK}" stroke-width="1.5"></rect><path d="M{x - 8} 300 v16 M{x + 8} 300 v16" stroke="{INK}" stroke-width="6" stroke-linecap="round"></path>'
            f'<circle cx="{x}" cy="258" r="16" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></circle><path d="M{x - 16} 254 q2 -16 16 -16 q14 0 16 16 q-10 -6 -32 0Z" fill="#7A5236"></path>'
            f'<circle cx="{x - 5}" cy="257" r="1.8" fill="{INK}"></circle><circle cx="{x + 5}" cy="257" r="1.8" fill="{INK}"></circle><path d="{m}" fill="none" stroke="{INK}" stroke-width="1.5"></path>' + tear)

def toy(x, broken=True):
    if broken:
        return (f'<rect x="{x - 22}" y="304" width="18" height="10" rx="3" fill="#D96C6C" stroke="{INK}" stroke-width="1.2" transform="rotate(-12 {x - 13} 309)"></rect><rect x="{x + 2}" y="304" width="18" height="10" rx="3" fill="#D96C6C" stroke="{INK}" stroke-width="1.2" transform="rotate(10 {x + 11} 309)"></rect>'
                f'<circle cx="{x - 16}" cy="316" r="3.5" fill="{INK}"></circle><circle cx="{x + 30}" cy="314" r="3.5" fill="{INK}"></circle>')
    return f'<rect x="{x - 20}" y="302" width="40" height="12" rx="4" fill="#D96C6C" stroke="{INK}" stroke-width="1.2"></rect><circle cx="{x - 12}" cy="316" r="3.5" fill="{INK}"></circle><circle cx="{x + 12}" cy="316" r="3.5" fill="{INK}"></circle>'

def card(x, y, text, kind='kind', w=None, size=10):
    return thought_card(x, y, text, kind, w=w).replace('font-size="13"', f'font-size="{size}"')

def badge(x, y, inner, r=28):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFF1CC" stroke="{INK}" stroke-width="2"></circle>' + inner

def tick(x, y):
    return f'<path d="M{x - 8} {y} l6 6 l12 -14" stroke="#5BAA6A" stroke-width="4" fill="none" stroke-linecap="round"></path>'

def heart(x, y, k=1.0, col='#E66A7A'):
    return f'<path d="M{x} {y + 12 * k} C{x - 22 * k} {y - 2 * k} {x - 12 * k} {y - 20 * k} {x} {y - 8 * k} C{x + 12 * k} {y - 20 * k} {x + 22 * k} {y - 2 * k} {x} {y + 12 * k}Z" fill="{col}" stroke="{INK}" stroke-width="1.5"></path>'

def cloudc(x, y, inner=''):
    return f'<circle cx="{x}" cy="{y}" r="34" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle>' + inner

def tracker(k):
    return ''.join(f'<ellipse cx="{300 - i * 30}" cy="26" rx="12" ry="5" fill="{SPARK if i == k else "#D9CBB0"}" stroke="{INK}" stroke-width="1.2"></ellipse>' for i in range(3))

ROOM = room() + chair()
LAND = land() + stones(PATH, lit=(0, 2, 4))
S = {}
S[1] = ROOM + ruth(130) + thought(140, 196, 220, 120) + cloudc(230, 100, rain(230, 104, .7)) + lbl(171, 30, 'מפגש 48 · תיקוף עצמי', fill='#E3F4F0', size=12) + lbl(171, 160, 'קושי · אכזבה · תסכול', size=11)
S[2] = ROOM + ruth(130) + voice(250, 120, warm=True) + voice(90, 120, frown=True) + lbl(250, 160, 'מבין ותומך', fill='#FFF1CC', size=10) + lbl(90, 160, 'ביקורתי וקשה', size=10) + lbl(171, 40, 'איך דיברתם לעצמכם?', fill='#E3F4F0', size=12)
S[3] = ROOM + ruth(150, mood='flat') + rain(150, 150, .9) + voice(230, 150, frown=True, s=1.4) + f'<path d="M200 160 l-10 6 l8 2 l-10 6" stroke="{INK}" stroke-width="2" fill="none"></path>' + lbl(171, 40, 'מבקרים את עצמנו', size=12)
S[4] = (ROOM + ruth(150) + badge(260, 100, heart(260, 100, .8)) + badge(171, 90, f'<path d="M158 96 q-8 0 -8 -8 q0 -10 12 -8 q4 -8 12 -2 q10 -2 10 8 q4 8 -6 10Z" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></path>') + badge(82, 100, f'<circle cx="82" cy="100" r="16" fill="{SPARK}" opacity=".5"></circle>')
        + tick(278, 76) + tick(189, 66) + tick(100, 76) + lbl(260, 140, 'רגשות', size=10) + lbl(171, 130, 'מחשבות', size=10) + lbl(82, 140, 'תחושות', size=10) + lbl(171, 30, 'תיקוף עצמי', fill='#FFF1CC') + lbl(171, 176, 'לגיטימיים והגיוניים', size=11))
S[5] = room() + ruth(250, 'stand', 'flat') + child(130) + toy(130) + card(171, 80, 'זה רק צעצוע, מה אתה עושה דרמה?', 'harsh', w=220)
S[6] = room() + ruth(250, 'bend', 'happy') + child(150) + toy(110) + card(171, 70, 'אני רואה שאתה עצוב.', w=150) + card(171, 120, 'זה הגיוני שאתה בוכה', w=150)
S[7] = (P + f'<line x1="171" y1="40" x2="171" y2="340" stroke="{INK}" stroke-width="2" stroke-dasharray="4 6"></line>' + child(250) + toy(250) + card(250, 120, 'זה רק צעצוע', 'harsh', w=100)
        + f'<circle cx="90" cy="270" r="60" fill="{SPARK}" opacity=".2" stroke="{AMBER}" stroke-width="2" stroke-dasharray="6 6"></circle>' + child(90) + toy(90) + card(90, 120, 'אני רואה שאתה עצוב', w=120)
        + lbl(171, 30, 'הצעצוע שבור · יש עצב', size=11) + lbl(90, 190, 'יש מקום למה שמרגישים', fill='#FFF1CC', size=9))
S[8] = room(door_open=True) + ruth(150, 'stand') + child(205) + card(171, 70, 'זה הגיוני שאתה מפחד עכשיו', w=170) + card(171, 120, 'אבל אנחנו צריכים להיות אמיצים ולעשות את זה', 'plain', w=240, size=9)
def reed_s(x, y):
    return f'<circle cx="{x}" cy="{y}" r="28" fill="#F6E6CC" stroke="{INK}" stroke-width="2"></circle><path d="M{x} {y + 20} C{x} {y + 4} {x + 4} {y - 8} {x + 12} {y - 18}" stroke="#4E8B5F" stroke-width="4" fill="none" stroke-linecap="round"></path>'
S[9] = ROOM + ruth(150, mood='happy') + voice(230, 150, warm=True) + reed_s(80, 110) + lbl(171, 40, 'בצורה שקולה וגמישה יותר', fill='#FFF1CC', size=11)
S[10] = ROOM + ruth(150, mood='flat') + friend(260) + friend(60, '#B07AA1', '#8A8F99') + card(171, 80, 'אני נטל', 'harsh', w=100) + lbl(171, 30, 'תחושה שאנחנו מכבידים', size=11)
S[11] = ROOM + ruth(150) + voice(230, 150, warm=True) + card(171, 70, 'זה הגיוני וטבעי שהתחושה הזאת עולה בי עכשיו', w=280, size=9) + card(80, 120, 'אני נטל', 'harsh', w=80) + lbl(171, 300, 'מצב לא פשוט · תחושה שקשה לשאת', size=10)
S[12] = (ROOM + ruth(150, mood='happy') + phone(196, 196, 'לבקש עזרה') + friend(270) + lbl(171, 40, 'ועדיין יש אפשרות לבחור', fill='#E3F4F0', size=11) + lbl(270, 150, 'להישאר בקשר', size=10))
S[13] = LAND + ruth(171, 'stand') + lbl(171, 40, 'שלושה צעדים', fill='#FFF1CC') + lbl(250, 290, '1', size=12) + lbl(230, 220, '2', size=11) + lbl(220, 180, '3', size=10)
S[14] = ROOM + ruth(150) + tracker(0) + f'<circle cx="150" cy="240" r="40" fill="{SPARK}" opacity=".16" stroke="{AMBER}" stroke-width="2" stroke-dasharray="6 6"></circle>' + bubble(200, 110, 'מה קורה לי עכשיו?', w=150) + lbl(260, 160, 'אכזבה', size=10) + lbl(171, 70, 'לזהות', fill='#FFF1CC') + lbl(80, 160, 'דאגה · תסכול', size=10)
S[15] = (ROOM + ruth(150) + tracker(1) + cloudc(171, 110) + f'<path d="M171 144 C160 170 120 180 100 200 M171 144 V200 M171 144 C182 170 222 180 242 200" stroke="#B08A5B" stroke-width="3" fill="none"></path>'
         + lbl(250, 210, 'זה היה חשוב לי', size=9) + lbl(171, 230, 'סיטואציה קשה', size=9) + lbl(90, 210, 'ההיסטוריה שלי', size=9) + lbl(171, 60, 'להבין', fill='#FFF1CC'))
S[16] = ROOM + ruth(150, mood='happy') + tracker(2) + voice(230, 150, warm=True) + card(171, 80, 'הרגש הזה טבעי והוא גם יעבור', w=200) + wave(40, 130, 100, 10, 2) + lbl(171, 40, 'משפט מתקף', fill='#FFF1CC')
S[17] = ROOM + ruth(150, mood='happy') + f'<circle cx="150" cy="250" r="44" fill="{SPARK}" opacity=".3"></circle>' + voice(230, 150, warm=True) + lbl(171, 40, 'עם הזמן, יותר טבעי', fill='#E3F4F0', size=11) + lbl(171, 74, 'המבט החומל מחלחל פנימה', fill='#FFF1CC', size=11)

ACTS = [
  (1, 'Act 1 · How did I talk to myself?', [1, 2, 3], 'Ruth recalls a recent hard moment. Was her inner voice kind, or harsh? When it hurts, we often criticise ourselves on top.'),
  (2, 'Act 2 · What validation is', [4], 'Feelings, thoughts and sensations, each recognised as legitimate and understandable in the situation.'),
  (3, 'Act 3 · The broken toy', [5, 6, 7, 8, 9], 'Two answers to a crying child: dismiss it, or make room for it. Validating isn\'t excusing: "it makes sense you\'re scared, and we\'ll be brave". It helps him, and us, cope.'),
  (4, 'Act 4 · "I\'m a burden"', [10, 11, 12], 'A feeling many people with Parkinson\'s describe. Validation sounds kind, acknowledges the pain, and still leaves room to choose: ask for help, stay in touch.'),
  (5, 'Act 5 · Three steps', [13, 14, 15, 16, 17], 'Identify, understand, say a validating sentence. Awkward at first, more natural with time, until the compassionate look seeps in.'),
]
SHOT = {
 1: ('Ruth in her armchair. A memory bubble rises with a small rain cloud in it: a recent hard moment, not a big one. Tags: קושי · אכזבה · תסכול.', 'Room, memory bubble (43).', 'Bubble rises on "להיזכר".'),
 2: ('Her inner voice (session 4) appears and flickers between warm (מבין ותומך, on the right) and grey (ביקורתי וקשה, on the left): איך דיברתם לעצמכם?', 'Inner voice (4).', 'Voice flips on each word.'),
 3: ('A rain cloud over Ruth and a wave of pain; then the grey voice grows and scolds (a zigzag, no words). She sinks: מבקרים את עצמנו.', 'Rain cloud (45), feeling wave (4).', 'Voice swells.'),
 4: ('Title tag תיקוף עצמי. Three badges right to left (heart, thought cloud, body glow, as in 43): רגשות · מחשבות · תחושות. A tick lands on each: לגיטימיים והגיוניים · בסיטואציה מסוימת.', 'Feeling/thought/body badges (43).', 'Badges pop on their words.'),
 5: ('A little boy plays with a toy car on Ruth\'s floor; it snaps in two; he cries. Ruth, standing, answers with a grey card: "זה רק צעצוע, מה אתה עצוב, מה אתה עושה דרמה?" He turns away.', 'Room; a new character, the child.', 'Car snaps on "נשבר".'),
 6: ('Rewind: Ruth bends down beside him. Warm cards: "אני רואה שאתה עצוב." · "זה הגיוני שאתה בוכה, הצעצוע הזה היה חשוב לך." He leans in.', 'Warm cards (4).', 'Quick rewind, then cards.'),
 7: ('Split frame: right, the first answer; left, the second. Both: the broken toy and a tear (הצעצוע שבור · יש עצב). On the left a warm circle opens around him: יש מקום למה שהילד מרגיש. Then: גם כשאנחנו מדברים אל עצמנו.', 'Circle of attention (3a).', 'Frame splits; circle opens.'),
 8: ('The boy at the room\'s door, scared (shaking lines). Tags: לתת תוקף לרגש · זה לא אומר להצדיק התנהגות. Ruth takes his hand: "זה הגיוני שאתה מפחד עכשיו" · "אבל אנחנו צריכים להיות אמיצים ולעשות את זה". The door opens to warm light.', 'The door from session 7.', 'Door opens.'),
 9: ('They step through together; he steadies: יכולה לעזור לו להתמודד. Then Ruth in her chair, her voice warm, the reed (3a) sways: בצורה שקולה וגמישה יותר.', 'Reed (3a), inner voice.', 'Cross-fade to the chair.'),
 10: ('Ruth with two friends; a grey card from the Inner Voice deck hangs over her: "אני נטל". Tags: תחושה שאנחנו מכבידים · הרבה אנשים עם פרקינסון מספרים עליה.', 'Friends (5), Inner Voice deck card.', 'Card drops.'),
 11: ('Her voice turns warm; a warm card beside the grey one: "זה הגיוני וטבעי שהתחושה הזאת עולה בי עכשיו." Tags: מצב לא פשוט · תחושה שקשה לשאת. The grey card softens, not removed.', 'Cards (4).', 'Warm card rises.'),
 12: ('Ruth acknowledges the pain (hand to heart glow) and still has a choice: she picks up her phone (לבקש עזרה) and a friend sits with her (להישאר בקשר עם האנשים שחשובים לנו).', 'Phone call (5, 7), friends.', 'Phone, then friend.'),
 13: ('On her path (1): three stones light up, numbered right to left: איך מתרגלים בפועל? · שלושה צעדים.', 'Path of stones (1).', 'Cut to the path.'),
 14: ('Back in the chair; a tracker of three small stones at the top, the first lit. The circle of attention on Ruth: לזהות · מה קורה לי עכשיו? Feeling names: אכזבה · דאגה · תסכול.', 'Stones tracker, circle (3a).', 'Names pop.'),
 15: ('Second stone: להבין. A cloud of feeling with roots growing down (5–7), each root to a reason: זה היה חשוב לי · זו סיטואציה קשה · ההיסטוריה שלי או מי שאני.', 'Roots from session 6.', 'Roots draw down.'),
 16: ('Third stone: משפט מתקף. Ruth\'s warm voice: "זה הגיוני שאני מרגישה ככה" · "הרגש הזה טבעי והוא גם יעבור" · "אבל כרגע הוא כאן"; the feeling wave rises and slowly settles.', 'Feeling wave (4), inner voice.', 'Wave rises and passes.'),
 17: ('The warm card wobbles at first (לא אותנטי בהתחלה), then steadies (עם הזמן, יותר טבעי); a warm glow seeps into Ruth: המבט החומל מחלחל פנימה.', 'Inner voice, glow.', 'Glow fills; hold.'),
}
legend1 = ('0 0 342 360', ROOM + ruth(150) + voice(230, 150, warm=True), '<strong>The inner voice.</strong> Session 4\'s cloud: harsh when Ruth judges her feelings, warm when she validates them.')
legend2 = ('0 200 342 140', room() + child(150) + toy(110), '<strong>The boy and his broken toy.</strong> Two answers to the same tears.')
legend3 = ('0 0 342 360', LAND + ruth(171, 'stand'), '<strong>Three stones.</strong> The path from session 1: identify, understand, a validating sentence.')
carried = ['<strong>Kept:</strong> Ruth\'s room and door (7), the inner voice and cards (4), memory bubble and badges (43), circle of attention and reed (3a), roots (6), friends and phone (5), the path (1).',
           '<strong>Quotes</strong> are Nira\'s words; Ruth\'s own sentences use the feminine form; "אני נטל" comes from the Inner Voice deck.',
           '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S48Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 48 · תיקוף עצמי',
      'When things are hard we often criticise ourselves for how we feel. Self-validation recognises feelings, thoughts and sensations as legitimate and understandable in the situation, the way we would answer a crying child, without excusing every behaviour, and it helps us cope more calmly and flexibly.',
      'A hard moment and a harsh inner voice → a child\'s broken toy: dismissed, or given room → validating isn\'t excusing; it helps him be brave → "I\'m a burden", answered kindly, leaves room to ask for help → three stones: identify, understand, say it → awkward at first, then it seeps in.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
f = B + 'S48Story.dc.html'; page = open(f, encoding='utf-8').read(); open(f, 'w', encoding='utf-8').write(page.replace('"height":4700', '"height":4380'))
