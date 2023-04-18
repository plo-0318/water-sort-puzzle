'use strict';

import {
  colors,
  gameDifficulty,
  maxWaterContainerPerRow,
} from './gameSetting.js';
import { gameState } from './models/gameState.js';
import {
  generateRowContainer,
  generateRandomGameState,
} from './utils/generate.js';
import { removeWaterStreams } from './utils/util.js';
import {
  addWaterContainerEventListener,
  addWaterContainerAnimationEventListener,
  resetGameControllerState,
} from './controllers/gameController.js';

import { Dfs } from './search/dfs.js';
import { Bfs } from './search/bfs.js';

let gameAreaEl = null;

export const renderGame = (currentGameState) => {
  gameAreaEl.innerHTML = '';
  removeWaterStreams();

  const generateGame = (state) => {
    if (state.length === 0) {
      return;
    }

    if (state.length <= maxWaterContainerPerRow) {
      gameAreaEl.appendChild(generateRowContainer(state));
    } else {
      gameAreaEl.appendChild(generateRowContainer(state.slice(0, 6)));

      generateGame(state.slice(6));
    }
  };

  generateGame(currentGameState);

  const allWaterContainers = gameAreaEl.querySelectorAll('.water-container');

  let i = 0;
  allWaterContainers.forEach((waterContainer) =>
    waterContainer.setAttribute('containerId', i++)
  );

  resetGameControllerState();
  gameState.addWaterContainers(Array.from(allWaterContainers));
};

const initGame = () => {
  gameAreaEl = document.querySelector('.game_area-container');

  addWaterContainerEventListener(gameAreaEl);
  addWaterContainerAnimationEventListener(gameAreaEl);
};

export const startNewGame = (difficulty, _gameState = null) => {
  const numContainers = gameDifficulty[difficulty] || gameDifficulty.easy;

  const state =
    _gameState || generateRandomGameState(numContainers, Object.values(colors));

  gameState.resetState();
  gameState.difficulty = difficulty;
  gameState.addState(state);

  renderGame(state);

  return state;
};

initGame();
console.log(startNewGame('easy'));

// const ws = document.querySelectorAll('.water-container');

// const water = ws[0].querySelector('.water');

// const rect = water.getBoundingClientRect();

// console.log(rect.bottom);
// console.log(window.innerHeight);

//TODO: add settings menu -->  ai

// const from = ['#1c7ed6', '#e03131', '#ae3ec9', '#e03131'];
// const to = ['#1c7ed6', '#ae3ec9', '#e03131'];

const state1 = [
  ['#ae3ec9', '#e03131', '#1c7ed6', '#ae3ec9'],
  ['#1c7ed6', '#e03131', '#ae3ec9', '#e03131'],
  ['#1c7ed6', '#ae3ec9', '#e03131'],
  ['#1c7ed6'],
  [],
];

const state2 = [
  ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
  ['#ae3ec9', '#e03131'],
  ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
  [],
  ['#1c7ed6', '#1c7ed6'],
];

const state3 = [
  ['#e03131', '#ae3ec9', '#ae3ec9', '#e03131'],
  ['#ae3ec9', '#e03131', '#ae3ec9', '#e03131'],
  [],
  [],
];

// const state4 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#1c7ed6'],
//   ['#1c7ed6'],
// ];

// const state5 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#1c7ed6', '#1c7ed6'],
//   [],
// ];

// const state6 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#e03131'],
//   ['#1c7ed6', '#1c7ed6'],
// ];

const state7 = [
  ['#f783ac', '#fd7e14', '#f783ac', '#12b886'],
  ['#ae3ec9', '#ae3ec9', '#f783ac', '#1c7ed6'],
  ['#fd7e14', '#1c7ed6', '#1c7ed6'],
  ['#fd7e14', '#e03131', '#12b886', '#e03131'],
  ['#12b886', '#f783ac', '#fd7e14', '#ae3ec9'],
  ['#e03131', '#e03131', '#1c7ed6', '#ae3ec9'],
  ['#12b886'],
  [],
];

const dfs = new Dfs(state2);
const bfs = new Bfs(state2);

// console.log(dfs.search());
console.log(bfs.search());

// console.log('length', dfs.path);
// dfs._test();
