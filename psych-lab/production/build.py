"""Build a storyboard first, then a film only after its storyboard has been reviewed."""
import argparse
import copy
import html
import json
import re
import subprocess
import sys
from pathlib import Path

from manage import HERE, KIT, MANIFEST, ROOT, film_dir, save_state
from plans import PLANS
sys.path.insert(0,str(KIT))
import sb_common as sb


def normalize(text):
    return re.sub(r'[^\w\u0590-\u05ff]+','',text).lower()


def speech_intervals(sid,start,end):
    cur=start;intervals=[]
    for match in re.finditer(r'([\d.]+)\(([\d.]+)\)',(KIT/'audio'/(sid.lower()+'-pauses.txt')).read_text()):
        a=float(match[1]);b=a+float(match[2])
        if b<=start or a>=end:continue
        if a>cur:intervals.append((cur,min(a,end)))
        cur=max(cur,b)
    if cur<end:intervals.append((cur,end))
    return [(a,b) for a,b in intervals if b-a>.1]


def word_time(sid,index,phrase):
    row=MANIFEST[sid];line=row['narration'][index];start,end=row['times'][index]
    position=line.find(phrase)
    if position<0:return .15
    intervals=speech_intervals(sid,start,end)
    wanted=position/max(1,len(line))*sum(b-a for a,b in intervals)
    for a,b in intervals:
        if wanted<=b-a:return round(a-start+wanted,3)
        wanted-=b-a
    return .15


def specification(sid):
    plan=copy.deepcopy(PLANS[sid]);row=MANIFEST[sid]
    assert len(plan['shots'])==len(row['narration']),(sid,len(plan['shots']),len(row['narration']))
    full=normalize(' '.join(row['narration'])+' '+row['title'])
    for i,(shot,(start,end)) in enumerate(zip(plan['shots'],row['times'])):
        shot.update(start=start,end=end)
        for text in shot['labels']:
            assert normalize(text['text']) in full,(sid,i+1,'non-source label',text['text'])
            text.setdefault('at',word_time(sid,i,text.get('cue',text['text'])))
            if shot.get('world')=='torso' and text['y']<200:
                text.update(x=230,y=50,width=400)
        for prop in shot['objects']:
            if prop.get('cue'):prop['at']=word_time(sid,i,prop['cue'])
    plan['breathing']=[]
    for part,begin,finish in plan.get('breath_parts',[]):
        start,end=row['times'][part-1]
        plan['breathing'].append(dict(start=start,end=end,**{'from':begin,'to':finish}))
    if sid=='S33a':
        start,end=row['times'][1];span=end-start
        plan['breathing']=[p for p in plan['breathing'] if p['start']!=start]+[
            {'start':start,'end':start+span*.38,'from':.15,'to':.8},
            {'start':start+span*.38,'end':start+span*.5,'from':.8,'to':1},
            {'start':start+span*.5,'end':end,'from':1,'to':.15}]
    plan['counts']=[]
    for part,words in plan.get('count_parts',[]):
        start,end=row['times'][part-1];intervals=speech_intervals(sid,start,end)
        selected=intervals[-len(words):] if len(words)==3 else intervals[:len(words)]
        assert len(selected)==len(words),(sid,part,intervals)
        plan['counts'].append({'start':start,'end':end,'words':[{'at':a,'text':word} for (a,b),word in zip(selected,words)]})
    return dict(id=sid,**plan)


def rough_object(prop):
    x=prop['x']*342/1080;y=prop['y']/3+20;s=prop.get('s',1)
    kind=prop['kind'];art=''
    ink=sb.INK
    def circle(inner):return f'<circle r="26" fill="#FFF1CC" stroke="{ink}" stroke-width="1.6"/>'+inner
    if kind in ['friend','friendB']:
        return f'<g transform="translate({x-171:.1f} {y-318:.1f})">'+sb.friend(171,'#B07AA1' if kind=='friendB' else '#79A88C')+'</g>'
    if kind=='voice':
        art=f'<path d="M-25 8 C-38 8 -36 -12 -23 -13 C-23 -30 0 -32 7 -22 C22 -30 36 -14 28 0 C38 12 18 17 5 12 L-10 24 L-8 12Z" fill="{"#FFE3A8" if prop.get("warm",0)>.5 else "#D7DCE2"}" stroke="{ink}" stroke-width="1.7"/><circle cx="-7" cy="-3" r="2"/><circle cx="9" cy="-3" r="2"/><path d="M-6 7 q7 6 14 0" fill="none" stroke="{ink}"/>'
    elif kind=='rain':art=f'<path d="M-25 0 C-36 0 -32 -16 -22 -16 C-20 -32 0 -34 7 -23 C25 -32 36 -12 28 0Z" fill="#AAB9C4" stroke="{ink}"/><path d="M-16 7 l-4 9 M0 7 l-4 9 M16 7 l-4 9" stroke="#5B8DB8" stroke-width="2"/>'
    elif kind=='breath':art=f'<circle r="38" fill="#C9E1D8" stroke="#2B6A62" stroke-width="2"/><circle r="24" fill="#94C8BA"/>'
    elif kind=='attention':art=f'<circle r="40" fill="#FFC93C" fill-opacity=".12" stroke="#E8A33D" stroke-width="2" stroke-dasharray="4 4"/>'
    elif kind=='compass':art=circle(f'<path d="M0 -20 L6 0 L0 20 L-6 0Z" fill="{sb.AMBER}" stroke="{ink}"/>')
    elif kind=='heart':art=circle('<path d="M0 12 C-24 0 -14 -20 0 -8 C14 -20 24 0 0 12Z" fill="#D79161"/>')
    elif kind=='thought':art=circle(f'<path d="M-15 8 q-12 -10 0 -17 q8 -12 16 -3 q20 -2 14 14Z" fill="#B3BCC9"/><circle cx="-6" r="2"/><circle cx="2" r="2"/><circle cx="10" r="2"/>')
    elif kind=='body':art=circle(f'<circle cy="-9" r="6" fill="{sb.SKIN}"/><path d="M-12 18 v-16 q12 -12 24 0 v16Z" fill="#2B6A62"/>')
    elif kind=='hand':art=circle(f'<path d="M-11 14 l-3 -18 q-2 -6 3 -6 l4 7 v-18 q0 -6 4 -6 q4 0 4 6 v12 v-17 q0 -6 4 -6 q4 0 4 6 v17 v-11 q0 -6 4 -6 q4 0 4 6 v24 q0 13 -13 13Z" fill="{sb.SKIN}" stroke="{ink}" stroke-width="1.3"/>')
    elif kind=='feet':art=circle(f'<path d="M-16 -17 h9 v30 h-9Z M7 -17 h9 v30 h-9Z" fill="{sb.SKIN}"/><path d="M-18 10 h9 l7 8 h-22Z M5 10 h9 l7 8 h-22Z" fill="#5D6B7A"/>')
    elif kind=='ear':art=circle(f'<path d="M-7 13 C-19 -2 -12 -22 5 -20 C21 -18 18 0 7 8 Q4 23 -7 13 M-5 5 Q-14 -8 0 -11 Q12 -8 2 2" fill="none" stroke="{ink}" stroke-width="2.5"/>')
    elif kind=='tools':return ''.join(sb.tool(x+(2-k)*32,y,k,12) for k in range(5))
    elif kind=='phone':art=f'<rect x="-15" y="-28" width="30" height="56" rx="6" fill="{ink}"/><rect x="-11" y="-21" width="22" height="42" rx="3" fill="#DCEBF2"/><circle cy="-6" r="6" fill="{sb.SKIN}"/><path d="M-8 15 V4 q8 -8 16 0 v11Z" fill="#5B8DB8"/>'
    elif kind=='bed':art=f'<rect x="-70" y="-15" width="140" height="48" rx="8" fill="#CFAE81" stroke="{ink}"/><rect x="-65" y="-28" width="130" height="42" rx="7" fill="#FFFFFF" stroke="{ink}"/><rect x="-60" y="-22" width="28" height="28" rx="6" fill="#DBE7DF"/><rect x="-25" y="-25" width="84" height="36" rx="5" fill="#E9C98E"/>'
    elif kind=='moon':art='<circle r="24" fill="#F1CE75"/><circle cx="11" cy="-8" r="23" fill="#DCE0E9"/>'
    elif kind=='clock':art=circle(f'<path d="M0 -18 V0 L12 6" stroke="{ink}" stroke-width="2" fill="none"/>')
    elif kind=='tremor':art=f'<path d="M0 -10 q5 -6 10 0 t10 0 M0 0 q5 -6 10 0 t10 0 M0 10 q5 -6 10 0 t10 0" fill="none" stroke="{ink}" stroke-width="2"/>'
    elif kind=='lamp':art=f'<path d="M-24 -25 H24 L34 5 H-34Z" fill="#F1CE75" stroke="{ink}"/><path d="M0 5 V60 M-20 60 H20" stroke="{ink}" stroke-width="3"/>'
    elif kind=='tracker':return ''.join(f'<ellipse cx="{x+(1-k)*40}" cy="{y}" rx="17" ry="7" fill="{sb.SPARK if k==prop.get("step",0) else "#D9CBB0"}" stroke="{ink}"/><text x="{x+(1-k)*40}" y="{y-12}" text-anchor="middle" font-size="12">{k+1}</text>' for k in range(3))
    elif kind=='bear':art=f'<ellipse cy="14" rx="29" ry="30" fill="#FFFFFF" stroke="{ink}"/><circle cx="-18" cy="-25" r="8" fill="#FFFFFF" stroke="{ink}"/><circle cx="18" cy="-25" r="8" fill="#FFFFFF" stroke="{ink}"/><circle cy="-12" r="23" fill="#FFFFFF" stroke="{ink}"/><circle cx="-8" cy="-14" r="2"/><circle cx="8" cy="-14" r="2"/><ellipse cy="-6" rx="5" ry="3" fill="{ink}"/>'
    elif kind=='meditation':art=f'<rect x="-40" y="-48" width="80" height="96" rx="9" fill="#FFFFFF" stroke="{ink}"/><circle cy="-25" r="10" fill="{sb.SKIN}"/><path d="M-13 13 V-8 Q0 -22 13 -8 V13Z M-25 23 Q0 2 25 23 Q0 33 -25 23Z" fill="#7EB49C" stroke="{ink}"/><path d="M-12 3 L-24 20 M12 3 L24 20" stroke="{ink}" stroke-width="2"/>'
    elif kind=='chess':
        art=''.join(f'<rect x="{-64+k%8*16}" y="{-64+k//8*16}" width="16" height="16" fill="{"#4E8B7B" if (k+k//8)%2 else "#FFFFFF"}"/>' for k in range(64))
        art+=''.join(f'<circle cx="{-48+(k%4)*32}" cy="{-34 if k<4 else 34}" r="10" fill="{"#FFFFFF" if k<4 else "#53616C"}" stroke="{ink}"/>' for k in range(8))
    elif kind=='radio':art=f'<rect x="-70" y="-32" width="140" height="76" rx="12" fill="#E3CBA5" stroke="{ink}"/><rect x="-58" y="-22" width="116" height="12" rx="4" fill="{ink}"/>'+''.join(f'<circle cx="{x0}" cy="18" r="17" fill="#FFFFFF" stroke="{ink}"/><path d="M{x0} 18 v-12" stroke="{ink}" stroke-width="2"/>' for x0 in [-35,35])
    elif kind=='battery':art=sb.battery(0,0,prop.get('level',.5),w=30,h=55,label=False)
    elif kind=='question':art=circle(f'<text text-anchor="middle" y="11" font-size="32" fill="{sb.AMBER}">?</text>')
    elif kind=='mug':art=f'<path d="M-20 -12 H20 V20 Q0 34 -20 20Z" fill="#B3D4CC" stroke="{ink}"/><path d="M20 -6 Q44 -8 30 14 H20" fill="none" stroke="{ink}" stroke-width="2"/>'
    elif kind=='kettle':art=f'<path d="M-25 14 Q-32 -21 -18 -28 H18 Q32 -21 25 14Z" fill="#BCD3CD" stroke="{ink}" stroke-width="2"/><path d="M25 -20 Q50 -20 38 6 H28 M-10 -40 q-8 -9 0 -16 M8 -40 q-8 -9 0 -16" fill="none" stroke="{ink}" stroke-width="2"/>'
    elif kind=='dinner':art=f'<ellipse cy="5" rx="57" ry="20" fill="#D8B98B" stroke="{ink}"/><path d="M-40 13 v38 M40 13 v38" stroke="{ink}" stroke-width="4"/>'+''.join(f'<ellipse cx="{px}" cy="1" rx="11" ry="6" fill="#FFFFFF" stroke="{ink}"/>' for px in [-30,0,30])
    elif kind=='book':art=f'<path d="M0 -20 Q-20 -32 -40 -22 V28 Q-20 18 0 32 Q20 18 40 28 V-22 Q20 -32 0 -20Z" fill="#FFFFFF" stroke="{ink}"/><path d="M0 -20 V32" stroke="{ink}"/>'
    elif kind in ['message','notice']:art=f'<rect x="-42" y="-25" width="84" height="50" rx="10" fill="#FFFFFF" stroke="{ink}"/><path d="M-28 -8 H28 M-28 8 H10" stroke="{ink}" stroke-width="2"/>'
    elif kind=='flag':art=f'<path d="M-15 40 V-40" stroke="{ink}" stroke-width="3"/><path d="M-15 -40 H25 L13 -22 L25 -6 H-15Z" fill="{sb.AMBER}" stroke="{ink}"/>'
    elif kind=='road':art=f'<rect x="-120" y="-40" width="240" height="80" rx="10" fill="#8A949C"/><path d="M-120 0 H120" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="12 10"/>'+''.join(f'<rect x="{-100+k*60}" y="{-28 if k%2 else 10}" width="35" height="16" rx="6" fill="{sb.AMBER if k==0 else "#FFFFFF"}"/>' for k in range(4))
    else:art=circle(f'<path d="M-14 1 L-3 12 L17 -12" fill="none" stroke="#2B6A62" stroke-width="5"/>')
    return f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.3f})">{art}</g>'


def sketch(shot):
    world=shot.get('world','room');char=shot.get('character',{});x=char.get('x',310)*342/1080
    if world=='path':art=sb.land(sun=True)+sb.stones(sb.PATH,lit=(0,1,2))+sb.ruth(x,'stand')
    elif world in ['mat','bed']:
        art=sb.room()+sb.mat(30,285,270)+sb.cushion(52,275)+sb.ruth_lie(90,270)
        if world=='bed':art+=sb.cushion(52,275)
    elif world=='torso':art=sb.torso(belly=.6,chest=.2,flow='in')
    elif world=='shore':art=f'<rect width="342" height="360" fill="#E7F0EE"/><rect y="170" width="342" height="190" fill="#B7D3CF"/><path d="M0 275 Q90 250 171 278 T342 275 V360 H0Z" fill="#E9D1A7"/>'+sb.wave(0,220,342,10,2)+sb.chair()+sb.ruth(x)
    else:art=sb.room()+('' if char.get('pose')=='stand' else sb.chair())+sb.ruth(x,'stand' if char.get('pose')=='stand' else 'sit')
    for prop in shot['objects']:art+=rough_object(prop)
    for text in shot['labels']:
        x=text['x']*342/1080;y=min(338,text['y']/3+20);words=text['text'].split();rows=[];row=''
        max_chars=min(35,max(12,int(text.get('width',900)/22)))
        for word in words:
            if len(row+' '+word)>max_chars and row:rows.append(row);row=word
            else:row=(row+' '+word).strip()
        if row:rows.append(row)
        for i,row in enumerate(rows):art+=sb.lbl(x,y+(i-(len(rows)-1)/2)*28,row,fill='#FFF1CC' if text.get('kind')=='warm' else '#FFFFFF',size=11)
    return art


def storyboard(sid):
    spec=specification(sid);row=MANIFEST[sid]
    acts=spec['acts'] or [(start,min(start+4,len(spec['shots'])),'A continuing story') for start in range(1,len(spec['shots'])+1,5)]
    act_rows=[(i+1,'Act '+str(i+1)+' · '+name,list(range(a,b+1)), ' '.join(s['description'] for s in spec['shots'][a-1:b])) for i,(a,b,name) in enumerate(acts)]
    shots={}
    for i,s in enumerate(spec['shots']):
        rough=copy.deepcopy(s)
        for count in spec.get('counts',[]):
            if count['start']==s['start'] and not rough['labels']:
                rough['labels']=[{'text':count['words'][0]['text'],'x':540,'y':80,'width':900}]
        shots[i+1]=sketch(rough)
    descriptions={i+1:(s['description'],'Ruth, her room, the recurring props and the current narrated idea.','Move the existing objects; bring each new element in on its narration cue.') for i,s in enumerate(spec['shots'])}
    path=KIT/'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts'/(sid+'Story.dc.html')
    sb.build(str(path),row['times'],row['narration'],shots,act_rows,descriptions,row['title'],spec['idea'],spec['sound_off'],
             [('0 0 342 360',sb.room()+sb.chair()+sb.ruth(150),'<strong>The same world.</strong> Ruth, her room and the familiar path.'),
              ('0 0 342 360',shots[1],'<strong>The central idea.</strong> One developing story, with the audio preserved.')],
             ['<strong>Text</strong> is selected from the final narration.','<strong>Audio</strong> uses the final recording and its original part boundaries.','<strong>Review</strong> every shot for continuity and phone readability before rendering.'],'Continuity and source fidelity')
    save_state(sid,storyboard=True,status='storyboard')
    print(path)


def film(sid):
    state=json.loads((HERE/'state.json').read_text())['sessions'][sid]
    assert state.get('storyboard_reviewed'),sid+' storyboard must be reviewed first'
    spec=specification(sid);folder=film_dir(sid);src=folder/'src';src.mkdir(parents=True,exist_ok=True)
    for name in ['shared.js','base.css']:
        path=src/name
        if not path.exists():path.symlink_to(Path('../../kit')/name)
    existing=(src/'extra.js').read_text() if sid=='S48' else ''
    marker='// Continuous scenes for the remaining films.'
    if marker in existing:existing=existing.split(marker)[0]
    (src/'extra.js').write_text(existing+'\n'+(HERE/'continuity.js').read_text())
    (src/'extra.css').write_text((HERE/'continuity.css').read_text())
    (src/'plan.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2)+'\n')
    scene_id='continuous-'+sid.lower()
    (src/('scene-'+scene_id+'.js')).write_text('R.continuous(kit,'+json.dumps(spec,ensure_ascii=False,separators=(',',':'))+');\n')
    (src/'scenes.json').write_text(json.dumps({'v':1,'width':1080,'height':1080,'fps':30,'background':'#F3EEE4','scenes':[{'id':scene_id,'dur':MANIFEST[sid]['expected_duration']}]})+'\n')
    subprocess.run([sys.executable,'-I',KIT/'build_harness.py',folder],check=True)
    save_state(sid,status='animating')


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('action',choices=['storyboard','film','reviewed']);parser.add_argument('sessions',nargs='+');args=parser.parse_args()
    for sid in args.sessions:
        if args.action=='reviewed':save_state(sid,storyboard_reviewed=True)
        else:globals()[args.action](sid)
