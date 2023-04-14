import { gameState } from './gameState.js';
import { startNewGame, renderGame } from './game.js';
import { showRestartModal } from './modalController.js';

const menuContainer = document.querySelector('.menu-items-container');

const restartBtn = document.getElementById('btn-restart');
const rewindBtn = document.getElementById('btn-rewind');
const hintBtn = document.getElementById('btn-hint');
const aiBtn = document.getElementById('btn-ai');
const settingBtn = document.getElementById('btn-setting');
const menuBtns = [restartBtn, rewindBtn, hintBtn, aiBtn, settingBtn];

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
  showRestartModal();
});

rewindBtn.addEventListener('click', () => {
  const prevGameState = gameState.undoState();

  if (prevGameState) {
    renderGame(prevGameState);
  }
});
