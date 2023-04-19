'use strict';

import {
  StateNode,
  validEndStateNode,
  validNextStateNodes,
  generatePath,
} from './searchUtil.js';

export class Bfs {
  constructor(state) {
    this.type = 'bfs';
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

    let end = false;

    while (!end) {
      // If the frontier is empty --> no soultion found
      if (this.frontier.length === 0) {
        this.hasSolution = false;

        break;
      }

      // Get the state node in the front of the list and remove it
      const currentStateNode = this.frontier.shift();

      // Remove it from the frontier map
      this.frontierMap.delete(currentStateNode.hashCode);

      // Increment states searched
      statesSearched++;

      // Add the state node to the explored
      this.exploredMap.set(currentStateNode.hashCode, currentStateNode);

      // Expand the node --> Generate the valid next states
      const nextStateNodes = validNextStateNodes(currentStateNode);

      // For every next valid state nodes
      for (let i = 0; i < nextStateNodes.length; i++) {
        // If it is not already on frontier or explored
        if (
          !this.exploredMap.has(nextStateNodes[i].hashCode) &&
          !this.frontierMap.has(nextStateNodes[i].hashCode)
        ) {
          // If it is a valid end state --> solution found
          if (validEndStateNode(nextStateNodes[i])) {
            this.hasSolution = true;

            // Saving the goal node, so a path can be generated
            this.goalNode = nextStateNodes[i];

            end = true;
            break;
          }

          // Push it to the frontier
          this.frontier.push(nextStateNodes[i]);

          // Insert it into the frontier map
          this.frontierMap.set(nextStateNodes[i].hashCode, nextStateNodes[i]);
          statesGenerated++;
        }
      }
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
