import { initUI } from "./ui/ui.js?v=2";
import { initVideoEngine } from "./video/videoEngine.js";

let engine = null;

window.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", async () => {
    alert("START CLICKED");

    try {
      alert("INIT ENGINE...");
      engine = await initVideoEngine();
      alert("ENGINE INIT OK");

      initUI(engine);
      alert("UI INIT OK");

    } catch (e) {
      alert("ERROR: " + e.message);
      console.error(e);
    }
  });

});
