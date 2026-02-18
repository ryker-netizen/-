import { pixelate } from "./pixelate.js";

export async function initVideoEngine() {

    const video = document.createElement("video");
    video.playsInline = true;
    video.muted = false;
video.volume = 1;
video.controls = false;
    video.loop = true;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);

    let chaos = 0.2;
    let pixel = 0;

function resize(){
  const maxW = window.innerWidth;
  const maxH = window.innerHeight * 0.6;

  canvas.width = maxW;
  canvas.height = maxH;
}

    window.addEventListener("resize", resize);
    resize();

    function render(){

  ctx.drawImage(video,0,0,canvas.width,canvas.height);

  // ГЛИТЧ
  const img = ctx.getImageData(0,0,canvas.width,canvas.height);
  const data = img.data;

  for(let i=0;i<data.length;i+=40){
    if(Math.random()<0.3){
      data[i] = 255;
      data[i+1] = 0;
      data[i+2] = 0;
    }
  }

  ctx.putImageData(img,0,0);

  requestAnimationFrame(render);
    }

        if (chaos > 0) {
            glitch(ctx, canvas, chaos);
        }
    }

    function glitch(ctx, canvas, power) {
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = img.data;

        for (let i = 0; i < d.length; i += 4) {
            if (Math.random() < power * 0.03) {
                d[i] = 255 - d[i];
                d[i + 1] = 255 - d[i + 1];
                d[i + 2] = 255 - d[i + 2];
            }
        }

        ctx.putImageData(img, 0, 0);
    }

    render();

    return {

        loadVideo(file) {
            video.src = URL.createObjectURL(file);
            video.play();
        },

        setChaos(v) {
            chaos = v;
        },

        setPixel(v) {
            pixel = v * 40;
        }
        unmute(){
  if(video){
    video.muted = false;
    video.play();
  }
        }

    };
}
