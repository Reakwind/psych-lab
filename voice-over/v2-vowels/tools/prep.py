"""Prepare voice-over text: fix known slips, split scenes into sentences, add vowel marks.

Usage: env/bin/python prep.py SCENES_JSON OUT_JSON [S15 S02 ...]   (no names: every script)
Each sentence keeps a plain version and a vowel-marked version, plus the pause that follows it.
"""
import json, re, sys
import torch
from transformers import PreTrainedTokenizerFast
from menaked import Menaked

SCENES, OUT, SCRIPTS = sys.argv[1], sys.argv[2], sys.argv[3:]
MODEL = 'models/menaked'

# Kind of script decides pacing. Practices guide the listener through an exercise as it is spoken
# (breathing, body scan, reflective pauses); everything else is an explainer video.
PRACTICE = {'S03b', 'S15', 'S23', 'S29', 'S33a', 'S33b', 'S43', 'S46', 'S58'}

# Text fixes applied before speaking. Applied to both variants, so only the vowel marks differ.
FIXES = [
    (r'ל3 ספרות', 'לשלוש ספירות'),     # S15: typo, "ספרות" means digits
    (r'ל3 ', 'לשלוש '),
    (r'\b3 נשימות', 'שלוש נשימות'),
    (r'שלוש שתיים אחת', 'שלוש, שתיים, אחת'),   # S03b: count-in needs its commas to land on the beat
    (r'\bACT\b', 'אקט'),                 # said as the English word "act"
    (r'ל-\s*Pacing', 'לפייסינג'),
    (r'\bPacing\b', 'פייסינג'),
    (r'\bGrounding\b', 'גראונדינג'),
    (r'עצמינו', 'עצמנו'),
    (r'ההזדמנה', 'ההזמנה'),               # S16 typo
    (r'כלגיטיימים', 'כלגיטימיים'),        # S48 typo
    (r'תיקף עצמי', 'תיקוף עצמי'),         # S48 typo
    (r'(?<!\.)\.\.(?!\.)', '.'),        # stray double dot, leaving ellipses alone
    (r'מ: ', 'מ'),                       # S02: "להתחיל מ: עכשיו..." is spoken as one word, "מֵעַכְשָׁיו"
    (r'[״"]', ''),                       # quote marks are not spoken
]

# Stems the model gets wrong or reads inconsistently, applied after vowel marks.
# Prefix letters before the stem (ו ה ב כ ל מ ש) keep their own marks.
LEXICON = {
    'אקט': 'אֶקְט',
    'פייסינג': 'פֵּייסִינְג',
    'גראונדינג': 'גְּרָאוּנְדִינְג',
    'אפתיה': 'אַפַּתְיָה',
    'עצירות': 'עֲצִירוֹת',          # the pauses, not constipation
    'מהנים': 'מְהַנִּים',
    'כיוון': 'כִּיוּוּן',
    'תרגול': 'תִּרְגּוּל',
    'תרגולים': 'תִּרְגּוּלִים',
    'מתרגלים': 'מְתַרְגְּלִים',       # "we practise", not "we get used to"
    'נתרגל': 'נְתַרְגֵּל',
    'פרקינסון': 'פֶּרְקִינְסוֹן',
    'מיינדפולנס': 'מַיְינְדְּפוּלַנְס',
    'מוח': 'מוֹחַ',
    'מתג': 'מֶתֶג',                  # the struggle switch
    'מצפן': 'מַצְפֵּן',
    'נוקשות': 'נוּקְשׁוּת',
    'מרפה': 'מְרַפֶּה',
    'תרגולי': 'תִּרְגּוּלֵי',
    'פיזית': 'פִּיזִית',
    'דב': 'דֹּב',                    # the white bear
}
# Whole words the model misreads in context: (word, regex for what follows) -> marked word.
WORD_FIXES = {
    ('במקום', r'(?! אח(?:ד|ר))'): 'בִּמְקוֹם',   # "instead of", unless "in one/another place"
    ('ניתן', ''): 'נִיתֵּן',                  # "we'll let", every time in these scripts
    ('וניתן', ''): 'וְנִיתֵּן',
    ('לקחת', ''): 'לָקַחַת',
    ('ברכות', ''): 'בְּרַכּוּת',              # gently, not blessings
    ('בכפות', ''): 'בְּכַפּוֹת',
    ('חלק', ''): 'חֵלֶק',
    ('לפנות', r'(?= לנו)'): 'לְפַנּוֹת',      # S16: to clear some room
    ('יצא', r'(?= לכם)'): 'יָצָא',
    ('לדבר', r'(?= קטן)'): 'לְדָבָר',
    ('לנשימה', r'(?! אחת)'): 'לַנְּשִׁימָה',  # back to the breath
    ('בשאיפה', ''): 'בַּשְּׁאִיפָה',
    ('בצד', ''): 'בַּצַּד',
}
# Single slips found in the read-through: 'SCRIPT PART.SENTENCE' -> {plain word: marked word}.
OVERRIDES = {
    'S03a 3.1': {'נוח': 'נוֹחַ'},
    'S04 9.0': {'שנאמץ': 'שֶׁנְּאַמֵּץ'},
    'S07 4.1': {'תפגעו': 'תִּיפָּגְעוּ'},
    'S08 13.0': {'תתרגלו': 'תְּתַרְגְּלוּ'},
    'S09 7.1': {'סבבה': 'סַבַּבָּה'},
    'S10 8.1': {'רוצה': 'רוֹצֶה'},
    'S10 12.0': {'ויציבות': 'וְיַצִּיבוּת'},
    'S14 1.0': {'שנהיה': 'שֶׁנִּהְיָה'},
    'S14 11.1': {'שנעשה': 'שֶׁנַּעֲשֶׂה'},
    'S16 2.0': {'ההזמנה': 'הַהַזְמָנָה'},
    'S16 9.1': {'רוצה': 'רוֹצֶה'},
    'S25 20.0': {'שתרגל': 'שֶׁתִּרְגֵּל'},
    'S28 14.0': {'ולמוסחות': 'וּלְמוּסָחוּת'},
    'S29 15.1': {'מצאו': 'מִצְאוּ'},
    'S34 5.0': {'לקצת': 'לִקְצָת', 'יצופו': 'יָצוּפוּ'},
    'S34 14.0': {'תיזכרו': 'תִּיזָּכְרוּ'},
    'S37 9.0': {'למה': 'לְמָה'},
    'S37 13.0': {'חזרו': 'חִזְרוּ'},
    'S43 2.0': {'שתחקרו': 'שֶׁתַּחְקְרוּ'},
    'S43 5.0': {'למח': 'לַמֹּחַ'},
    'S43 7.1': {'לרדאר': 'לָרָדָאר'},
    'S43 16.0': {'לממש': 'לְמַמָּשׁ'},
    'S45 2.0': {'לעצמך': 'לְעַצְמֵךְ'},
    'S46 3.0': {'שיקר': 'שֶׁיָּקָר'},
    'S48 3.1': {'כלגיטימיים': 'כִּלֶגִיטִימִיִּים'},
    'S48 12.0': {'תיקוף': 'תִּיקּוּף'},
    'S64 0.2': {'מרפות': 'מַרְפּוֹת'},
    'S65 3.1': {'באורח': 'בָּאוֹרֵחַ'},
    'S65 14.0': {'למבוכה': 'לַמְּבוּכָה'},
    'S70 0.0': {'מכווץ': 'מְכֻוָּץ'},
    'S76 17.1': {'מקווה': 'מְקַוָּה'},
    'S99 9.1': {'פספסתם': 'פִּסְפַסְתֶּם'},
}

QAMATS_QATAN = 'ׇ'
HOLAM = 'ֹ'
MARKS = '[ְ-ׇ]*'
BARE = '(?![ְ-ׇ])'
FULL = '[ְ-ׇ]*?[ֱ-ָֹֻ]'    # a letter's marks include a full vowel (in any mark order)


def full_spelling(text):
    """The model marks o/u on the letter before a vowel-letter ו (קֹושִׁי); the voice expects
    them on the ו itself (קוֹשִׁי, קוּפְסָה)."""
    text = re.sub('ֹ(וֹ)', r'\1', text)          # doubled holam
    text = re.sub(f'ֹו{BARE}', 'וֹ', text)
    text = re.sub(f'ֻו{BARE}', 'וּ', text)
    return text


def apply_lexicon(text):
    start = '(?<![\u0590-\u05FF])'
    for stem, rep in LEXICON.items():
        pat = ''.join(c + MARKS for c in stem)
        text = re.sub(f'{start}((?:[והבכלמש]{MARKS}){{0,3}}){pat}(?![\u0590-\u05FF])', lambda m: m.group(1) + rep, text)
    for (word, after), rep in WORD_FIXES.items():
        pat = ''.join(c + MARKS for c in word)
        after = re.sub('([א-ת])', lambda m: m.group(1) + MARKS, after)   # the following words carry marks too
        text = re.sub(f'{start}{pat}(?![\u0590-\u05FF]){after}', rep, text)
    return text


def conj_vav(text):
    """"And" is וּ before a letter with sheva and before ב מ פ (וּתְנוּ, וּבַבַּיִת), and וְ before
    any other letter with a full vowel (וְקַלָּה, not וּקַלָּה)."""
    text = re.sub(f'(?<![\u0590-\u05FF])וְ(?=[בפמ]|[א-ת]{MARKS}ְ)', 'וּ', text)
    return re.sub(f'(?<![\u0590-\u05FF])וּ(?=[אגדהזחטיכלנסעצקרשת]{FULL})', 'וְ', text)


def prefix_sheva(text):
    """ל ב כ before a letter with a full vowel take sheva: לְמַחֲשָׁבוֹת, not לִמַחֲשָׁבוֹת.
    (A dagesh in that letter means a real hiriq, as in לִמֵּד, so those are left alone.)"""
    return re.sub(f'(?<![\u0590-\u05FF])((?:[וש]{MARKS})?[לבכ]ּ?)ִ(?=[א-ת](?![ְ-ׇ]*ּ){FULL})', r'\1ְ', text)


def override(text, fixes):
    for plain, rep in fixes.items():
        pat = ''.join(c + MARKS for c in plain)
        text, n = re.subn(f'(?<![\u0590-\u05FF]){pat}(?![\u0590-\u05FF])', rep, text)
        assert n, (plain, text)
    return text


def fix(text):
    for pat, rep in FIXES:
        text = re.sub(pat, rep, text)
    return re.sub(r'\s+', ' ', text).strip()


def split(text):
    """Sentences end at . ? ! or an ellipsis; a colon before a list or quote stays inside."""
    parts = re.findall(r'.+?(?:\.\.\.|…|[.?!]+)(?=\s|$)|.+$', text)
    return [p.strip() for p in parts if p.strip()]


def pause_after(sentence, practice):
    base = 0.95 if practice else 0.6
    if sentence.endswith(('...', '…')):
        return base + 0.45
    if sentence.endswith('?'):
        return base + 0.25
    return base


def main():
    # transformers 5 rebuilds BertTokenizer as word pieces; the model needs the character-level file
    tok = PreTrainedTokenizerFast(tokenizer_file=f'{MODEL}/tokenizer.json', unk_token='[UNK]', cls_token='[CLS]',
                                  sep_token='[SEP]', pad_token='[PAD]', mask_token='[MASK]')
    model = Menaked.from_pretrained(MODEL, use_safetensors=True).eval()
    data = json.load(open(SCENES, encoding='utf-8'))
    out = {}
    for s in SCRIPTS or list(data):
        info = data[s]
        practice = s in PRACTICE
        scenes = []
        for sc in info['scenes']:
            sents = split(fix(sc['t']))
            marked = model.predict(sents, tok)
            items = []
            for j, (plain, nq) in enumerate(zip(sents, marked)):
                nq = nq.replace(QAMATS_QATAN, HOLAM)   # the voice reads qamats qatan unreliably
                nq = prefix_sheva(conj_vav(apply_lexicon(full_spelling(nq))))
                nq = override(nq, OVERRIDES.get(f'{s} {len(scenes)}.{j}', {}))
                items.append({'plain': plain, 'marked': nq, 'pause': pause_after(plain, practice)})
            scenes.append({'orig': sc['t'], 'rate': sc.get('rate'), 'hold': sc.get('hold', 0), 'sents': items})
        out[s] = {'who': info['who'], 'practice': practice, 'scenes': scenes}
    json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


main()
