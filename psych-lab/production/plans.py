"""Individual shot plans. On-screen words are selected from the final narration."""

def obj(kind, key=None, x=760, y=330, s=1, **kwargs):
    return dict(kind=kind, key=key or kind, x=x, y=y, s=s, **kwargs)


def label(text, y=80, x=540, kind='cool', width=900, **kwargs):
    return dict(text=text, x=x, y=y, kind=kind, width=width, **kwargs)


def bottom(text, **kwargs):
    return label(text, y=930, kind='warm', **kwargs)


def side(text, **kwargs):
    return label(text, y=230, x=760, width=540, **kwargs)


def shot(description, objects=(), labels=(), **kwargs):
    return dict(description=description, objects=list(objects), labels=list(labels), **kwargs)


def cfg(idea, sound_off, shots, acts=None, **kwargs):
    return dict(idea=idea, sound_off=sound_off, shots=shots, acts=acts, **kwargs)


PLANS = {}
voice = lambda warm=0, **kw: obj('voice',**dict({'s':1.7,'warm':warm},**kw))
rain = lambda **kw: obj('rain',**dict({'x':730,'y':310,'s':1.25},**kw))
friend = lambda **kw: obj('friend',**dict({'x':790,'y':860,'s':.8},**kw))
breath = lambda **kw: obj('breath',**dict({'x':780,'y':430,'s':.95},**kw))
tracker = lambda step=0: obj('tracker',x=540,y=230,s=.8,step=step)

PLANS['S48'] = cfg(
 'Ruth learns to acknowledge a difficult feeling as understandable, through the child with the broken toy and then three practical steps.',
 'A harsh voice adds pain. The same broken toy receives two different responses. A warm response makes room for sadness; it does not repair the toy or excuse every action. Ruth then identifies, understands and validates her own experience.',
 [
  shot('A recent hard moment returns as rain above Ruth; the room stays present.',[rain()],[label('נסו להיזכר לרגע'),side('קושי, אכזבה או תסכול')],character={'mood':-.4}),
  shot('Two ways of answering the same feeling: warm voice on the right, harsh voice on the left.',[voice(.9,x=800,y=300),obj('voice','critic',x=560,y=300,s=1.5,warm=0)],[label('איך דיברתם לעצמכם באותו רגע?')],character={'mood':-.2}),
  shot('The critical voice looms over the rain; Ruth remains fully readable.',[voice(0,x=760,y=280),rain(y=400)],[label('מתחילים לבקר את עצמנו')],character={'mood':-.6}),
  shot('Feeling, thought and bodily sensation each receive room, in right-to-left order.',[obj('heart',x=890,y=330,s=.7),obj('thought',x=710,y=330,s=.7),obj('body',x=530,y=330,s=.7)],[label('תיקוף עצמי'),bottom('כלגיטימיים והגיוניים בסיטואציה מסוימת')],character={'mood':.15}),
  shot('A child and the broken toy remain on the floor while the first, dismissive answer arrives above them.',[obj('child',x=730,y=890,s=.85,mood=-.8),obj('toy',x=650,y=920,s=.65,broken=1),voice(0,x=810,y=260)],[label('זה רק צעצוע, מה אתה עצוב, מה אתה עושה דרמה?',kind='thought',width=850)],character={'pose':'stand','x':300,'y':742,'s':1,'mood':-.2}),
  shot('The toy is still broken. The same child receives a warm acknowledgement instead.',[obj('child',x=680,y=890,s=.85,mood=-.3),obj('toy',x=650,y=920,s=.65,broken=1),voice(1,x=820,y=300)],[label('אני רואה שאתה עצוב.'),bottom('זה הגיוני שאתה בוכה, הצעצוע הזה היה חשוב לך.')],character={'pose':'bend','x':460,'mood':.6}),
  shot('The broken toy and the child persist; a warm circle makes room around the child.',[obj('child',x=680,y=890,s=.85,mood=-.2),obj('toy',x=650,y=920,s=.65,broken=1),obj('attention','space',x=680,y=730,s=1.1),voice(1,x=820,y=300)],[label('הצעצוע שבור ויש עצב'),bottom('יש מקום למה שהילד מרגיש')],character={'pose':'bend','x':460,'mood':.4}),
  shot('Ruth and the child stand together at the door; the feeling is acknowledged while action is still possible.',[obj('child',x=680,y=890,s=.85,mood=.1),voice(1,x=820,y=300)],[label('זה לא אומר להצדיק התנהגות כזאת או אחרת'),bottom('זה הגיוני שאתה מפחד עכשיו')],world='roomOpen',character={'pose':'stand','x':460,'mood':.4}),
  shot('The child steadies. Warmth carries back to Ruth and her own inner voice.',[voice(1,x=760,y=300),obj('heart',x=730,y=580,s=.8)],[label('תיקוף עצמי יכול לעזור לנו להתמודד'),bottom('בצורה שקולה וגמישה יותר')],character={'mood':.6}),
  shot('Two familiar people stay nearby while Ruth feels the difficulty of being a burden.',[friend(x=720),obj('friendB',x=920,y=860,s=.8),rain(y=310)],[label('תחושה שאנחנו מכבידים על האנשים סביבנו')],character={'mood':-.4}),
  shot('A supportive voice answers the same pain. It acknowledges the feeling without erasing it.',[voice(1,x=790,y=300),rain(y=430,s=.75)],[label('זה הגיוני וטבעי שהתחושה הזאת עולה בי עכשיו.',kind='warm'),bottom('אני באמת מתמודד עם מצב לא פשוט')],character={'mood':.2}),
  shot('Ruth can acknowledge pain and still pick up the phone or stay with a friend.',[obj('phone',x=450,y=720,s=1.3),friend(),voice(1,x=780,y=300)],[label('ועדיין יש לנו אפשרות לבחור'),bottom('לבקש עזרה או להישאר בקשר')],character={'mood':.5}),
  shot('The familiar path introduces three stones, numbered from the right.',[tracker(0)],[label('איך בפועל מתרגלים תיקוף עצמי?'),bottom('שלושה צעדים')],world='path',character={'pose':'stand','x':430,'y':742,'s':.95,'mood':.4}),
  shot('The first stone lights up. Ruth names what is happening now.',[tracker(0),rain(y=430,s=.8)],[label('לזהות'),side('מה קורה לי עכשיו?'),bottom('אני מאוכזב.')],character={'mood':0}),
  shot('The second stone lights. The feeling is placed beside its understandable context.',[tracker(1),obj('heart',x=760,y=430,s=.8)],[label('לנסות להבין'),bottom('זה היה חשוב לי.')],character={'mood':.3}),
  shot('The third stone lights. The warm inner voice acknowledges the feeling as something that can be present and pass.',[tracker(2),voice(1,x=760,y=400)],[label('להגיד לעצמינו משפט מתקף'),bottom('זה הגיוני שאני מרגיש ככה.')],character={'mood':.5}),
  shot('The same supportive voice settles beside Ruth; the room and all three steps remain familiar.',[tracker(2),voice(1,x=760,y=400),obj('heart',x=720,y=640,s=.65)],[label('עם הזמן זה הופך להיות יותר טבעי'),bottom('המבט החומל כלפי עצמינו מחלחל פנימה')],character={'mood':.7}),
 ], acts=[(1,3,'A hard moment and its inner voice'),(4,4,'Validation'),(5,9,'The child and the broken toy'),(10,12,'Making room for our own experience'),(13,17,'Three steps')])

PLANS['S19'] = cfg(
 'The familiar tools can accompany the end of the day. They offer room for rest without turning sleep into a performance task.',
 'The day line slows into evening. Ruth chooses an optional familiar tool, settles in bed, and stays there; no alarm, score or forced sleep result appears.',
 [
  shot('Ruth carries familiar tools into different moments of her day.',[obj('tools',x=690,y=290,s=.85)],[label('את התרגולים שאתם מכירים מהאפליקציה')]),
  shot('A small breath circle provides a quiet pause in the same room.',[breath(),obj('clock',x=830,y=190,s=.8)],[label('לעצור לרגע'),bottom('להקדיש כמה דקות לעצמכם')]),
  shot('Evening arrives through the window; the same room remains vivid.',[obj('lamp',x=780,y=640,s=.8)],[label('לקראת השינה')],world='night'),
  shot('Ruth is tired while the thought cloud and rain still hold some of the day.',[obj('thought',x=700,y=330,s=1.1),rain(x=880,y=330,s=.7)],[label('גם כשעייפים, הגוף והראש לא תמיד נחים')],world='night',character={'mood':-.3}),
  shot('A small circle opens around the same difficult experience.',[breath(),obj('thought',x=850,y=250,s=.65)],[label('קצת מקום להירגע')],world='night'),
  shot('The familiar tools are available rather than stacked as tasks.',[obj('tools',x=700,y=330,s=.8),breath(x=740,y=600,s=.7)],[label('נשימה, הרפיה, מיינדפולנס, דמיון מודרך'),bottom('לתת לראש משהו שקט יותר להתמקד בו')],world='night'),
  shot('The clock moves out of the centre; no command or sleep-success meter appears.',[obj('clock',x=850,y=320,s=.8),breath()],[label('שינה והרפיה לא מגיעות לפי פקודה')],world='night'),
  shot('Ruth takes a quiet pause; the clock shrinks to the edge and the breath remains gentle.',[breath(),obj('lamp',x=830,y=650,s=.7)],[label('לא צריך לעשות עוד משהו'),bottom('להתקרב למנוחה בזמן שלהם')],world='night',character={'mood':.4}),
  shot('The choice can belong to early evening or already being in bed.',[obj('bed',x=710,y=500,s=.72),obj('clock',x=800,y=240,s=.65)],[label('מוקדם יותר בערב, ממש לפני השינה')],world='night'),
  shot('The same recording and breath return, making the sequence familiar.',[obj('phone',x=780,y=380,s=1.7),breath(y=620,s=.7)],[label('אפשר לחזור אליו')],world='night'),
  shot('The warm lamp and the familiar voice signal that the day is ending.',[voice(1,x=760,y=330),obj('lamp',x=820,y=680,s=.75)],[label('היום מסתיים. עכשיו אפשר לנוח.')],world='night',character={'mood':.6}),
  shot('A recording is chosen from the familiar phone library.',[obj('phone',x=740,y=420,s=2),obj('moon',x=920,y=290,s=.55)],[label('תרגולים שנוצרו במיוחד לרגע הזה')],world='night'),
  shot('A small sun and a doorway recall daytime practice; the night recording remains available.',[obj('clock',x=760,y=330,s=.8),obj('phone',x=880,y=600,s=1.4)],[label('חוזרים בהדרגה לערנות וממשיכים הלאה')],world='night'),
  shot('The daytime cue recedes. Night practice leaves room to continue resting.',[obj('moon',x=770,y=320,s=.8),obj('bed',x=730,y=570,s=.85)],[label('בתרגולי הלילה, אין לאן למהר')],world='night'),
  shot('Overhead, Ruth remains comfortably supported with a blanket over her legs.',[obj('moon',x=870,y=180,s=.6)],[label('אפשר פשוט להישאר במיטה'),bottom('להמשיך לנוח')],world='mat'),
  shot('The warm, neutral scene remains; no promise of sleep is drawn.',[obj('question',x=840,y=190,s=.55)],[label('לא כל תרגול יעזור לכל אחד, ולא בכל ערב')],world='mat'),
  shot('An optional tool remains to the side without becoming another checklist.',[obj('tools',x=540,y=240,s=.7)],[label('הרפיה היא רק אפשרות אחת שיכולה לעזור')],world='mat'),
  shot('The phone waits within reach; Ruth is free to use it or leave it.',[obj('phone',x=860,y=250,s=1.2)],[label('אם תרצו להיעזר בו')],world='mat'),
  shot('The selected recording and blanket settle into the same quiet, supported posture.',[obj('phone',x=880,y=250,s=1.3)],[label('לתת לעצמכם פשוט להישאר שם')],world='mat'),
  shot('The final shot holds Ruth comfortably; no return-to-alertness animation or performance score.',[],[label('רק כמה דקות שבהן כבר מותר לעשות... פחות.')],world='mat'),
 ], acts=[(1,3,'From the day to evening'),(4,8,'An invitation to rest'),(9,12,'A familiar optional tool'),(13,15,'Daytime and nighttime endings'),(16,20,'Rest without a task')])

for _shot in PLANS['S19']['shots']:
    if _shot.get('world')=='mat':
        _shot['world']='bed'

PLANS['S23'] = cfg(
 'The same skills can travel from a full practice into small ordinary moments. Ruth tries releasing one place, three anchors, and one intentional breath.',
 'The familiar tools become small and portable. The attention marker moves to one tense place, then breath, feet, hands and sound; one breath carries Ruth back into the day.',
 [
  shot('The five familiar tools surround one sustained practice circle.',[obj('tools',x=680,y=300,s=.8),breath(y=600,s=.7)],[label('לא תמיד צריך לעצור הכול'),bottom('לשים לב, לעצור ולווסת')]),
  shot('Ruth encounters the same tools while the kettle warms and while she prepares to go out.',[obj('kettle',x=770,y=470,s=1.1),breath(y=270,s=.65)],[label('רגעים קטנים במהלך היום'),bottom('נשימה אחת בזמן שמחכים שהמים ירתחו')]),
  shot('The familiar tools gather into a compact set within reach.',[obj('tools',x=690,y=400,s=.85)],[label('מיומנויות כיס'),bottom('כלים לרגע')]),
  shot('A pleasant ordinary moment is enough; the room is calm before the skill is used.',[obj('mug',x=780,y=540,s=1.7),breath(y=310,s=.7)],[label('לא צריך לחכות לרגע של לחץ')]),
  shot('The same small circle and tools return with a gentle, repeated rhythm.',[breath(),obj('tools',x=680,y=700,s=.6)],[label('מוכרים ונגישים יותר'),bottom('ככל שחוזרים עליהם')]),
  shot('The three-step tracker appears before the first brief skill.',[tracker(0),obj('body',x=760,y=460,s=1.1)],[label('שלושה כלים לרגע'),bottom('שחרור של מקום אחד')]),
  shot('Ruth pauses in place; a gentle breath remains beside her.',[tracker(0),breath()],[label('רק לשים לב לגוף. ולנשום.')]),
  shot('An attention ring moves from the jaw to shoulders and hands; no new tension scale is invented.',[tracker(0),obj('attention',x=310,y=600,s=.7),obj('hand',x=790,y=430,s=.8)],[label('הלסת, הכתפיים, הידיים או מקום אחר')],character={'mood':-.1}),
  shot('The highlighted place softens a little on the out-breath, without promising total release.',[tracker(0),breath(),obj('attention',x=310,y=600,s=.65)],[label('להשתחרר קצת'),bottom('אפילו בחמישה אחוזים')],character={'mood':.4}),
  shot('The attention ring recedes while Ruth remains ready to continue.',[tracker(0)],[label('ואז פשוט ממשיכים הלאה.')]),
  shot('A small hand-opening and shoulder cue offer the optional movement described in the voice-over.',[tracker(0),obj('hand',x=780,y=430,s=1.05)],[label('תנועה קטנה'),bottom('לפתוח את כפות הידיים')]),
  shot('The second stone lights and three simple bodily anchors become available.',[tracker(1),obj('feet',x=880,y=430,s=.65),obj('hand',x=710,y=430,s=.65),obj('ear',x=540,y=430,s=.65)],[label('שלושה עוגנים')]),
  shot('A comfortable breath starts the settling; no count or forced pace is added.',[tracker(1),breath()],[label('נשימה אחת נוחה')]),
  shot('The attention ring rests on Ruth’s feet and the floor.',[tracker(1),obj('attention',x=370,y=850,s=.5),obj('feet',x=790,y=430,s=1.05)],[label('מגע של כפות הרגליים עם הרצפה')]),
  shot('The attention marker moves gently to her hands.',[tracker(1),obj('attention',x=320,y=720,s=.45),obj('hand',x=790,y=430,s=1.05)],[label('תחושות בכפות הידיים')]),
  shot('The hands recede; the ear and quiet sound cue become the focus.',[tracker(1),obj('ear',x=790,y=430,s=1.05)],[label('לצלילים שסביבנו או לשקט')]),
  shot('The third stone lights; the same breath circle returns.',[tracker(2),breath()],[label('עצירה לנשימה אחת')]),
  shot('Ruth pauses for the single intentional breath, in the same uninterrupted room.',[tracker(2),breath()],[label('נשימה אחת מכוונת')]),
  shot('The breath circle expands along the recorded invitation to let air enter.',[tracker(2),breath()],[label('ניתן לנשימה אחת נוחה להיכנס בתשומת לב')]),
  shot('The same circle contracts gently with the out-breath.',[tracker(2),breath()],[label('וניתן לה לצאת בעדינות')]),
  shot('The circle recedes and Ruth is ready for the next ordinary action.',[tracker(2)],[label('ונמשיך לדבר הבא.')],character={'pose':'stand','mood':.5}),
  shot('All three stones remain together with the familiar tools.',[tracker(2),obj('tools',x=700,y=450,s=.8)],[label('שלוש מיומנויות כיס')]),
  shot('The same portable skill can accompany sitting, standing or resting, with no new exercise invented.',[obj('tools',x=700,y=330,s=.8),obj('body',x=760,y=600,s=.8)],[label('אפשר להתאים את התרגולים לכל סיטואציה')]),
  shot('A small pause joins the flow of the day, then gives way to continuing.',[obj('clock',x=780,y=300,s=.8),breath(y=560,s=.7)],[label('לעצור לכמה רגעים ולהמשיך')],character={'pose':'stand','mood':.5}),
  shot('Ruth takes the same tools forward on her familiar path.',[obj('tools',x=700,y=330,s=.8)],[label('בצורה טבעית וזורמת'),bottom('לדאוג לגוף ולעצמנו')],world='path',character={'pose':'stand','x':430,'s':1,'mood':.6}),
 ],acts=[(1,5,'Skills that travel into the day'),(6,11,'Release one place'),(12,16,'Three anchors'),(17,21,'One intentional breath'),(22,25,'Carry the skills onward')],breath_parts=[(19,.15,.85),(20,.85,.15)])

PLANS['S33a'] = cfg(
 'A physiological sigh is a comfortable first inhale, a small top-up, and an easy longer exhale. Ruth learns the pattern without chasing the biggest possible breath.',
 'An ordinary sigh becomes a three-part wave. The torso cutaway shows the small top-up; Ruth practises with the recorded cues, then the skill returns to everyday life with a clear option to return to natural breathing.',
 [
  shot('An ordinary sigh catches Ruth’s attention.',[breath()],[label('לתפוס את עצמכם נאנחים?')]),
  shot('The breath circle grows, gains one small extra lift, then recedes into a long exhale.',[breath()],[label('שאיפה גדולה כזאת עם עוד שאיפה קטנה בקצה'),bottom('נשיפה ארוכה עם קול')]),
  shot('The spontaneous pattern stays beside Ruth as something the body already does.',[breath(),obj('body',x=800,y=700,s=.65)],[label('הגוף פשוט עושה את זה מעצמו')]),
  shot('The name joins the same familiar breath shape.',[breath()],[label('אנחה פיזיולוגית')]),
  shot('A torso cutaway shows the additional, small expansion of the lungs.',[breath(x=900,y=770,s=.55)],[label('השאיפה הנוספת מגדילה את נפח הנשימה')],world='torso'),
  shot('The same lung and diaphragm illustration relaxes into the out-breath.',[breath(x=900,y=770,s=.55)],[label('הנשיפה הארוכה'),bottom('לשחרר קצת מהמתח')],world='torso'),
  shot('Return to Ruth; a deliberate practice uses the same naturally occurring pattern.',[breath()],[label('עושים אותה באופן מכוון')]),
  shot('The first inhale expands the continuous circle.',[breath()],[label('שאיפה דרך האף')]),
  shot('Without emptying, the same circle receives only a small top-up.',[breath()],[label('מוסיפים עוד שאיפה קטנה')]),
  shot('The circle recedes in the comfortable, longer out-breath.',[breath()],[label('נשיפה ארוכה ונינוחה')]),
  shot('The same pattern allows either route and either audible or quiet sighing.',[breath()],[label('דרך האף או דרך הפה'),bottom('בקול או בשקט')]),
  shot('The torso repeats a modest first breath and a clearly smaller addition.',[breath(x=900,y=770,s=.55)],[label('לא צריך להתאמץ ולהכניס עוד בכוח')],world='torso'),
  shot('The out-breath remains comfortable; it is not drawn empty or strained.',[breath()],[label('אנחנו מחפשים אנחה נוחה')]),
  shot('A small, easy rhythm replaces any effort to fill a giant circle.',[breath(s=.8)],[label('נשימה נעימה שאפשר להמשיך איתה בנוחות')]),
  shot('Ruth settles with support; the camera adopts the familiar overhead practice view.',[breath(x=850,y=200,s=.65)],[label('נמצא תנוחה נוחה')],world='mat'),
  shot('The recorded countdown begins; the circle stays gentle and the posture does not cut.',[breath(x=850,y=200,s=.65)],[],world='mat'),
  shot('The first inhalation follows its actual recording boundary.',[breath(x=850,y=200,s=.65)],[label('ניקח שאיפה')],world='mat'),
  shot('The same breath receives its small second inhalation.',[breath(x=850,y=200,s=.65)],[label('ועוד קצת')],world='mat'),
  shot('Release follows the recorded cue, with a continuous contraction.',[breath(x=850,y=200,s=.65)],[label('ועכשיו נשחרר')],world='mat'),
  shot('The circle continues easily while the narrator allows an exhale through the mouth.',[breath(x=850,y=200,s=.65)],[label('ואפשר גם דרך הפה.')],world='mat'),
  shot('A quiet moment keeps the same posture.',[breath(x=850,y=200,s=.65)],[label('יופי.')],world='mat'),
  shot('Return to Ruth’s room with the small, portable breath cue.',[breath(),obj('tools',x=700,y=720,s=.55)],[label('מיומנות כיס')]),
  shot('The same pattern fits naturally beside an ordinary moment in the room.',[breath(),obj('mug',x=790,y=700,s=1.3)],[label('באופן ספונטני לאורך היום'),bottom('מוכרת ונגישה יותר')]),
  shot('The pacer softens into ordinary breathing; a simple body cue supports returning to comfort.',[breath(s=.8),obj('body',x=800,y=700,s=.65)],[label('סחרחורת או אי־נוחות'),bottom('חוזרים לנשימה הרגילה')]),
  shot('The same seated, comfortable Ruth is ready for the practice.',[breath()],[label('להתרווח קצת, ולהיאנח לרווחה')]),
 ],acts=[(1,4,'The sigh we already know'),(5,7,'A small extra inhale'),(8,14,'Comfort over effort'),(15,21,'Follow the recorded practice'),(22,25,'An optional everyday skill')],
 breath_parts=[(2,.15,.85),(5,.5,.85),(6,.85,.2),(8,.15,.8),(9,.8,1),(10,1,.15),(12,.3,.75),(17,.15,.8),(18,.8,1),(19,1,.15)],count_parts=[(16,['שלוש','שתיים','אחד'])])

PLANS['S33b'] = cfg(
 'The slow, continuous rhythm of waves becomes a light, comfortable breathing rhythm, with no holding and no demand for perfectly equal breaths.',
 'Waves and the circle share one flowing rhythm. Ruth settles, follows the recorded in-and-out practice without cuts, and then adjusts or returns to natural breathing whenever needed.',
 [
  shot('Waves advance and retreat behind Ruth in a slow continuous rhythm.',[breath()],[label('בקצב של הגלים')],world='shore'),
  shot('The wave’s movement carries into a gentle in-and-out circle.',[breath()],[label('נשאף לאט, ננשוף לאט'),bottom('בקצב נשימה איטי וקבוע')],world='shore'),
  shot('The technique name joins the same wave and circle.',[breath()],[label('נשימה קוהרנטית')],world='shore'),
  shot('Breath and heart cues share a visual rhythm without adding medical measurements.',[breath(),obj('heart',x=800,y=720,s=.65)],[label('קצב הנשימה, קצב הלב ולחץ הדם')],world='shore'),
  shot('The continuous rhythm remains beside a calm, supported Ruth.',[breath()],[label('רוגע ותחושת יציבות')],world='shore'),
  shot('Inhale turns smoothly into exhale; no stop sign or held stage is inserted.',[breath()],[label('אין עצירות או החזקות של האוויר')],world='shore'),
  shot('The circle uses a modest amplitude, showing slow need not mean large.',[breath(s=.8)],[label('לא בהכרח נשימה עמוקה או גדולה')],world='shore'),
  shot('Air enters and leaves gradually, illustrated in the familiar torso cutaway.',[breath(x=900,y=770,s=.55)],[label('נשימה קלה ועדינה')],world='torso'),
  shot('Slightly different comfortable breaths remain within one continuous rhythm.',[breath()],[label('פעם ייכנס קצת יותר אוויר, פעם קצת פחות'),bottom('תתנו לבטן ולגוף להחליט')]),
  shot('The circle becomes familiar through repetition; Ruth stays comfortable.',[breath()],[label('תנו לעצמכם זמן להתרגל אליו'),bottom('בסקרנות')]),
  shot('Ruth settles with support, one hand on her belly in the overhead view.',[breath(x=850,y=200,s=.65)],[label('התמקמו בתנוחה שנוחה לכם')],world='mat'),
  shot('The model stays modest, while the narrator explains the demonstration may be stronger.',[breath(x=850,y=200,s=.65)],[label('הנשימה שלכם יכולה להיות עדינה וקלה יותר')],world='mat'),
  shot('The recorded countdown prepares the first inhale; the practice shot remains uncut.',[breath(x=850,y=200,s=.65)],[],world='mat'),
  shot('First inhale, with each spoken count appearing at its recorded onset.',[breath(x=850,y=200,s=.65)],[],world='mat'),
  shot('First exhale, with the recorded counts continuing at the actual pace.',[breath(x=850,y=200,s=.65)],[],world='mat'),
  shot('The next inhale grows from the same circle with no held transition.',[breath(x=850,y=200,s=.65)],[label('פנימה')],world='mat'),
  shot('The next exhale flows directly from it.',[breath(x=850,y=200,s=.65)],[label('החוצה')],world='mat'),
  shot('The final guided inhale uses the same supported posture.',[breath(x=850,y=200,s=.65)],[label('פנימה')],world='mat'),
  shot('The final guided exhale recedes comfortably.',[breath(x=850,y=200,s=.65)],[label('החוצה')],world='mat'),
  shot('The practice rhythm settles without a hard cut.',[breath(x=850,y=200,s=.65)],[label('יופי.')],world='mat'),
  shot('Return to Ruth and the option to adapt; the body cue remains at the centre of the message.',[breath(s=.8),obj('body',x=800,y=700,s=.65)],[label('להקשיב לגוף ולעשות התאמות'),bottom('אין צורך להכריח את הנשימה')]),
  shot('The external pacer recedes, leaving room for natural breathing when needed.',[breath(s=.65),obj('body',x=800,y=700,s=.65)],[label('אם חסר לכם אוויר או שאתם מרגישים סחרחורת'),bottom('עברו לנשימה הטבעית')]),
  shot('The calm wave returns with Ruth; comfort, not a perfect score, closes the film.',[breath(s=.8)],[label('נשימה שמרגישה לכם נעימה'),bottom('כמו קצב הגלים')],world='shore'),
 ],acts=[(1,6,'A continuous wave'),(7,10,'Light and comfortable'),(11,13,'Settle and prepare'),(14,20,'The recorded breathing practice'),(21,23,'Listen and adapt')],
 breath_parts=[(14,.15,.9),(15,.9,.15),(16,.15,.9),(17,.9,.15),(18,.15,.9),(19,.9,.15)],count_parts=[(13,['שלוש','שתיים','אחד']),(14,['פנימה','שתיים','שלוש','ארבע']),(15,['החוצה','שתיים','שלוש','ארבע'])])

PLANS['S34'] = cfg(
 'Trying to force an unwanted thought away can make it take more attention. Ruth explores a second dial: willingness, while the white bear can stay without choosing her actions.',
 'A white bear appears when Ruth tries not to think of it. Attempts to push it away bring it back. Two radio dials distinguish intensity from willingness; Ruth turns toward the rest of her life while the bear remains smaller beside her.',
 [
  shot('A blank thought becomes the white bear as the narrator names it.',[obj('bear',x=760,y=360,s=1.05,cue='דב לבן')],[label('נסו לא לחשוב על דב לבן.')],character={'mood':0}),
  shot('The same bear is clearly there, even though it was not invited.',[obj('bear',x=750,y=380,s=1.2)],[label('כנראה שהדב הלבן כבר שם.')],character={'mood':-.2}),
  shot('The bear grows into more of the available space as attention keeps returning to it.',[obj('bear',x=740,y=430,s=1.65)],[label('אפקט הדב הלבן'),bottom('לחזור ולתפוס יותר מקום')],character={'mood':-.4}),
  shot('A difficult thought and a rain cloud join the bear, illustrating experiences we would rather move away.',[obj('bear',x=690,y=370,s=.9),obj('thought',x=880,y=360,s=.75),rain(x=830,y=590,s=.8)],[label('מחשבות, רגשות וזיכרונות')],character={'mood':-.4}),
  shot('The bear pulls to the centre of attention again instead of disappearing.',[obj('bear',x=650,y=430,s=1.55),obj('attention',x=650,y=430,s=1.35)],[label('תופסים יותר מתשומת הלב שלנו')],character={'mood':-.3}),
  shot('The bear reappears in its familiar place; Ruth notices the return.',[obj('bear',x=760,y=400,s=1.1)],[label('הם פשוט יצופו מחדש')]),
  shot('A radio with two separate knobs appears; the bear stays above it.',[obj('radio',x=730,y=590,s=.8),obj('bear',x=760,y=290,s=.65)],[label('שני כפתורים, כמו ברדיו')]),
  shot('The first knob represents intensity; its position changes while the bear is still present.',[obj('radio',x=730,y=590,s=.8,a0=-25),obj('bear',x=760,y=290,s=.65)],[label('עוצמת החוויה')]),
  shot('The desired reduction does not simply remove the bear; the first knob is not presented as a direct control.',[obj('radio',x=730,y=590,s=.8,a0=5),obj('bear',x=760,y=290,s=.75)],[label('אין לנו שליטה ישירה')],character={'mood':-.1}),
  shot('Attention shifts to the second knob, willingness; the bear does not need to vanish.',[obj('radio',x=730,y=590,s=.8,a1=65),obj('bear',x=760,y=290,s=.75)],[label('הנכונות לחוות'),bottom('לשים לב שהם שם')],character={'mood':.2}),
  shot('The same bear and feeling can be unpleasant without turning willingness into approval.',[obj('radio',x=730,y=590,s=.8,a1=65),obj('bear',x=760,y=290,s=.75)],[label('זה לא אומר שאנחנו אוהבים את מה שאנחנו מרגישים')]),
  shot('Ruth turns toward her phone and connection while the bear remains nearby.',[obj('bear',x=850,y=300,s=.65),obj('phone',x=480,y=710,s=1.4),friend(x=800)],[label('הם לא חייבים להיעלם כדי שאנחנו נוכל להמשיך')],character={'mood':.5}),
  shot('The bear stays to the side; it no longer occupies the whole composition.',[obj('bear',x=890,y=290,s=.6),friend(x=780),obj('mug',x=560,y=720,s=1.1)],[label('הם כבר לא יתפסו את כל הבמה')],character={'mood':.5}),
  shot('The familiar practice tools join the smaller bear, connecting this choice to the program.',[obj('bear',x=870,y=550,s=.65),obj('tools',x=680,y=300,s=.8)],[label('מיינדפולנס, נשימה וחמלה עצמית')]),
  shot('The question changes while Ruth and the bear stay in the same room.',[obj('bear',x=800,y=450,s=.8),obj('radio',x=740,y=730,s=.6,a1=65)],[label('האם אני יכול לתת לזה להיות כאן כרגע, בלי להיאבק?',kind='warm',width=850)],character={'mood':.4}),
  shot('Ruth continues on her path with the bear at the edge; her next action remains hers.',[obj('bear',x=850,y=620,s=.6),obj('compass',x=760,y=280,s=.65)],[label('הוא לא חייב להחליט מה תעשו עכשיו.')],world='path',character={'pose':'stand','x':430,'mood':.6}),
 ],acts=[(1,3,'The bear appears'),(4,6,'The struggle for attention'),(7,11,'Two different dials'),(12,16,'Continue with room for the experience')])

PLANS['S35'] = cfg(
 'Mindfulness can be brought into ordinary moments, with flexibility and choice rather than a demand to pay attention all day.',
 'A picture of formal meditation becomes Ruth’s actual day: warm water, a drink and a familiar person. Attention visits one experience, can wander, and can return to one chosen ordinary activity.',
 [
  shot('The familiar framed meditator represents the common image of mindfulness.',[obj('meditation',x=760,y=430,s=1.2)],[label('נזיר שיושב בשקט')]),
  shot('The framed image becomes smaller while Ruth and her actual room remain central.',[obj('meditation',x=850,y=300,s=.6),obj('mug',x=700,y=640,s=1.8)],[label('מיינדפולנס לא קורה רק בזמן מדיטציה')]),
  shot('Attention opens around one ordinary drink without changing the whole day.',[obj('mug',x=760,y=490,s=2),obj('attention',x=760,y=490,s=.8)],[label('תשומת לב מכוונת'),bottom('לכאן ועכשיו')]),
  shot('The everyday form of the practice receives its name; the drink stays.',[obj('mug',x=760,y=490,s=2)],[label('קשיבות בחיי היום־יום')]),
  shot('The attention circle gently returns to an activity already happening.',[obj('mug',x=760,y=490,s=2),obj('attention',x=760,y=490,s=.8)],[label('משהו שאנחנו כבר עושים'),bottom('סבלנות, נוכחות, פתיחות וסקרנות')]),
  shot('The spoken examples appear on their own cues: hands, drink, sound and a familiar person.',[obj('hand',x=560,y=300,s=.65,cue='שטיפת ידיים'),obj('mug',x=740,y=300,s=1.3,cue='משקה'),obj('ear',x=920,y=300,s=.65,cue='צלילים'),friend(x=810,cue='אדם שחשוב לנו')],[label('לרגעים רגילים',cue='למשל')]),
  shot('A single breath and one return of attention are enough.',[breath(),obj('mug',x=760,y=720,s=1.3)],[label('לפעמים מספיק רגע קצר.'),bottom('נשימה אחת, תחושה אחת')]),
  shot('The circle recedes; Ruth is not surrounded by an all-day attention checklist.',[obj('mug',x=760,y=490,s=2)],[label('זה לא אומר שצריך לשים לב לכל דבר כל היום.')]),
  shot('A thought cloud drifts while the same drink remains available.',[obj('thought',x=850,y=300,s=.8),obj('mug',x=710,y=600,s=1.7)],[label('אפשר פשוט לתת למחשבות לנדוד')]),
  shot('Attention can move between the thought and the current experience, by choice.',[obj('thought',x=850,y=280,s=.65),obj('mug',x=710,y=600,s=1.7),obj('attention',x=710,y=600,s=.7)],[label('מה שחשוב הוא הגמישות')]),
  shot('The familiar tools connect a structured practice with one ordinary moment.',[obj('tools',x=680,y=300,s=.8),obj('mug',x=760,y=600,s=1.7)],[label('לאמן את היכולת לשים לב ולחזור')]),
  shot('The film ends on one chosen ordinary drink with a small, steady attention circle.',[obj('mug',x=760,y=490,s=2),obj('attention',x=760,y=490,s=.8)],[label('בחרו משהו אחד שקורה ביום שלכם'),bottom('לכמה רגעים להקדיש לו את מלוא תשומת הלב')],character={'mood':.6}),
 ],acts=[(1,4,'From a formal image to everyday life'),(5,7,'One ordinary moment'),(8,10,'Flexibility and choice'),(11,12,'Try one small experiment')])

PLANS['S37'] = cfg(
 'Thoughts and feelings are pieces on a chessboard. Ruth can make room for all the pieces without having to make one side win, and still choose a meaningful response.',
 'An inner argument uses energy. Opposing pieces appear on one board and move in battle. The whole board then becomes visible; the pieces can stay while attention widens and Ruth chooses where to go next.',
 [
  shot('Ruth notices two different inner voices answering each other.',[voice(0,x=640,y=300),obj('voice','otherVoice',x=870,y=300,s=1.5,warm=1)],[label('התווכחתם... עם עצמכם?')],character={'mood':-.2}),
  shot('The two voices occupy more of her attention; a difficult thought stays in view.',[voice(0,x=650,y=320),obj('voice','otherVoice',x=870,y=320,s=1.5,warm=1),obj('thought',x=770,y=600,s=.8)],[label('מאבק עם המחשבות והרגשות שלנו')],character={'mood':-.4}),
  shot('The energy battery drops modestly while the argument continues; no outcome claim is added.',[obj('battery',x=780,y=470,s=1.1,level=.35),voice(0,x=780,y=250)],[label('לקחת המון אנרגיה')],character={'mood':-.4}),
  shot('A single chessboard appears beside Ruth, with both sets of pieces present.',[obj('chess',x=740,y=500,s=1,battle=0)],[label('כלים על לוח שחמט')],character={'pose':'stand','x':240,'s':.9,'mood':0}),
  shot('Light and dark pieces occupy opposite sides; labels name experiences from the narration.',[obj('chess',x=740,y=500,s=1,battle=0)],[label('ביטחון, רוגע, תקווה או מוטיבציה'),bottom('דאגה, תסכול, ספק עצמי או עצב')],character={'pose':'stand','x':240,'s':.9}),
  shot('Both sets move against each other; no side disappears or wins.',[obj('chess',x=740,y=500,s=1,battle=1)],[label('מנסים לגרום לצד אחד לנצח')],character={'pose':'stand','x':240,'s':.9,'mood':-.2}),
  shot('The view expands to the entire board. The battle settles and all the pieces remain.',[obj('chess',x=740,y=500,s=1.2,battle=0)],[label('ננסה להיות הלוח עצמו?'),bottom('על הלוח יש מקום לכל הכלים')],character={'pose':'stand','x':240,'s':.9,'mood':.2}),
  shot('A small attention ring notices one piece without replacing the whole board.',[obj('chess',x=740,y=500,s=1.2,battle=0),obj('attention',x=668,y=344,s=.28)],[label('הנה דאגה.')],character={'pose':'stand','x':240,'s':.9}),
  shot('The same piece stays inside the wider board; attention is not an eraser.',[obj('chess',x=740,y=500,s=1.2,battle=0)],[label('חלק ממה שאנחנו חווים עכשיו'),bottom('ולא התמונה כולה')],character={'pose':'stand','x':240,'s':.9,'mood':.3}),
  shot('Attention widens to other pieces and a person beside Ruth.',[obj('chess',x=740,y=500,s=1.1,battle=0),friend(x=430,s=.65)],[label('מה עוד נמצא שם')],character={'pose':'stand','x':220,'s':.85,'mood':.4}),
  shot('One piece is highlighted within the complete board, keeping the scale of the metaphor clear.',[obj('chess',x=740,y=500,s=1.2,battle=0),obj('attention',x=668,y=344,s=.28)],[label('כלי אחד הוא ממש לא כל הלוח.')],character={'pose':'stand','x':240,'s':.9}),
  shot('The complete board remains while the energy battery returns beside Ruth’s available choices.',[obj('chess',x=770,y=430,s=.9,battle=0),obj('battery',x=720,y=790,s=.7,level=.5)],[label('לבחור איך להגיב ולאן להפנות את האנרגיה שלנו')],character={'pose':'stand','x':240,'s':.9,'mood':.4}),
  shot('The familiar practice tools connect to the same board, without removing its difficult pieces.',[obj('chess',x=760,y=530,s=.9,battle=0),obj('tools',x=680,y=220,s=.7)],[label('לעצור לרגע ולא להיסחף מיד')],character={'pose':'stand','x':240,'s':.9}),
  shot('The remembered board remains stable when the inner struggle returns.',[obj('chess',x=740,y=500,s=1.2,battle=0)],[label('אתם לא חייבים להיאבק בהם.')],objectTransition=2.4,character={'pose':'stand','x':240,'s':.9,'mood':.4}),
  shot('Attention moves from one piece to the wider set of possibilities.',[obj('chess',x=740,y=500,s=1.2,battle=0),obj('attention',x=812,y=656,s=.28)],[label('מה עוד נמצא על הלוח?')],character={'pose':'stand','x':240,'s':.9}),
  shot('Ruth steps toward her own path while the entire board and its pieces remain beside her.',[obj('chess',x=810,y=450,s=.75,battle=0),obj('compass',x=720,y=780,s=.6)],[label('אפשר לתת להם מקום על הלוח'),bottom('ולהמשיך לעשות את מה שחשוב לנו.')],world='path',character={'pose':'stand','x':330,'s':1,'mood':.6}),
 ],acts=[(1,3,'The inner struggle'),(4,6,'Opposing pieces'),(7,11,'The whole board'),(12,16,'Choose a response with room for everything')])

PLANS['S49'] = cfg(
 'Social participation can matter and still be difficult. Ruth can choose which connections she wants to keep, make adaptations, and arrive as she is today.',
 'An invitation brings both warmth and effort. Ruth asks what draws her there and what makes it hard. She can rest or participate; when she chooses connection, symptoms do not have to disappear first. A smaller meeting or shorter visit keeps the choice practical.',
 [
  shot('Familiar people join Ruth; warmth and complexity can share the same room.',[friend(x=720),obj('friendB',x=920,y=860,s=.8)],[label('אנשים שאנחנו אוהבים'),bottom('זה לא אומר שזה תמיד פשוט')]),
  shot('A shared table makes the social invitation concrete; the same people remain.',[friend(x=720),obj('friendB',x=920,y=860,s=.8),obj('dinner',x=760,y=760,s=.7)],[label('ארוחה עם חברים'),bottom('גם מעמסה')]),
  shot('Time, energy and the invitation remain available for an individual choice.',[obj('notice',x=750,y=360,s=.85),obj('clock',x=870,y=660,s=.8)],[label('כשחיים עם פרקינסון, נכנסים לתמונה שיקולים נוספים')]),
  shot('A question rests on a future invitation; a small tremor can be present without hiding Ruth.',[obj('calendar',x=760,y=340,s=1),obj('tremor',x=360,y=710,s=1.4)],[label('לרצות מאוד ללכת לאירוע'),bottom('אבל לחשוש להתחייב')],character={'mood':-.3}),
  shot('Several people and a speech cue show the effort of entering a group conversation.',[friend(x=720),obj('friendB',x=920,y=860,s=.8),obj('message',x=760,y=300,s=.8)],[label('להשתלב בשיחה עם הרבה אנשים')],character={'mood':-.2}),
  shot('The invitation sits beside a lower energy battery; the difficulty remains understandable.',[obj('notice',x=700,y=340,s=.8),obj('battery',x=870,y=610,s=.8,level=.35)],[label('הרבה יותר מאמץ')],character={'mood':-.3}),
  shot('The visitors recede. Resting at home remains a valid possible choice.',[obj('mug',x=760,y=500,s=1.8)],[label('להישאר בבית'),bottom('ולפעמים זאת יכולה להיות החלטה נכונה.')]),
  shot('One familiar person is enough for one possible meeting; no social quota is shown.',[friend(x=790)],[label('לא כולנו צריכים את אותה כמות של חברה')]),
  shot('The invitation moves farther away as repeatedly giving up desired experiences becomes visible.',[obj('notice',x=860,y=380,s=.65),friend(x=900,s=.6)],[label('לוותר בהדרגה גם על דברים שאנחנו דווקא רוצים בחיים שלנו')],character={'mood':-.3}),
  shot('Warmth and a familiar person return to the centre of the invitation.',[friend(x=790),obj('heart',x=760,y=300,s=.9)],[label('קשר עם אנשים'),bottom('השתתפות במפגשים שחשובים לנו')],character={'mood':.4}),
  shot('Two question discs appear as separate choices, from right to left.',[obj('question','want',x=880,y=400,s=.85),obj('question','hard',x=640,y=400,s=.85)],[label('שתי שאלות')]),
  shot('The first question highlights what draws Ruth toward the meeting.',[obj('heart',x=760,y=430,s=1.1)],[label('מה גורם לי לרצות להיות שם?')]),
  shot('The second question makes room for what is difficult, without cancelling the first.',[obj('battery',x=760,y=460,s=1.1,level=.35)],[label('מה מקשה עליי להיות שם?')]),
  shot('A quiet day at home can be today’s answer.',[obj('mug',x=760,y=500,s=1.8)],[label('היום באמת עדיף להישאר בבית.')],character={'mood':.4}),
  shot('The invitation and a familiar person return when the connection matters enough today.',[friend(x=800),obj('notice',x=760,y=300,s=.8)],[label('ובכל זאת אני רוצה להיות שם.')],character={'mood':.4}),
  shot('Ruth stands as herself beside the invitation; the next message is offered as support.',[voice(1,x=770,y=330)],[label('מסר שתוכלו להזכיר לעצמכם')],character={'pose':'stand','mood':.4}),
  shot('The central sentence is held over the same, recognisable Ruth.',[voice(1,x=770,y=330),obj('heart',x=760,y=620,s=.75)],[label('כמו שאני, זה טוב מספיק.',kind='warm')],character={'pose':'stand','mood':.6}),
  shot('Ruth can be present with a visible tremor and a welcoming friend.',[obj('tremor',x=365,y=700,s=1.3),friend(x=800)],[label('אתם לא חייבים להגיע בלי סימפטומים.')],character={'pose':'stand','mood':.2}),
  shot('Ruth remains with the friend even while a little uncertain.',[friend(x=800)],[label('אפשר לבוא, להיות קצת נבוכים - ולהישאר.')],character={'pose':'stand','mood':.1}),
  shot('A small clock and the same person allow time, with no race or deadline.',[friend(x=800),obj('clock',x=780,y=300,s=.75)],[label('אפשר לעשות דברים לאט - ולהישאר.')],character={'pose':'stand','mood':.4}),
  shot('The same clothes, face and person stay in the meeting.',[friend(x=800)],[label('אפשר להיות בדיוק כמו שאתם היום - ולהישאר.')],character={'pose':'stand','mood':.5}),
  shot('The supportive voice returns to the same Ruth.',[voice(1,x=770,y=330)],[label('מי שאתם היום זה מספיק טוב.')],character={'pose':'stand','mood':.6}),
  shot('The gathering becomes one friend and a shorter visit, as the narration describes.',[friend(x=790),obj('clock',x=780,y=300,s=.8)],[label('אפשר לפגוש חבר אחד.'),bottom('אפשר להגיע לשעה.')],character={'mood':.5}),
  shot('The invitation and heart invite Ruth to choose the experiences she wants to keep.',[obj('notice',x=760,y=400,s=.9),obj('heart',x=800,y=700,s=.65)],[label('אילו חוויות ומפגשים חברתיים אתם רוצים לשמור בחייכם')]),
  shot('A question stays open beside the invitation; an immediate answer is not required.',[obj('notice',x=760,y=400,s=.9),obj('question',x=820,y=700,s=.65)],[label('מה יכול לעזור לכם להרגיש קצת יותר בנוח'),bottom('לא חייבים למצוא תשובה עכשיו.')]),
  shot('Ruth and her familiar person remain; no perfected replacement self is introduced.',[friend(x=800)],[label('לא צריכים לחכות לגרסה אחרת של עצמנו כדי להיות חלק.')],character={'mood':.6}),
  shot('The open door and familiar person hold a welcoming final composition.',[friend(x=800),obj('heart',x=760,y=320,s=.8)],[label('כמו שאנחנו - זה טוב מספיק.',kind='warm')],world='roomOpen',character={'pose':'stand','mood':.7}),
 ],acts=[(1,6,'The invitation and the effort'),(7,10,'What we want to keep'),(11,15,'Two useful questions'),(16,22,'As I am today'),(23,27,'Adapt and remain connected')])

PLANS['S53'] = cfg(
 'A conversation can need more time and small adaptations. Ruth tries ways to stay connected that fit her communication today.',
 'A fast-moving conversation resembles joining a busy road. The pace then slows: time, clarification, a quieter one-to-one setting and preparation become options. A familiar person waits and the connection remains.',
 [
  shot('Ruth wants to join a conversation with familiar people.',[friend(x=720),obj('friendB',x=920,y=860,s=.8),obj('message',x=760,y=300,s=.8)],[label('רוצים להשתתף בשיחה')],character={'mood':-.1}),
  shot('A busy road visualises the spoken comparison, while Ruth remains outside the metaphor.',[obj('road',x=740,y=360,s=.7,speed=150)],[label('להשתלב בכביש מהיר')]),
  shot('The same flow slows, giving an incoming contribution more room.',[obj('road',x=740,y=360,s=.7,speed=55),obj('clock',x=790,y=700,s=.75)],[label('יותר זמן כדי לעבד את מה שנאמר')]),
  shot('Listening and energy cues show some of the effort surrounding a crowded conversation.',[obj('ear',x=680,y=350,s=.85),obj('battery',x=890,y=500,s=.8,level=.35)],[label('קושי בדיבור, עייפות'),bottom('שיחה עמוסה ורועשת')],character={'mood':-.2}),
  shot('The difficult effort is acknowledged; Ruth is not blamed and the connection is still present.',[friend(x=810),voice(1,x=760,y=300)],[label('זה לא אומר שאתם עושים משהו לא נכון')]),
  shot('Time and a one-to-one conversation become possible adaptations.',[friend(x=810),obj('clock',x=760,y=300,s=.8)],[label('התאמות קטנות')],character={'mood':.3}),
  shot('A friend remains present and unhurried while the clock gives room for an answer.',[friend(x=810),obj('clock',x=760,y=300,s=1)],[label('לקחת קצת יותר זמן'),bottom('לא חייבים לענות מיד')]),
  shot('The actual clarification phrases appear as two choices above the same conversation.',[friend(x=810),obj('message',x=740,y=680,s=.65)],[label('אפשר לחזור על זה?'),side('רק לוודא שהבנתי נכון...')]),
  shot('The crowded context becomes one familiar person in the quiet room.',[friend(x=810),obj('ear',x=760,y=300,s=.8)],[label('מקום שקט יותר או מפגש עם אדם אחד')]),
  shot('An open notebook and one message prepare a starting point before the meeting.',[obj('book',x=740,y=430,s=1.1),obj('message',x=820,y=720,s=.65)],[label('להתכונן קצת מראש')]),
  shot('Breath, body and a hand cue offer the small ways of settling mentioned in the narration.',[breath(x=850,y=360,s=.65),obj('body',x=650,y=360,s=.65),obj('hand',x=750,y=650,s=.7)],[label('קצת יותר מיושבים בתוך המפגש')]),
  shot('The familiar person waits; time is given rather than taken over.',[friend(x=810),obj('clock',x=760,y=300,s=.85)],[label('לתת עוד זמן לענות, לא למהר ולא להפריע')]),
  shot('A warm voice acknowledges that adaptations can feel frustrating or artificial at first.',[voice(1,x=760,y=300),rain(x=800,y=550,s=.7)],[label('מתסכל בהתחלה'),bottom('אולי אפילו קצת מלאכותי')],character={'mood':-.1}),
  shot('The familiar conversation remains; one small adaptation is enough to try.',[friend(x=810),obj('message',x=760,y=300,s=.8)],[label('להישאר חלק מהשיחה והקשר')],character={'mood':.5}),
  shot('A modest check mark invites trying, without presenting a guaranteed outcome.',[obj('check',x=760,y=400,s=.9),friend(x=810)],[label('אולי שווה גם לכם לנסות...')],character={'mood':.4}),
  shot('Different options remain available; no single correct arrangement is enforced.',[obj('clock',x=880,y=320,s=.65),obj('ear',x=700,y=320,s=.65),obj('book',x=700,y=650,s=.65)],[label('אין דרך אחת נכונה')]),
  shot('Ruth stays connected with one familiar person through the open doorway.',[friend(x=810),obj('heart',x=760,y=300,s=.8)],[label('לנסות דברים קטנים'),bottom('להישאר מחוברים')],world='roomOpen',character={'mood':.6}),
 ],acts=[(1,5,'A conversation that takes effort'),(6,10,'Time and small adaptations'),(11,13,'Settle and receive time'),(14,17,'Stay connected in your way')])

PLANS['S54'] = cfg(
 'A harsh inner voice can share space with a kinder, supportive one. Ruth listens to the practice, notices what fits, and can carry one intention into her day.',
 'The critical voice is joined by a warm voice. Breath and body remain gentle; a sentence can be kept or allowed to pass. One small intention travels with Ruth rather than becoming a large new demand.',
 [
  shot('The familiar critical voice sits above Ruth while her mood lowers a little.',[voice(0,x=760,y=320)],[label('קול פנימי שיכול להיות מאוד ביקורתי ומאשים')],character={'mood':-.4}),
  shot('A warm voice joins the same room; it does not abruptly erase the first experience.',[voice(1,x=760,y=320)],[label('קול עדין, תומך ומקבל יותר')],character={'mood':.3}),
  shot('The supportive sentence joins a comfortable breath and body cue.',[breath(x=820,y=460,s=.85),obj('body',x=620,y=460,s=.75)],[label('כמו שאני, זה טוב מספיק',kind='warm')]),
  shot('Two thought cards can feel nearer or farther away; Ruth does not need to force belief.',[voice(1,x=760,y=320),obj('message','sentence',x=760,y=650,s=.8)],[label('הרעיון הוא לא לשכנע את עצמנו במשהו.')]),
  shot('One sentence remains within reach while the other can pass out of the centre.',[obj('message','sentence',x=700,y=470,s=1),voice(1,x=850,y=270,s=1.1)],[label('אפשר פשוט להקשיב ולשים לב'),bottom('אם משהו מדבר אליכם, קחו אותו.')]),
  shot('A small direction cue represents a personally chosen intention for the day.',[obj('compass',x=760,y=430,s=1)],[label('לבחור כוונה להמשך היום.')]),
  shot('The same direction moves to the foreground of Ruth’s day, alongside the familiar tools.',[obj('compass',x=760,y=400,s=1),obj('tools',x=690,y=720,s=.65)],[label('לזכור מה חשוב לנו ולפעול בהתאם.')]),
  shot('One sentence and one small direction remain; no large checklist appears.',[obj('compass',x=800,y=370,s=.75),obj('message','sentence',x=720,y=670,s=.7)],[label('משפט אחד או כוונה אחת')]),
  shot('Ruth settles into the same supported practice posture, with room to listen.',[breath(x=850,y=200,s=.6)],[label('נקשיב להנחיה, נקשיב לעצמינו')],world='mat'),
  shot('The final support sentence is held over the same ordinary, comfortable Ruth.',[voice(1,x=760,y=330)],[label('כמו שאני - זה טוב מספיק.',kind='warm')],character={'mood':.6}),
 ],acts=[(1,3,'Make room for a supportive voice'),(4,5,'Listen without forcing belief'),(6,8,'One intention for the day'),(9,10,'Arrive as you are')])

PLANS['S56'] = cfg(
 'Values describe how we want to live, while goals are particular things we want to do. A meaningful direction can remain when the goal or the size of the step changes.',
 'Daily tasks give way to a question about what matters. A flag is a goal; a compass is a direction. A family meal, a message, exercise or rest can express a direction differently. Two priorities can coexist without one prescribed answer.',
 [
  shot('The room fills with ordinary commitments around Ruth, without turning them into a score.',[obj('calendar',x=650,y=310,s=.85),obj('notice',x=870,y=580,s=.7),obj('clock',x=650,y=700,s=.65)],[label('משימות, סידורים, מחויבויות')]),
  shot('The commitments recede to make room for one question.',[obj('question',x=760,y=420,s=1.1)],[label('מה באמת חשוב לי?')]),
  shot('Different possible directions appear as personal choices, from right to left.',[obj('body',x=910,y=350,s=.6),obj('heart',x=740,y=350,s=.6),obj('clock',x=570,y=350,s=.6),obj('book',x=740,y=650,s=.7)],[label('איך היינו רוצים לחיות ולפעול'),bottom('אין דברים ש"אמורים" להיות חשובים לכם.')]),
  shot('A warm heart and direction cue illustrate connection to meaning without drawing invented research statistics.',[obj('compass',x=760,y=400,s=.9),obj('heart',x=760,y=700,s=.65)],[label('למה שחשוב לנו'),bottom('רווחה נפשית, סיפוק ותחושת משמעות')]),
  shot('A specific destination flag and an enduring direction are drawn as separate objects.',[obj('flag',x=620,y=520,s=1),obj('compass',x=880,y=400,s=.85)],[label('להבדיל בין ערך לבין מטרה')]),
  shot('The concrete goal is a family meal; connection to the people is the meaningful direction.',[obj('dinner',x=750,y=720,s=.8),friend(x=650),obj('friendB',x=900,y=860,s=.75),obj('compass',x=790,y=290,s=.6)],[label('להגיע לארוחה משפחתית'),bottom('להיות קרובים ומעורבים בחיי המשפחה')]),
  shot('The destination flag shifts while the direction stays visible.',[obj('flag',x=900,y=680,s=.65),obj('compass',x=760,y=350,s=1)],[label('המטרה יכולה להשתנות'),bottom('להמשיך באותו כיוון')]),
  shot('Energy and the same direction coexist; the route and effort can adapt.',[obj('battery',x=650,y=650,s=.8,level=.4),obj('compass',x=830,y=350,s=.9)],[label('לשנות את הדרך שבה עושים משהו'),bottom('לא אומר שצריך לוותר על מה שחשוב לנו')]),
  shot('A visit and a short message become two ways to keep a connection.',[friend(x=810),obj('message',x=720,y=300,s=.9),obj('compass',x=650,y=660,s=.55)],[label('מפגש עם מישהו'),bottom('לשלוח הודעה קצרה')]),
  shot('The body, rest and asking for support can express the same concern for health.',[obj('body',x=620,y=330,s=.75),obj('bed',x=810,y=600,s=.65),obj('phone',x=900,y=320,s=1.2)],[label('לדאוג לבריאות שלכם'),bottom('מנוחה או בקשת עזרה')]),
  shot('The same compass accompanies a small stone on Ruth’s path; the size of the person remains readable.',[obj('compass',x=790,y=350,s=.8)],[label('בדרכים שונות'),bottom('הגודל של הצעד לא קובע כמה הוא משמעותי')],world='path',character={'pose':'stand','x':430,'s':1,'mood':.5}),
  shot('Two directions can matter together; neither is marked wrong.',[obj('compass',x=620,y=420,s=.7,angle=-45),obj('compass','otherDirection',x=890,y=420,s=.7,angle=45)],[label('כמה דברים יהיו חשובים לנו באותו הזמן'),bottom('לא תמיד תהיה תשובה אחת נכונה')]),
  shot('One open question returns to the next possible step.',[obj('compass',x=790,y=370,s=.85)],[label('מה חשוב לי כאן, ואיזה צעד אפשרי עבורי עכשיו?')],world='path',character={'pose':'stand','x':430,'s':1,'mood':.5}),
 ],acts=[(1,4,'What matters within a busy day'),(5,7,'A goal and a direction'),(8,11,'Different ways to live a value'),(12,13,'Choose a possible step')])

PLANS['S57'] = cfg(
 'A value can act like a compass: the direction can stay meaningful while a particular walking plan, route or size of step changes.',
 'Ruth plans a walk with a friend, then meets fatigue. The compass supplies a direction, not a mandatory destination. Seated movement, a home visit or rest become different possibilities; a winding path and the same compass make returning to a chosen direction visible.',
 [
  shot('A planned walk with a familiar person meets a lower energy day.',[friend(x=810),obj('battery',x=790,y=300,s=.85,level=.3)],[label('לצאת להליכה עם מישהו'),bottom('פתאום נופלת עליכם עייפות')],world='path',character={'pose':'stand','x':430,'mood':-.2}),
  shot('An open question makes room for going, changing the plan or resting.',[obj('question',x=770,y=350,s=1),obj('bed',x=810,y=680,s=.6)],[label('תצאו בכל זאת? תבטלו? תדחו? אולי תנוחו?')],world='path',character={'pose':'stand','x':430}),
  shot('The path remains; no option is marked as the single correct answer.',[obj('question',x=770,y=350,s=1)],[label('לא תמיד יש תשובה אחת נכונה')],world='path',character={'pose':'stand','x':430}),
  shot('A heart cue reconnects the decision to what matters to Ruth.',[obj('heart',x=780,y=350,s=1)],[label('מה באמת חשוב לנו'),bottom('הערכים שלנו')],world='path',character={'pose':'stand','x':430,'mood':.3}),
  shot('A large compass appears; a destination flag is a separate, smaller object.',[obj('compass',x=790,y=350,s=.95),obj('flag',x=850,y=730,s=.6)],[label('מצפן מראה לנו כיוון.'),bottom('לא אומר לנו בדיוק לאן צריך להגיע')],world='path',character={'pose':'stand','x':430,'mood':.4}),
  shot('The same compass stays beside Ruth and the path.',[obj('compass',x=790,y=350,s=.95)],[label('ככה גם הערכים שלנו.')],world='path',character={'pose':'stand','x':430}),
  shot('The walking goal and friend return; the direction remains visible when the goal needs to change.',[obj('compass',x=790,y=300,s=.75),friend(x=820),obj('flag',x=650,y=690,s=.55)],[label('אולי המטרה תצטרך להשתנות.')],world='path',character={'pose':'stand','x':430}),
  shot('Ruth is seated at home; a bodily movement cue expresses the spoken alternative to the walk.',[obj('compass',x=790,y=300,s=.75),obj('body',x=780,y=590,s=.95)],[label('מתיחות בישיבה?')],character={'mood':.5}),
  shot('The same friend comes to Ruth’s room instead of the walking route.',[obj('compass',x=790,y=300,s=.75),friend(x=810)],[label('ביקור של החבר אצלכם?')],world='roomOpen',character={'mood':.6}),
  shot('Rest and saved energy remain another acceptable option, beside the same direction cue.',[obj('compass',x=790,y=300,s=.75),obj('battery',x=780,y=620,s=.8,level=.45)],[label('לשמור את האנרגיה שלכם למשהו שחשוב לכם יותר.')],character={'mood':.4}),
  shot('The compass comes forward while the immediate option is considered.',[obj('compass',x=790,y=380,s=1)],[label('מה אפשרי עבורנו עכשיו.')],character={'mood':.4}),
  shot('The familiar winding path returns, with the compass and a person who can accompany Ruth.',[obj('compass',x=800,y=310,s=.8),friend(x=790,s=.75)],[label('לשנות מסלול, לקבל עזרה, לעשות צעד קטן יותר')],world='path',character={'pose':'stand','x':430,'mood':.4}),
  shot('Ruth pauses on the path. No failure symbol or lost progress appears.',[obj('compass',x=790,y=350,s=.9)],[label('זה לא אומר שנכשלנו.')],world='path',character={'pose':'stand','x':430,'mood':.3}),
  shot('The same direction is available again when Ruth is ready to choose.',[obj('compass',x=790,y=350,s=.9)],[label('תמיד אפשר לעצור'),bottom('ולבחור שוב לאיזה כיוון אנחנו רוצים להתקדם.')],world='path',character={'pose':'stand','x':430,'mood':.5}),
  shot('The compass and one open question guide the next decision.',[obj('compass',x=790,y=380,s=1)],[label('מה הכיוון שחשוב לי כאן?')],world='path',character={'pose':'stand','x':430,'mood':.5}),
  shot('A warm acknowledgement joins Ruth and the compass, without a performance score.',[obj('compass',x=790,y=350,s=.9),obj('heart',x=790,y=700,s=.65)],[label('עושים ומנסים, מתרגלים ומתקדמים.')],world='path',character={'pose':'stand','x':430,'mood':.6}),
  shot('Ruth takes a modest step forward while the same compass holds its direction.',[obj('compass',x=790,y=350,s=.9)],[label('כל הכבוד, אתם כבר בכיוון הנכון!')],world='path',character={'pose':'stand','x':480,'mood':.7}),
 ],acts=[(1,4,'When the original plan becomes difficult'),(5,7,'Direction and destination'),(8,11,'Different possible choices'),(12,17,'Return to a direction that matters')])

PLANS['S99'] = cfg(
 'A pause in using the program is understandable. The work already done remains available, and Ruth can return, try the different tools and find what fits.',
 'Ruth’s phone is quiet and some practices feel distant. A warm voice acknowledges that experience. Familiar tools and already lit stones remain. A reminder becomes an invitation to return, and Ruth resumes her own path without a reset or lost progress.',
 [
  shot('The familiar phone is quiet beside Ruth; no streak or failure score is shown.',[obj('phone',x=760,y=410,s=1.9)],[label('פחות התחברתם לפעילויות שלנו באפליקציה')],character={'mood':-.1}),
  shot('The tools and a question make room for activities that may not feel relevant or natural.',[obj('tools',x=690,y=300,s=.8),obj('question',x=790,y=590,s=.8)],[label('לא טבעי, או מוזר, או מביך')],character={'mood':-.2}),
  shot('A thought, a feeling and a clock represent the obstacles named in the narration.',[obj('thought',x=630,y=330,s=.75),obj('heart',x=850,y=330,s=.75),obj('clock',x=760,y=650,s=.8)],[label('אולי קשה למצוא את הזמן.')],character={'mood':-.2}),
  shot('A warm voice acknowledges the pause before offering another step.',[voice(1,x=760,y=350)],[label('זה מובן, וזה בסדר.',kind='warm')],character={'mood':.3}),
  shot('A direction cue invites remembering why the program is here.',[obj('compass',x=760,y=430,s=.9)],[label('להיזכר למה אנחנו מביאים אליכם את כל הדברים האלה.')]),
  shot('The existing tools show the variety of information and practices; no new efficacy graph is invented.',[obj('tools',x=690,y=400,s=.9)],[label('מגוון גדול של מידע ושל תרגולים')]),
  shot('Mind, feeling, action and body cues connect the program’s familiar domains.',[obj('thought',x=910,y=350,s=.65),obj('heart',x=740,y=350,s=.65),obj('body',x=570,y=350,s=.65),obj('tools',x=690,y=660,s=.6)],[label('עם מחשבות, עם רגשות, עם התנהגויות ועם הגוף')]),
  shot('The same domains remain alongside a warm direction cue; there is no promised numerical change.',[obj('heart',x=760,y=370,s=1),obj('compass',x=800,y=680,s=.6)],[label('שיפור באיכות החיים'),bottom('יכולת להתמודד עם מתח')]),
  shot('A calendar and the familiar practice tools illustrate returning over time.',[obj('calendar',x=760,y=350,s=1),obj('tools',x=690,y=660,s=.7)],[label('יש משמעות להתמדה ולחזרה.')]),
  shot('A small reminder sits beside the phone, without displaying blame or a broken streak.',[obj('phone',x=760,y=430,s=2),obj('notice',x=830,y=230,s=.5)],[label('אם פספסתם כמה פעמים, זה לא סוף העולם.')]),
  shot('Already lit stones remain on the path when Ruth returns.',[obj('tools',x=720,y=300,s=.75)],[label('מה שכבר עשיתם - נשאר איתכם.'),bottom('ואפשר פשוט לחזור, ולהמשיך.')],world='path',pathLit=4,character={'pose':'stand','x':430,'mood':.5}),
  shot('The phone and calendar join the same familiar path as a routine that can become natural.',[obj('phone',x=790,y=350,s=1.7),obj('calendar',x=790,y=650,s=.7)],[label('חלק טבעי מהיום שלכם')],world='path',pathLit=4,character={'pose':'stand','x':430,'mood':.5}),
  shot('Ruth pauses to remember her original direction; the earlier stones stay lit.',[obj('compass',x=790,y=350,s=.9)],[label('צעד גדול ומשמעותי')],world='path',pathLit=4,character={'pose':'stand','x':430,'mood':.5}),
  shot('The same compass and continuing path connect the program to Ruth’s own goals.',[obj('compass',x=790,y=350,s=.9),obj('flag',x=820,y=700,s=.6)],[label('כדי לעזור לכם להגיע למטרות שלכם.')],world='path',pathLit=4,character={'pose':'stand','x':430,'mood':.6}),
  shot('Different familiar tools remain available for trying and choosing what fits.',[obj('tools',x=760,y=300,s=.85)],[label('להתנסות בהכל'),bottom('מה עובד לכם יותר, ומה פחות.')],world='path',pathLit=4,character={'pose':'stand','x':430,'mood':.6}),
  shot('The familiar guide on the phone and the retained path invite Ruth to continue.',[obj('phone',x=790,y=400,s=2),obj('tools',x=780,y=650,s=.65)],[label('מחכים לכם באפליקציה!',kind='warm')],world='path',pathLit=4,character={'pose':'stand','x':480,'mood':.7}),
 ],acts=[(1,4,'A pause is understandable'),(5,8,'Remember the purpose'),(9,12,'Return without losing what you did'),(13,16,'Continue toward what fits')])
