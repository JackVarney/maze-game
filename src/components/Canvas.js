import { h } from 'hyperapp';
import { drawMaze } from '../lib/maze';

export default ({ shouldDrawMaze, toggleShouldDrawMaze }) => (
  <canvas
    id="canvas"
    oncreate={() => {
      if (shouldDrawMaze) {
        drawMaze();
        toggleShouldDrawMaze();
      }
    }}
  />
);
