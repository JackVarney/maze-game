import { h } from 'hyperapp';
import { initializeGame } from '../lib/game';

export default ({ generateMaze, maze }) => (
  <canvas
    id="canvas"
    oncreate={() => {
      generateMaze();
    }}
    onupdate={() => {
      initializeGame(maze);
    }}
  />
);
