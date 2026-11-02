import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {sessionSteps,chooseSteps,sessionRange,thoughtTheme} from './core.mjs';
const p=JSON.parse(fs.readFileSync(new URL('./program.json',import.meta.url)));
const session=n=>p.sessions.find(s=>s.number===n);

test('every sourced session and every choice branch resolves to a playable or explicit missing-asset step',()=>{
  assert.equal(p.sessions.length,87);
  assert.deepEqual(p.sessions.map(s=>s.number),Array.from({length:87},(_,i)=>i+1));
  for(const s of p.sessions){
    const steps=sessionSteps(p,s);
    assert.equal(steps.at(-1).kind,'complete');
    for(const o of s.activities){
      assert.ok(p.activities[o.id]);
      const a=p.activities[o.id];
      for(const option of a.options||[]){
        const branch=chooseSteps(p,option.id,s,{}, {},option.parameter);
        assert.ok(branch.some(st=>['video','audio','breathing','inner','cards','reflection'].includes(st.kind)));
        assert.ok(branch.every(st=>st.activity===option.id));
      }
    }
    const r=sessionRange(p,s);
    assert.ok(Number.isFinite(r.low)&&r.low>0&&r.high>=r.low);
  }
});
test('S03 retains both films and the separate full belly-breathing activity',()=>{
  const steps=sessionSteps(p,session(3));
  assert.deepEqual(steps.filter(x=>x.kind==='video').map(x=>x.clip.id),['S03a','S03b']);
  assert.ok(steps.findIndex(x=>x.kind==='breathing')>steps.findIndex(x=>x.clip?.id==='S03b'));
  const r=sessionRange(p,session(3));assert.ok(r.low>469+179);
});
test('the first-session estimate includes the spec’s approximate minute for choosing a motivation',()=>{
  const r=sessionRange(p,session(1));
  assert.equal(r.low,p.clips.S01.seconds+60);
});
test('S33 chooses one method; optional sibling trailers are never queued before the choice',()=>{
  const base=sessionSteps(p,session(33));
  assert.equal(base.filter(s=>s.kind==='choice').length,1);
  assert.ok(!base.some(s=>['S33a','S33b'].includes(s.clip?.id)));
  const coherent=chooseSteps(p,'PS-ACT-020',session(33));
  assert.deepEqual(coherent.filter(x=>x.kind==='video').map(x=>x.clip.id),['S33b']);
  assert.equal(coherent.filter(x=>x.kind==='breathing').length,1);
  const sigh=chooseSteps(p,'PS-ACT-019',session(33));
  assert.deepEqual(sigh.filter(x=>x.kind==='video').map(x=>x.clip.id),['S33a']);
});
test('a selected branch narrows estimates and repeat visits remove intros without removing practices',()=>{
  const s=session(33);
  const selected=sessionRange(p,s,{}, {},{'PS-ACT-006':'PS-ACT-020'});
  assert.equal(selected.low,selected.high);
  const repeat=chooseSteps(p,'PS-ACT-020',s,{intros:'repeat'});
  assert.ok(!repeat.some(x=>x.kind==='video'));
  assert.equal(repeat.find(x=>x.kind==='breathing').seconds,240);
});
test('the conflicted general-intro ID is held out and never replaced with the box-breathing film',()=>{
  const steps=sessionSteps(p,session(15));
  const generic=steps.find(x=>x.source_id==='PS-CONT-047');
  assert.equal(generic.missing,true);assert.equal(generic.clip,null);
  assert.ok(p.activities['PS-CONT-047'].source_conflict);
  assert.equal(steps.filter(x=>x.clip?.id==='S15').length,1);
});
test('the two source-script mismatches use current product clips while retaining the original Lab films',()=>{
  assert.equal(p.activities['PS-CONT-013'].clip.id,'SOURCE-PS-CONT-013');
  assert.equal(p.activities['PS-CONT-029'].clip.id,'SOURCE-PS-CONT-029');
  assert.ok(p.clips.S28&&p.clips.S08);
});
test('a shared choice-group trailer is not played or counted a second time for its chosen method',()=>{
  const s=session(41);
  const base=sessionSteps(p,s);
  assert.equal(base.filter(x=>x.source_id==='PS-CONT-049').length,1);
  const branch=chooseSteps(p,'PS-CONT-104',s,{}, {},'', ['PS-CONT-049']);
  assert.ok(!branch.some(x=>x.kind==='video'));
  const r=sessionRange(p,s,{}, {},{'PS-ACT-008':'PS-CONT-104'});
  assert.equal(r.high,p.clips.S23.seconds+60);
});
test('uncertain bundled planning minutes are not presented as a precise trailer-plus-practice duration',()=>{
  const r=sessionRange(p,session(21));
  assert.ok(r.high>r.low);
  assert.ok(r.missing.includes('PS-CONT-067'));
});
test('correct source banks and the full reflection flows are retained',()=>{
  assert.equal(thoughtTheme('Unbalanced and balanced thoughts'),'balanced');
  assert.equal(thoughtTheme('Compassion & validation'),'compassion');
  assert.equal(p.cards.filter(x=>x.type!=='action').reduce((n,x)=>n+x.cards.length,0),60);
  assert.equal(p.cards.find(x=>x.type==='action').cards.length,16);
  assert.ok(Object.values(p.thoughts).every(a=>a.length>=20));
  for(const type of ['pleasant','gratitude','matters'])assert.ok(p.reflections[type].some(r=>r.screen==='Summary'));
});
test('local media references exist and the session table contains no broken links disguised as recordings',()=>{
  for(const a of Object.values(p.activities)){
    if(a.clip){const file=a.clip.url.startsWith('/intervention/')?new URL('.'+a.clip.url.slice('/intervention'.length),import.meta.url):new URL('../..'+a.clip.url.slice('/media'.length),import.meta.url);assert.ok(fs.existsSync(file),a.clip.url);}
    if(a.audio)assert.ok(fs.existsSync(new URL('./media/'+a.audio.url.split('/').pop(),import.meta.url)));
    if(a.kind==='audio'&&!a.audio)assert.ok(a.issues.length);
  }
});
