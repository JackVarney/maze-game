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

    const isPlayerInMazeEnd =
      player.coords.x === mazeEnd.coords.x &&
      player.coords.y === mazeEnd.coords.y;

    if (!isPlayerInMazeEnd) {
      drawMaze(context, maze);
      player.render();
      mazeEnd.render();

      window.requestAnimationFrame(onNewFrame);
    } else {
      setResetGame(true);
      generateMaze();
    }
  };

  window.requestAnimationFrame(onNewFrame);
}

export { initializeGame };
