# Session 32 storyboard: Ruth's words. Unplanned conversations about Parkinson's catch her off guard; she decides whether, with whom and how much to share,
# prepares a few short sentences on cards, and shows close people the difference between how things look from outside and feel inside.
import sys
sys.path.insert(0, '.')
from sb_s25to37_kit import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S32.dc.html')
assert len(times) == 18

FA = '#7FB48F'; FB = '#B07AA1'

def guest(x, col):
    """A friend of Ruth's (sessions 5 and 12), standing."""
    return friend(x, col)

def seated_pair(rx=110, fx=250):
    """Ruth in her armchair and a friend facing her across the tea table."""
    return f'<g transform="translate({rx - 160} 0)">{chair()}{ruth(160)}</g>' + \
           f'<g transform="translate({fx + 160} 0) scale(-1 1)">{chair()}{ruth(160).replace(PLUM, FA)}</g>' + mug(rx + 70, 296)

def card(x, y, text, w=150, warm=True):
    """One of Ruth's word cards."""
    return (f'<rect x="{x - w / 2}" y="{y - 22}" width="{w}" height="44" rx="8" fill="{"#FFE9B8" if warm else "#FFFFFF"}" stroke="{INK}" stroke-width="2"></rect>'
            f'<text x="{x}" y="{y + 4}" text-anchor="middle" font-size="9.5" font-weight="600" fill="{INK}" direction="rtl">{html.escape(text)}</text>')

def stack(x, y, n):
    return ''.join(f'<rect x="{x - 20 + i * 2}" y="{y - 14 - i * 3}" width="40" height="28" rx="4" fill="#FFE9B8" stroke="{INK}" stroke-width="1.5"></rect>' for i in range(n))

def fan(x, y, n):
    return ''.join(f'<rect x="{x - 18}" y="{y - 40}" width="36" height="50" rx="5" fill="#FFE9B8" stroke="{INK}" stroke-width="1.5" transform="rotate({(i - (n - 1) / 2) * 14} {x} {y + 20})"></rect>' for i in range(n))

def say(x, y, text, w=None):
    return bubble(x, y, text, w=w, size=12)

def dial_sb(x, y, k):
    import math
    a = math.radians(-150 + 60 * k)
    return (f'<circle cx="{x}" cy="{y}" r="26" fill="#FFFFFF" stroke="{INK}" stroke-width="2.5"></circle>'
            f'<line x1="{x}" y1="{y}" x2="{x + 18 * math.cos(a):.1f}" y2="{y + 18 * math.sin(a):.1f}" stroke="{INK}" stroke-width="3" stroke-linecap="round"></line><circle cx="{x}" cy="{y}" r="4" fill="{AMBER}"></circle>')

def split(right, left):
    return (f'<svg x="171" y="0" width="171" height="360" viewBox="171 0 171 360">{right}</svg><svg x="0" y="0" width="171" height="360" viewBox="0 0 171 360">{left}</svg>'
            f'<line x1="171" y1="0" x2="171" y2="360" stroke="{INK}" stroke-width="3"></line>')

def head_inside(lit=True):
    o = (f'<rect width="171" height="360" fill="#E6EFEC"></rect><circle cx="86" cy="190" r="70" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle>'
         f'<path d="M20 190 C20 120 60 110 86 110 C120 110 150 130 154 170 C120 150 90 150 60 160 C40 170 30 190 34 230Z" fill="#C8CCD2"></path>'
         f'<ellipse cx="86" cy="170" rx="40" ry="28" fill="#2F3E44"></ellipse>')
    if lit: o += f'<circle cx="86" cy="168" r="14" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>'
    return o

ROOM = room() + chair()
S = {}
S[1] = (room(door_open=True) + chair() + ruth(150, mood='flat') + guest(282, FA) + lbl(171, 40, 'מפגש 32 · איך לתקשר עם אחרים על פרקינסון', fill='#E3F4F0', size=11)
        + lbl(171, 90, 'שיחות שלא תכננתם לנהל', size=12))
S[2] = (ROOM + ruth(150) + tremor(168, 262) + guest(250, FA) + guest(300, FB) + say(272, 120, 'מה קרה?') + say(80, 110, 'הכול בסדר?')
        + f'<path d="M296 186 q8 -4 8 6" stroke="{INK}" stroke-width="2" fill="none"></path>' + lbl(300, 150, '?', size=12))
S[3] = (ROOM + ruth(150, mood='flat') + f'<g opacity=".45">{guest(250, FA)}{guest(300, FB)}</g>'
        + thought_card(171, 70, 'מה אני רוצה להגיד?', 'kind') + thought_card(171, 116, 'כמה להסביר?', 'kind') + thought_card(171, 162, 'לדבר על זה עכשיו?', 'kind'))
S[4] = (ROOM + ruth(150, mood='flat') + lbl(250, 110, 'מבוכה', size=11) + lbl(270, 150, 'חשש', size=11) + lbl(80, 110, 'כעס', size=11) + lbl(70, 150, 'תסכול', size=11)
        + lbl(171, 40, 'לא תמיד פשוט', fill='#E3F4F0'))
S[5] = (ROOM + ruth(150) + glow(150, 240, 60, 70) + say(250, 130, '… ?! …') + lbl(171, 40, 'התחושות האלה מובנות', fill='#FFF1CC') + lbl(171, 300, 'לא קל למצוא מילים בזמן אמת', size=11))
S[6] = (land(sun=True) + stones(PATH) + ruth(171, 'stand', 'calm') + pack(196, 236) + lbl(250, 200, 'פרקינסון', size=11)
        + lbl(171, 40, 'לא חייבים להסביר לכל אחד', fill='#E3F4F0', size=12) + lbl(171, 90, 'משהו שמתמודדים איתו, לא משהו שמגדיר אתכם', size=10))
S[7] = (ROOM + ruth(110) + dial_sb(230, 110, 1) + dial_sb(290, 160, 2) + dial_sb(230, 210, 0) + stack(250, 290, 3)
        + lbl(171, 40, 'אתם מחליטים: אם לשתף · את מי · וכמה', fill='#E3F4F0', size=11) + lbl(250, 330, 'מחשבה מראש', size=11))
S[8] = (room() + seated_pair() + stack(180, 278, 3) + card(171, 110, 'הפרקינסון משפיע על הקול שלי…', 200) + lbl(171, 40, 'להסביר את מה שרלוונטי לרגע', fill='#E3F4F0', size=12))
S[9] = (room() + seated_pair() + stack(180, 278, 4) + card(171, 110, 'תודה ששאלת, אבל לא עכשיו…', 200) + lbl(171, 40, 'להציב גבול', fill='#E3F4F0'))
S[10] = split(room() + chair() + ruth(250) + guest(320, FA), head_inside()) + lbl(256, 40, 'מבחוץ', size=12) + lbl(86, 40, 'מבפנים', size=12) + lbl(171, 330, 'עם הקרובים צריך להסביר יותר', fill='#E3F4F0', size=11)
S[11] = (split(room(door_open=True) + chair() + ruth(250, mood='flat') + guest(310, FB), head_inside() + block(86, 300, 60, 30))
         + lbl(256, 80, 'עצלנות?', size=11) + strike(256, 80, 60) + lbl(86, 80, 'תנועה איטית', size=11) + lbl(171, 40, 'וזה לא המצב', fill='#FFF1CC', size=12))
S[13] = (room() + seated_pair() + stack(180, 278, 5) + card(171, 90, 'אני כן רוצה לבוא. פשוט לוקח לי יותר זמן…', 220) + card(171, 140, 'אני מקשיבה, גם אם לא רואים על הפנים', 220)
         + lbl(171, 40, 'הסבר קטן', fill='#E3F4F0'))
S[14] = (room() + seated_pair() + stack(180, 278, 6) + card(171, 90, 'תנו לי עוד כמה שניות', 180) + card(171, 140, 'אם לא שמעתם, תגידו לי', 180) + hourglass(300, 110)
         + lbl(171, 40, 'מה יעזור לכם להשתתף', fill='#E3F4F0', size=12))
S[15] = (room() + seated_pair() + glow(250, 240, 40, 50) + f'<path d="M250 200 C236 190 238 176 250 184 C262 176 264 190 250 200Z" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>'
         + lbl(171, 40, 'ממקום אוהב', fill='#FFF1CC'))
S[16] = (ROOM + ruth(150) + guest(230, FA) + mug(200, 250) + arrow(230, 230, 205, 248, AMBER)
         + lbl(171, 40, 'לא כל קושי דורש עזרה', fill='#E3F4F0', size=12) + lbl(171, 90, 'ולא כל עזרה באמת עוזרת', size=12))
S[17] = (ROOM + ruth(150, mood='happy') + guest(270, FA) + say(110, 120, 'כאן אשמח לעזרה') + lbl(171, 40, 'מתי · ואיך', fill='#E3F4F0'))
S[18] = (ROOM + ruth(150, mood='happy') + fan(150, 150, 6) + guest(250, FA) + guest(300, FB)
         + lbl(171, 40, 'לאט לאט מוצאים את המילים', fill='#FFF1CC', size=12) + lbl(80, 220, 'מובנים', size=11) + lbl(270, 100, 'גבולות', size=11) + lbl(270, 300, 'תמיכה', size=11))

def heart_sb(x, y):
    return f'<path d="M{x} {y + 12} C{x - 22} {y} {x - 14} {y - 18} {x} {y - 7} C{x + 14} {y - 18} {x + 22} {y} {x} {y + 12}Z" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>'

S[12] = (split(room() + chair() + ruth(250, mood='flat') + guest(310, FA) + say(300, 130, '…'), head_inside() + heart_sb(120, 150))
         + lbl(256, 80, 'חוסר עניין?', size=11) + strike(256, 80, 70) + lbl(86, 80, 'האטה בדיבור', size=11) + lbl(171, 40, 'וזה גם לא המצב', fill='#FFF1CC', size=12))

ACTS = [
  (1, 'Act 1 · Caught off guard', [1, 2, 3], 'Friends drop in. One notices the tremor, one can\'t hear Ruth, and then the familiar "is everything okay?". Time freezes while Ruth\'s three questions hang over her.'),
  (2, 'Act 2 · Feelings, and a choice', [4, 5, 6, 7], 'Embarrassment, worry, anger, frustration: all understandable. On her path, Parkinson\'s is the backpack she carries, not who she is. She turns the dials (whether, with whom, how much) and writes a few cards in advance.'),
  (3, 'Act 3 · What to say', [8, 9], 'Over tea she uses her cards: explain what matters right now (the voice), or set a boundary.'),
  (4, 'Act 4 · Outside and inside', [10, 11, 12, 13, 14], 'With close people the frame splits: how it looks from outside and how it feels inside (session 2\'s head cutaway). Slowness is not laziness; a still face is not lack of interest. Small sentences clear it up and say what helps.'),
  (5, 'Act 5 · Help that helps', [15, 16, 17], 'A friend rushes in out of love and does it for Ruth. Ruth tells her when she wants help, and how.'),
  (6, 'Act 6 · Finding the words', [18], 'Not knowing what to say is fine. Little by little Ruth\'s stack of cards grows into a handful of her own words: understood, boundaries kept, support her way.'),
]
SHOT = {
 1: ('Ruth in her armchair; the door opens and a friend comes in: a conversation she didn\'t plan. Title: מפגש 32 · איך לתקשר עם אחרים על פרקינסון. Tag: שיחות שלא תכננתם לנהל.', 'Room, the open door (sessions 1, 12), friends a and b (5, 12).', 'Door swings open on "להכניס".'),
 2: ('Three quick beats: Ruth\'s hand trembles, friend b asks "מה קרה?"; friend a cups her ear (can\'t hear); then a bubble: "הכול בסדר?".', 'Tremor marks (3a, 28–29); speech bubbles (12).', 'A bubble on each question.'),
 3: ('Everything else pauses (friends hold still, slightly faded); three thought cards stack over Ruth: מה אני רוצה להגיד? · כמה להסביר? · מתחשק לי לדבר על זה עכשיו?', 'Thought cards (4).', 'Cards drop on each question.'),
 4: ('Closer on Ruth: four feelings come up around her, two and two, as her face changes: מבוכה · חשש, then כעס · תסכול. Tag: לא תמיד פשוט.', 'Same room.', 'A tag on each word.'),
 5: ('A warm glow settles on her (התחושות האלה מובנות); a speech bubble tries to form but holds only jumbled marks: לא תמיד קל למצוא את המילים בזמן אמת.', 'Warm glow (5–7).', 'Bubble fizzles.'),
 6: ('On her path of stones, Ruth with her backpack: לא חייבים להסביר לכל אחד. A tag on the backpack: פרקינסון; then: משהו שמתמודדים איתו, לא משהו שמגדיר אתכם.', 'Path and backpack (1).', 'Tag clips to the pack.'),
 7: ('Back in the chair: three dials turn on their words, אם לשתף · את מי · וכמה (אתם מחליטים). Then a small stack of blank cards: she writes a few words ahead of time: מחשבה מראש · קצת יותר מוכנים.', 'The dial (kit); the word cards are new and run to the end.', 'Each dial turns on its word.'),
 8: ('Tea with friend a. Ruth draws a card and says it, as a speech card: "הפרקינסון משפיע על הקול שלי, אז יכול להיות שתצטרכו לבקש ממני לחזור על משהו." Tag: להסביר את מה שרלוונטי לרגע הזה.', 'Two armchairs and the tea table (12).', 'Card flips up into a speech card.'),
 9: ('Another card, a calm raised hand: "תודה ששאלת, אבל אני מעדיפה לא לדבר על זה עכשיו." Tag: להציב גבול. The friend nods.', 'Same.', 'Card on "תודה".'),
 10: ('The frame splits: מבחוץ (right) — Ruth as her friend sees her; מבפנים (left) — the head cutaway from session 2. עם הקרובים, צריך להסביר יותר.', 'Head cutaway, spark-maker bulb (2).', 'Split wipes open on "מבחוץ".'),
 11: ('Outside: the friend waits at the open door while Ruth gets up slowly; a question tag: חוסר רצון? עצלנות? Inside: the bulb is lit — she wants to come — but the first move is heavy: תנועה איטית · קושי להתחיל. On "וזה לא המצב" the outside tags are struck.', 'Bulb (2), heavy blocks (2).', 'Strike on "לא המצב".'),
 12: ('Outside: Ruth\'s face looks still while the friend talks: חוסר עניין? Inside: her attention and warmth are on the friend: האטה בדיבור · שינוי ביכולת ההבעה. Struck: וזה גם לא המצב.', 'Same split.', 'Strike again.'),
 13: ('The split closes; at tea Ruth plays two cards: "אני כן רוצה לבוא. פשוט לוקח לי יותר זמן להתארגן." · "אני מקשיבה, גם אם לא תמיד רואים את זה על הפנים שלי." The friend\'s question cloud pops: הסבר קטן מונע הרבה אי־הבנות.', 'Cards, question cloud (12).', 'Cloud pops after the second card.'),
 14: ('Two more cards, with small icons: an hourglass, "אם לוקח לי יותר זמן לענות, תנו לי עוד כמה שניות."; an ear, "אם לא שמעתם אותי, אני מעדיפה שתגידו לי ואני אחזור על זה."', 'Hourglass (3a), ear badge (12).', 'Each card on its quote.'),
 15: ('The friend, warmly: a heart rises from her: לפעמים חוסר ההבנה יכול להגיע ממקום אוהב.', 'Heart badge (12).', 'Heart floats up.'),
 16: ('Ruth reaches for her mug; the friend hurries over and lifts it for her. Tags: לא כל קושי דורש עזרה · ולא כל עזרה באמת עוזרת.', 'Mug (5).', 'Friend rushes in on "למהר".'),
 17: ('Ruth raises a hand and speaks; the friend steps back and waits; Ruth takes the mug herself and gestures where she does want a hand: מתי · ואיך.', 'Same.', 'Friend steps back on "מתי".'),
 18: ('Ruth fans out her handful of cards, both friends beside her; three warm tags: להרגיש מובנים · לשמור על הגבולות · לקבל תמיכה. Opening tag: לאט לאט אפשר למצוא את המילים.', 'Cards, friends, the room.', 'Cards fan out; tags on their words.'),
}
legend1 = ('0 0 342 360', ROOM + ruth(150) + stack(220, 290, 4), '<strong>Ruth\'s word cards.</strong> New: a small stack she prepares (shot 7); each sentence she uses becomes a card; at the end she holds a handful of her own words.')
legend2 = ('0 0 342 360', split(room() + chair() + ruth(250), head_inside()), '<strong>Outside / inside.</strong> A split frame: how it looks to others (right) and how it feels inside, using session 2\'s head cutaway and its lit bulb.')
legend3 = ('0 0 342 360', room() + seated_pair(), '<strong>Tea with a friend.</strong> Session 12\'s two armchairs and tea table: where the conversations happen.')
carried = ['<strong>Kept:</strong> Ruth\'s room, door and armchair, friends a and b, the tea table and speech bubbles (5, 12), thought cards (4), the path and backpack (1), the head cutaway and bulb (2), the dial, hourglass, mug and tremor marks.',
           '<strong>Wording on cards:</strong> the quotes are the narration\'s, word for word; Ruth\'s boundary card uses the feminine מעדיפה (the narration says מעדיף) because she is the speaker.',
           '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S32Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 32 · איך לתקשר עם אחרים על פרקינסון',
      'Parkinson\'s brings conversations Ruth didn\'t plan. She doesn\'t owe everyone an explanation: she decides whether, with whom and how much, and a few sentences prepared in advance help. With close people, a small explanation of outside versus inside clears up misunderstandings and says what help she wants.',
      'Friends arrive with questions → Ruth freezes with her own questions → the feelings are understandable → Parkinson\'s is her backpack, not her → she turns the dials and writes cards → over tea she uses them → a split frame shows outside versus inside → a friend helps too fast; Ruth says when and how → she holds a handful of her own words.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
set_height(B + 'S32Story.dc.html', 5240)
