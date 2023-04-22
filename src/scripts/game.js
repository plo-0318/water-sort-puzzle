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
startNewGame('easy');
