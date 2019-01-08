import { random } from 'lodash-es';
import { createDrawSpriteFunction } from './mazeObject';
import coin from '../../spritesheets/coin.png';
import { checkCollision } from './utils';
import { SQUARE_SIZE } from './canvasConfig';

function createCoin(context, x, y) {
  return createDrawSpriteFunction(context, coin).then(drawSprite => {
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
      goldAmount: random(1, 50),
    };
  });
}

export { createCoin };
