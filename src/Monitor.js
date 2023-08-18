const min   = Math.min;
const max   = Math.max;
const round = Math.round;

const NA = '---';

export default class Monitor {
  constructor(game) {
    this.game = game;
    this.steps = document.getElementById('monitor-steps');
    this.fpsLatest = document.getElementById('monitor-fps-latest');
    this.fpsAvg = document.getElementById('monitor-fps-avg');
    this.fpsMin = document.getElementById('monitor-fps-min');
    this.fpsMax = document.getElementById('monitor-fps-max');
    this.reset();
  }

  reset() {
    this.fpsRec = [];   // FPS records of last 100 renders
    this.steps    .textContent = this.game.ticks;
    this.fpsLatest.textContent = NA;
    this.fpsAvg   .textContent = NA;
    this.fpsMin   .textContent = NA;
    this.fpsMax   .textContent = NA;
    this.timeStamp = window.performance.now();
  }

  update() {
    const timeStamp = window.performance.now();
    const fps = 1000 / (timeStamp - this.timeStamp);
    this.timeStamp = timeStamp;
    const fpsRec = this.fpsRec;
    fpsRec.push(fps);
    while (fpsRec.length > 100) {
      fpsRec.shift();
    }
    this.steps    .textContent = this.game.ticks;
    this.fpsLatest.textContent = round(fps);
    this.fpsAvg   .textContent = round(fpsRec.reduce((s, x) => s + x, 0) / fpsRec.length);
    this.fpsMin   .textContent = round(min.apply(null, this.fpsRec));
    this.fpsMax   .textContent = round(max.apply(null, this.fpsRec));
  }
}
