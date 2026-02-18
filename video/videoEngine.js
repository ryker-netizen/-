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

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function render() {
        requestAnimationFrame(render);

        if (!video.videoWidth) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (pixel > 0) {
            pixelate(ctx, canvas, pixel);
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

    };
}
