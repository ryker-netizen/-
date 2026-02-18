export function pixelate(frame, params){
  const size = Math.max(1, Math.floor(params.pixel));

  const data = frame.data;
  const w = frame.width;
  const h = frame.height;

  for(let y=0;y<h;y+=size){
    for(let x=0;x<w;x+=size){

      const i = (y*w+x)*4;

      for(let yy=0;yy<size;yy++){
        for(let xx=0;xx<size;xx++){
          const ii = ((y+yy)*w+(x+xx))*4;

          data[ii]   = data[i];
          data[ii+1] = data[i+1];
          data[ii+2] = data[i+2];
        }
      }
    }
  }

  return frame;
}
