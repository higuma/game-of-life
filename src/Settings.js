export default class Settings {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.settings = document.getElementById('div-settings');
    this.width = document.getElementById('settings-width');
    this.width.value = game.width;
    this.height = document.getElementById('settings-height');
    this.height.value = game.height;
    this.patterns = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37].map(n => {
      return document.getElementById(`settings-pattern-${n}`);
    });
    this.settings.addEventListener('input', event => this.onInput(event));
    this.apply();
  }

  disable(disabled) {
    this.width.disabled = disabled;
    this.height.disabled = disabled;
    for (const pattern of this.patterns) {
      pattern.disabled = disabled;
    }
  }

  setPlayer(player) {
    this.player = player;
  }

  onInput(event) {
    const widthValid = this.validateInput(this.width);
    const heightValid = this.validateInput(this.height);
    if (widthValid && heightValid) {
      this.apply();
      if (this.player) {
        this.player.onReset();
      }
    } else if (this.player) {
      this.player.disable();
    }
  }

  validateInput(input) {
    const val = Number(input.value);
    const min = Number(input.min);
    const max = Number(input.max);
    if (val < min || val > max) {
      input.classList.add('invalid');
      return false;
    }
    input.classList.remove('invalid');
    return true;
  }

  apply() {
    this.game.init(
      Number(this.width.value),
      Number(this.height.value),
      this.patterns.filter(elem => elem.checked)
                   .map(elem => Number(elem.name))
    );
    this.canvas.init();
  }
}
