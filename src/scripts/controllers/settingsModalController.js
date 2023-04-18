'use strict';

import {
  modalsAllowedToCloseFromBackdrop,
  animationSpeed,
  setAnimationSpeed,
} from '../gameSetting.js';
import { gameState } from '../models/gameState.js';
import { showModal, hideModal } from './modalController.js';
import { startNewGame } from '../game.js';

const settingsModalEl = document.querySelector('.modal-settings');
const switchDifficultyModalEl = document.querySelector(
  '.modal-switch-difficulty'
);

const closeSettingsBtn = document.getElementById('btn-close-settings');

const easyDifficultyBtn = document.getElementById('btn-difficulty-easy');
const mediumDifficultyBtn = document.getElementById('btn-difficulty-medium');
const hardDifficultyBtn = document.getElementById('btn-difficulty-hard');

const animationSpeedNormalBtn = document.getElementById('btn-animation-normal');
const animationSpeedFastBtn = document.getElementById('btn-animation-fast');

const switchDifficultyBtn = document.getElementById('btn-switch-difficulty');
const cancelSwitchDifficultyBtn = document.getElementById(
  'btn-cancel-switch-difficulty'
);

let currentDifficulty = {
  el: null,
  difficulty: null,
};

modalsAllowedToCloseFromBackdrop.push(settingsModalEl);

const showSwitchDifficultyModal = () => {
  // If no moves have been made
  // then no need to show confirmation
  if (gameState.numStates() <= 1) {
    selectDifficultyOption(currentDifficulty.el);
    startNewGame(currentDifficulty.difficulty);
    return;
  }

  // Hide the settings modal, and show the confirmation modal
  hideModal(settingsModalEl, false);
  showModal(switchDifficultyModalEl, false);
};

const hideSwitchDifficultyModal = () => {
  // Hide the confirmation modal, and show the settings modal
  hideModal(switchDifficultyModalEl, false);
  showModal(settingsModalEl, false);
};

const unselectAllDifficultyBtns = () => {
  [easyDifficultyBtn, mediumDifficultyBtn, hardDifficultyBtn].forEach((btn) => {
    btn.classList.contains('setting-option__selected') &&
      btn.classList.remove('setting-option__selected');
  });
};

const selectDifficultyOption = (option) => {
  unselectAllDifficultyBtns();

  option.classList.add('setting-option__selected');
};

const toggleAnimationSpeed = (speed) => {
  if (speed === animationSpeed) {
    return;
  }

  // Remove the selected class from the animation speed buttons
  animationSpeedNormalBtn.classList.remove('setting-option__selected');
  animationSpeedFastBtn.classList.remove('setting-option__selected');

  // Get the selected button
  const btnToSelect =
    speed === 1 ? animationSpeedNormalBtn : animationSpeedFastBtn;

  btnToSelect.classList.add('setting-option__selected');

  setAnimationSpeed(speed);

  // Change the glabal css variable
  document.documentElement.style.setProperty(
    '--water-container-animation-speed',
    `${animationSpeed}`
  );
};

const btnHandlers = new Map();

btnHandlers.set('btn-difficulty-easy', (el) => {
  currentDifficulty.el = el;
  currentDifficulty.difficulty = 'easy';
  showSwitchDifficultyModal();
});

btnHandlers.set('btn-difficulty-medium', (el) => {
  currentDifficulty.el = el;
  currentDifficulty.difficulty = 'medium';
  showSwitchDifficultyModal();
});

btnHandlers.set('btn-difficulty-hard', (el) => {
  currentDifficulty.el = el;
  currentDifficulty.difficulty = 'hard';
  showSwitchDifficultyModal();
});

btnHandlers.set('btn-animation-normal', () => {
  toggleAnimationSpeed(1);
});

btnHandlers.set('btn-animation-fast', () => {
  toggleAnimationSpeed(2);
});

closeSettingsBtn.addEventListener('click', () => {
  hideModal(settingsModalEl);
});

settingsModalEl.addEventListener('click', (e) => {
  if (!e.target.classList.contains('setting-option')) {
    return;
  }

  const id = e.target.id;

  btnHandlers.get(id)(e.target);
});

switchDifficultyBtn.addEventListener('click', () => {
  hideSwitchDifficultyModal();

  selectDifficultyOption(currentDifficulty.el);
  startNewGame(currentDifficulty.difficulty);
});

cancelSwitchDifficultyBtn.addEventListener('click', () => {
  hideSwitchDifficultyModal();
});

export const showSettingsModal = () => {
  showModal(settingsModalEl);
};
