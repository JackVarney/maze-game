import { X, Y, SQUARE_SIZE } from './canvasConfig';

function getDeadEnds(maze) {
  return maze.map(row =>
    row.map(
      col =>
        Object.keys(col).reduce((acc, key) => {
          if (col[key]) acc += 1;

          return acc;
        }, 0) === 3
    )
  );
}

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

  const render = () => {
    context.fillStyle = '#e91e63';
    context.fillRect(
      x * SQUARE_SIZE + 2,
      y * SQUARE_SIZE + 2,
      SQUARE_SIZE - 4,
      SQUARE_SIZE - 4
    );
  };

  return { render };
}

export { initializeMazeEnd };
