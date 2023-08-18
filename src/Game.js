export default class Game {
  constructor(width, height) {
    this.init(width, height);
  }

  init(width, height, initializer) {
    this.width = width;
    this.height = height;
    this.initializer = initializer;
    this.cells = new Array(width * height);
    this.buffer = new Array(width * height);
    this.reset();
  }

  reset() {
    this.cells.fill(0);
    if (this.initializer) {
      for (const n of this.initializer) {
        for (let j = 0; j < this.cells.length; j += n) {
          this.cells[j] = 1;
        }
      }
    }
    this.ticks = 0;
  }

  getCell(x, y) {
    return this.cells[y * this.width + x];
  }

  setCell(x, y, value) {
    this.cells[y * this.width + x] = value;
  }

  toggleCell(x, y) {
    this.setCell(x, y, (this.getCell(x, y) === 0) ? 1 : 0);
  }

  tick() {
    const W = this.width;
    const H = this.height;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const n = this.countNeighbours(x, y);
        if (this.getCell(x, y) === 1) {
          this.buffer[y * W + x] = (n === 2 || n === 3) ? 1 : 0;
        } else {
          this.buffer[y * W + x] = (n === 3) ? 1 : 0;
        }
      }
    }
    const buffer = this.cells;
    this.cells = this.buffer;
    this.buffer = buffer;
    this.ticks++;
  }

  countNeighbours(x, y) {
    const W = this.width;
    const H = this.height;
    const cells = this.cells;
    const x0 = (x + W - 1) % W;
    const x1 = (x + 1) % W;
    const y0 = (y + H - 1) % H;
    const y1 = (y + 1) % H;
    return cells[y0 * W + x0] + cells[y0 * W + x] + cells[y0 * W + x1] +
           cells[y  * W + x0]                     + cells[y  * W + x1] +
           cells[y1 * W + x0] + cells[y1 * W + x] + cells[y1 * W + x1];
  }
}
