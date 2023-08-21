import Animation from './Animation';

const SPEED_TEXT      = [
  '×1/32', '×1/16', '×1/8', '×1/4', '×1/2', '×1', '×2', '×4', '×8', '×16', '×32',
];

const ANIMATION_PERIOD = [  // [msec] Based on 60FPS: i.e. ×1 = 1000 / 60 [msec]
  1000 / 60 * 32,   // ×1/32
  1000 / 60 * 16,   // ×1/16
  1000 / 60 *  8,   // ×1/8
  1000 / 60 *  4,   // ×1/4
  1000 / 60 *  2,   // ×1/2
  1000 / 60 *  1,   // ×1
  1000 / 60 /  2,   // ×2
  1000 / 60 /  4,   // ×4
  1000 / 60 /  8,   // ×8
  1000 / 60 / 16,   // ×16
  1000 / 60 / 32,   // ×32
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
    this.animation = new Animation(
      () => this.game.tick(),
      () => {
        this.canvas.render();
        this.monitor.update();
      },
      ANIMATION_PERIOD[Number(this.speed.value)]
    );
    this.onReset();
  }

  disable() {   // called on settings validation failure
    this.reset.disabled = true;
    this.pause.disabled = true;
    this.step.disabled = true;
    this.play.disabled = true;
    this.animation.stop();
  }

  onReset() {
    this.reset.disabled = true;
    this.pause.disabled = true;
    this.step.disabled = false;
    this.play.disabled = false;
    this.animation.stop();
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
    this.animation.stop();
  }

  onStep() {
    this.reset.disabled = false;
    this.pause.disabled = true;
    this.step.disabled = false;
    this.play.disabled = false;
    this.animation.stop();
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
    this.animation.start();
    this.settings.disable(true);
  }

  onSpeed(event) {
    const i = Number(event.target.value);
    this.speedText.textContent = SPEED_TEXT[i];
    this.animation.setPeriod(ANIMATION_PERIOD[i]);
  }
}
