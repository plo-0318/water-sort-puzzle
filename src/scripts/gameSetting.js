'use strict';

import { gameState } from './models/gameState.js';

export let animationSpeed = 1;

export const setAnimationSpeed = (speed) => {
  if (speed !== 1 && speed !== 2) {
    return;
  }

  animationSpeed = speed;

  document.documentElement.style.setProperty(
    '--water-container-animation-speed',
    `${animationSpeed}`
  );
};

export let algorithm = 'bfs';

export const setAlgorithm = (newAlgorithm) => {
  if (newAlgorithm !== 'dfs' && newAlgorithm !== 'bfs') {
    return;
  }

  if (algorithm !== newAlgorithm) {
    gameState.setSearchResult(null);
  }

  algorithm = newAlgorithm;
};

export const colors = {
  red: '#e03131',
  blue: '#1c7ed6',
  purple: '#ae3ec9',
  teal: '#12b886',
  pink: '#f783ac',
  orange: '#fd7e14',
  yellow: '#ffe066',
  green: '#2b8a3e',
  indigo: '#91a7ff',
};

export const maxWaterContainerPerRow = 6;

export const gameDifficulty = {
  easy: 5,
  medium: 8,
  hard: 11,
};

export const modalSetting = {
  gameWon: {
    color: '#69db7c',
    highlightColor: '#8ce99a',
    title: 'You Won',
    content: 'You completed the game without any hints!',
    btnText: 'Play Again',
  },
  gameWonWithHint: {
    color: '#ff922b',
    highlightColor: '#ffa94d',
    title: 'You Won',
    content: 'You completed the game with some hints!',
    btnText: 'Play Again',
  },
  gameWonByAI: {
    color: '#cc5de8',
    highlightColor: '#da77f2',
    title: 'AI Won',
    content: 'The AI completed the game without any hints!',
    btnText: 'Play Again',
  },
};
