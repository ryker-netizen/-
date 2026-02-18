import { VideoEngine } from "../video/videoEngine.js";
import { EffectStack } from "./stack.js";
import { Chaos } from "./chaos.js";
import { Recorder } from "./recorder.js";

export class Engine {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    this.resize();
    window.addEventListener("resize", ()=>this.resize());

    this.video = new VideoEngine(canvas);
    this.stack = new EffectStack();
    this.chaos = new Chaos();
    this.recorder = new Recorder(canvas);

    this.params = {
      destruction: 0,
      pixel: 1
    };

    this.running = false;
  }

  resize(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight*0.55;
  }

  unlock(){
    // важно для мобилок
    this.video.video.muted = true;
    this.video.video.play().catch(()=>{});
  }

  start(){
    if(this.running) return;
    this.running = true;
    requestAnimationFrame(()=>this.loop());
  }

  loop(){
    this.video.draw();

    let frame = this.video.frame();
    if(frame){
      frame = this.stack.apply(frame, this.params, this.chaos);
      this.ctx.putImageData(frame,0,0);
    }

    this.chaos.update(this.params);

    requestAnimationFrame(()=>this.loop());
  }
}
