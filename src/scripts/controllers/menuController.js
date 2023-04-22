import { gameState } from '../models/gameState.js';
import { renderGame, startNewGame } from '../game.js';

import { getContainersFromPath, stateAt } from '../search/searchUtil.js';
import { search } from '../search/search.js';
import { aiPourWater } from './gameController.js';

import ModalAI from '../views/modals/modalAi.js';
import ModalGameSettings from '../views/modals/modalGameSettings.js';
import {
  createAiPlaydModal,
  createNewGameModal,
  createRestartModal,
  createWorkerUndefinedModal,
} from '../models/createModals.js';
import { clearIndicators, generateIndicators } from '../utils/generate.js';

const menuContainer = document.querySelector('.menu-items-container');

const newGameBtn = document.getElementById('btn-new_game');
const restartBtn = document.getElementById('btn-restart');
const rewindBtn = document.getElementById('btn-rewind');
const hintBtn = document.getElementById('btn-hint');
const aiBtn = document.getElementById('btn-ai');
const settingBtn = document.getElementById('btn-setting');
const menuBtns = [
  newGameBtn,
  restartBtn,
  rewindBtn,
  hintBtn,
  aiBtn,
  settingBtn,
];

let restartModal = createRestartModal();
let newGameModal = createNewGameModal();
let gameSettingsModal = new ModalGameSettings(gameState);
let aiHintModal = new ModalAI(gameState);
let unsupportedModal = createWorkerUndefinedModal();

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

newGameBtn.addEventListener('click', () => {
  clearIndicators();

  if (gameState.numStates() > 1) {
    newGameModal.show();
  } else {
    startNewGame(gameState.difficulty);
  }
});

restartBtn.addEventListener('click', () => {
  clearIndicators();

  restartModal.show();
});

rewindBtn.addEventListener('click', () => {
  const prevGameState = gameState.undoState();

  if (prevGameState) {
    clearIndicators();

    renderGame(prevGameState);
  }
});

hintBtn.addEventListener('click', () => {
  if (typeof Worker === undefined) {
    unsupportedModal.show();
    return;
  }

  gameState.incrementHints();

  // Create the show indicators function
  const showIndicators = (data, stateIndexInPath) => {
    if (data.foundSolution) {
      const [fromContainer, toContainer] = getContainersFromPath(
        data.path,
        stateIndexInPath
      );
      generateIndicators(fromContainer, toContainer);
    }
  };

  handleAiClick(showIndicators);
});

aiBtn.addEventListener('click', () => {
  if (typeof Worker === undefined) {
    unsupportedModal.show();
    return;
  }

  const showAiPlayModal = (data, stateIndexInPath) => {
    if (!data.foundSolution) {
      return;
    }

    const startAiPlay = () => {
      // Disable the menu buttons
      disableMenuBtns();

      // Set game state ai playing to true
      gameState.ai = true;

      // Get the container dom elements
      const [fromContainer, toContainer] = getContainersFromPath(
        data.path,
        stateIndexInPath++
      );

      // Set the callback for ai to finish the game
      // If we haven't reach the end state, call this function again
      // Else, stop
      const callback =
        stateIndexInPath === data.path.length - 1 ? null : startAiPlay;

      // Start pouring
      setTimeout(() => {
        aiPourWater(fromContainer, toContainer, callback);
      }, 500);
    };

    let aiPlayModal = createAiPlaydModal(startAiPlay);

    aiPlayModal.show();
  };

  handleAiClick(showAiPlayModal);
});

settingBtn.addEventListener('click', () => {
  gameSettingsModal.show();
});

const handleAiClick = (onContinue) => {
  let stateIndexInPath = 0;

  // Check if we performed a searched previously and if a solution was found
  const hasResult =
    gameState.searchResult && gameState.searchResult.foundSolution;

  let index;

  // If we performed a searched previously and found a result
  if (hasResult) {
    // Try to find the index of the current state in previoulsy generated path
    index = stateAt(gameState.currentState(), gameState.searchResult.path);

    // If state is in the path, save the index of the state
    // Else reset the index to 0
    stateIndexInPath = index >= 0 ? index : 0;
  }

  // If we have performed a search previously, check if the current state is in the path result
  // If yes, just show the indicators
  if (hasResult && index >= 0) {
    onContinue(gameState.searchResult, stateIndexInPath);
    return;
  }

  // Show the modal
  aiHintModal.show();

  search(gameState.currentState(), (data) => {
    // Store the search result
    gameState.setSearchResult(data);

    // Set the continue button click handler
    data.onContinue = () => {
      onContinue(data, stateIndexInPath);
    };

    // Finish the spinner animation and show the search result
    aiHintModal.finish(data);
  });
};
