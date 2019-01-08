import { random } from 'lodash-es';
import { drawMaze } from './maze';
import { initializePlayer } from './player';
import { X, Y, SQUARE_SIZE } from './canvasConfig';
import { createMazeEnd } from './mazeEnd';
import { getDeadEnds } from './deadEnds';
import { createCoin } from './coin';

function initializeMazeEnd(context, maze) {
  const deadEnds = getDeadEnds(maze);

  const { x, y } = deadEnds.reverse().reduce((finalValue, row, y) => {
    row.reverse().forEach((cell, x) => {
      if (finalValue === undefined && cell) {
        finalValue = {
          x: X - (x + 1),
          y: Y - (y + 1),
        };
      }
    });

    return finalValue;
  }, undefined);

  deadEnds[x][y] = false;

  return {
    deadEnds,
    mazeEnd: createMazeEnd(context, maze, x, y),
  };
}

function initializeCoins(context, deadEnds) {
  const leftoverDeadEnds = deadEnds.reduce((totalDeadEnds, row, y) => {
    const deadEndsInRow = row.reduce((deadEndsInRow, cell, x) => {
      if (cell) {
        deadEndsInRow.push({ x, y });
      }

      return deadEndsInRow;
    }, []);

    return [...totalDeadEnds, ...deadEndsInRow];
  }, []);

  const oneFifth = Math.floor(leftoverDeadEnds.length / 4);
  while (leftoverDeadEnds.length > oneFifth) {
    leftoverDeadEnds.pop(random(0, leftoverDeadEnds.length - 1));
  }

  return Promise.all(
    leftoverDeadEnds.map(({ x, y }) => createCoin(context, x, y)),
  );
}

function checkCoinCollisions(player, coins) {
  return coins.reduce(
    (acc, coin) => {
      if (coin.hasCollided(player.coords)) {
        acc.goldToAdd = coin.goldAmount;
      } else {
        acc.coins.push(coin);
      }

      return acc;
    },
    {
      goldToAdd: 0,
      coins: [],
    },
  );
}

async function initializeGame(maze, setResetGame, generateMaze, alterGold) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  canvas.width = X * SQUARE_SIZE;
  canvas.height = Y * SQUARE_SIZE;

  const player = await initializePlayer(context, maze);
  const { mazeEnd, deadEnds } = initializeMazeEnd(context, maze);
  var coins = await initializeCoins(context, deadEnds);

  const onNewFrame = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (player.hasCollided(mazeEnd.coords)) {
      generateMaze();
      setResetGame(true);
    } else {
      const coinCollisonResult = checkCoinCollisions(player, coins);
      coins = coinCollisonResult.coins;

      if (coinCollisonResult.goldToAdd > 0) {
        alterGold(coinCollisonResult.goldToAdd);
      }

      drawMaze(context, maze);
      mazeEnd.render();
      coins.forEach(coin => coin.render());
      player.render();

      window.requestAnimationFrame(onNewFrame);
    }
  };

  window.requestAnimationFrame(onNewFrame);
}

export { initializeGame };
