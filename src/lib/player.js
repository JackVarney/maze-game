import spriteSheet from '../../spritesheets/snowmonkey.png';
import { createMazeObject } from './mazeObject';

function initializePlayer(context, maze) {
  return createMazeObject(context)(maze, spriteSheet, 0, 0, 1, 0).then(
    player => {
      addKeyListeners(player);
      return player;
    }
  );
}

// initial press is throttled (doesnt trigger again for half a second)
// work around for smoother user input
function addKeyListeners({ moveSouth, moveNorth, moveEast, moveWest }) {
  var wPressed = null;
  var dPressed = null;
  var sPressed = null;
  var aPressed = null;

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
        wPressed = interval(wPressed, moveNorth);
        break;

      case 68:
        dPressed = interval(dPressed, moveEast);
        break;

      case 83:
        sPressed = interval(sPressed, moveSouth);
        break;

      case 65:
        aPressed = interval(aPressed, moveWest);
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch (e.keyCode) {
      case 87:
        clearInterval(wPressed);
        wPressed = null;
        break;

      case 68:
        clearInterval(dPressed);
        dPressed = null;
        break;

      case 83:
        clearInterval(sPressed);
        sPressed = null;
        break;

      case 65:
        clearInterval(aPressed);
        aPressed = null;
        break;
    }
  });
}

export { initializePlayer };
