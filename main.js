import { Engine } from "./core/engine.js";
import { UI } from "./ui/ui.js";

const canvas = document.getElementById("screen");

const engine = new Engine(canvas);
const ui = new UI(engine);

engine.start();
