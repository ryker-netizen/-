import { VideoEngine } from "../video/videoEngine.js";
import { EffectStack } from "./stack.js";
import { Chaos } from "./chaos.js";
import { Recorder } from "./recorder.js";

export class Engine {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // адаптация под устройство
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
  }

  resize(){
    const w = window.innerWidth;
    const h = window.innerHeight * (this.isMobile ? 0.55 : 0.7);

    this.canvas.width = w;
    this.canvas.height = h;
  }

  start(){
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
