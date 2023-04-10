'use strict';

import { getColors } from './util.js';

class GameState {
  constructor() {
    this.states = [];
    this.waterContainerEls = [];
    this.gameEnded = false;
  }

  resetState() {
    this.states = [];
    this.waterContainerEls = [];
    this.gameEnded = false;
  }

  addWaterContainers(waterContainers) {
    this.waterContainerEls = [...waterContainers];
  }

  numStates() {
    return this.states.length;
  }

  states() {
    return this.states;
  }

  currentState() {
    return this.states[this.numStates() - 1] || null;
  }

  addState(state) {
    this.states.push(state);

    return this.currentState();
  }

  undoState() {
    this.states.pop();

    return this.currentState();
  }

  calculateCurrentState() {
    const newState = [];

    this.waterContainerEls.forEach((waterContainer) => {
      newState.push(getColors(waterContainer));
    });

    this.addState(newState);
  }

  _validEndStateColors(colors) {
    if (colors.length === 0) {
      return true;
    }

    if (colors.length < 4) {
      return false;
    }

    for (let i = 1; i < colors.length; i++) {
      if (colors[i] !== colors[0]) {
        return false;
      }
    }

    return true;
  }

  isEndState() {
    const currentState = this.currentState();

    currentState.forEach((colors) => {
      if (!this._validEndStateColors(colors)) {
        return false;
      }
    });

    this.gameEnded = true;

    return true;
  }
}

export const gameState = new GameState();
