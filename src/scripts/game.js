'use strict';

import {
  colors,
  gameDifficulty,
  maxWaterContainerPerRow,
} from './gameSetting.js';
import { gameState } from './gameState.js';
import { generateRowContainer, generateRandomGameState } from './generate.js';
import { removeWaterStreams } from './util.js';
import {
  addWaterContainerEventListener,
  addWaterContainerAnimationEventListener,
  resetGameControllerState,
} from './gameController.js';

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
console.log(startNewGame('medium'));

// const ws = document.querySelectorAll('.water-container');

// const water = ws[0].querySelector('.water');

// const rect = water.getBoundingClientRect();

// console.log(rect.bottom);
// console.log(window.innerHeight);

//TODO: add settings menu
