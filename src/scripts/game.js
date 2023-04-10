'use strict';

import { generateRowContainer, generateRandomGameState } from './generate.js';
import {
  addWaterContainerEventListener,
  addWaterContainerAnimationEventListener,
  resetControllerState,
} from './gameController.js';
import {
  colors,
  gameDifficulty,
  maxWaterContainerPerRow,
} from './gameSetting.js';
import { gameState } from './gameState.js';

const renderGame = (gameAreaEl, currentGameState) => {
  gameAreaEl.innerHTML = '';

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
};

const startGame = (difficulty) => {
  const gameAreaEl = document.querySelector('.game_area-container');

  const numContainers = gameDifficulty[difficulty] || gameDifficulty.easy;

  const state = generateRandomGameState(numContainers, Object.values(colors));

  renderGame(gameAreaEl, state);

  resetControllerState();

  addWaterContainerEventListener(gameAreaEl);
  addWaterContainerAnimationEventListener(gameAreaEl);

  gameState.resetState();
  gameState.addWaterContainers(
    Array.from(gameAreaEl.querySelectorAll('.water-container'))
  );
  gameState.addState(state);

  return state;
};

console.log(startGame('easy'));

// const ws = document.querySelectorAll('.water-container');

// const water = ws[0].querySelector('.water');

// const rect = water.getBoundingClientRect();

// console.log(rect.bottom);
// console.log(window.innerHeight);
