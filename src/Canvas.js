const floor = Math.floor;

const DEAD_COLOR  = '#eeeeee';
const ALIVE_COLOR = '#bb7733';

const CELL_SIZE = 5;    // px
const CELL_SPACING = CELL_SIZE + 1;

export default class Canvas {
  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById('game-of-life-canvas');
    this.canvas.addEventListener("click", event => this.onClick(event));
    this.init();
  }

  init() {
    this.canvas.width = CELL_SPACING * this.game.width - 1;
    this.canvas.height = CELL_SPACING * this.game.height - 1;
    this.render();
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    const width = this.game.width;
    const height = this.game.height;
    for (let y = 0; y < height; y++) {
      const cy = y * CELL_SPACING;
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = (this.game.getCell(x, y) === 0) ?  DEAD_COLOR : ALIVE_COLOR;
        ctx.fillRect(x * CELL_SPACING, cy, CELL_SIZE, CELL_SIZE);
      }
    }
    ctx.stroke();
  }

  onClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.game.toggleCell(
      floor((event.clientX - rect.left) / CELL_SPACING),
      floor((event.clientY - rect.top) / CELL_SPACING)
    );
    this.render();
  }
}
