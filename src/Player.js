const SPEED_TEXT      = [
  '×1/32', '×1/16', '×1/8', '×1/4', '×1/2', '×1', '×2', '×4', '×8', '×16', '×32',
];
const ANIMATION_SPEED = [
    1/32 ,   1/16 ,   1/8 ,   1/4 ,   1/2 ,   1 ,   2 ,   4 ,   8 ,   16 ,   32 ,
];

export default class Player {
  constructor(game, canvas, settings, monitor) {
    this.game = game;
    this.canvas = canvas;
    this.settings = settings;
    this.monitor = monitor;
    this.reset = document.getElementById('reset');
    this.pause = document.getElementById('pause');
    this.step = document.getElementById('step');
    this.play = document.getElementById('play');
    this.speed = document.getElementById('speed');
    this.speedText = document.getElementById('speed-text');
    this.reset.addEventListener('click', () => this.onReset());
    this.pause.addEventListener('click', () => this.onPause());
    this.step.addEventListener('click', () => this.onStep());
    this.play.addEventListener('click', () => this.onPlay());
    this.speed.addEventListener('input', event => this.onSpeed(event));
    this.animationId = null;
    this.animationSpeed = 1;
    this.animationProgress = 0;
    this.onReset();
  }

  disable() {
    this.reset.disabled = true;
    this.pause.disabled = true;
    this.step.disabled = true;
    this.play.disabled = true;
    this.stopAnimation();
  }

  onReset() {
    this.reset.disabled = true;
    this.pause.disabled = true;
    this.step.disabled = false;
    this.play.disabled = false;
    this.stopAnimation();
    this.game.reset();
    this.canvas.render();
    this.settings.disable(false);
    this.monitor.reset();
  }

  onPause() {
    this.reset.disabled = false;
    this.pause.disabled = true;
    this.step.disabled = false;
    this.play.disabled = false;
    this.settings.disable(true);
    this.stopAnimation();
  }

  onStep() {
    this.reset.disabled = false;
    this.pause.disabled = true;
    this.step.disabled = false;
    this.play.disabled = false;
    this.stopAnimation();
    this.settings.disable(true);
    this.game.tick();
    this.canvas.render();
    this.monitor.reset();
  }

  onPlay() {
    this.reset.disabled = false;
    this.pause.disabled = false;
    this.step.disabled = true;
    this.play.disabled = true;
    this.startAnimation();
    this.settings.disable(true);
  }

  onSpeed(event) {
    const i = Number(event.target.value);
    this.animationSpeed = ANIMATION_SPEED[i];
    this.speedText.textContent = SPEED_TEXT[i];
  }

  startAnimation() {
    this.animationProgress = 0;
    if (this.animationId == null) {
      this.animationId = window.requestAnimationFrame(() => this.animate());
    }
  }

  stopAnimation() {
    if (this.animationId != null) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
      this.monitor.reset();
    }
  }

  animate() {
    this.animationProgress += this.animationSpeed;
    if (this.animationProgress >= 1) {
      while (this.animationProgress > 0) {
        this.animationProgress -= 1;
        this.game.tick();
      }
      this.canvas.render();
    }
    this.monitor.update();
    this.animationId = window.requestAnimationFrame(() => this.animate());
  }
}
