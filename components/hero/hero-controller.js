/**
 * QuoteCore+ refined text hero v3.
 * All motion is opacity plus a ONE-WAY 16px entry. No scale, springs, blur on text,
 * nested movement, cross-fading of different scenes, or layout animation.
 * One shared animation clock, one play-through, with a stable final composition.
 */
export function mountQuoteCoreHero(root, sequence, options = {}) {
  if (!(root instanceof HTMLElement)) throw new TypeError('A hero root element is required.');
  const duration = sequence.duration;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];
  const blockers = new Set();
  let time = 0, origin = 0, running = false, destroyed = false, userPaused = false, raf = 0;
  const toggle = root.querySelector('[data-qch-toggle]');
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const now = () => document.timeline.currentTime ?? performance.now();
  const currentTime = () => running ? Math.min(duration, Math.max(0, now() - origin)) : time;
  const emit = type => root.dispatchEvent(new CustomEvent('quotecore:hero', { detail: {type, currentTime: currentTime()} }));

  function animate(target, keyframes, length, delay, fill='both') {
    if (!target) return;
    const a = target.animate(keyframes, {duration:length, delay, fill, easing:'linear'});
    a.pause(); a.currentTime=0; animations.push(a);
    return a;
  }
  function enter(target, start) {
    animate(target, [
      {opacity:0, transform:'translateY(16px)', easing:ease},
      {opacity:1, transform:'none'}
    ], sequence.motion.entryDuration, start);
  }
  function glow(target, start) {
    animate(target, [
      {opacity:0, offset:0, easing:'cubic-bezier(.4,0,.2,1)'},
      {opacity:.95, offset:.38, easing:'cubic-bezier(.4,0,.2,1)'},
      {opacity:0, offset:1}
    ], sequence.motion.glowDuration, start);
  }

  if (typeof root.animate !== 'function') {
    root.dataset.qchState='static';
    return { duration, currentTime:duration, playing:false, play(){},pause(){},seek(){},finish(){},replay(){},destroy(){} };
  }
  root.dataset.qchEnhanced='';
  for (const scene of sequence.scenes) {
    const el=root.querySelector(`[data-qch-scene="${scene.id}"]`);
    if (!el) continue;
    // Scene opacity is a gate plus a short EXIT fade. It does not move the children.
    animate(el,[
      {opacity:1, offset:0},
      {opacity:1, offset:(scene.duration-sequence.motion.exitDuration)/scene.duration},
      {opacity:0, offset:1}
    ],scene.duration,scene.start,'none');
    enter(el.querySelector('[data-qch-title]'),scene.start);
    el.querySelectorAll('[data-qch-row]').forEach((row,i)=>enter(row,scene.start+scene.rowDelays[i]));
    el.querySelectorAll('.qch-glow').forEach((g,i)=>glow(g,scene.start+scene.glowDelays[i]));
  }
  const final=sequence.final;
  const el=root.querySelector('[data-qch-scene="workflow"]');
  animate(el,[{opacity:1},{opacity:1}],1,final.start,'forwards');
  enter(el.querySelector('[data-qch-title]'),final.start);
  el.querySelectorAll('[data-qch-row]').forEach((row,i)=>enter(row,final.start+final.rowDelays[i]));
  const rowGlows=Array.from(el.querySelectorAll('.qch-workflow-list .qch-glow'));
  rowGlows.forEach((g,i)=>glow(g,final.start+final.glowDelays[i]));
  enter(el.querySelector('[data-qch-reuse]'),final.start+final.reuseDelay);
  glow(el.querySelector('[data-qch-reuse] .qch-glow'),final.start+final.reuseDelay+780);

  function setTime(ms) {
    const n=Number(ms); time=Math.min(duration,Math.max(0,Number.isFinite(n)?n:0));
    animations.forEach(a=>{a.pause();a.currentTime=time;});
  }
  function state(value) {
    root.dataset.qchState=value;
    if(toggle)toggle.textContent=value==='playing'?'Pause animation':'Resume animation';
  }
  function tick() {
    if(!running || destroyed)return;
    if(currentTime()>=duration) {
      running=false;setTime(duration);state('complete');emit('complete');return;
    }
    raf=requestAnimationFrame(tick);
  }
  function play() {
    if(destroyed || motion.matches || blockers.size || running || time>=duration)return;
    userPaused=false;origin=now()-time;
    animations.forEach(a=>{a.currentTime=time;a.play();a.startTime=origin;});
    running=true;state('playing');emit(time?'resume':'start');raf=requestAnimationFrame(tick);
  }
  function pause(manual=true) {
    if(destroyed)return;
    const t=currentTime();running=false;cancelAnimationFrame(raf);setTime(t);
    if(manual)userPaused=true;
    state(t>=duration?'complete':'paused');emit('pause');
  }
  function seek(ms) {pause(true);setTime(ms);state(time>=duration?'complete':'paused');}
  function finish() {pause(true);setTime(duration);state('complete');emit('skip');}
  function replay() {if(destroyed||motion.matches)return;seek(0);userPaused=false;play();}
  function block(reason,active) {
    if(active){blockers.add(reason);if(running)pause(false);}
    else{blockers.delete(reason);if(!blockers.size&&!userPaused&&time<duration)play();}
  }
  function onVisibility(){block('hidden',document.hidden);}
  function onMotion(){if(motion.matches)finish();}
  function onKey(e){
    if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
    if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();running?pause():play();}
    if(e.key==='Escape'){e.preventDefault();finish();}
    if(e.key.toLowerCase()==='r'){e.preventDefault();replay();}
  }
  function onToggle(){running?pause():play();}
  const skip=root.querySelector('[data-qch-skip]');
  const replayButton=root.querySelector('[data-qch-replay]');
  toggle?.addEventListener('click',onToggle);skip?.addEventListener('click',finish);replayButton?.addEventListener('click',replay);
  root.addEventListener('keydown',onKey);
  document.addEventListener('visibilitychange',onVisibility);motion.addEventListener('change',onMotion);
  let observer;
  if('IntersectionObserver' in window && options.observe!==false){
    observer=new IntersectionObserver(entries=>block('offscreen',entries[0].intersectionRatio<.1),{threshold:[0,.1]});
    observer.observe(root);
  }
  if(document.hidden)blockers.add('hidden');
  if(motion.matches || options.autoplay===false){setTime(duration);state('complete');userPaused=true;}
  else if(options.startPaused){setTime(0);state('paused');userPaused=true;}
  else play();

  return {
    duration,
    get currentTime(){return currentTime();}, get playing(){return running;},
    play,pause:()=>pause(true),seek,finish,replay,
    destroy(){
      if(destroyed)return;pause(true);destroyed=true;observer?.disconnect();
      document.removeEventListener('visibilitychange',onVisibility);motion.removeEventListener('change',onMotion);
      root.removeEventListener('keydown',onKey);toggle?.removeEventListener('click',onToggle);
      skip?.removeEventListener('click',finish);replayButton?.removeEventListener('click',replay);
      animations.forEach(a=>a.cancel());delete root.dataset.qchEnhanced;delete root.dataset.qchState;
    }
  };
}
