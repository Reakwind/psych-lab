// Render the existing deterministic scene harness to an MP4 with the final recorded voice.
// Frames stream to FFmpeg; no intermediate JPEG directory is needed.
import {chromium} from 'playwright';
import {browserOptions} from '../../scripts/browser.mjs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdirSync,renameSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const [harnessArg,audioArg,movieArg]=process.argv.slice(2);
if(!movieArg)throw Error('Usage: render.mjs harness.html final-voice.m4a output.mp4');
const harness=resolve(harnessArg),audio=resolve(audioArg),movie=resolve(movieArg);
const temporary=movie.replace(/\.mp4$/,'.part.mp4');
mkdirSync(dirname(movie),{recursive:true});
let browser,encoder,encoderCode,encoderError='';
try {
 browser=await chromium.launch({...browserOptions(),args:['--hide-scrollbars','--force-device-scale-factor=1']});
 const page=await browser.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(pathToFileURL(harness).href,{waitUntil:'load'});
 await page.evaluate(()=>document.fonts.ready);
 const duration=await page.evaluate(()=>window.DURATION);
 if(!Number.isFinite(duration)||duration<=0||errors.length)throw Error(JSON.stringify({duration,errors}));
 const fps=30,frames=Math.ceil(duration*fps),cdp=await page.context().newCDPSession(page);
 encoder=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-vcodec','mjpeg','-framerate',String(fps),'-i','pipe:0','-i',audio,
  '-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-threads','2',
  '-c:a','aac','-b:a','128k','-shortest','-movflags','+faststart',temporary],{stdio:['pipe','ignore','pipe']});
 encoder.stderr.on('data',data=>{encoderError+=data.toString();});
 const done=new Promise((ok,fail)=>{encoder.once('error',fail);encoder.once('close',code=>{encoderCode=code;code===0?ok():fail(Error('FFmpeg '+code+': '+encoderError));});});
 // Attach a handler while frames are written, so an encoder failure is always observed.
 done.catch(()=>{});
 const started=Date.now();
 for(let frame=0;frame<frames;frame++){
  if(encoderCode!=null)throw Error('Encoder stopped early: '+encoderError);
  if(errors.length)throw Error(errors.join('\n'));
  await page.evaluate(t=>{window.renderAt(t);document.getElementById('stage').getBoundingClientRect();},frame/fps);
  const shot=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:92,fromSurface:true,optimizeForSpeed:true,clip:{x:0,y:0,width:1080,height:1080,scale:1}});
  if(!encoder.stdin.write(Buffer.from(shot.data,'base64')))await once(encoder.stdin,'drain');
  if(frame%600===0||frame===frames-1){
   const progress={frame:frame+1,frames,percent:Math.round((frame+1)/frames*100),elapsed_seconds:Math.round((Date.now()-started)/1000),duration};
   writeFileSync(movie.replace(/\.mp4$/,'.progress.json'),JSON.stringify(progress));
   process.stdout.write(JSON.stringify(progress)+'\n');
  }
 }
 encoder.stdin.end();
 await done;
 renameSync(temporary,movie);
 process.stdout.write(JSON.stringify({complete:movie,frames,fps,duration})+'\n');
}catch(error){if(encoder&&encoderCode==null)encoder.kill('SIGTERM');throw error;}
finally{if(browser)await browser.close();}
