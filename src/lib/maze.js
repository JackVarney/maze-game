import { SQUARE_SIZE, X, Y } from './canvasConfig';

function drawMaze(context, maze) {
  const black = '#212121';
  const purple = '#4a148c';
  const pink = '#9c27b0';
  const blue = '#03a9f4';

  context.lineWidth = 2;
  context.strokeStyle = black;

  const drawLine = (moveToX, moveToY, lineToX, lineToY) => {
    context.beginPath();
    context.moveTo(moveToX, moveToY);
    context.lineTo(lineToX, lineToY);
    context.stroke();
  };

  maze.forEach((row, rowIndex) => {
    row.forEach(({ north, east, south, west }, colIndex) => {
      if (north) {
        drawLine(
          colIndex * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          (colIndex + 1) * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
        );
      }

      if (east) {
        drawLine(
          (colIndex + 1) * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          (colIndex + 1) * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE,
        );
      }

      if (south) {
        drawLine(
          colIndex * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE,
          (colIndex + 1) * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE,
        );
      }

      if (west) {
        drawLine(
          colIndex * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          colIndex * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE,
        );
      }
    });
  });
}

function generateMaze(x, y) {
  const grid = generateEmptyGrid(x, y);

  // starting at the top left
  var currentCell = [0, 0];
  var path = [currentCell];

  // flag the top left cell as visited and
  // store that we have visited one cell
  grid[0][0].toBeVisited = false;
  var visited = 1;

  const totalAmountOfCells = x * y;

  // if weve visited every cell the grid has been traversed
  while (visited < totalAmountOfCells) {
    var currentCellX = currentCell[0];
    var currentCellY = currentCell[1];

    // create an array of potential neighboring cells
    // and filter out any invalid neighbors
    const neighboringCells = [
      [currentCellX - 1, currentCellY, 'north', 'south'],
      [currentCellX, currentCellY + 1, 'east', 'west'],
      [currentCellX + 1, currentCellY, 'south', 'north'],
      [currentCellX, currentCellY - 1, 'west', 'east'],
    ].filter(([potentialX, potentialY]) => {
      const potentialNeighborIsWithinGrid =
        potentialX > -1 && potentialX < y && potentialY > -1 && potentialY < x;

      return (
        potentialNeighborIsWithinGrid &&
        grid[potentialX][potentialY].toBeVisited
      );
    });

    if (neighboringCells.length > 0) {
      // get the values of a random valid neighboring cell
      const [
        neighboringCellX,
        neighboringCellY,
        currentCellWallPosition,
        randomCellWallPostion,
      ] = neighboringCells[Math.floor(Math.random() * neighboringCells.length)];

      // remove the wall between the current cell and the random cell
      grid[currentCellX][currentCellY].walls[currentCellWallPosition] = false;
      grid[neighboringCellX][neighboringCellY].walls[
        randomCellWallPostion
      ] = false;

      // flag the cell as visited
      grid[neighboringCellX][neighboringCellY].toBeVisited = false;
      // update the current cell to be the neighboring cell
      currentCell = [neighboringCellX, neighboringCellY];

      visited += 1;
      // add the current cell the the stack
      // so that we can traverse back to it
      path.push(currentCell);
    } else {
      // if there are no valid neighboring cells
      // remove the current cell from the stack and revert to the previous cell
      currentCell = path.pop();
    }
  }

  return grid.map(y => y.map(x => x.walls));
}

function generateEmptyGrid(x, y) {
  const yRange = Array.from({ length: y });
  const xRange = Array.from({ length: x });

  return yRange.map(() =>
    xRange.map(() => ({
      walls: {
        north: true,
        east: true,
        south: true,
        west: true,
      },
      toBeVisited: true,
    })),
  );
}

function getDeadEnds(maze) {
  return maze.reduce((deadEnds, row, y) => {
    const rowsDeadEnds = row.reduce((acc, col, x) => {
      const columnKeys = Object.keys(col);

      const numberOfWalls = columnKeys.reduce((wallCount, key) => {
        if (col[key]) {
          wallCount += 1;
        }

        return wallCount;
      }, 0);

      // a dead end will have 3 walls
      if (numberOfWalls === 3) {
        acc.push({ x, y });
      }

      return acc;
    }, []);

    return [...deadEnds, ...rowsDeadEnds];
  }, []);
}

export { drawMaze, generateMaze, getDeadEnds };
