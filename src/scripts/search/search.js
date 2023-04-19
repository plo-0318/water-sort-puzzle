let worker = undefined;

const stopWorker = () => {
  if (worker) {
    worker.terminate();
    worker = undefined;
  }
};

export const search = (algorithm, callback) => {
  // Worker is working
  if (worker) {
    return;
  }

  // Instantiate a new worker
  worker = new Worker('./src/scripts/search/searchWorker.js', {
    type: 'module',
  });

  // Send the algorithm object to the worker
  worker.postMessage(algorithm);

  // When worker is complete execute the callback
  worker.onmessage = (message) => {
    callback(message.data);
    stopWorker();
  };
};

export const cancelSearch = () => {
  stopWorker();
};
