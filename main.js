import { initUI } from "./ui/ui.js";
import { initVideoEngine } from "./video/videoEngine.js";

let engine = null;

window.addEventListener("DOMContentLoaded", async () => {

    engine = await initVideoEngine();
    initUI(engine);

});
