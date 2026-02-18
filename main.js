import { initUI } from "./ui/ui.js";
import { initVideoEngine } from "./video/videoEngine.js";

let engine = null;

window.addEventListener("DOMContentLoaded", async () => {
  console.log("START");

  try {
    engine = await initVideoEngine();
    console.log("ENGINE OK", engine);

    initUI(engine);
    console.log("UI OK");

  } catch (e) {
    console.error("CRASH:", e);
    alert("CRASH: " + e.message);
  }
});
