import { random } from 'lodash-es';
import { createDrawSpriteFunction } from './mazeObject';
import coinSpritesheet from '../../spritesheets/coin.png';
import { checkCollision } from './utils';
import { SQUARE_SIZE } from './canvasConfig';

var coins;

function createCoin(context, x, y) {
  return createDrawSpriteFunction(context, coinSpritesheet).then(drawSprite => {
    var spriteX = 0;
    var frameCount = 0;
    const coords = { x, y };

    const render = () => {
      drawSprite(x * SQUARE_SIZE, y * SQUARE_SIZE, spriteX, 0);

      frameCount += 1;

      if (frameCount === 10) {
        spriteX += 1;
        frameCount = 0;
      }

      if (spriteX === 6) {
        spriteX = 0;
      }
    };

    return {
      render,
      coords,
      hasCollided: coordsToCheck => checkCollision(coordsToCheck, coords),
      goldAmount: random(10, 50)
    };
  });
}

async function initializeCoins(context, deadEnds) {
  const threeQuarters = Math.floor(deadEnds.length * 0.75);
  const coinLocations = [];
  while (deadEnds.length > threeQuarters) {
    const indexOfElToRemove = random(0, deadEnds.length - 1);
    const elToRemove = deadEnds[indexOfElToRemove];

    coinLocations.push(elToRemove);
    deadEnds.splice(1, indexOfElToRemove);
  }

  coins = await Promise.all(
    coinLocations.map(({ x, y }) => createCoin(context, x, y))
  );

  return {
    deadEnds,
    coins: {
      checkCollisions,
      render: () => {
        coins.forEach(coin => coin.render());
      }
    }
  };
}

function checkCollisions(playerCoords) {
  const result = coins.reduce(
    (acc, coin) => {
      if (coin.hasCollided(playerCoords)) {
        acc.goldToAdd = coin.goldAmount;
      } else {
        acc.coins.push(coin);
      }

      return acc;
    },
    {
      goldToAdd: 0,
      coins: []
    }
  );

  coins = result.coins;

  return result.goldToAdd;
}

export { initializeCoins };
