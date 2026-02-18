import { initVideoEngine } from "./video/videoEngine.js";

let engine;

window.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");

  startBtn.onclick = async () => {

    engine = await initVideoEngine();

    document.body.addEventListener("click", ()=>{
      if(engine.unmute) engine.unmute();
    },{once:true});

    connectUI();
  };

});

function connectUI(){

  const destruction = document.getElementById("destruction");
  const glitch = document.getElementById("glitch");

  destruction.oninput = ()=>{
    engine.setDestruction(Number(destruction.value)/100);
  };

  glitch.oninput = ()=>{
    engine.setGlitch(Number(glitch.value)/100);
  };

}
