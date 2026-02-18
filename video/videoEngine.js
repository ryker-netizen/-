export class VideoEngine{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.video = document.createElement("video");
    this.video.playsInline = true;
    this.video.muted = true;
    this.video.loop = true;

    this.ready = false;

    this.video.onloadeddata = ()=>{
      this.ready = true;
    };
  }

  load(file){
    if(!file) return;

    const url = URL.createObjectURL(file);
    this.video.src = url;

    this.video.play().catch(()=>{});
  }

  draw(){
    if(!this.ready) return;

    this.ctx.drawImage(
      this.video,
      0,0,
      this.canvas.width,
      this.canvas.height
    );
  }

  frame(){
    if(!this.ready) return null;

    return this.ctx.getImageData(
      0,0,
      this.canvas.width,
      this.canvas.height
    );
  }
}
