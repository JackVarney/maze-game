import { drawMaze } from './maze';
import { initializePlayer } from './player';
import { X, Y, SQUARE_SIZE } from './canvasConfig';
import { initializeMazeEnd } from './mazeEnd';

async function initializeGame(maze, setResetGame, generateMaze) {
  const canvas = document.getElementById('canvas');
  canvas.width = X * SQUARE_SIZE;
  canvas.height = Y * SQUARE_SIZE;

  const context = canvas.getContext('2d');

  const player = await initializePlayer(context, maze);
  const mazeEnd = initializeMazeEnd(context, maze);

  const onNewFrame = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (player.hasCollided(mazeEnd.coords)) {
      generateMaze();
      setResetGame(true);
    } else {
      drawMaze(context, maze);
      mazeEnd.render();
      player.render();

      window.requestAnimationFrame(onNewFrame);
    }
  };

  window.requestAnimationFrame(onNewFrame);
}

export { initializeGame };
