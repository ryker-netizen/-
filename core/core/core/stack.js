import { pixelate } from "../video/pixelate.js";

export class EffectStack{
  constructor(){
    this.effects = [
      pixelate
    ];
  }

  apply(frame, params, chaos){
    let out = frame;

    for(let fx of this.effects){
      out = fx(out, params, chaos);
    }

    return out;
  }
}
