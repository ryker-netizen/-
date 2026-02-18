export class Chaos{
  constructor(){
    this.t = 0;
  }

  update(params){
    this.t += 0.01;

    if(params.destruction > 5){
      params.pixel += Math.sin(this.t)*0.1;
    }
  }
}
