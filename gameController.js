'use strict';

import { getWaterEls, fullAndSameColor } from './util.js';
import {
  generateWater,
  generateConfetti,
  generateWaterStream,
} from './generate.js';
import { gameState } from './gameState.js';

const waterStreamAnimationDuration = 500;

let animationPlaying = false;
let currentWaterContainer = null;
let fromContainer = null;
let toContainer = null;
let waterStreamEl = null;

export const resetControllerState = () => {
  animationPlaying = false;
  currentWaterContainer = null;
  fromContainer = null;
  toContainer = null;
  waterStreamEl = null;
};

const waterContainerAnimations = [
  'water-container__hover',
  'water-container__unhover',
  'water-container__move',
  'water-container__unmove',
];

const removeAllAnimations = (el, animations) => {
  animations.forEach((animation) => el.classList.remove(animation));
};

const hoverWaterContainer = (waterContainer) => {
  if (getWaterEls(waterContainer).length === 0) {
    return;
  }

  removeAllAnimations(waterContainer, waterContainerAnimations);

  waterContainer.classList.add('water-container__hover');
  currentWaterContainer = waterContainer;

  animationPlaying = true;
};

const unhoverWaterContainer = (waterContainer) => {
  removeAllAnimations(waterContainer, waterContainerAnimations);

  waterContainer.classList.add('water-container__unhover');
  currentWaterContainer = null;

  animationPlaying = true;
};

export const addWaterContainerEventListener = (gameAreaEl) => {
  gameAreaEl.addEventListener('click', (e) => {
    if (animationPlaying) {
      return;
    }

    const classList = e.target.classList;

    // If the target is water container or water
    if (classList.contains('water-container') || classList.contains('water')) {
      // Get the water container element
      const newWaterContainer = classList.contains('water-container')
        ? e.target
        : e.target.closest('.water-container');

      // No water container selected, selecting the current one
      if (!currentWaterContainer) {
        hoverWaterContainer(newWaterContainer);
      }
      // A water container is already selected, selecting the same one
      else if (currentWaterContainer.isEqualNode(newWaterContainer)) {
        unhoverWaterContainer(newWaterContainer);
      }
      // A water container is already selected, selecting the different one
      else {
        moveWaterContainer(currentWaterContainer, newWaterContainer);

        animationPlaying = true;
      }
    }
  });
};

const canPour = (from, to) => {
  const fromWaterEls = getWaterEls(from);
  const toWaterEls = getWaterEls(to);

  if (toWaterEls.length === 0) {
    return true;
  }

  if (toWaterEls.length === 4) {
    return false;
  }

  if (fromWaterEls.length === 0) {
    return false;
  }

  return (
    fromWaterEls[0].style.backgroundColor ===
    toWaterEls[0].style.backgroundColor
  );
};

const moveWaterContainer = (from, to) => {
  if (!canPour(from, to)) {
    unhoverWaterContainer(from);
    return;
  }

  fromContainer = from;
  toContainer = to;

  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  const left = fromRect.x > toRect.x;

  const xOffset = left ? fromRect.height : 0;
  const yOffset = toRect.top - fromRect.top;

  const moveX = toRect.x - fromRect.x - fromRect.width + xOffset;
  const moveY = (fromRect.height / 2 + fromRect.width - yOffset) * -1;
  const rotate = left ? '-90' : '90';

  from.style.setProperty('--move-x', `${moveX}px`);
  from.style.setProperty('--move-y', `${moveY}px`);
  from.style.setProperty('--rotate', `${rotate}deg`);

  from.classList.remove('water-container__hover');
  from.classList.add('water-container__move');
};

const unmoveWaterContainer = (waterContainer) => {
  waterContainer.classList.remove('water-container__move');
  waterContainer.classList.add('water-container__unmove');
};

const pourWater = (from, to) => {
  // If allowed to pour, pour 1 unit of water
  // Will always be true if it is called the first time from moveWaterContainer
  if (canPour(from, to)) {
    // Pour the water
    const fromWaterEls = getWaterEls(fromContainer);
    const waterToPour = fromWaterEls[0];
    const waterColor = waterToPour.style.backgroundColor;

    waterToPour.classList.add('water__decrease');

    // Add a unit of water to the destination container
    const newWater = generateWater(waterColor);
    to.appendChild(newWater);
    newWater.classList.add('water__increase');

    animationPlaying = true;
  }
  // If not allowed to pour, move the water container back to its original position
  else {
    unmoveWaterContainer(from);

    if (waterStreamEl) {
      waterStreamEl.remove();
      waterStreamEl = null;
    }

    gameState.calculateCurrentState();
  }
};

export const addWaterContainerAnimationEventListener = (gameAreaEl) => {
  gameAreaEl.addEventListener('animationend', (e) => {
    const classList = e.target.classList;

    if (classList.contains('water-container')) {
      handleWaterContainerAnimationEnd(e.target);
    } else if (classList.contains('water')) {
      handleWaterAnimationEnd(e.target);
    }
  });
};

const handleWaterContainerAnimationEnd = (waterContainer) => {
  // The origin water container finished its moving animation to the destination position
  if (waterContainer.classList.contains('water-container__move')) {
    // Generate the water stream element
    const fromWaterEls = getWaterEls(fromContainer);
    const waterToPour = fromWaterEls[0];
    const waterColor = waterToPour.style.backgroundColor;

    waterStreamEl = generateWaterStream(toContainer, waterColor);

    // Wait until the water stream reaches the top most water in the destination container
    // Then start pouring the water
    setTimeout(() => {
      pourWater(fromContainer, toContainer);
    }, waterStreamAnimationDuration - getWaterEls(toContainer).length * (waterStreamAnimationDuration * 0.2));
  }
  // The origin water container finished its moving animation back to its original position
  else if (waterContainer.classList.contains('water-container__unmove')) {
    removeAllAnimations(waterContainer, waterContainerAnimations);

    currentWaterContainer = null;
    animationPlaying = false;
  }
  // The water container finished its hover/unhover animation
  else {
    animationPlaying = false;
  }
};

const handleWaterAnimationEnd = (water) => {
  // A unit of water has just finished it pouring animation
  if (water.classList.contains('water__decrease')) {
    // Remove the water from the DOM
    water.remove();
  }
  // A unit of water has just finished it filling animation
  else if (water.classList.contains('water__increase')) {
    // Get the water container element
    const waterContainer = water.closest('.water-container');

    if (fullAndSameColor(waterContainer)) {
      generateConfetti(waterContainer, 3000);
    }

    // Try to pour more water
    water.classList.remove('water__increase');
    pourWater(fromContainer, toContainer);
  }
};
