import { h } from 'hyperapp';
import { initializeGame } from '../lib/game';

export default ({ generateMaze, maze, resetGame, setResetGame, alterGold }) => (
  <canvas
    id="canvas"
    oncreate={() => {
      generateMaze();
    }}
    onupdate={() => {
      if (resetGame) {
        initializeGame(maze, setResetGame, generateMaze, alterGold);
        setResetGame(false);
      }
    }}
  />
);
