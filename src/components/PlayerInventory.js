import { h } from 'hyperapp';

export default ({ inventory }) => {
  return (
    <div>
      <span>Gold: {inventory.gold}</span>
    </div>
  );
};
