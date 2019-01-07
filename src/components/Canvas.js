import { h } from 'hyperapp';
import { initializeGame } from '../lib/game';

export default ({ generateMaze, maze, game, setResetGame }) => (
  <canvas
    id="canvas"
    oncreate={() => {
      generateMaze();
    }}
    onupdate={() => {
      if (game.resetGame) {
        initializeGame(maze, setResetGame, generateMaze);
        setResetGame(false);
      }
    }}
  />
);
