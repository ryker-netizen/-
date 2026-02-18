export async function initVideoEngine() {
return {
  unmute,
  setDestruction,
  setGlitch
}
  
  const video = document.createElement("video");
  video.playsInline = true;
  video.muted = false;
  video.loop = true;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  document.body.appendChild(canvas);

  let chaos = 0.3;
  let pixel = 0;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;
  }

  window.addEventListener("resize", resize);
  resize();

  function render(){
    requestAnimationFrame(render);

    if(video.readyState < 2) return;

    ctx.drawImage(video,0,0,canvas.width,canvas.height);

    // ===== ГЛИТЧ =====
    if(chaos > 0){
      const img = ctx.getImageData(0,0,canvas.width,canvas.height);
      const d = img.data;

      for(let i=0;i<d.length;i+=4){
        if(Math.random() < chaos*0.02){
          d[i] = 255-d[i];
          d[i+1] = 255-d[i+1];
          d[i+2] = 255-d[i+2];
        }
      }

      ctx.putImageData(img,0,0);
    }

    // ===== PIXEL =====
    if(pixel > 0){
      const size = Math.floor(pixel);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas,0,0,
        canvas.width/size,
        canvas.height/size);
      ctx.drawImage(canvas,0,0,
        canvas.width/size,
        canvas.height/size,
        0,0,
        canvas.width,
        canvas.height);
    }
  }

  render();

  return {
    loadVideo(file){
      video.src = URL.createObjectURL(file);
      video.play();
    },

    setChaos(v){
      chaos = v;
    },

    setPixel(v){
      pixel = v*20;
    },

    unmute(){
      video.muted = false;
      video.play();
    }
  };
  let destruction = 0;
let glitch = 0;

export function setDestruction(v){
  destruction = v;
}

export function setGlitch(v){
  glitch = v;
}
}
