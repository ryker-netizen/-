export class VideoEngine{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.video = document.createElement("video");
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;
this.video.muted = true;
this.video.autoplay = true;
  }

  load(file){
    this.video.src = URL.createObjectURL(file);
    this.video.play();
  }

  drawBase(){
    if(this.video.readyState>=2){
      this.ctx.drawImage(this.video,0,0,this.canvas.width,this.canvas.height);
    }
  }

  getFrame(){
    return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
  }
}
