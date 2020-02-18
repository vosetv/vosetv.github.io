const canvas = document.getElementById('static') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;
const tvHeight = canvas.offsetHeight;
const tvWidth = canvas.offsetWidth;
const smallestPixel = 1;

function drawStatic() {
  for (let v = 0; v < tvHeight; v += smallestPixel) {
    for (let h = 0; h < tvWidth; h += smallestPixel) {
      const lum = Math.floor(Math.random() * 50);
      context.fillStyle = `hsl(0, 0%, ${lum}%)`;
      context.fillRect(h, v, smallestPixel, smallestPixel);
    }
  }
  requestAnimationFrame(drawStatic);
}

drawStatic();
