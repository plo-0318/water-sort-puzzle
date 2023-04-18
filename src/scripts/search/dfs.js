'use strict';

import {
  validEndStateNode,
  validNextStateNodes,
  validatePath,
  containsStateNode,
  StateNode,
} from './searchUtil.js';

export class Dfs {
  constructor(state) {
    this.stateNode = new StateNode(state, null);
    this.hasSolution = false;

    this.frontier = [];
    this.path = [];

    this.frontier.push(this.stateNode);
  }

  search() {
    let statesSearched = 0;
    let startTime = Date.now();
    let endTime;
    let statesGenerated = 0;

    while (true) {
      if (this.frontier.length === 0) {
        this.hasSolution = false;
        endTime = Date.now();

        break;
      }

      const currentStateNode = this.frontier.pop();

      statesSearched++;

      this.path.push(currentStateNode);
      this.path = validatePath(this.path);

      if (validEndStateNode(currentStateNode)) {
        this.hasSolution = true;
        endTime = Date.now();

        break;
      }

      const nextStateNodes = validNextStateNodes(currentStateNode);

      if (nextStateNodes.length === 0) {
        this.path.pop();
      }

      nextStateNodes.forEach((nextStateNode) => {
        if (!containsStateNode(this.path, nextStateNode)) {
          this.frontier.push(nextStateNode);
          statesGenerated++;
        }
      });
    }

    this.frontier = [];

    return {
      foundSolution: this.hasSolution,
      statesGenerated,
      statesSearched,
      path: this.path,
      time: endTime - startTime,
    };
  }
}
