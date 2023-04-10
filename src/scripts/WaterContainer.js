'use strict';

export class Water {
  constructor(waterEl, color) {
    this.el = waterEl;
    this.color = color;
  }

  setColor(color) {
    this.color = color;
    this.el.style.backgroundColor = this.color;
  }
}

export class WaterContainer {
  static id = 0;

  constructor(waterContainerEl) {
    this.el = waterContainerEl;
    this.waters = [];
    this.id = ++id;
  }

  addWater(water) {
    this.waters.push(water);
  }

  removeWater() {
    return this.waters.pop();
  }

  top() {
    if (this.empty()) {
      return null;
    }

    return this.waters[this.waters.length - 1];
  }

  empty() {
    return this.waters.length === 0;
  }

  count() {
    return this.waters.length;
  }
}
