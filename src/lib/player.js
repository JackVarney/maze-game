import spriteSheet from '../../spritesheets/snowmonkey.png';
import { createMazeObject } from './mazeObject';

function initializePlayer(context, maze) {
  return createMazeObject(context, maze, spriteSheet, 0, 0, 1, 0).then(
    player => {
      addKeyListeners(player);
      return player;
    }
  );
}

// initial press is throttled (doesnt trigger again for half a second)
// work around for smoother user input
function addKeyListeners({ moveSouth, moveNorth, moveEast, moveWest }) {
  var upPressed = null;
  var rightPressed = null;
  var downPressed = null;
  var leftPressed = null;

  const interval = (pressed, moveFunction) => {
    if (pressed === null) {
      return setInterval(() => {
        moveFunction();
      }, 10);
    } else {
      return pressed;
    }
  };

  window.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 87:
      case 38:
        upPressed = interval(upPressed, moveNorth);
        break;

      case 68:
      case 39:
        rightPressed = interval(rightPressed, moveEast);
        break;

      case 83:
      case 40:
        downPressed = interval(downPressed, moveSouth);
        break;

      case 65:
      case 37:
        leftPressed = interval(leftPressed, moveWest);
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch (e.keyCode) {
      case 87:
      case 38:
        clearInterval(upPressed);
        upPressed = null;
        break;

      case 68:
      case 39:
        clearInterval(rightPressed);
        rightPressed = null;
        break;

      case 83:
      case 40:
        clearInterval(downPressed);
        downPressed = null;
        break;

      case 65:
      case 37:
        clearInterval(leftPressed);
        leftPressed = null;
        break;
    }
  });
}

export { initializePlayer };
