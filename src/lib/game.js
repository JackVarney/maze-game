import { drawMaze } from './maze';
import { initializePlayer } from './player';
import { X, Y, SQUARE_SIZE } from './canvasConfig';

async function initializeGame(maze) {
  const canvas = document.getElementById('canvas');
  canvas.width = X * SQUARE_SIZE;
  canvas.height = Y * SQUARE_SIZE;

  const context = canvas.getContext('2d');

  const player = await initializePlayer(context, maze);

  function onNewFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(context, maze);
    player.render();

    window.requestAnimationFrame(onNewFrame);
  }

  window.requestAnimationFrame(onNewFrame);
}

export { initializeGame };