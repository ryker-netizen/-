import { initUI } from "./ui/ui.js";
import { initVideoEngine } from "./video/videoEngine.js";

let engine = null;

window.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", async () => {
    if (!engine) {
      console.log("INIT ENGINE");
      engine = await initVideoEngine();
      initUI(engine);
      console.log("ENGINE READY");
    }
  });

});
