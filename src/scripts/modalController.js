'use strict';

import { gameState } from './gameState.js';
import { startNewGame } from './game.js';

const backdropEl = document.querySelector('.modal-backdrop');
const gameEndModalEl = document.querySelector('.modal-game-end');

const gameEndModalTitleTextEl = document.querySelector('.modal-title-text');
const gameEndModalContentTextEl = document.querySelector('.modal-content-text');
const gameEndModalBtnEl = document.querySelector('.modal-btn');

const gameEndStatMovesEl = document.getElementById('stat-moves');
const gameEndStatUndosEl = document.getElementById('stat-undos');
const gameEndStatHintssEl = document.getElementById('stat-hints');

const restartModalEl = document.querySelector('.modal-restart');
const restartModalRestartBtnEl = document.querySelector('.modal-btn-restart');
const restartModalCancelBtnEl = document.querySelector('.modal-btn-cancel');

let gameEndModalBtnEventListener = null;

// Remove the showing animation class after playing
backdropEl.addEventListener('animationend', () => {
  backdropEl.classList.contains('modal-backdrop-fadeIn') &&
    backdropEl.classList.remove('modal-backdrop-fadeIn');
});

// Remove the showing animation class after playing
document.body.addEventListener('animationend', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.contains('modal-popup') &&
      e.target.classList.remove('modal-popup');
  }
});

const showModal = (modal) => {
  // Un-hide the modal and backdrop element
  backdropEl.classList.contains('content-hide') &&
    backdropEl.classList.remove('content-hide');

  modal.classList.contains('content-hide') &&
    modal.classList.remove('content-hide');

  // Play the showing animation
  backdropEl.classList.add('modal-backdrop-fadeIn');
  modal.classList.add('modal-popup');
};

const hideModal = (modal) => {
  !backdropEl.classList.contains('content-hide') &&
    backdropEl.classList.add('content-hide');

  !modal.classList.contains('content-hide') &&
    modal.classList.add('content-hide');
};

export const showGameEndModal = (options, onModalBtnClick = null) => {
  // Remove previous onclick event listener
  if (gameEndModalBtnEventListener) {
    gameEndModalBtnEl.removeEventListener(
      'click',
      gameEndModalBtnEventListener
    );
  }

  // Initialize the modal's content and style
  document.documentElement.style.setProperty(
    '--game-end-modal-title-text-color',
    options.color
  );
  document.documentElement.style.setProperty(
    '--game-end-modal-btn-background-color',
    options.color
  );
  document.documentElement.style.setProperty(
    '--game-end-modal-btn-background-color__hover',
    options.highlightColor
  );

  gameEndModalTitleTextEl.textContent = options.title;
  gameEndModalContentTextEl.textContent = options.content;
  gameEndModalBtnEl.textContent = options.btnText;

  gameEndStatMovesEl.textContent = gameState.moves;
  gameEndStatUndosEl.textContent = gameState.undos;
  gameEndStatHintssEl.textContent = 6;

  // Assign the event listener to a new function
  gameEndModalBtnEventListener = () => {
    hideModal(gameEndModalEl);

    onModalBtnClick && onModalBtnClick();
  };

  // Add the button onclick event listener
  gameEndModalBtnEl.addEventListener('click', gameEndModalBtnEventListener);

  showModal(gameEndModalEl);
};

restartModalRestartBtnEl.addEventListener('click', () => {
  startNewGame(gameState.difficult, gameState.startingState());
  hideModal(restartModalEl);
});

restartModalCancelBtnEl.addEventListener('click', () => {
  hideModal(restartModalEl);
});

export const showRestartModal = () => {
  showModal(restartModalEl);
};