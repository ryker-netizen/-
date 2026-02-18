export function initUI(engine){

  document.getElementById("load").onclick = ()=>{
    const input = document.createElement("input");
    input.type="file";
    input.accept="video/*";

    input.onchange = e=>{
      const file = e.target.files[0];
      engine.loadVideo(file);
    };

    input.click();
  };

}
