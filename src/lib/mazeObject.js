import { SPRITE_X, SPRITE_Y, SQUARE_SIZE } from './canvasConfig';
import { checkCollision } from './utils';

const createMazeObject = context => (
  maze,
  spriteSheet,
  mazeX,
  mazeY,
  spriteSheetX,
  spriteSheetY,
) => {
  return createDrawSpriteFunction(context, spriteSheet).then(drawSprite =>
    initializeObject(
      maze,
      mazeX,
      mazeY,
      spriteSheetX,
      spriteSheetY,
      drawSprite,
    ),
  );
};

function createDrawSpriteFunction(context, img) {
  const spriteSheet = new Image();
  spriteSheet.src = img;

  const drawSpriteFunction = (x, y, spriteX, spriteY) => {
    var xDifference = SQUARE_SIZE - SPRITE_X;
    var yDifference = SQUARE_SIZE - SPRITE_Y - 8;
    xDifference /= 2;
    yDifference /= 2;

    context.drawImage(
      spriteSheet, // image
      spriteX * SPRITE_X, // x pos in spritesheet
      spriteY * SPRITE_Y, // y pos in spritesheet
      SPRITE_X, // x distance in spritesheet
      SPRITE_Y, // y distance in spritesheet
      x + xDifference, // x pos on canvas
      y + yDifference, // y pos on canvas
      SPRITE_X, // x distance on canvas
      SPRITE_Y, // y distance on canvas
    );
  };

  return new Promise(res => {
    spriteSheet.onload = () => {
      res(drawSpriteFunction);
    };
  });
}

function calculateSpritesheetX(frameCount, spriteSheetX) {
  switch (frameCount) {
    case 2:
      return spriteSheetX + 1;

    case 3:
      return spriteSheetX - 1;

    case 4:
      return spriteSheetX - 1;

    case 5:
      return spriteSheetX + 1;

    default:
      return spriteSheetX;
  }
}

function initializeObject(
  maze,
  mazeX,
  mazeY,
  initialSpriteSheetX,
  initialSpriteSheetY,
  drawSprite,
) {
  var canMove = true;
  var x = mazeX * SQUARE_SIZE;
  var y = mazeY * SQUARE_SIZE;
  var spriteSheetX = initialSpriteSheetX;
  var spriteSheetY = initialSpriteSheetY;

  const getCurrentCell = () => maze[mazeY][mazeX];
  const getPotentialCell = (potentialCellX, potentialCellY) => {
    var row = maze[potentialCellX];

    if (row !== undefined) {
      return row[potentialCellY];
    }
  };

  const animate = (onInterval, onCompletion) => {
    var frameCount = 1;
    const originalYValue = y;
    const originalXValue = x;
    canMove = false;

    const interval = setInterval(() => {
      onInterval(originalYValue, originalXValue, frameCount);

      spriteSheetX = calculateSpritesheetX(frameCount, spriteSheetX);
      frameCount += 1;

      if (frameCount === 6) {
        onCompletion();
        canMove = true;
        clearInterval(interval);
      }
    }, 40);
  };

  const moveNorth = () => {
    if (canMove) {
      const currentCell = getCurrentCell();
      const potentialCell = getPotentialCell(mazeY - 1, mazeX);
      spriteSheetY = 3;

      // if cell exits and has no north wall
      if (potentialCell !== undefined && !currentCell.north) {
        animate(
          (originalYValue, originalXValue, frameCount) => {
            y = originalYValue - frameCount * (SQUARE_SIZE / 5);
          },
          () => {
            mazeY -= 1;
          },
        );
      }
    }
  };

  const moveEast = () => {
    if (canMove) {
      const currentCell = getCurrentCell();
      const potentialCell = getPotentialCell(mazeY, mazeX + 1);
      spriteSheetY = 2;

      // if cell exits and has no north wall
      if (potentialCell !== undefined && !currentCell.east) {
        animate(
          (originalYValue, originalXValue, frameCount) => {
            x = originalXValue + frameCount * (SQUARE_SIZE / 5);
          },
          () => {
            mazeX += 1;
          },
        );
      }
    }
  };

  const moveSouth = () => {
    if (canMove) {
      const currentCell = getCurrentCell();
      const potentialCell = getPotentialCell(mazeY + 1, mazeX);
      spriteSheetY = 0;

      // if cell exits and has no south wall
      if (potentialCell !== undefined && !currentCell.south) {
        animate(
          (originalYValue, originalXValue, frameCount) => {
            y = originalYValue + frameCount * (SQUARE_SIZE / 5);
          },
          () => {
            mazeY += 1;
          },
        );
      }
    }
  };

  const moveWest = () => {
    if (canMove) {
      const currentCell = getCurrentCell();
      const potentialCell = getPotentialCell(mazeY, mazeX - 1);
      spriteSheetY = 1;

      // if cell exits and has no north wall
      if (potentialCell !== undefined && !currentCell.west) {
        animate(
          (originalYValue, originalXValue, frameCount) => {
            x = originalXValue - frameCount * (SQUARE_SIZE / 5);
          },
          () => {
            mazeX -= 1;
          },
        );
      }
    }
  };

  const render = () => {
    drawSprite(x, y, spriteSheetX, spriteSheetY);
  };

  return {
    moveNorth,
    moveEast,
    moveSouth,
    moveWest,
    render,
    hasCollided: coordsToCheck =>
      checkCollision(coordsToCheck, { x: mazeX, y: mazeY }),
    get coords() {
      return {
        x: mazeX,
        y: mazeY,
      };
    },
  };
}

export { createMazeObject, createDrawSpriteFunction };
