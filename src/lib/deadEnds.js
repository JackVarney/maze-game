function getDeadEnds(maze) {
  var deadEnds = maze.map(row =>
    row.map(col => {
      const columnKeys = Object.keys(col);

      const numberOfWalls = columnKeys.reduce((wallCount, key) => {
        if (col[key]) {
          wallCount += 1;
        }

        return wallCount;
      }, 0);

      return numberOfWalls === 3; // a dead end will have 3 walls
    }),
  );

  return deadEnds;
}

export { getDeadEnds };
