import { createDrawSpriteFunction } from './utils';
import spriteSheet from './player.png';

function drawPlayer() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const drawSprite = createDrawSpriteFunction(context, spriteSheet);

  drawSprite(1, 1, 0);
}

export { drawPlayer };
