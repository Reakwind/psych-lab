
// Continuous scenes for the remaining films. The original drawing kit remains the visual authority.
// Every label and timing is supplied by an individually authored, narration-based shot plan.
Object.assign(R, {
  cEsc(text) {return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));},
  cModel(kind,id) {
    const stroke='fill:none;stroke:var(--second);stroke-width:5;stroke-linecap:round;stroke-linejoin:round';
    const disc=inner=>'<circle class="shade" cy="8" r="90"/><circle class="light" r="90" style="stroke:var(--second);stroke-width:5"/>'+inner;
    const heart='<path class="amber-dk" d="M0 42 C-70 0 -46 -58 0 -22 C46 -58 70 0 0 42Z"/>';
    if(kind==='voice')return R.voice(id);
    if(kind==='friend')return R.friend(id,'a','stand');
    if(kind==='friendB')return R.friend(id,'b','stand');
    if(kind==='phone')return R.phone(id,0,0,'nira').replace('width="74"','width="74"');
    if(kind==='mug')return R.mug(id);
    if(kind==='battery')return R.battery(id);
    if(kind==='clock')return R.clock(id);
    if(kind==='calendar')return R.calendar(id);
    if(kind==='ear')return disc('<path style="'+stroke+';stroke-width:8" d="M-25 38 C-36 22 -48 3 -42 -24 C-28 -68 40 -64 48 -20 C56 14 24 26 18 48 C12 78 -20 72 -25 38 M-18 24 C-38 -4 -18 -30 6 -24 C34 -16 20 14 2 18"/>');
    if(kind==='heart')return disc(heart);
    if(kind==='body')return disc('<circle class="skin" cy="-32" r="25"/><path class="knit" d="M-46 58 C-46 -4 -28 -6 0 -6 C28 -6 46 -4 46 58Z"/>');
    if(kind==='thought')return disc('<path class="voice-grey" d="M-50 26 C-84 18 -80 -16 -54 -20 C-56 -58 -10 -64 8 -42 C36 -64 76 -44 66 -14 C92 2 70 30 48 26Z"/><circle class="metal" cx="-22" cy="2" r="6"/><circle class="metal" cy="2" r="6"/><circle class="metal" cx="22" cy="2" r="6"/>');
    if(kind==='breath')return '<g class="'+id+'-pacer"><circle class="'+id+'-ring" r="150" style="fill:var(--main);opacity:.12"/><circle class="'+id+'-core" r="110" style="fill:color-mix(in srgb,var(--main) 22%,var(--ground));stroke:var(--main);stroke-width:8"/></g>';
    if(kind==='attention')return '<circle r="150" style="fill:var(--accent);opacity:.12"/><circle r="150" style="fill:none;stroke:var(--accent);stroke-width:6;stroke-dasharray:14 12"/>';
    if(kind==='tools')return [0,1,2,3,4].map((k)=>'<g transform="translate('+((2-k)*120)+' 0)">'+R.tool(id+'-'+k,k,44)+'</g>').join('');
    if(kind==='rain')return '<path class="slate" d="M-90 10 C-130 4 -116 -48 -78 -48 C-78 -92 -12 -106 8 -70 C46 -102 112 -72 100 -28 C142 -10 120 20 90 20Z"/><path class="'+id+'-drops" style="fill:none;stroke:#5B8DB8;stroke-width:8;stroke-linecap:round" d="M-60 38 l-12 26 M-5 38 l-12 26 M50 38 l-12 26"/>';
    if(kind==='child')return R.child(id);
    if(kind==='toy')return R.toy(id);
    if(kind==='moon')return '<circle class="amber-lt" r="72"/><circle cx="35" cy="-25" r="68" style="fill:#DCE0E9"/><circle class="light" cx="-108" cy="-56" r="6"/><circle class="light" cx="95" cy="70" r="5"/>';
    if(kind==='bed')return '<rect class="wood" x="-245" y="-65" width="490" height="150" rx="28"/><rect class="light" x="-235" y="-100" width="470" height="140" rx="30"/><rect class="cushion" x="-216" y="-82" width="100" height="100" rx="28"/><path class="amber-lt" d="M-102 -92 H208 Q238 -92 238 -62 V40 H-102Z"/><path style="'+stroke+';opacity:.3" d="M-50 -92 V40 M30 -92 V40 M110 -92 V40 M190 -92 V40"/>';
    if(kind==='hand')return disc('<path class="skin" style="stroke:var(--second);stroke-width:5" d="M-36 42 L-42 -2 Q-48 -22 -36 -26 Q-24 -28 -20 -8 L-20 -50 Q-20 -70 -8 -70 Q4 -70 4 -50 V-6 V-58 Q4 -78 16 -78 Q28 -78 28 -58 V-6 V-42 Q28 -62 40 -60 Q52 -58 52 -40 V26 Q50 66 14 70 H0 Q-30 68 -36 42Z"/>');
    if(kind==='feet')return disc('<path class="skin" d="M-48 -60 h30 v90 h-30Z M18 -60 h30 v90 h-30Z"/>'+R.shoe(-68,48)+R.shoe(0,48));
    if(kind==='check')return disc('<path style="fill:none;stroke:var(--main);stroke-width:18;stroke-linecap:round;stroke-linejoin:round" d="M-42 0 L-8 34 L48 -38"/>');
    if(kind==='question')return disc('<text text-anchor="middle" y="32" style="font:600 108px var(--sans);fill:var(--accent)">?</text>');
    if(kind==='compass')return '<circle class="shade" cy="10" r="134"/><circle class="light" r="134" style="stroke:var(--second);stroke-width:7"/><circle class="glass" r="112"/>'+[0,1,2,3].map(k=>'<path style="'+stroke+'" d="M0 -98 v15" transform="rotate('+k*90+')"/>').join('')+'<g class="'+id+'-needle"><path class="amber-dk" d="M0 -90 L24 0 H-24Z"/><path class="knit" d="M0 90 L24 0 H-24Z"/></g><circle class="metal" r="12"/>';
    if(kind==='flag')return '<path style="'+stroke+';stroke-width:9" d="M-20 110 V-120"/><path class="amber" d="M-20 -120 H96 L64 -76 L96 -32 H-20Z"/><ellipse class="shade" cy="114" rx="84" ry="12"/>';
    if(kind==='bear')return '<ellipse class="shade" cy="108" rx="110" ry="16"/><ellipse class="light" cy="35" rx="100" ry="94" style="stroke:var(--second);stroke-width:5"/><circle class="light" cx="-60" cy="-86" r="28" style="stroke:var(--second);stroke-width:5"/><circle class="light" cx="60" cy="-86" r="28" style="stroke:var(--second);stroke-width:5"/><ellipse class="light" cy="-42" rx="83" ry="73" style="stroke:var(--second);stroke-width:5"/><circle class="metal" cx="-28" cy="-48" r="7"/><circle class="metal" cx="28" cy="-48" r="7"/><ellipse class="wall-lo" cy="-14" rx="35" ry="27"/><ellipse class="metal" cy="-22" rx="14" ry="10"/><path style="'+stroke+'" d="M0 -12 v12 m-14 0 q14 14 28 0"/><ellipse class="light" cx="-78" cy="76" rx="38" ry="48" style="stroke:var(--second);stroke-width:5"/><ellipse class="light" cx="78" cy="76" rx="38" ry="48" style="stroke:var(--second);stroke-width:5"/>';
    if(kind==='radio')return '<rect class="shade" x="-250" y="-100" width="500" height="260" rx="36"/><rect class="wood-lt" x="-258" y="-112" width="500" height="260" rx="36" style="stroke:var(--second);stroke-width:6"/><rect class="metal" x="-220" y="-78" width="420" height="32" rx="10"/>'+[-125,115].map((x,k)=>'<g transform="translate('+x+' 46)"><circle class="light" r="64" style="stroke:var(--second);stroke-width:7"/><g class="'+id+'-knob'+k+'"><path style="'+stroke+';stroke-width:10" d="M0 0 V-40"/></g><circle class="metal" r="8"/></g>').join('');
    if(kind==='chess')return '<g class="'+id+'-board">'+Array.from({length:64},(_,i)=>'<rect x="'+(-240+i%8*60)+'" y="'+(-240+Math.floor(i/8)*60)+'" width="60" height="60" class="'+((i+Math.floor(i/8))%2?'knit-lt':'light')+'"/>').join('')+'<rect x="-246" y="-246" width="492" height="492" rx="8" style="fill:none;stroke:var(--second);stroke-width:10"/>'+[0,1,2,3,4,5].map((k)=>'<g class="'+id+'-piece'+k+'" transform="translate('+(-150+(k%3)*150)+' '+(k<3?-130:130)+')"><ellipse class="shade" cy="36" rx="34" ry="12"/><path class="'+(k<3?'light':'slate-dk')+'" d="M-34 32 L-22 8 L-14 -22 H14 L22 8 L34 32Z" style="stroke:var(--second);stroke-width:4"/><circle class="'+(k<3?'light':'slate-dk')+'" cy="-38" r="25" style="stroke:var(--second);stroke-width:4"/></g>').join('')+'</g>';
    if(kind==='road')return '<rect class="grass" x="-440" y="-170" width="880" height="340" rx="35"/><path class="slate" d="M-440 -94 H440 V94 H-440Z"/><path style="fill:none;stroke:var(--ground);stroke-width:6;stroke-dasharray:45 35" d="M-440 0 H440"/>'+[0,1,2,3].map(k=>'<g class="'+id+'-car'+k+'"><rect class="'+(k===0?'amber':'light')+'" x="-54" y="-26" width="108" height="52" rx="18"/><rect class="glass" x="-18" y="-22" width="38" height="44" rx="8"/><rect class="metal" x="-40" y="-33" width="24" height="9" rx="4"/><rect class="metal" x="-40" y="24" width="24" height="9" rx="4"/><rect class="metal" x="22" y="-33" width="24" height="9" rx="4"/><rect class="metal" x="22" y="24" width="24" height="9" rx="4"/></g>').join('');
    if(kind==='kettle')return '<ellipse class="shade" cy="72" rx="100" ry="18"/><path class="glass" d="M-78 40 Q-96 -58 -50 -74 H56 Q92 -54 78 40 L62 66 H-56Z" style="stroke:var(--second);stroke-width:6"/><path style="'+stroke+';stroke-width:13" d="M78 -52 Q154 -58 130 22 Q120 48 86 38"/><rect class="metal" x="-60" y="-82" width="114" height="15" rx="7"/><path class="'+id+'-steam" style="'+stroke+';opacity:.5" d="M-30 -110 q-28 -26 0 -50 M14 -110 q-28 -26 0 -50"/>';
    if(kind==='dinner')return '<ellipse class="shade" cy="26" rx="180" ry="60"/><ellipse class="wood-lt" rx="180" ry="60"/><path class="wood" d="M-130 20 h22 v140 h-22Z M110 20 h22 v140 h-22Z"/>'+[-90,0,90].map(x=>'<ellipse class="light" cx="'+x+'" cy="-4" rx="35" ry="18"/><ellipse class="amber-lt" cx="'+x+'" cy="-4" rx="22" ry="11"/>').join('');
    if(kind==='plant')return R.plant().replace('class="plant"','class="'+id+'"').replace('<g class="'+id+'">','<g class="'+id+'" transform="translate(-130 -760)">');
    if(kind==='book')return '<path class="light" style="stroke:var(--second);stroke-width:6" d="M0 -90 C-42 -124 -100 -120 -140 -100 V100 C-100 80 -42 80 0 114 C42 80 100 80 140 100 V-100 C100 -120 42 -124 0 -90Z"/><path style="'+stroke+'" d="M0 -90 V112 M-110 -52 L-30 -36 M-110 -14 L-30 2 M30 -36 L110 -52 M30 2 L110 -14"/>';
    if(kind==='message')return '<rect class="light" x="-130" y="-82" width="260" height="164" rx="30" style="stroke:var(--second);stroke-width:6"/><path class="light" d="M-60 82 L-100 120 L-92 82"/><path style="'+stroke+'" d="M-86 -30 H86 M-86 10 H55"/>';
    if(kind==='tracker')return [0,1,2].map(k=>'<g transform="translate('+((1-k)*130)+' 0)"><ellipse class="stone-dk" cy="8" rx="54" ry="22"/><ellipse class="'+id+'-stone'+k+' stone" rx="52" ry="20"/><text text-anchor="middle" y="-35" style="font:600 38px var(--sans);fill:var(--second)">'+(k+1)+'</text></g>').join('');
    if(kind==='lamp')return '<ellipse class="amber-lt" cy="10" rx="126" ry="92" opacity=".35"/><path class="metal" d="M-6 -10 h12 v190 h-12Z"/><ellipse class="metal" cy="190" rx="65" ry="14"/><path class="amber-lt" d="M-80 -88 H80 L118 18 H-118Z" style="stroke:var(--second);stroke-width:5"/>';
    if(kind==='notice')return '<rect class="light" x="-160" y="-96" width="320" height="192" rx="24" style="stroke:var(--second);stroke-width:6"/><circle class="amber" cx="110" cy="-84" r="24"/><path style="'+stroke+'" d="M-120 -40 H65 M-120 0 H90 M-120 40 H20"/>';
    throw Error('Unknown model: '+kind);
  },
  continuous(kit,spec) {
    const clamp=kit.clamp01,ease=kit.eio,lerp=kit.lerp,shots=spec.shots;
    const objects=new Map();for(const shot of shots)for(const p of shot.objects||[]){if(!objects.has(p.key))objects.set(p.key,p);else if(objects.get(p.key).kind!==p.kind)throw Error('Model key changed kind: '+p.key);}
    const worldNames=[...new Set(shots.map(s=>s.world||'room'))];
    const worldSvg=name=>{
      if(name==='room'||name==='roomOpen'||name==='night')return R.room({shoes:false,open:name==='roomOpen'})+(name==='night'?'<rect class="glass" x="80" y="340" width="210" height="200" rx="6" style="fill:#DCE0E9"/><g transform="translate(190 432) scale(.55)">'+R.cModel('moon','nightmoon')+'</g>':'');
      if(name==='path')return R.land('contpath',{sun:true});
      if(name==='shore')return '<rect class="sky" width="1080" height="1080"/><circle class="amber" cx="850" cy="200" r="70"/><path class="glass" d="M0 480 Q250 440 540 480 T1080 480 V1080 H0Z"/><path class="floor" d="M0 820 Q400 740 1080 850 V1080 H0Z"/><path class="cont-seawave" style="fill:none;stroke:var(--main);stroke-width:12;opacity:.55"/>';
      if(name==='mat')return R.lying('contmat','contmat');
      if(name==='bed')return R.lying('contmat','contmat').replace('class="contmat-mat mat"','class="contmat-mat mat" style="fill:color-mix(in srgb,var(--ground) 35%,white)"')+'<rect class="wood" x="112" y="326" width="26" height="428" rx="13"/><rect class="wood" x="948" y="326" width="24" height="428" rx="12"/><g transform="translate(540 540) scale(.9)">'+R.blanket('contbed')+'</g>';
      if(name==='torso')return R.torso('conttorso');
      throw Error('Unknown world '+name);
    };
    kit.scene('continuous-'+spec.id.toLowerCase(),{
      init(sk){
        const worlds=worldNames.map(name=>'<g class="cont-world-'+name+'">'+worldSvg(name)+'</g>').join('');
        const chair='<g class="cont-chair">'+R.chair()+'</g>';
        const seated='<g class="cont-sit"><g class="cont-body">'+R.ruth('contperson','sit')+'</g></g>';
        const standing='<g class="cont-stand">'+R.ruth('contstanding','stand')+'</g>';
        const bending='<g class="cont-bend">'+R.ruth('contbending','bend')+'</g>';
        sk.stage.append(sk.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">'+worlds+chair+seated+standing+bending+
          [...objects].map(([key,p])=>'<g class="cont-object" data-object="'+key+'">'+R.cModel(p.kind,'obj-'+key)+'</g>').join('')+'</svg><div class="cont-labels"></div><div class="cont-count" dir="rtl"></div></div>'));
        const q=sel=>sk.stage.querySelector(sel);this.q=q;this.worlds=Object.fromEntries(worldNames.map(w=>[w,q('.cont-world-'+w)]));
        this.sit=q('.cont-sit');this.stand=q('.cont-stand');this.bend=q('.cont-bend');this.chair=q('.cont-chair');this.body=q('.cont-body');this.eyes=q('.contperson-eyes');this.mouth=q('.contperson-mouth');this.standEyes=q('.contstanding-eyes');this.bendEyes=q('.contbending-eyes');
        this.objects=Object.fromEntries([...objects].map(([key])=>[key,q('[data-object="'+key+'"]')]));
        this.labels=shots.map((shot,i)=>(shot.labels||[]).map((label,k)=>{const el=sk.h('<div class="cont-label '+(label.kind||'cool')+'" dir="rtl">'+R.cEsc(label.text)+'</div>');el.style.maxWidth=(label.width||900)+'px';q('.cont-labels').append(el);return el;}));
        this.current=-1;
      },
      render(t){
        let index=shots.findIndex(s=>t<s.end);if(index<0)index=shots.length-1;
        const shot=shots[index],previous=shots[Math.max(0,index-1)],local=t-shot.start,u=index===0?1:ease(clamp(local/(shot.transition||1.0)));
        const world=shot.world||'room',lastWorld=previous.world||'room';
        for(const [name,el]of Object.entries(this.worlds)){const o=name===world?(lastWorld===world?1:u):(name===lastWorld?1-u:0);el.style.opacity=o;el.style.display=o>0?'':'none';}
        const character=shot.character||{},oldChar=previous.character||{};
        const x=lerp(oldChar.x??310,character.x??310,u),y=lerp(oldChar.y??742,character.y??742,u),scale=lerp(oldChar.s??1,character.s??1,u);
        const humanWorld=w=>w!=='mat'&&w!=='bed'&&w!=='torso';
        const personOpacity=lerp(humanWorld(lastWorld)?(oldChar.o??1):0,humanWorld(world)?(character.o??1):0,u);
        const sit=lerp(!oldChar.pose||oldChar.pose==='sit'?1:0,!character.pose||character.pose==='sit'?1:0,u);
        const stand=lerp(oldChar.pose==='stand'?1:0,character.pose==='stand'?1:0,u),bend=lerp(oldChar.pose==='bend'?1:0,character.pose==='bend'?1:0,u);
        this.chair.setAttribute('transform','translate('+(x-500*scale)+' '+(y-742*scale)+') scale('+scale+')');this.chair.style.opacity=personOpacity*(world==='path'?0:sit);
        this.sit.setAttribute('transform','translate('+x+' '+y+') scale('+scale+')');this.sit.style.opacity=personOpacity*sit;
        this.stand.setAttribute('transform','translate('+x+' '+(y+118*scale)+') scale('+scale+')');this.stand.style.opacity=personOpacity*stand;
        this.bend.setAttribute('transform','translate('+x+' '+(y+118*scale)+') scale('+scale+')');this.bend.style.opacity=personOpacity*bend;
        let breath=.5+.08*Math.sin(t*Math.PI/2.5);
        for(const phase of spec.breathing||[]){if(t>=phase.start&&t<=phase.end){breath=lerp(phase.from,phase.to,(1-Math.cos(Math.PI*clamp((t-phase.start)/(phase.end-phase.start))))/2);break;}}
        this.body.setAttribute('transform','scale(1 '+(1+.012*breath)+')');R.blink(this.eyes,t,.8);R.blink(this.standEyes,t,1.2);R.blink(this.bendEyes,t,1.2);
        const mood=lerp(oldChar.mood??.3,character.mood??.3,u);this.mouth.setAttribute('d','M-10 26 Q2 '+(26+mood*12)+' 14 26');
        const prevObjects=new Map((index===0?[]:previous.objects||[]).map(p=>[p.key,p])),curObjects=new Map((shot.objects||[]).map(p=>[p.key,p]));
        for(const [key,el]of Object.entries(this.objects)){
          const now=curObjects.get(key),before=prevObjects.get(key);if(!now&&!before){el.style.display='none';continue;}
          const target=now||before,source=before||now,delay=now?.at||0;
          const p=ease(clamp((local-delay)/.85));
          let opacity=now?lerp(before?(before.o??1):0,now.o??1,p):(before.o??1)*(1-p);
          if(opacity<.001){el.style.display='none';continue;}el.style.display='inline';el.style.opacity=opacity;
          const ox=lerp(source.x,target.x,p),oy=lerp(source.y+(before?0:28),target.y,p),os=lerp(source.s??1,target.s??1,p),rot=lerp(source.r||0,target.r||0,p);
          el.setAttribute('transform','translate('+ox+' '+oy+') rotate('+rot+') scale('+os+')');
          const id='obj-'+key,kind=target.kind,inner=selector=>el.querySelector('.'+id+selector);
          if(kind==='voice'){const warm=lerp(source.warm||0,target.warm||0,p);inner('-warm').style.opacity=warm;inner('-grey').style.opacity=1-warm;inner('-mouth').setAttribute('d','M-2 6 Q10 '+(-3+17*warm)+' 22 6');}
          if(kind==='battery')R.setBattery(inner('-fill'),lerp(source.level??.5,target.level??.5,p));
          if(kind==='compass')inner('-needle').setAttribute('transform','rotate('+lerp(source.angle||0,target.angle||0,p)+')');
          if(kind==='tracker')for(let k=0;k<3;k++)inner('-stone'+k).style.fill=k===(target.step||0)?'var(--accent)':'';
          if(kind==='radio'){inner('-knob0').setAttribute('transform','rotate('+lerp(source.a0||0,target.a0||0,p)+')');inner('-knob1').setAttribute('transform','rotate('+lerp(source.a1||0,target.a1||0,p)+')');}
          if(kind==='breath'){const strength=target.still?0:breath;inner('-core').setAttribute('transform','scale('+(0.68+.32*strength)+')');inner('-ring').setAttribute('transform','scale('+(0.75+.35*strength)+')');}
          if(kind==='toy'){const broken=lerp(source.broken||0,target.broken||0,p);inner('-l').setAttribute('transform','translate('+(-32*broken)+' 0) rotate('+(-12*broken)+')');inner('-r').setAttribute('transform','translate('+(32*broken)+' 0) rotate('+(12*broken)+')');inner('-wh').setAttribute('transform','translate('+(58+88*broken)+' '+(-16+8*broken)+') rotate('+(120*broken)+')');}
          if(kind==='child'){const mood=lerp(source.mood??-.6,target.mood??-.6,p);inner('-mouth').setAttribute('d','M-12 30 Q0 '+(30+mood*16)+' 12 30');inner('-tears').style.opacity=clamp(-mood);}
          if(kind==='road')for(let k=0;k<4;k++){const phase=(t*(target.speed||95)+k*220)%880-440;inner('-car'+k).setAttribute('transform','translate('+phase+' '+(k%2?-47:47)+')');}
          if(kind==='chess')for(let k=0;k<6;k++){const motion=(target.battle||0)*Math.sin(t*1.5+k)*28;inner('-piece'+k).setAttribute('transform','translate('+(-150+(k%3)*150+motion)+' '+((k<3?-130:130)-motion)+')');}
          if(kind==='kettle')inner('-steam').setAttribute('transform','translate(0 '+(-6*Math.sin(t*2))+')');
        }
        if(this.current!==index){for(const group of this.labels)for(const el of group)el.style.display='none';this.current=index;}
        (shot.labels||[]).forEach((label,k)=>{const el=this.labels[index][k],at=label.at||0,fade=clamp((local-at)/.45);el.style.display=fade>0?'':'none';el.style.opacity=fade;R.place(el,label.x??540,(label.y??80)+(1-kit.eo(fade))*18);});
        const count=this.q('.cont-count');let countWord='';for(const phase of spec.counts||[]){if(t>=phase.start&&t<phase.end)for(const word of phase.words)if(t>=word.at)countWord=word.text;}count.textContent=countWord;count.style.display=countWord?'':'none';R.place(count,540,100);
        const wave=this.q('.cont-seawave');if(wave)wave.setAttribute('d',R.wavePath(0,650,1080,36,1.8,-t*.5));
        const lung=this.q('.conttorso-lung');if(lung){lung.setAttribute('transform','translate(540 650) scale('+(0.92+.1*breath)+') translate(-540 -650)');this.q('.conttorso-dia').setAttribute('transform','translate(0 '+(24*breath)+')');this.q('.conttorso-belly').setAttribute('transform','translate('+(10*breath)+' 0)');}
        const matHand=this.q('.contmat-armR');if(matHand)R.handOn(matHand,.8,breath);
        const matEyes=this.q('.contmat-eyes');if(matEyes)R.blink(matEyes,t,.8);
      }
    });
  }
});
