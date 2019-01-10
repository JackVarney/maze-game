import { random } from 'lodash-es';
import { X, Y, SQUARE_SIZE } from './canvasConfig';
import { drawMaze } from './maze';
import { initializePlayer } from './player';
import { initializeMazeEnd } from './mazeEnd';
import { initializeCoins, checkCoinCollisions } from './coin';

function render(...itemsToRender) {
  itemsToRender.forEach(item => {
    item.render();
  });
}

async function initializeGame(maze, setResetGame, generateMaze, alterGold) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  canvas.width = X * SQUARE_SIZE;
  canvas.height = Y * SQUARE_SIZE;

  var player = await initializePlayer(context, maze);
  var { mazeEnd, deadEnds } = initializeMazeEnd(context, maze);
  var { coins, deadEnds } = await initializeCoins(context, deadEnds);

  const onNewFrame = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (player.hasCollided(mazeEnd.coords)) {
      generateMaze();
      setResetGame(true);
    } else {
      var gold = coins.checkCollisions(player.coords);
      if (gold > 0) alterGold(gold);

      drawMaze(context, maze);
      render(mazeEnd, coins, player);

      window.requestAnimationFrame(onNewFrame);
    }
  };

  window.requestAnimationFrame(onNewFrame);
}

export { initializeGame };
