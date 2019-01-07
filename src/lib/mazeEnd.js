import { X, Y, SQUARE_SIZE } from './canvasConfig';

function getDeadEnds(maze) {
  return maze.map(row =>
    row.map(col => {
      const columnKeys = Object.keys(col);

      const numberOfWalls = columnKeys.reduce((wallCount, key) => {
        if (col[key]) {
          wallCount += 1;
        }

        return wallCount;
      }, 0);

      return numberOfWalls === 3; // a dead end will have 3 walls
    })
  );
}

function initializeMazeEnd(context, maze) {
  const deadEnds = getDeadEnds(maze);

  const { x, y } = deadEnds.reverse().reduce((finalValue, row, y) => {
    row.reverse().forEach((cell, x) => {
      if (finalValue === undefined && cell) {
        finalValue = {
          x: X - (x + 1),
          y: Y - (y + 1)
        };
      }
    });

    return finalValue;
  }, undefined);

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

export { initializeMazeEnd };
