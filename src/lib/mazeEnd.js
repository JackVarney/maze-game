import { SQUARE_SIZE } from './canvasConfig';
import { getDeadEnds } from './maze';

function createMazeEnd(context, x, y) {
  const render = () => {
    context.fillStyle = '#e91e63';
    context.fillRect(
      x * SQUARE_SIZE + 4,
      y * SQUARE_SIZE + 4,
      SQUARE_SIZE - 8,
      SQUARE_SIZE - 8
    );
  };

  return {
    render,
    coords: {
      x,
      y
    }
  };
}

function initializeMazeEnd(context, maze) {
  const deadEnds = getDeadEnds(maze);
  const { x, y } = deadEnds.reverse()[0];

  deadEnds.shift();

  return {
    deadEnds,
    mazeEnd: createMazeEnd(context, x, y)
  };
}

export { initializeMazeEnd };
