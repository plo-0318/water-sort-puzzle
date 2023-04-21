'use strict';

import { algorithm } from '../gameSetting.js';
import { Dfs } from './dfs.js';
import { Bfs } from './bfs.js';

let worker = undefined;

const createAlgorithm = (state) => {
  return algorithm === 'dfs' ? new Dfs(state) : new Bfs(state);
};

const stopWorker = () => {
  if (worker) {
    worker.terminate();
    worker = undefined;
  }
};

export const search = (state, callback) => {
  // Worker is working
  if (worker) {
    return;
  }

  // Instantiate a new worker
  worker = new Worker('./src/scripts/search/searchWorker.js', {
    type: 'module',
  });

  // Send the algorithm object to the worker
  worker.postMessage(createAlgorithm(state));

  // When worker is complete execute the callback
  worker.onmessage = (message) => {
    callback(message.data);
    stopWorker();
  };
};

export const cancelSearch = () => {
  stopWorker();
};
