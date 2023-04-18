'use strict';

import {
  StateNode,
  validEndStateNode,
  validNextStateNodes,
  containsStateNode,
  generatePath,
} from './searchUtil.js';

export class Bfs {
  constructor(state) {
    this.stateNode = new StateNode(state, null);
    this.hasSolution = false;

    this.frontier = [];
    this.explored = [];
    this.path = [];

    this.frontier.push(this.stateNode);
  }

  search() {
    let statesSearched = 0;
    let startTime = Date.now();
    let endTime;
    let statesGenerated = 0;

    let end = false;

    while (!end) {
      if (this.frontier.length === 0) {
        this.hasSolution = false;
        endTime = Date.now();

        break;
      }

      const currentStateNode = this.frontier.shift();

      statesSearched++;

      this.explored.push(currentStateNode);

      const nextStateNodes = validNextStateNodes(currentStateNode);

      for (let i = 0; i < nextStateNodes.length; i++) {
        if (
          !containsStateNode(this.explored, nextStateNodes[i]) &&
          !containsStateNode(this.frontier, nextStateNodes[i])
        ) {
          if (validEndStateNode(nextStateNodes[i])) {
            this.hasSolution = true;
            endTime = Date.now();

            this.explored.push(nextStateNodes[i]);

            end = true;
            break;
          }

          this.frontier.push(nextStateNodes[i]);
          statesGenerated++;
        }
      }
    }

    this.frontier = [];
    console.log(this.explored.length);
    this.path = generatePath(this.explored, this.explored.length - 1);

    return {
      foundSolution: this.hasSolution,
      statesGenerated,
      statesSearched,
      path: this.path,
      time: endTime - startTime,
    };
  }
}
