'use state';

import { gameState } from './gameState.js';
import { startNewGame } from '../game.js';
import ModalWarning from '../views/modals/modalWarning.js';

export const createRestartModal = () => {
  const modal = new ModalWarning(gameState, {
    title: 'Restart',
    contents: [
      'Are you sure you want to restart the game?',
      'Your current progress will be lost',
    ],
    btns: [
      {
        text: 'Restart',
        onClick: () => {
          startNewGame(gameState.difficulty, gameState.startingState());
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-restart'],
      },
      {
        text: 'Cancel',
        onClick: () => {
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-cancel'],
      },
    ],
  });

  return modal;
};

export const createNewGameModal = () => {
  const modal = new ModalWarning(gameState, {
    title: 'New Game',
    contents: ['Are you sure you want to start a new game?'],
    btns: [
      {
        text: 'Confirm',
        onClick: () => {
          startNewGame(gameState.difficulty);
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-restart'],
      },
      {
        text: 'Cancel',
        onClick: () => {
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-cancel'],
      },
    ],
  });

  return modal;
};

export const createWorkerUndefinedModal = () => {
  const modal = new ModalWarning(gameState, {
    title: 'Unsupported Browser',
    contents: [
      'This operation is not supported on the current browser',
      'Try updating the browser or use a different browsers',
    ],
    btns: [
      {
        text: 'Confirm',
        onClick: () => {
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-restart'],
      },
    ],
  });

  return modal;
};

export const createAiPlaydModal = (onAiPlay) => {
  const modal = new ModalWarning(gameState, {
    title: 'AI Complete',
    contents: [
      'Are you sure you want the AI to finish the game?',
      "You won't be able to take any action until it's finished",
    ],
    btns: [
      {
        text: 'AI Play',
        onClick: () => {
          typeof onAiPlay === 'function' && onAiPlay();
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-confirm__ai'],
      },
      {
        text: 'Cancel',
        onClick: () => {
          modal.hide();
        },
        id: null,
        classes: ['modal-btn-cancel'],
      },
    ],
  });

  return modal;
};
