import {chromium} from 'playwright';
import {browserOptions} from '../../scripts/browser.mjs';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const [mode,...sids]=process.argv.slice(2);
const root=resolve('.'),manifest=JSON.parse(readFileSync(root+'/psych-lab/production/manifest.json','utf8'));
const browser=await chromium.launch(browserOptions());
try{
 for(const sid of sids){
  const out=root+'/psych-lab/production/review/'+sid;mkdirSync(out,{recursive:true});
  const page=await browser.newPage({viewport:{width:mode==='storyboard'?2600:1080,height:mode==='storyboard'?1400:1080}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  if(mode==='storyboard'){
   await page.goto('http://127.0.0.1:63684/project/scripts/'+sid+'Story.dc.html',{waitUntil:'load'});
   await page.locator('#dc-root section').first().waitFor();await page.evaluate(()=>document.fonts.ready);
   const sections=page.locator('#dc-root section');
   for(let i=0;i<await sections.count();i++){const file=out+'/story-act-'+(i+1)+'.png';await sections.nth(i).screenshot({path:file});console.log(file);}
   const frames=page.locator('#dc-root section svg');
   for(let i=0;i<await frames.count();i++)await frames.nth(i).screenshot({path:out+'/rough-'+String(i+1).padStart(3,'0')+'.png'});
   const height=await page.locator('#dc-root').evaluate(e=>e.scrollHeight);console.log(JSON.stringify({sid,storyboardHeight:height,errors}));
   writeFileSync(out+'/storyboard-check.json',JSON.stringify({sid,height,errors})+'\n');
  }else{
   const film='film'+sid.slice(1).replace(/^0+/,'');
   await page.goto(pathToFileURL(root+'/animation-kit/'+film+'/harness.html').href,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
   const checks=[];
   for(let i=0;i<manifest[sid].times.length;i++){
    const [a,b]=manifest[sid].times[i];
    for(let sample=0;sample<2;sample++){
     const t=a+(b-a)*(sample===0?.22:.78);await page.evaluate(at=>window.renderAt(at),t);
     const file=out+'/source-'+String(i+1).padStart(3,'0')+'-'+(sample+1)+'.png';await page.screenshot({path:file});
     const overflow=await page.locator('.cont-label:visible').evaluateAll(els=>els.filter(e=>{const r=e.getBoundingClientRect();return r.left<-.5||r.right>1080.5||r.top<-.5||r.bottom>1080.5;}).map(e=>({text:e.textContent,rect:e.getBoundingClientRect().toJSON()})));
     checks.push({part:i+1,sample:sample+1,time:t,overflow});
    }
   }
   if(errors.length||checks.some(c=>c.overflow.length))throw Error(JSON.stringify({sid,errors,checks:checks.filter(c=>c.overflow.length)}));
   const plan=JSON.parse(readFileSync(root+'/animation-kit/'+film+'/src/plan.json','utf8'));
   const counts=[];
   for(const phase of plan.counts||[])for(const word of phase.words){
    await page.evaluate(at=>window.renderAt(at),word.at+.08);
    const el=page.locator('.cont-count');
    const actual=await el.textContent(),visible=await el.isVisible();
    if(actual!==word.text||!visible)throw Error(JSON.stringify({sid,count:word,actual,visible}));
    const file=out+'/count-'+String(counts.length+1).padStart(2,'0')+'.png';await page.screenshot({path:file});
    counts.push({at:word.at,text:actual,visible});
   }
   writeFileSync(out+'/count-check.json',JSON.stringify(counts,null,2));
   writeFileSync(out+'/source-check.json',JSON.stringify({sid,errors,checks},null,2));console.log(JSON.stringify({sid,parts:manifest[sid].times.length,errors,overflow:0}));
  }
  await page.close();
 }
}finally{await browser.close();}
