import { generateMaze } from './lib/maze';
import { X, Y } from './lib/canvasConfig';

export default {
  generateMaze: () => () => ({
    maze: generateMaze(X, Y)
  }),
  setResetGame: resetGame => () => ({
    resetGame
  }),
  alterGold: gold => ({ playerInventory }) => ({
    playerInventory: {
      gold: game.playerInventory.gold + gold
    }
  })
};
