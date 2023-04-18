'use strict';

import { validEndState } from '../utils/util.js';

/* 
bottom of container --> top of container

['#ae3ec9', '#e03131', '#1c7ed6', '#ae3ec9']
['#1c7ed6', '#e03131', '#ae3ec9', '#e03131']
['#1c7ed6', '#ae3ec9', '#e03131']
['#1c7ed6']
[] 
*/

export class StateNode {
  constructor(state, parent) {
    this.state = state;
    this.parent = parent;
  }
}

export const validEndStateNode = (node) => {
  return validEndState(node.state);
};

const allowedToPour = (container1, container2) => {
  if (container1.length === 0) {
    return false;
  }

  return (
    container1[container1.length - 1] === container2[container2.length - 1] ||
    container2.length === 0
  );
};

const resultingStateNode = (fromContainerIndex, toContainerIndex, state) => {
  const from = state[fromContainerIndex];
  const to = state[toContainerIndex];

  let emptySlots = 4 - to.length;

  let canPour = 1;

  // Calculate the number of colors that are the same from the top of the container
  for (let i = from.length - 2; i >= 0; i--) {
    if (from[i] === from[from.length - 1]) {
      canPour++;
    } else {
      break;
    }
  }

  // If have enough space, pour all the same colors, else, pour only the number of empty slots
  const amountToPour = emptySlots >= canPour ? canPour : emptySlots;

  // Remove the number of amountToPour from the from container
  const newFrom = from.slice(0, from.length - amountToPour);
  const newTo = [...to];

  // Insert the number of amountToPOur colors to the to container
  for (let i = 0; i < amountToPour; i++) {
    newTo.push(from[from.length - 1]);
  }

  const newState = [...state];

  newState[fromContainerIndex] = newFrom;
  newState[toContainerIndex] = newTo;

  return new StateNode(newState, state);
};

export const validNextStateNodes = (stateNode) => {
  const nextPossibleStates = [];

  const { state } = stateNode;

  for (let i = 0; i < state.length; i++) {
    // Check if it is possible to pour into another container
    for (let j = 0; j < state.length; j++) {
      // If we are comparing to a different container
      if (i !== j) {
        // If the other container is not full
        if (state[j].length < 4) {
          // Compare the top colors of current container and the other container
          if (allowedToPour(state[i], state[j])) {
            nextPossibleStates.push(resultingStateNode(i, j, state));
          }
        }
      }
    }
  }

  return nextPossibleStates;
};

const sameContainer = (container1, container2) => {
  if (container1.length !== container2.length) {
    return false;
  }

  for (let i = 0; i < container1.length; i++) {
    if (container1[i] !== container2[i]) {
      return false;
    }
  }

  return true;
};

const sameState = (state1, state2) => {
  for (let i = 0; i < state1.length; i++) {
    if (!sameContainer(state1[i], state2[i])) {
      return false;
    }
  }

  return true;
};

export const containsStateNode = (stateNodes, stateNode) => {
  for (let i = 0; i < stateNodes.length; i++) {
    if (sameState(stateNodes[i].state, stateNode.state)) {
      return true;
    }
  }

  return false;
};

export const validatePath = (path) => {
  // console.log('validating...', path.length);

  if (path.length === 1) {
    return path;
  }

  const parentState = path[path.length - 1].parent;

  let parentIndex;
  for (parentIndex = path.length - 2; parentIndex >= 0; parentIndex--) {
    if (sameState(path[parentIndex].state, parentState)) {
      break;
    }
  }

  // console.log('parent index', parentIndex);

  return [...path.slice(0, parentIndex + 1), path[path.length - 1]];
};

export const generatePath = (explored, startIndex) => {
  if (startIndex <= 0) {
    return explored;
  }

  let originalLength = explored.length;
  const unvalidated = explored.slice(0, startIndex + 1);
  const validated =
    startIndex + 1 === explored.length
      ? []
      : explored.slice(startIndex - explored.length);

  const path = validatePath(unvalidated);

  const newExplored = [...path, ...validated];

  return generatePath(
    newExplored,
    startIndex - 1 - (originalLength - newExplored.length)
  );
};
