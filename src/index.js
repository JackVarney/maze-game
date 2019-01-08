import { h, app } from 'hyperapp';
import state from './state';
import actions from './actions';
import Canvas from './components/Canvas';
import PlayerInventory from './components/PlayerInventory';

const view = (state, actions) => {
  return (
    <div>
      <span>use WASD</span>
      <Canvas {...state} {...actions} />
      <PlayerInventory inventory={state.inventory} />
    </div>
  );
};

app(state, actions, view, document.body);
