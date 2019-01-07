import { createDrawSpriteFunction } from './mazeObject';
import coin from '../../spritesheets/coin.png';

function createCoin(context, maze, x, y) {
  return createDrawSpriteFunction(context, coin).then(drawSprite => {
    var spriteX = 0;

    const render = () => {};

    const coords = {
      x,
      y
    };

    return {
      render,
      coords
    };
  });
}
