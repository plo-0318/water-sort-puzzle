'use strict';

import {
  StateNode,
  validEndStateNode,
  validNextStateNodes,
  generatePath,
} from './searchUtil.js';

export class Dfs {
  constructor(state) {
    this.type = 'dfs';
    this.startingState = state;
    this.startingStateNode = new StateNode(state);
    this.hasSolution = false;

    this.frontier = [];
    this.frontierMap = new Map();
    this.exploredMap = new Map();
    this.goalNode = null;
    this.path = [];

    this.frontier.push(this.startingStateNode);
    this.frontierMap.set(
      this.startingStateNode.hashCode,
      this.startingStateNode
    );
  }

  search() {
    let statesSearched = 0;
    const startTime = Date.now();
    let statesGenerated = 0;

    while (true) {
      // If the frontier is empty --> no solution found
      if (this.frontier.length === 0) {
        this.hasSolution = false;

        break;
      }

      // Choose the top node from the frontier and remove it
      const currentStateNode = this.frontier.pop();

      // Remove it from the frontier map
      this.frontierMap.delete(currentStateNode.hashCode);

      // Increment states searched
      statesSearched++;

      // Add the node to explored
      this.exploredMap.set(currentStateNode.hashCode, currentStateNode);

      // If the top node is a valid end state --> found solution
      if (validEndStateNode(currentStateNode)) {
        this.hasSolution = true;
        this.goalNode = currentStateNode;

        break;
      }

      // Expand the node --> Generate the valid next states
      const nextStateNodes = validNextStateNodes(currentStateNode);

      // For every next valid state nodes
      nextStateNodes.forEach((nextStateNode) => {
        // Push the resulting node to the fonrtier only if it is not already on frontier or explored
        if (
          !this.frontierMap.has(nextStateNode.hashCode) &&
          !this.exploredMap.has(nextStateNode.hashCode)
        ) {
          this.frontier.push(nextStateNode);
          this.frontierMap.set(nextStateNode.hashCode, nextStateNode);

          // Increment the states generated counter
          statesGenerated++;
        }
      });
    }

    const endTime = Date.now();

    if (this.hasSolution) {
      this.path = generatePath(this.goalNode, this.exploredMap);
    }

    this.frontier = [];
    this.frontierMap.clear();
    this.exploredMap.clear();

    return {
      foundSolution: this.hasSolution,
      statesGenerated,
      statesSearched,
      path: this.path,
      time: endTime - startTime,
    };
  }
}
