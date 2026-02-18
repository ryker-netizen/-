export function initUI(engine){

  const chaos = document.getElementById("chaos");
  const pixel = document.getElementById("pixel");

  chaos.oninput = e=>{
    engine.params.destruction = parseFloat(e.target.value);
  };

  pixel.oninput = e=>{
    engine.params.pixel = parseFloat(e.target.value);
  };

  // загрузка видео
  document.getElementById("load").onclick = ()=>{
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = e=>{
      const file = e.target.files[0];
      engine.video.load(file);
    };

    input.click();
  };

  // запись
  document.getElementById("rec").onclick = ()=>{
    engine.recorder.toggle();
  };

}
