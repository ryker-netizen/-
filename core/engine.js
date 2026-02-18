import { VideoEngine } from "../video/videoEngine.js";
import { EffectStack } from "./stack.js";
import { Chaos } from "./chaos.js";
import { Recorder } from "./recorder.js";

export class Engine {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.video = new VideoEngine(canvas);
    this.stack = new EffectStack();
    this.chaos = new Chaos();
    this.recorder = new Recorder(canvas);

    this.params = {
      destruction: 0,
      pixel: 1
    };
  }

  start(){
    requestAnimationFrame(()=>this.loop());
  }

  loop(){
    this.video.drawBase();

    let frame = this.video.getFrame();

    frame = this.stack.apply(frame, this.params, this.chaos);

    this.ctx.putImageData(frame,0,0);

    this.chaos.update(this.params);

    requestAnimationFrame(()=>this.loop());
  }
}
