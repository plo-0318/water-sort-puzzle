'use strict';

import Confetti from './confetti.js';

export const generateWater = (color) => {
  const waterEl = document.createElement('div');
  waterEl.classList.add('water');
  waterEl.style.backgroundColor = color;

  return waterEl;
};

export const generateWaterContainer = (colors) => {
  const waterContainerEl = document.createElement('div');
  waterContainerEl.classList.add('water-container');

  const waterContainerState = [];

  for (let i = 0; i < colors.length; i++) {
    waterContainerEl.appendChild(generateWater(colors[i]));
    waterContainerState.push(colors[i]);
  }

  return waterContainerEl;
};

export const generateRowContainer = (colors) => {
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('row-container');

  for (let i = 0; i < colors.length; i++) {
    rowContainer.appendChild(generateWaterContainer(colors[i]));
  }

  return rowContainer;
};

export const generateRandomGameState = (numContainers, allColors) => {
  const numColorsNeeded = numContainers - 2;

  // Calculate the available colors
  const availableColors = allColors.slice(0, numColorsNeeded);

  const state = [];
  const colorsPerContainer = 4;
  const totalColors = colorsPerContainer * numColorsNeeded;

  // Create a flat array that contains 4 of each available color
  const flatArray = [];
  for (let i = 0; i < availableColors.length; i++) {
    for (let j = 0; j < colorsPerContainer; j++) {
      flatArray.push(availableColors[i]);
    }
  }

  // Check if each container doesn't contain 4 of the same colors
  const validArray = (array) => {
    for (let i = 0; i < totalColors; i += colorsPerContainer) {
      let numSame = 0;

      for (let j = i + 1; j < i + colorsPerContainer; j++) {
        if (array[j] === array[i]) {
          numSame++;
        }
      }

      if (numSame >= 3) {
        return false;
      }
    }

    return true;
  };

  // Shuffle the flat array
  const shuffleFlatArray = () => {
    for (let i = flatArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
    }
  };

  shuffleFlatArray();

  while (!validArray(flatArray)) {
    shuffleFlatArray();
  }

  // Divide the flat array into sub-arrays with the required number of colors
  let startIndex = 0;
  for (let i = 0; i < numColorsNeeded; i++) {
    const endIndex = startIndex + colorsPerContainer;
    state.push(flatArray.slice(startIndex, endIndex));
    startIndex = endIndex;
  }

  state.push([]);
  state.push([]);

  return state;
};

export const generateConfetti = (waterContainer, removeTime) => {
  const rect = waterContainer.getBoundingClientRect();

  const confettiWrapper = document.createElement('div');
  confettiWrapper.classList.add('confetti-wrapper');

  confettiWrapper.style.height = `${rect.bottom}px`;
  confettiWrapper.style.left = `${rect.x}px`;
  confettiWrapper.style.setProperty(
    '--confetti-wrapper-move-y',
    `${(window.innerHeight - rect.bottom) * -1}px`
  );

  document.body.appendChild(confettiWrapper);

  const mainConfettiContainer = document.createElement('div');
  mainConfettiContainer.classList.add('confetti-container__main');
  confettiWrapper.appendChild(mainConfettiContainer);

  const confetti = new Confetti(mainConfettiContainer);

  confetti.render();

  setTimeout(() => {
    confetti.stopRender();
    confettiWrapper.remove();
  }, removeTime);
};

export const generateWaterStream = (waterContainer, color) => {
  const rect = waterContainer.getBoundingClientRect();

  const waterStreamEl = document.createElement('div');

  waterStreamEl.classList.add('water-stream');

  waterStreamEl.style.top = `${rect.bottom}px`;
  waterStreamEl.style.left = `${rect.left}px`;
  waterStreamEl.style.backgroundColor = color;

  document.body.appendChild(waterStreamEl);

  waterStreamEl.classList.add('water-stream-fall');

  return waterStreamEl;
};
