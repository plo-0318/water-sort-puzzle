'use strict';

import { gameState } from '../models/gameState.js';
import { validEndState, deepCompareArrays } from '../utils/util.js';

/* 
bottom of container --> top of container

['#ae3ec9', '#e03131', '#1c7ed6', '#ae3ec9']
['#1c7ed6', '#e03131', '#ae3ec9', '#e03131']
['#1c7ed6', '#ae3ec9', '#e03131']
['#1c7ed6']
[] 
*/

export class StateNode {
  constructor(state, parentNode) {
    this.state = state;
    this.parentNode = parentNode || null;
    this.hashCode = this.generateHashCode();
  }

  generateHashCode() {
    const jsonStr = JSON.stringify(this.state);

    let hash = 0;

    for (let i = 0; i < jsonStr.length; i++) {
      // Get the Unicode value of the character at index i
      let charCode = jsonStr.charCodeAt(i);

      // Calculate the hash code using the "djb2" algorithm, which involves bit shifting and subtraction.
      hash = (hash << 5) - hash + charCode;

      // Convert the hash code to a 32-bit integer to avoid overflow.
      hash = hash & hash;
    }

    return hash;
  }

  equals(stateNode) {
    return this.hashCode === stateNode.hashCode;
  }
}

export const validEndStateNode = (node) => {
  return validEndState(node.state);
};

const allowedToPour = (containerFrom, containerTo) => {
  // containerFrom is empty, nothing to pour --> false
  if (containerFrom.length === 0) {
    return false;
  }

  // containerTo is full --> false
  if (containerTo.length === 4) {
    return false;
  }

  // containerFrom and containerTo has the same top color --> true
  if (
    containerFrom[containerFrom.length - 1] ===
    containerTo[containerTo.length - 1]
  ) {
    return true;
  }

  // containerTo is empty --> true
  if (containerTo.length === 0) {
    return true;
  }
};

// Generate the resulting state node of pouring water from one container to another container
const resultingStateNode = (fromContainerIndex, toContainerIndex, state) => {
  const containerFrom = state[fromContainerIndex];
  const containerTo = state[toContainerIndex];

  // Calculate the empty slots at the top of the to container
  let emptySlots = 4 - containerTo.length;

  let canPour = 1;

  // Calculate the number of colors that are the same from the top of the container
  for (let i = containerFrom.length - 2; i >= 0; i--) {
    if (containerFrom[i] === containerFrom[containerFrom.length - 1]) {
      canPour++;
    } else {
      break;
    }
  }

  // If have enough space, pour all the same colors, else, pour only the number of empty slots
  const amountToPour = emptySlots >= canPour ? canPour : emptySlots;

  // Remove the number of amountToPour from the from container
  const newContainerFrom = containerFrom.slice(
    0,
    containerFrom.length - amountToPour
  );
  const newContainerTo = [...containerTo];

  // Insert the number of amountToPOur colors to the to container
  for (let i = 0; i < amountToPour; i++) {
    newContainerTo.push(containerFrom[containerFrom.length - 1]);
  }

  const newState = [...state];

  newState[fromContainerIndex] = newContainerFrom;
  newState[toContainerIndex] = newContainerTo;

  return new StateNode(newState, new StateNode(state));
};

export const validNextStateNodes = (stateNode) => {
  const nextPossibleStates = [];

  const { state } = stateNode;

  for (let i = 0; i < state.length; i++) {
    // Check each container against every other containers
    for (let j = 0; j < state.length; j++) {
      // If we are comparing to a different container, proceed
      if (i !== j) {
        // If current container can pour into the other container, generate the resulting state
        if (allowedToPour(state[i], state[j])) {
          nextPossibleStates.push(resultingStateNode(i, j, state));
        }
      }
    }
  }

  return nextPossibleStates;
};

// Generates a path from the starting node to the goal node
export const generatePath = (goalNode, exploredMap) => {
  const path = [goalNode.state];

  let currentNode = goalNode;

  // While current node's parent node is a valid node
  // AND current node's parent node is in explored
  while (
    currentNode.parentNode &&
    exploredMap.has(currentNode.parentNode.hashCode)
  ) {
    // Get the parent node and remove it from explored
    let parentNode = exploredMap.get(currentNode.parentNode.hashCode);
    exploredMap.delete(parentNode.hashCode);

    // Add it to the front of the path
    path.unshift(parentNode.state);

    // Set the current node to the parent node
    currentNode = parentNode;
  }

  return path;
};

// Using the result path, determine the from container and to container
// Return the from container element and the to container element in the DOM
export const getContainersFromPath = (path, currentStateIndex = 0) => {
  // Not a valid path
  if (currentStateIndex + 1 >= path.length) {
    return null;
  }

  const currentState = path[currentStateIndex];
  const nextState = path[currentStateIndex + 1];

  let fromContainerIndex, toContainerIndex;

  // If both containers have the same size --> return 0
  // If container1 contains less colors return -1
  // If container1 contains more colors return 1
  const compareContainers = (container1, container2) => {
    if (container1.length < container2.length) {
      return -1;
    }

    if (container1.length > container2.length) {
      return 1;
    }

    return 0;
  };

  for (let i = 0; i < currentState.length; i++) {
    const result = compareContainers(currentState[i], nextState[i]);

    // If the container from this state has more water than the container from next state
    // Then it is the pouring container
    // If the container from this state has less water than the container from next state
    // then it is the receiving container
    if (result > 0) {
      fromContainerIndex = i;
    } else if (result < 0) {
      toContainerIndex = i;
    }
  }

  const containerEls = gameState.waterContainerEls;

  return [containerEls[fromContainerIndex], containerEls[toContainerIndex]];
};

// Find the index of the state in the path if it exists
export const stateAt = (state, path) => {
  return path.findIndex((s) => deepCompareArrays(state, s));
};
