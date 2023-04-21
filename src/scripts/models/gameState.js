'use strict';

import { getColors, validEndState, deepCompareArrays } from '../utils/util.js';

class GameState {
  constructor() {
    this.states = [];
    this.waterContainerEls = [];
    this.gameEnded = false;

    this.moves = 0;
    this.undos = 0;
    this.hints = 0;
    this.ai = false;

    this.hintStates = [];
    this.searchResult = null;

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

    this.hintStates = [];
    this.searchResult = null;
  }

  setSearchResult(result) {
    this.searchResult = result;
    this.hintStates = [];
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

  // If the user press hints at the same state multiple times, don't increment the hints count
  incrementHints() {
    // User has requested hints before
    if (this.hintStates.length > 0) {
      // User has requested hint for this state previously
      if (
        this.hintStates.some((state) =>
          deepCompareArrays(state, this.currentState())
        )
      ) {
        return;
      }
    }

    this.hints++;
    this.hintStates.push(this.currentState());
  }
}

export const gameState = new GameState();
