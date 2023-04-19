import { gameState } from '../models/gameState.js';
import { renderGame } from '../game.js';

import { search } from '../search/search.js';
import { Dfs } from '../search/dfs.js';
import { Bfs } from '../search/bfs.js';

import ModalRestart from '../views/modals/modalRestart.js';
import ModalAI from '../views/modals/modalAi.js';
import ModalGameSettings from '../views/modals/modalGameSettings.js';

const menuContainer = document.querySelector('.menu-items-container');

const restartBtn = document.getElementById('btn-restart');
const rewindBtn = document.getElementById('btn-rewind');
const hintBtn = document.getElementById('btn-hint');
const aiBtn = document.getElementById('btn-ai');
const settingBtn = document.getElementById('btn-setting');
const menuBtns = [restartBtn, rewindBtn, hintBtn, aiBtn, settingBtn];

let restartModal = new ModalRestart(gameState);
let gameSettingsModal = new ModalGameSettings(gameState);
let aiModal = new ModalAI(gameState);

export const disableMenuBtns = () => {
  menuBtns.forEach((btn) => {
    btn.setAttribute('disabled', true);
  });
};

export const enableMenuBtns = () => {
  menuBtns.forEach((btn) => {
    btn.removeAttribute('disabled');
  });
};

menuContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-item-container')) {
    e.target.style.transform = 'scale(0.9)';

    setTimeout(() => {
      e.target.style.transform = 'scale(1)';
    }, 200);
  }
});

restartBtn.addEventListener('click', () => {
  restartModal.show();
});

rewindBtn.addEventListener('click', () => {
  const prevGameState = gameState.undoState();

  if (prevGameState) {
    renderGame(prevGameState);
  }
});

hintBtn.addEventListener('click', () => {
  aiModal.show();

  search(new Bfs(gameState.currentState()), (data) => {
    aiModal.finish(data);
  });
});

settingBtn.addEventListener('click', () => {
  gameSettingsModal.show();
});
