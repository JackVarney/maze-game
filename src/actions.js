import { generateMaze } from './lib/maze';
import { X, Y } from './lib/canvasConfig';

export default {
  generateMaze: () => () => ({
    maze: generateMaze(X, Y)
  }),
  setResetGame: resetGame => ({ game }) => ({
    game: {
      ...game,
      resetGame
    }
  })
};
