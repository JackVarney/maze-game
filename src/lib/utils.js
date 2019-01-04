import { SPRITE_X, SPRITE_Y, SQUARE_SIZE } from './canvasConfig';

const createDrawSpriteFunction = (context, img) => (x, y, spritePos) => {
  const i = new Image();
  i.src = img;
  i.onload = () => {
    context.drawImage(
      i,
      spritePos * SPRITE_X,
      0,
      SPRITE_X,
      SPRITE_Y,
      x,
      y,
      SPRITE_X,
      SPRITE_Y
    );
  };
};

export { createDrawSpriteFunction };
