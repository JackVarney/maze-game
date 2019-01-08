import { generateMaze } from './lib/maze';
import { X, Y } from './lib/canvasConfig';

export default {
  generateMaze: () => () => ({
    maze: generateMaze(X, Y),
  }),
  setResetGame: resetGame => () => ({
    resetGame,
  }),
  alterGold: gold => ({ inventory }) => ({
    inventory: {
      gold: inventory.gold + gold,
    },
  }),
};
