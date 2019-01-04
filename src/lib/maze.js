import { SQUARE_SIZE, X, Y } from './canvasConfig';
import { drawPlayer } from './player';

function drawMaze() {
  const maze = generateMaze(X, Y);

  const canvas = document.getElementById('canvas');
  canvas.width = X * SQUARE_SIZE;
  canvas.height = Y * SQUARE_SIZE;

  const context = canvas.getContext('2d');
  context.lineWidth = 2;

  function drawLine(moveToX, moveToY, lineToX, lineToY) {
    context.moveTo(moveToX, moveToY);
    context.lineTo(lineToX, lineToY);
  }

  context.beginPath();
  maze.forEach((row, rowIndex) => {
    row.forEach(({ north, east, south, west }, colIndex) => {
      if (north) {
        drawLine(
          colIndex * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          (colIndex + 1) * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE
        );
      }

      if (east) {
        drawLine(
          (colIndex + 1) * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          (colIndex + 1) * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE
        );
      }

      if (south) {
        drawLine(
          colIndex * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE,
          (colIndex + 1) * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE
        );
      }

      if (west) {
        drawLine(
          colIndex * SQUARE_SIZE,
          rowIndex * SQUARE_SIZE,
          colIndex * SQUARE_SIZE,
          (rowIndex + 1) * SQUARE_SIZE
        );
      }
    });
  });
  context.stroke();

  drawPlayer();
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
      [currentCellX, currentCellY - 1, 'west', 'east']
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
        randomCellWallPostion
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

  return yRange.map(_ =>
    xRange.map(_ => ({
      walls: {
        north: true,
        east: true,
        south: true,
        west: true
      },
      toBeVisited: true
    }))
  );
}

export { drawMaze };
