export class UI{
  constructor(engine){
    this.engine = engine;

    document.getElementById("chaos").oninput = e=>{
      engine.params.destruction = parseFloat(e.target.value);
    };

    document.getElementById("pixel").oninput = e=>{
      engine.params.pixel = parseFloat(e.target.value);
    };

    document.getElementById("importVideo").onclick = ()=>{
      const input = document.createElement("input");
      input.type="file";
      input.accept="video/*";

      input.onchange = e=>{
        engine.video.load(e.target.files[0]);
      };

      input.click();
    };

    document.getElementById("record").onclick = ()=>{
      engine.recorder.toggle();
    };
  }
}
