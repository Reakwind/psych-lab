# Session 4 storyboard: the inner voice — a small companion voice, thought cards, keep or let pass, then into the game.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S04.dc.html')
assert len(times) == 13

def voice(x, y, warm=False, s=1):
    """Ruth's inner voice: a small speech-cloud character that floats by her head."""
    c = '#FFE3A8' if warm else '#E4E8ED'
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M-26 6 q-4 -24 18 -26 q8 -14 24 -6 q18 0 14 18 q10 10 -2 20 h-46 q-12 0 -8 -6Z" fill="{c}" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M-8 22 l-8 12 l14 -12Z" fill="{c}" stroke="{INK}" stroke-width="1.5"></path><circle cx="-6" cy="2" r="2.4" fill="{INK}"></circle><circle cx="8" cy="2" r="2.4" fill="{INK}"></circle>'
            f'<path d="M-6 10 q7 5 14 0" fill="none" stroke="{INK}" stroke-width="1.6"></path></g>')

def game_phone(x, y, text, kind):
    return (f'<rect x="{x - 70}" y="{y - 110}" width="140" height="230" rx="18" fill="{INK}"></rect><rect x="{x - 62}" y="{y - 98}" width="124" height="206" rx="10" fill="#F4F1EA"></rect>'
            + thought_card(x, y - 30, text, kind, w=112).replace('font-size="13"', 'font-size="10"')
            + f'<rect x="{x - 54}" y="{y + 50}" width="50" height="28" rx="14" fill="#D7DCE2" stroke="{INK}" stroke-width="1.5"></rect><text x="{x - 29}" y="{y + 68}" text-anchor="middle" font-size="10" font-weight="600" fill="{INK}">לחלוף</text>'
            f'<rect x="{x + 4}" y="{y + 50}" width="50" height="28" rx="14" fill="#FFF1CC" stroke="{INK}" stroke-width="1.5"></rect><text x="{x + 29}" y="{y + 68}" text-anchor="middle" font-size="10" font-weight="600" fill="{INK}">לאמץ</text>')

HARSH, HARSH2 = 'אין טעם לנסות, שום דבר לא ישתנה', 'כמה דקות לא שוות את זה'
KIND, KIND2 = 'גם כמה דקות נחשבות', 'לא צריך שיתחשק לי כדי להתחיל'
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
S = {}
S[1] = room() + chair() + ruth(150) + voice(210, 150) + lbl(171, 40, 'מפגש 4 · הקול הפנימי', fill='#E3F4F0')
S[2] = (room() + ruth(120, 'step') + voice(170, 140) + bubble(250, 90, 'הערה…', w=80) + bubble(270, 150, 'עצה…', w=70)
        + lbl(171, 40, 'מלווה אותנו כל היום', fill='#E3F4F0'))
S[3] = (room() + chair() + ruth(150) + voice(210, 190) + thought_card(200, 80, KIND, 'kind', w=210).replace('font-size="13"', 'font-size="11"')
        + thought_card(200, 132, HARSH, 'harsh', w=210).replace('font-size="13"', 'font-size="11"') + lbl(48, 80, 'תומכת', size=11) + lbl(48, 132, 'ביקורתית', size=11))
S[4] = (room() + chair() + ruth(150, mood='flat') + f'<rect x="96" y="70" width="150" height="70" rx="10" fill="#9AA3AD" stroke="{INK}" stroke-width="2.5"></rect>'
        + f'<text x="171" y="110" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF" direction="rtl">{HARSH2}</text>' + lbl(171, 40, 'כשמחשבה נהיית עובדה', fill='#FFF1CC'))
S[5] = room() + chair() + ruth(110) + game_phone(240, 170, HARSH2, 'harsh') + lbl(171, 40, 'משחק', fill='#E3F4F0')
S[6] = (P + thought_card(171, 110, HARSH, 'harsh') + f'<path d="M100 150 C70 170 60 200 70 230" fill="none" stroke="{SLATE}" stroke-width="2" stroke-dasharray="4 5"></path>'
        + f'<path d="M242 150 C272 170 282 200 272 230" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4 5"></path>'
        + bubble(70, 260, 'לתת לחלוף', tail=False) + bubble(272, 260, 'לאמץ', tail=False))
S[7] = (room() + ruth(110, 'stand') + thought_card(250, 130, HARSH2, 'harsh', w=150).replace('font-size="13"', 'font-size="11"')
        + f'<path d="M140 180 H200" stroke="{INK}" stroke-width="2"></path><path d="M140 174 v12 M200 174 v12" stroke="{INK}" stroke-width="2"></path>'
        + lbl(171, 40, 'מרחק בריא', fill='#E3F4F0') + lbl(130, 90, 'לא "לחשוב חיובי"', size=11) + strike(130, 90, 100))
S[8] = (room() + ruth(110, 'stand') + thought_card(250, 130, HARSH2, 'harsh', w=150).replace('font-size="13"', 'font-size="11"')
        + wave(190, 200, 110, 8, 2, col='#8C5C82') + lbl(171, 40, 'לשים לב · לבחור', fill='#E3F4F0'))
S[9] = (room() + ruth(120, 'stand', 'happy') + f'<g opacity=".55">' + thought_card(250, 90, HARSH, 'harsh', w=150).replace('font-size="13"', 'font-size="10"') + '</g>'
        + f'<path d="M250 120 v60" stroke="{SLATE}" stroke-width="1.5" stroke-dasharray="3 5"></path>' + lbl(171, 40, 'רק מחשבה', fill='#FFF1CC'))
S[10] = (room() + chair() + ruth(150, mood='happy') + voice(220, 170, warm=True, s=1.3) + thought_card(220, 90, KIND2, 'kind', w=170).replace('font-size="13"', 'font-size="11"')
         + lbl(171, 40, 'הקול המבין והאכפתי', fill='#E3F4F0'))
S[11] = (P + ''.join(thought_card(210, y, t, k, w=220).replace('font-size="13"', 'font-size="11"') for y, t, k in ((100, KIND, 'kind'), (160, HARSH, 'harsh'), (220, HARSH2, 'harsh')))
         + lbl(52, 100, 'מוכרת', size=11) + lbl(52, 160, 'מתנגדים', size=11) + lbl(52, 220, 'מצחיקה', size=11))
S[12] = (room() + ruth(80, 'stand', 'happy') + ''.join(thought_card(160 + i * 70, 120 + i * 30, '…', ['kind', 'harsh', 'plain'][i], w=60) for i in range(3))
         + lbl(171, 40, 'בקלילות, בסקרנות, עם הומור', fill='#FFF1CC'))
S[13] = room() + chair() + ruth(110, mood='happy') + game_phone(240, 170, KIND, 'kind') + lbl(171, 40, 'בואו ננסה', fill='#E3F4F0')

ACTS = [
  (1, 'Act 1 · Everyone has one', [1, 2], 'A small cloud-shaped voice appears by Ruth\'s head and follows her through the day, commenting and advising.'),
  (2, 'Act 2 · Helpful or not', [3, 4], 'Its thoughts come as cards: some warm and balanced, some grey and critical. Taken as fact, a grey card turns into a heavy block.'),
  (3, 'Act 3 · The game', [5, 6], 'On the phone, one thought at a time; Ruth chooses: keep it, or let it pass.'),
  (4, 'Act 4 · Distance, not positivity', [7, 8], 'Ruth steps back so the card is at arm\'s length; she notices what it stirs, then chooses.'),
  (5, 'Act 5 · What each choice builds', [9, 10], 'A harsh card let go becomes "just a thought"; each kind card kept makes the inner voice warmer.'),
  (6, 'Act 6 · Lightly', [11, 12, 13], 'Familiar, annoying, even funny: meet each one lightly, choose, move on. Then the game begins.'),
]
SHOT = {
 1: ('Ruth in her armchair; a small grey speech-cloud character pops up by her head: her inner voice. Title: מפגש 4 · הקול הפנימי.', 'Room and Ruth; the voice is this session\'s new character and returns in later thought sessions.', 'Pop in beside her.'),
 2: ('Ruth walks across the room; the voice floats along, throwing out little comment and advice bubbles nobody asked for.', 'Same voice.', 'Bubbles pop as she walks.'),
 3: ('Two thought cards float up from the voice: a warm one (תומכת) and a grey one (ביקורתית). Examples come from the game\'s own deck for this session.', 'Cards look exactly like the Inner Voice game.', 'Cards rise from the voice.'),
 4: ('Ruth believes a grey card; it turns into a heavy grey block hanging over her and her face drops: כשמחשבה נהיית עובדה.', 'Card from shot 2.1.', 'The card hardens and drops a little.'),
 5: ('Ruth\'s phone, zoomed: the game screen with one thought card and two buttons, לחלוף / לאמץ.', 'Phone from earlier sessions.', 'Push in on the phone.'),
 6: ('One card, two paths: dashed lines lead to "let it pass" and "keep it".', 'Game buttons.', 'Lines draw out from the card.'),
 7: ('A sticker "think positive" is struck through. Ruth takes a step back, and a measured gap opens between her and the card: מרחק בריא.', 'Card.', 'Ruth steps back; the gap appears.'),
 8: ('Ruth looks at the card; a small wave of feeling stirs in her, then she chooses: לשים לב · לבחור.', 'Wave motif from session 3b.', 'Wave stirs, then settles.'),
 9: ('Ruth smiles at a harsh card; it fades and floats up and away, labelled רק מחשבה. She stands steadier.', 'Card; the brain idea from session 1 (training the brain).', 'Card drifts up and out.'),
 10: ('Ruth keeps a kind card; her inner voice turns warm yellow and grows a little: הקול המבין והאכפתי.', 'The voice character changes color.', 'Voice warms as the card joins it.'),
 11: ('Three cards: one familiar, one that pushes back, one a bit funny (Ruth chuckles).', 'Cards.', 'Cards deal in.'),
 12: ('Cards stream past Ruth one after another; she meets each, chooses, and moves on: בקלילות, בסקרנות, עם הומור.', 'Cards.', 'Brisk conveyor of cards.'),
 13: ('Ruth picks up the phone; the game\'s first card is waiting: בואו ננסה. The journey then opens the Inner Voice game.', 'Phone and the game that follows in the journey.', 'Hold on the phone.'),
}

legend1 = ('-40 -40 80 80', voice(0, 0), '<strong>The inner voice.</strong> A small cloud by Ruth\'s head: grey when critical, warming as she keeps kinder thoughts.')
legend2 = ('0 40 342 120', thought_card(171, 100, KIND, 'kind'), '<strong>Thought cards.</strong> Same look as the Inner Voice game, with real thoughts from its deck, so the film leads straight into the game.')
legend3 = ('0 0 342 360', room() + ruth(110, 'stand') + f'<path d="M140 180 H200" stroke="{INK}" stroke-width="3"></path>', '<strong>Arm\'s length.</strong> Distance, not positivity: Ruth steps back from the card before choosing.')
carried = ['<strong>Kept:</strong> Ruth\'s room and phone, Ariel\'s voice, the brain-training idea from session 1.',
           '<strong>New:</strong> the inner-voice character and the thought cards; later thought sessions reuse both.',
           '<strong>Made the same way:</strong> beats on Ariel\'s own pauses, one video with his voice, checked before you see it.']
rows = build(B + 'S04Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 4 · הקול הפנימי',
      'Everyone has an inner voice. Its thoughts aren\'t facts; the game trains noticing a thought, holding it at a healthy distance, and choosing whether to keep it or let it pass.',
      'A little voice follows Ruth around → its thoughts are cards, some warm, some grey → a grey one taken as fact turns heavy → she steps back and chooses → harsh ones float off, kind ones warm the voice → into the game.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
