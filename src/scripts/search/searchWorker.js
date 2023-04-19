import { Dfs } from './dfs.js';
import { Bfs } from './bfs.js';

self.onmessage = (message) => {
  let { data: algorithm } = message;

  algorithm =
    algorithm.type === 'dfs'
      ? new Dfs(algorithm.startingState)
      : new Bfs(algorithm.startingState);

  const result = algorithm.search();

  self.postMessage(result);
};
