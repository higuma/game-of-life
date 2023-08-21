export default class Animation {
  constructor(process, render, period) {
    this.process = process; // callback: data processing function
    this.render = render;   // callback: rendering function
    this.period = period;   // [msec]
    this.animationId = null;
    this.lastTime = null;
  }

  setPeriod(period) {
    this.period = period;
  }

  start() {
    this.animationId = requestAnimationFrame(timeStamp => this.animate(timeStamp));
    this.lastTime = performance.now();
  }

  stop() {
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
    this.lastTime = null;
  }

  animate(timeStamp) {
    let nextTime = this.lastTime + this.period;
    if (timeStamp >= nextTime) {
      while (timeStamp >= nextTime) {
        this.process();
        this.lastTime = nextTime;
        nextTime += this.period;
      }
      this.render();
    }
    this.animationId = requestAnimationFrame(timeStamp => this.animate(timeStamp));
  }
}
