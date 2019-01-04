import { h, app } from 'hyperapp';
import state from './state';
import actions from './actions';
import Canvas from './components/Canvas';

const view = (state, actions) => {
  return (
    <div>
      <Canvas {...state} {...actions} />
    </div>
  );
};

app(state, actions, view, document.body);
