import { initUI } from "./ui/ui.js?v=2";
import { initVideoEngine } from "./video/videoEngine.js";

let engine = null;

window.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", async () => {
    alert("START CLICKED");

document.body.addEventListener("click", ()=>{
  if(engine.unmute) engine.unmute();
},{once:true});
    
  });

});
