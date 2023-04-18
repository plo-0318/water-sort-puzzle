'use strict';

import { getColors, validEndState } from '../utils/util.js';

class GameState {
  constructor() {
    this.states = [];
    this.waterContainerEls = [];
    this.gameEnded = false;

    this.moves = 0;
    this.undos = 0;
    this.hints = 0;
    this.ai = false;

    this.difficulty = 'easy';
  }

  resetState() {
    this.states = [];
    this.waterContainerEls = [];
    this.gameEnded = false;

    this.moves = 0;
    this.undos = 0;
    this.hints = 0;
    this.ai = false;
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

  startingState() {
    return this.states[0];
  }

  currentState() {
    return this.states[this.numStates() - 1] || null;
  }

  addState(state) {
    this.states.push(state);

    return this.currentState();
  }

  undoState() {
    if (this.states.length > 1) {
      this.states.pop();

      this.undos++;
      this.moves--;

      return this.currentState();
    }

    return null;
  }

  calculateCurrentState() {
    const newState = [];

    this.waterContainerEls.forEach((waterContainer) => {
      newState.push(getColors(waterContainer).reverse());
    });

    this.addState(newState);

    this.moves++;
  }

  isEndState() {
    if (!validEndState(this.currentState())) {
      return false;
    }

    this.gameEnded = true;

    return true;
  }
}

export const gameState = new GameState();
