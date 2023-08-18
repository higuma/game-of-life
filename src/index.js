import Game from './Game';
import Canvas from './Canvas';
import Settings from './Settings';
import Monitor from './Monitor';
import Player from './Player';

const WIDTH  = 128;
const HEIGHT =  96;

const game = new Game(WIDTH, HEIGHT);
const canvas = new Canvas(game);
const settings = new Settings(game, canvas);
const monitor = new Monitor(game);
const player = new Player(game, canvas, settings, monitor);
settings.setPlayer(player);
