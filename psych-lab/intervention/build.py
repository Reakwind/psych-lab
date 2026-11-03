"""Compile the review prototype from read-only source snapshots."""
import csv
import io
import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
LAB = HERE.parent
ROOT = LAB.parent
SRC = HERE / 'sources'


def read(name):
    return json.loads((SRC / f'{name}.json').read_text())


def sheets(text):
    return [list(csv.reader(io.StringIO(s))) for s in text.split('\f')]


XL = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
XL_REL = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
ACTIVITY_SHEETS = ROOT / 'sources/activity-sheets'


def workbook(path):
    """The owner's spreadsheet as {sheet name: [{column letter: cell text}]}, in workbook order."""
    import zipfile
    from xml.etree import ElementTree as ET
    z = zipfile.ZipFile(path)
    names = z.namelist()
    shared = [''.join(t.text or '' for t in si.iter(XL + 't')) for si in ET.fromstring(z.read('xl/sharedStrings.xml')).iter(XL + 'si')] if 'xl/sharedStrings.xml' in names else []
    targets = {r.get('Id'): r.get('Target') for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
    book = {}
    for sheet in ET.fromstring(z.read('xl/workbook.xml')).iter(XL + 'sheet'):
        target = targets[sheet.get(XL_REL + 'id')].lstrip('/')
        rows = []
        for row in ET.fromstring(z.read(target if target.startswith('xl/') else 'xl/' + target)).iter(XL + 'row'):
            cells = {}
            for c in row.iter(XL + 'c'):
                v = c.find(XL + 'v')
                text = ''.join(t.text or '' for t in c.iter(XL + 't')) if c.get('t') == 'inlineStr' else (v.text if v is not None else '')
                cells[re.match(r'[A-Z]+', c.get('r'))[0]] = shared[int(text)] if c.get('t') == 's' else (text or '')
            rows.append(cells)
        book[sheet.get('name')] = rows
    return book


def modified(path):
    import zipfile
    core = zipfile.ZipFile(path).read('docProps/core.xml').decode('utf-8')
    return re.search(r'<dcterms:modified[^>]*>([^<]+)', core)[1]


def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())


def duration(path):
    if not path.exists():
        return None
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)]).decode().strip())


cloud = json.loads((LAB / 'intervention-audit/sources/cloud-sources.json').read_text())
timeline = sheets(cloud['cloud-timeline']['content'])
sequence = json.loads((LAB / 'intervention-audit/sequence.json').read_text())
audit = json.loads((LAB / 'status.json').read_text())
clips = {r['id']: {'id': r['id'], 'title': r['title'], 'url': '/media/' + r['animation_path'], 'seconds': r['media']['duration']} for r in audit['sessions']}
generic_file=HERE/'media/PS-CONT-047.mp4'
if generic_file.exists():
    clips['SOURCE-PS-CONT-047']={'id':'SOURCE-PS-CONT-047','title':'Source asset 047 — ID conflict, held out of the scheduled flow','url':'/intervention/media/PS-CONT-047.mp4','seconds':duration(generic_file)}
for cid in ['PS-CONT-013','PS-CONT-029']:
    file=HERE/'media'/f'{cid}.mp4'
    if file.exists():
        clips['SOURCE-'+cid]={'id':'SOURCE-'+cid,'title':cid+' — current Remepy app video','url':'/intervention/media/'+file.name,'seconds':duration(file)}
sources = {}
for p in sorted(SRC.glob('*.json')):
    data=json.loads(p.read_text())
    if isinstance(data,dict) and 'title' in data:
        sources[p.stem]={k:v for k,v in data.items() if k!='content'}
sources.update({k: {x: v[x] for x in ('title', 'url', 'updated_at') if x in v} for k, v in cloud.items() if isinstance(v, dict)})

# Normalize the editable pre-page tables, preserving their authored Hebrew copy.
prepages = {}
for key in ['prepages-educational', 'prepages-videos-later', 'prepages-month1', 'prepages-activities-later', 'context-prepages']:
    block = None
    for rows in sheets(read(key)['content']):
        for i, row in enumerate(rows):
            if len(row) < 5:
                continue
            field = row[1].strip()
            if field == 'Title':
                block = {'title': row[4].strip() or row[3].strip(), 'english': row[2].strip(), 'source': key, 'bullets': []}
                prepages[norm(row[2])] = block
                prior = rows[max(0, i-1)]
                for cid in re.findall(r'(?:PS|DA)-(?:CONT|ACT)-\d+', ' '.join(prior)):
                    prepages[cid] = block
            elif block and field == 'Subtitle':
                block['subtitle'] = row[4].strip() or row[3].strip()
            elif block and field.startswith('Before you begin'):
                block['lead'] = row[4].strip() or row[3].strip()
            elif block and field.startswith('Bullet'):
                text = row[4].strip() or row[3].strip()
                block['bullets'].extend([x.strip('•\t ') for x in text.split('\n') if x.strip()])
            elif block and field == "What you'll need":
                block['equipment'] = row[4].strip() or row[3].strip()

metadata = {}
rows = sheets(read('metadata')['content'])[1]
for r in rows:
    if len(r) > 26 and re.fullmatch(r'(PS|DA)-(CONT|ACT)-\d+', r[2]):
        metadata[r[2]] = {'title': r[6], 'english': r[7], 'subtitle': r[8], 'lead': r[20], 'equipment': r[23], 'intro': r[19], 'library_only': r[18].lower() == 'yes', 'safety': r[26]}

video_map = {}
for s in sequence:
    vids = [a for a in s['activities'] if a['Activity Type'] == 'Video']
    if len(vids) == 1 and len(s['lab_videos']) == 1 and s['session'] != 15:
        video_map[vids[0]['Activity ID']] = s['lab_videos'][0]['id']
video_map.update({'PS-CONT-030':'S03b', 'PS-CONT-031':'S15', 'PS-CONT-032':'S33b', 'PS-CONT-033':'S33a', 'PS-CONT-034':'S06', 'PS-CONT-035':'S17', 'PS-CONT-036':'S29', 'PS-CONT-037':'S10', 'PS-CONT-038':'S43', 'PS-CONT-039':'S45', 'PS-CONT-040':'S64', 'PS-CONT-041':'S66', 'PS-CONT-042':'S70', 'PS-CONT-043':'S73', 'PS-CONT-045':'S04', 'PS-CONT-046':'S11', 'PS-CONT-107':'S46', 'PS-CONT-108':'S54', 'PS-CONT-109':'S58'})

video_map['PS-CONT-003'] = 'S03a'
for cid in ['PS-CONT-013','PS-CONT-029']:
    if 'SOURCE-'+cid in clips:
        video_map[cid]='SOURCE-'+cid

aliases = {
 'PS-ACT-001':'Belly Breathing', 'PS-ACT-002':'Inner Voice Workout', 'PS-ACT-003':'Grounding', 'PS-ACT-004':'Cardversation', 'PS-ACT-005':'Box Breathing', 'PS-ACT-006':'Take a Breather', 'PS-ACT-007':'Mindfulness', 'PS-ACT-008':'In the Moment', 'PS-ACT-009':'Exploring a Pleasant Experience', 'PS-ACT-010':'A Moment of Gratitude', 'PS-ACT-011':'This Matters to Me', 'PS-ACT-012':'Relaxation', 'PS-ACT-013':'Self-Care', 'PS-ACT-014':'Flexible Thinking', 'PS-ACT-015':'Attention & Emotional Balance', 'PS-ACT-016':'Cultivating Calm', 'PS-ACT-017':'Meaningful Action', 'PS-ACT-019':'Physiological Sigh', 'PS-ACT-020':'Coherent Breathing',
 'PS-CONT-058':'Grounding', 'PS-CONT-060':'Observing Thoughts', 'PS-CONT-065':'Guided Relaxation', 'PS-CONT-066':'Nighttime Guided Imagery', 'PS-CONT-067':'Progressive Muscle Relaxation', 'PS-CONT-068':'Safe Place Guided Imagery', 'PS-CONT-069':'Nighttime Safe Place', 'PS-CONT-070':'Awareness of Breath', 'PS-CONT-071':'Body Scan', 'PS-CONT-074':'A Moment of Self-Compassion', 'PS-CONT-077':'Nighttime Body Scan', 'PS-CONT-078':'Hands and Feet Before Sleep', 'PS-CONT-103':'I Am Enough (practice)', 'PS-CONT-104':'One-Breath Reset', 'PS-CONT-105':'Soften One Place', 'PS-CONT-106':'Three Anchors', 'PS-CONT-109':'This Matters to Me', 'DA-CONT-063':'Light Stretches'
}
# Never invent Hebrew titles: every displayed title must come verbatim from a source.
fallback_he = {}

activities = {}


def activity(cid, name='', typ=''):
    if cid in activities:
        return activities[cid]
    meta = metadata.get(cid, {})
    pre = prepages.get(cid) or prepages.get(norm(aliases.get(cid, name))) or {}
    title = pre.get('title') or meta.get('title') or fallback_he.get(cid) or name or aliases.get(cid, cid)
    out = {'id':cid, 'title':title, 'english':pre.get('english') or meta.get('english') or aliases.get(cid) or name,
           'subtitle':pre.get('subtitle') or meta.get('subtitle') or '', 'lead':pre.get('lead') or meta.get('lead') or '',
           'bullets':pre.get('bullets', []), 'equipment':pre.get('equipment') or meta.get('equipment') or '',
           'safety':meta.get('safety', ''), 'sources':list(dict.fromkeys([x for x in [pre.get('source'), 'metadata'] if x])),
           'kind':'video' if typ == 'Video' else 'audio', 'planned_seconds':180, 'clip':None, 'intro_id':None, 'issues':[]}
    if cid in video_map and cid not in ['PS-CONT-109']:
        out['clip'] = clips[video_map[cid]]
    if cid in ['PS-ACT-001', 'PS-ACT-005', 'PS-ACT-019', 'PS-ACT-020']:
        out['kind'] = 'breathing'
    elif cid == 'PS-ACT-002':
        out['kind'] = 'inner'
        out['planned_seconds'] = 180
    elif cid == 'PS-ACT-004':
        out['kind'] = 'cards'
    elif cid in ['PS-ACT-009','PS-ACT-010','PS-ACT-011','PS-CONT-109']:
        out['kind'] = 'reflection'
    elif cid in ['PS-ACT-006','PS-ACT-007','PS-ACT-008','PS-ACT-012','PS-ACT-013','PS-ACT-014','PS-ACT-015','PS-ACT-016','PS-ACT-017']:
        out['kind'] = 'choice'
    elif cid in ['PS-CONT-060','PS-CONT-065','PS-CONT-067','PS-CONT-068','PS-CONT-070','PS-CONT-071','PS-CONT-074']:
        out['planned_seconds'] = 300
    elif cid == 'PS-CONT-103':
        out['planned_seconds'] = 240
    elif cid in ['PS-CONT-104','PS-CONT-105','PS-CONT-106']:
        out['planned_seconds'] = 60
    elif cid in ['PS-CONT-066','PS-CONT-069','PS-CONT-077','PS-CONT-078']:
        out['planned_seconds'] = 420
    if cid == 'PS-ACT-019':
        out['planned_seconds'] = 60
    if cid == 'PS-ACT-020':
        out['planned_seconds'] = 240
    if out['kind']=='video':
        out['planned_seconds'] = out['clip']['seconds'] if out['clip'] else (120 if cid == 'PS-CONT-047' else 180)
        if not out['clip']:
            out['issues'].append('No matching rendered video in this Lab copy; the intended slot is retained.')
    if cid=='PS-CONT-047':
        out['source_conflict']='The V0 timeline and metadata label 047 as a breathing introduction, but the October Hebrew production script for 047 is about mindfulness. The retrieved 047 video is available for source review and is held out of the breathing flow until the binding is verified.'
        out['issues'].append(out['source_conflict'])
        out['review_media']='/intervention/media/PS-CONT-047.mp4'
    if cid in ['PS-CONT-013','PS-CONT-029'] and out['clip']:
        out['source_note']='Uses the current Remepy app video. The older Lab animation has materially different text from the October Hebrew production script; the original animation remains in Videos & storyboards.'
    activities[cid] = out
    return out


for s in sequence:
    for a in s['activities']:
        activity(a['Activity ID'], a['Activity Name'], a['Activity Type'])

# Current trailer-to-practice mappings, not session-number guesses.
for rows in sheets(read('psych-trailers')['content']):
    for r in rows[1:]:
        if len(r) >= 6 and r[1].startswith('PS-'):
            a = activity(r[1], r[2], r[3])
            a['intro_id'] = r[5].strip()
            a['sources'].append('psych-trailers')
            if r[5].strip() not in activities:
                activity(r[5].strip(), r[4], 'Video')
# The two separate IDs denote the same reflection and grounding mechanics.
activities['PS-CONT-109']['intro_id'] = 'PS-CONT-109'
activities['PS-ACT-003']['kind'] = 'audio'

groups = defaultdict(list)
group_ids = {'takeabreather':'PS-ACT-006','relaxation':'PS-ACT-012','mindfulness':'PS-ACT-007','selfcare':'PS-ACT-013','flexiblethinking':'PS-ACT-014','attentionemotionalbalance':'PS-ACT-015','cultivatingcalm':'PS-ACT-016','meaningfulaction':'PS-ACT-017','inthemoment':'PS-ACT-008'}
for r in timeline[0][4:]:
    if len(r) < 8 or not r[3].startswith(('PS-','DA-')):
        continue
    gid = group_ids[norm(r[1])]
    a = activity(r[3], r[4], 'Video' if r[6]=='Video' else r[6])
    groups[gid].append({'id':a['id'], 'parameter':r[7], 'description':r[5].strip()})
for gid, opts in groups.items():
    activities[gid]['options'] = opts

# Include library-only practices without inserting them into the daily sequence.
for cid in ['PS-CONT-066','PS-CONT-069','PS-CONT-077','PS-CONT-078','PS-CONT-110']:
    # No Hebrew title exists in any source for some library items: show the source's own name
    # (verbatim English) rather than a Lab translation.
    a=activity(cid, aliases.get(cid) or fallback_he.get(cid) or cid)
    if a['title'] == cid and a['english']:
        a['title'] = a['english']
    a['library_only']=True

audio_files = {'PS-ACT-003':'grounding', 'PS-CONT-058':'grounding', 'PS-CONT-060':'observing', 'PS-CONT-068':'safeplace', 'PS-CONT-065':'imagery'}
for a in activities.values():
    if a['kind'] == 'audio':
        key=audio_files.get(a['id'])
        file=HERE / 'media' / f'{key}.mp3' if key else None
        secs=float(round(duration(file))) if file else None  # whole seconds, as listed before
        a['audio']={'url':f'/intervention/media/{key}.mp3','seconds':secs,'status':'Remepy draft — file marked not finalized' if key=='imagery' else 'Remepy production edit'} if secs else None
        if not secs:
            confirmed = a['id'] in {'PS-CONT-067','PS-CONT-070','PS-CONT-071','PS-CONT-074','PS-CONT-103','PS-CONT-104','PS-CONT-105','PS-CONT-106'}
            a['recording_status'] = 'not_yet_recorded' if confirmed else 'unavailable'
            a['issues'].append('Not yet recorded (confirmed by the project owner, 2026-11-02). A clearly marked timing simulation is available.' if confirmed else 'Practice recording not found in the accessible supplied audio folder. A clearly marked timing simulation is available.')
            if a['id'] in ['PS-CONT-067','PS-CONT-071','PS-CONT-074','PS-CONT-103']:
                a['duration_uncertain']=True
                a['issues'].append('The source daily planning minutes may already include the trailer. The lower and upper estimates preserve both interpretations; the practice recording is needed to resolve this.')
        else:
            a['sources'].append('production-audio')

sources['production-audio']={'title':'Remepy Production / Audio (source WAV edits)', 'url':'https://remepyhealth.sharepoint.com/sites/Therapeutics/Shared%20Documents/PD/Hybridopa%20Content/Production/Audio', 'updated_at':'2026-10-01'}
sources['app-media']={'title':'Remepy app media — current source videos (013, 029; 047 held out for an ID conflict)', 'url':'https://remepyhealth.sharepoint.com/sites/Product/Shared%20Documents/Therapeutics%20-%20Product/PD/Content/pd_media/psychology', 'updated_at':'2026-10-07'}

# Context copy: the newer bilingual table takes priority; V0 retains the exact info ID.
info = {}
for i in [2,3]:
    for r in timeline[i][3:]:
        if len(r)>3 and r[2].startswith('Info-'):
            info[r[2]]={'english':r[3], 'hebrew':'', 'source':'cloud-timeline'}
context_by_session={}
for r in sheets(read('psych-context')['content'])[0][1:]:
    if len(r)>13 and r[6].isdigit():
        context_by_session[int(r[6])]={'english':r[9], 'hebrew':r[11], 'hebrew_female':r[13], 'activity_id':r[3], 'source':'psych-context'}

sessions=[]
first={}
for s in sequence:
    rows=[]
    for a in s['activities']:
        cid=a['Activity ID']
        first.setdefault(cid,s['session'])
        rows.append({'id':cid,'parameter':a['Parameter'],'information_id':a['Information page ID'],'trailer_flag':a['Comments'],'first_session':first[cid]})
    context=context_by_session.get(s['session'])
    if not context:
        context=next((info[x['information_id']] for x in rows if x['information_id'] in info),None)
    title=activities[rows[0]['id']]['title']
    sessions.append({'number':s['session'],'id':f"S{s['session']:02d}",'title':title,'english':activities[rows[0]['id']]['english'],'app_day':s['session']+1,'week':(s['session']-1)//7+1,'activities':rows,'context':context})

# Source thought banks, from the owner's current workbook (seven sheets in workbook order:
# motivation, balanced, relaxation, mindfulness, compassion, labels, mixed/flexible). Columns:
# A # · B Thought · C Type · D/E English feedback · F בחירה שגויה · G בחירה נכונה · H סוג · I מחשבה.
# Every Hebrew field is copied exactly; the type's Hebrew name labels the answer buttons.
inner_voice_book=ACTIVITY_SHEETS/'inner voice workout.xlsx'
sources['inner-voice']={'title':'inner voice workout.xlsx','url':sources['inner-voice']['url'],'updated_at':modified(inner_voice_book),'path':str(inner_voice_book.relative_to(ROOT))}
themes=['motivation','balanced','relaxation','mindfulness','compassion','labels','flexible']
thoughts={}
for theme,rows in zip(themes,workbook(inner_voice_book).values()):
    header=rows[0]
    assert [header.get(c) for c in 'BCFGHI']==['Thought','Type','בחירה שגויה','בחירה נכונה','סוג','מחשבה'], header
    thoughts[theme]=[{'text':r['I'],'english':r.get('B',''),'type':r.get('C',''),'type_he':r.get('H',''),'keep':r.get('C') in ['Take it in','Golden thought'],'correct':r.get('G',''),'incorrect':r.get('F','')} for r in rows[1:] if r.get('I','').strip()]

card_sheets=sheets(read('cards')['content'])
card_names=[('interests','תחומי עניין ותחביבים'),('people','אנשים וקהילה'),('self','חוזקות ותכונות'),('icebreakers','שוברי קרח')]
cards=[]
for i,(key,name) in enumerate(card_names):
    deck=[]
    for row in card_sheets[i*2][1:]:
        if len(row)>9 and row[2]:
            deck.append({'number':row[1],'a':row[2],'ideas_a':row[3], 'b':row[4], 'ideas_b':row[5], 'followups':[{'text':row[6],'ideas':row[7]},{'text':row[8],'ideas':row[9]}]})
    cards.append({'id':key,'name':name,'cards':deck})
cards.append({'id':'actions','name':'קלפי פעולה','type':'action','cards':[{'number':r[1],'a':r[2],'ideas_a':'','b':'','ideas_b':'','followups':[]} for r in card_sheets[8][1:] if len(r)>2 and r[2].strip()]})

reflections={}
for key,rows in zip(['matters','pleasant','gratitude'],sheets(read('mindful-moments')['content'])):
    content=[]
    for r in rows[1:]:
        if len(r)>4 and r[3].strip() and r[1] not in ['Screen']:
            content.append({'screen':r[1].strip(),'field':r[2].strip(),'english':r[3].strip(),'hebrew':r[4].strip(),'female':r[5].strip() if len(r)>5 else ''})
    reflections[key]=content

# Daily app minutes per weekly cycle day, summed from each day's activities in Protocol.xlsx
# (columns A day, B activity, C duration). The light-speech sheet also lists its own totals,
# which disagree for day 7 (23 listed vs 25 summed); the owner confirmed 25 (2026-11-02), the sum.
protocol_book=ACTIVITY_SHEETS/'Protocol.xlsx'
sources['protocol']={'title':'Protocol.xlsx','updated_at':modified(protocol_book),'path':str(protocol_book.relative_to(ROOT))}
daily={}
for key,sheet in [('light','Light speech'),('heavy','Heavy speech')]:
    totals,day=defaultdict(float),None
    for r in workbook(protocol_book)[sheet][3:]:
        if r.get('A','').startswith('Day'):
            day=int(r['A'].split()[1])
        if day and r.get('B','').strip() and r.get('C','').strip():
            totals[day]+=float(r['C'])
    assert sorted(totals)==list(range(1,8)), (sheet,dict(totals))
    daily[key]=[int(totals[d]) if totals[d].is_integer() else totals[d] for d in range(1,8)]
# The whole app day as Protocol.xlsx lays it out: each weekly cycle day's activities in order (columns A-F,
# cell text as written, trailing spaces trimmed), and the first-month content status of each module.
protocol={}
for key,sheet in [('light','Light speech'),('heavy','Heavy speech')]:
    days,day=[[] for _ in range(7)],None
    for r in workbook(protocol_book)[sheet][3:]:
        if r.get('A','').startswith('Day'):
            day=int(r['A'].split()[1])
        if day and r.get('B','').strip() and r.get('C','').strip():
            minutes=float(r['C'])
            days[day-1].append({'activity':r['B'].strip(),'minutes':int(minutes) if minutes.is_integer() else minutes,'rounds':r.get('D','').strip(),
                                'time_since_med':r.get('E','').strip(),'category':r.get('F','').strip()})
    protocol[key]={'sheet':sheet,'days':days}
status_rows,area=[],''
for r in workbook(protocol_book)['Status 1st month']:
    area=r.get('A','').strip() or area
    item=r.get('B','').strip() or (r.get('A','').strip() if any(r.get(c,'').strip() for c in 'CDEF') else '')
    if item and item!='Trailers':
        status_rows.append({'area':area,'item':item,'trailers':r.get('C','').strip(),'content':r.get('D','').strip(),
                            'non_video_content':r.get('E','').strip(),'copy':r.get('F','').strip(),'note':r.get('G','').strip()})
protocol['status']=status_rows
# The other modules' own content for those slots: each activity's pre-page rows from the content metadata
# (cell text as written; 'Before you begin' in its male form, as the psychology pre-pages use), and the
# Word scripts in sources/module-scripts that narrate them. A PT workout's script is the file named by the
# workout code in its title; the OT and speech-free rows have none or share the OT files.
module_rows={r[2]:r for r in sheets(read('metadata')['content'])[1] if len(r)>26 and re.fullmatch(r'(PT|OT|SP|CO)-CONT-\d+',r[2])}
MODULE_PAGES={'PT practice':['PT-CONT-%03d'%i for i in range(1,7)],'OT practice':['OT-CONT-%03d'%i for i in range(3,12)],
              'Sustained P':['SP-CONT-005'],'Pitch glides':['SP-CONT-003'],'Reading':['SP-CONT-004'],'Speech Reading':['SP-CONT-004'],
              'TipTap':['OT-CONT-002'],'Orchestra':['OT-CONT-001'],'Maze play':['CO-CONT-003']}
PAGE_SCRIPTS={'SP-CONT-003':['sp-pitch-glides'],'SP-CONT-004':['sp-reading'],'SP-CONT-005':['sp-sustained'],'CO-CONT-003':['co-maze-why']}
# The game intros share the OT prompter file: each page quotes its own section, from its heading to the next one.
PAGE_EXCERPTS={'OT-CONT-001':[{'script':'ot-prompter-23-8','from':'אינטרו - אצבעות מנגנות','to':'אינטרו לטיפ טפ'}],
               'OT-CONT-002':[{'script':'ot-prompter-23-8','from':'אינטרו לטיפ טפ','to':''}]}
MODULE_SCRIPTS={'OT practice':['ot-prompter-merged','ot-prompter-23-8','ot-dry-run']}
script_dir=ROOT/'sources/module-scripts'
modules={}
for name,ids in MODULE_PAGES.items():
    pages=[]
    for cid in ids:
        r=module_rows[cid]
        code=re.match(r'([A-C]\d):',r[6].strip())
        scripts=PAGE_SCRIPTS.get(cid,[])+([f'pt-{code[1]}'] if cid.startswith('PT-') and code and (script_dir/f'pt-{code[1]}.json').exists() else [])
        pages.append({'id':cid,'code':code[1] if code else '','title':r[6].strip(),'english':r[7].strip(),'subtitle':r[8].strip(),'lead':r[20].strip(),
                      'equipment':r[23].strip(),'safety':r[26].strip(),'type':r[10].strip(),'scripts':scripts,'excerpts':PAGE_EXCERPTS.get(cid,[])})
    modules[name]={'pages':pages,'scripts':MODULE_SCRIPTS.get(name,[])}
protocol['modules']=modules
protocol['scripts']={f.stem:{'title':json.loads(f.read_text())['title'],'url':json.loads(f.read_text())['url'],'updated_at':json.loads(f.read_text())['updated_at'],
                             'path':str(f.relative_to(ROOT))} for f in sorted(script_dir.glob('*.json'))}
manifest={'schema':1,'built_at':'2026-11-01','sources':sources,'clips':clips,'activities':activities,'sessions':sessions,'groups':dict(groups),'thoughts':thoughts,'cards':cards,'reflections':reflections,'daily_totals_minutes':daily,'protocol':protocol,
 'assumptions':[
 'The V0 session numbers control the psychology sequence. App day 1 is orientation; psychology S01 is shown as app day 2. Weekly cycle alignment is editable because the sources do not define the exact offset.',
 'Protocol.xlsx reserves 3 minutes for psychology. Its remaining minutes are shown as a comparison scenario, not verified actual app runtime.',
 'The first psychology session includes the earlier spec’s motivation selection (approximately 1 minute), in addition to the film. Other reading, feedback and navigation time is left unestimated and measured during use.',
 'Breathing defaults: belly 3-in/5-out and box 3/3/3/3 follow the supplied narration. Coherent 5.5/5.5 and sigh 2/1/6 follow the saved prototype; these remain implementation assumptions. Durations are editable and are not shortened to meet the budget.',
 'Inner Voice draws eight source thoughts per round. Flexible thinking uses the source workbook General bank. Cardversation defaults to two cards, with more cards available. The four question decks each have two questions per card; the separate Action Cards deck is optional. Counts and optional deck access are prototype settings; final stopping rules were not established in the sources.',
 'Reflection prompts use the current authored flow. Long-press pacing is a prototype interaction, with a button alternative. Post-session helpfulness and favorites implement the earlier spec; final per-session configuration is unresolved. The Keep screen is optional and disabled by default because final per-session key points have not been supplied. Its preview uses source excerpts and is excluded from complete timing tests.',
 'Missing recordings and videos retain their full planned slots. Simulated and skipped runs are excluded from complete experience measurements.',
 'For missing PMR, body-scan, self-compassion and I-am-enough recordings, the planning duration may include the trailer. Time ranges retain both interpretations instead of automatically adding the same planned introduction twice. Shared group/method introductions are played once within a flow.',
 'Source conflict: 047 is labeled breathing in V0/metadata, but its current Hebrew production script is mindfulness text and closely matches the older Lab S28. The retrieved source video is held out of the breathing flow for verification. The current app videos 013 and 029 are used for their intended sessions because the older Lab S28 and S08 scripts differ materially from the October scripts. All original Lab animations are preserved.'
 ]}
(HERE/'program.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print(json.dumps({'sessions':len(sessions),'activities':len(activities),'choice_groups':len(groups),'thoughts':sum(map(len,thoughts.values())),'cards':sum(len(d['cards']) for d in cards),'recorded_practices':sum(bool(a.get('audio')) for a in activities.values()),'missing_recordings':[a['id'] for a in activities.values() if a['kind']=='audio' and not a.get('audio')],'missing_videos':[a['id'] for a in activities.values() if a['kind']=='video' and not a['clip']]},ensure_ascii=False))
