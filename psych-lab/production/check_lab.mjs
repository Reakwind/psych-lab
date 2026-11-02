// Play the actual integrated DC boards through the local Psych Lab viewer.
import {chromium} from 'playwright';
import {browserOptions} from '../../scripts/browser.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const base=process.env.PSYCH_LAB_URL || 'http://127.0.0.1:63684';
const browser=await chromium.launch(browserOptions());
const out=resolve('psych-lab/production/review/lab');mkdirSync(out,{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.request.get(base+'/api/audit'),audit=await response.json();
 const requested=process.argv.slice(2),sids=requested.length?requested:audit.sessions.map(r=>r.id);
 const results=[];
 for(const sid of sids){
  const row=audit.sessions.find(r=>r.id===sid);if(row.status!=='integrated')throw Error(sid+' is not integrated');
  await page.goto(base+'/?session='+sid+'&tab=session',{waitUntil:'load'});
  const frame=page.frameLocator('iframe.board-frame'),video=frame.locator('video');
  await video.waitFor({state:'visible'});
  await video.evaluate(async e=>{if(e.readyState<1)await new Promise((ok,fail)=>{e.addEventListener('loadedmetadata',ok,{once:true});e.addEventListener('error',()=>fail(Error('Media error')),{once:true});});});
  const meta=await video.evaluate(async e=>{e.muted=true;e.currentTime=Math.min(5,e.duration/4);await new Promise(ok=>e.addEventListener('seeked',ok,{once:true}));const start=e.currentTime;await e.play();await new Promise(ok=>setTimeout(ok,250));e.pause();return{duration:e.duration,width:e.videoWidth,height:e.videoHeight,advanced:e.currentTime>start,src:e.currentSrc,error:e.error?.message};});
  if(meta.error||!meta.advanced||meta.width!==1080||meta.height!==1080||Math.abs(meta.duration-row.expected_duration)>.25)throw Error(JSON.stringify({sid,...meta}));
  const record={sid,...meta};results.push(record);console.log(JSON.stringify(record));
 }
 const last=sids.at(-1);
 await page.goto(base+'/?session='+last+'&tab=animation',{waitUntil:'load'});await page.locator('video').waitFor();await page.screenshot({path:out+'/desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/?session='+last+'&tab=session',{waitUntil:'load'});await page.frameLocator('iframe.board-frame').locator('video').waitFor();
 const layout=await page.evaluate(()=>({viewport:innerWidth,body:document.documentElement.scrollWidth}));if(layout.body>layout.viewport)throw Error(JSON.stringify(layout));
 await page.screenshot({path:out+'/phone.png'});
 if(errors.length)throw Error(JSON.stringify(errors));
 writeFileSync(out+'/playback-check.json',JSON.stringify({summary:audit.summary,results,mobile:layout,errors},null,2));
}finally{await browser.close();}
