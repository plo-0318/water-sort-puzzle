'use strict';

export const colors = {
  red: '#e03131',
  blue: '#1c7ed6',
  purple: '#ae3ec9',
  teal: '#12b886',
  pink: '#f783ac',
  orange: ' #fd7e14',
  yellow: '#ffe066',
  green: '#40c057',
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
    highlight: '#8ce99a',
    title: 'You Won',
    content: 'You completed the game without any hints!',
    btnText: ['Play Again'],
  },
  gameWonWithHint: {
    color: '#ff922b',
    highlight: '#ffa94d',
    title: 'You Won',
    content: 'You completed the game some hints!',
    btnText: ['Play Again'],
  },
  gameWonByAI: {
    color: '#cc5de8',
    highlight: '#da77f2',
    title: 'AI Won',
    content: 'The AI completed the game without any hints!',
    btnText: ['Play Again'],
  },
};
