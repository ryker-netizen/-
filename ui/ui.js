export async function initVideoEngine(){

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let video = null;
  let playing = false;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function render(){
    if(playing && video){
      ctx.drawImage(video,0,0,canvas.width,canvas.height);
    }
    requestAnimationFrame(render);
  }
  render();

  return {

    async loadVideo(file){
      video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;

      await video.play();
      playing = true;
    }

  };
}
