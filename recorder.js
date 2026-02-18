export class Recorder{
  constructor(canvas){
    this.stream = canvas.captureStream(30);
    this.rec = null;
    this.chunks = [];
  }

  toggle(){
    if(this.rec){
      this.rec.stop();
      this.rec=null;
      return;
    }

    this.chunks=[];

    this.rec = new MediaRecorder(this.stream);

    this.rec.ondataavailable=e=>{
      this.chunks.push(e.data);
    };

    this.rec.onstop=()=>{
      const blob = new Blob(this.chunks,{type:"video/webm"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download="shakal.webm";
      a.click();
    };

    this.rec.start();
  }
}
