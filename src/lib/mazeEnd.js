import { X, Y, SQUARE_SIZE } from './canvasConfig';

function createMazeEnd(context, maze, x, y) {
  const render = () => {
    context.fillStyle = '#e91e63';
    context.fillRect(
      x * SQUARE_SIZE + 4,
      y * SQUARE_SIZE + 4,
      SQUARE_SIZE - 8,
      SQUARE_SIZE - 8,
    );
  };

  return {
    render,
    coords: {
      x,
      y,
    },
  };
}

export { createMazeEnd };
