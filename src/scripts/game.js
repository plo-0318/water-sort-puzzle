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
import { StateNode } from './search/searchUtil.js';
import { search, cancelSearch } from './search/search.js';
import ModalAI from './views/modals/modalAi.js';
import { generateIndicators, generateWaterStream } from './utils/generate.js';
import { aiPourWater } from './controllers/gameController.js';

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
// setTimeout(() => {
//   aiPourWater(ws[0], ws[3]);
// }, 3000);
// generateIndicators(ws[0], ws[1]);
// generateWaterStream(ws[0], '#ae3ec9');

// const water = ws[0].querySelector('.water');

// const rect = water.getBoundingClientRect();

// console.log(rect.bottom);
// console.log(window.innerHeight);

//TODO: fix increment hints, remove indicator when starting to pour?

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

const state4 = [
  ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
  ['#ae3ec9', '#e03131'],
  ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
  ['#1c7ed6'],
  ['#1c7ed6'],
];

const state5 = [
  ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
  ['#ae3ec9', '#e03131'],
  ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
  ['#1c7ed6', '#1c7ed6'],
  [],
];

const state6 = [
  ['#e03131', '#ae3ec9', '#1c7ed6'],
  ['#ae3ec9', '#e03131'],
  ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
  ['#e03131'],
  ['#1c7ed6', '#1c7ed6'],
];

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

const state8 = [
  ['#2b8a3e', '#ae3ec9', '#91a7ff', '#12b886'],
  ['#1c7ed6', '#2b8a3e', '#1c7ed6', '#1c7ed6'],
  ['#ffe066', '#12b886', '#ffe066', '#e03131'],
  ['#e03131', ' #fd7e14', ' #fd7e14', '#f783ac'],
  ['#e03131', '#91a7ff', '#2b8a3e', '#12b886'],
  [' #fd7e14', '#f783ac', '#f783ac', '#f783ac'],
  ['#ae3ec9', ' #fd7e14', '#91a7ff', '#e03131'],
  ['#ffe066', '#2b8a3e', '#ae3ec9', '#91a7ff'],
  ['#12b886', '#1c7ed6', '#ae3ec9', '#ffe066'],
  [],
  [],
];

const state9 = [
  ['#e03131', '#12b886', '#ae3ec9', '#1c7ed6'],
  ['#ae3ec9', ' #fd7e14', '#e03131', '#f783ac'],
  [' #fd7e14', '#e03131', '#12b886', '#1c7ed6'],
  ['#ae3ec9', '#f783ac', '#12b886', '#f783ac'],
  [' #fd7e14', '#ae3ec9', '#e03131', '#1c7ed6'],
  ['#1c7ed6', '#f783ac', ' #fd7e14', '#12b886'],
  [],
  [],
];

const dfs = new Dfs(state9);
const bfs = new Bfs(state9);

// console.log(dfs.search());
// console.log(bfs.search());

const s1 = new StateNode(state1);
const s2 = new StateNode(state2, s1);
const s3 = new StateNode(state3, s2);
const s4 = new StateNode(state4, s3);
const s5 = new StateNode(state5, s4);
const s6 = new StateNode(state6, s5);
const s7 = new StateNode(state7, s1);

// console.log(validatePath([s1, s2, s3, s4, s5, s6, s7]));
