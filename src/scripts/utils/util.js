'use strict';

export const getWaterEls = (waterContainer) => {
  const waterEls = waterContainer.querySelectorAll('.water');

  const water = [];

  // Inserting the new water into the front
  // Reversing the order
  waterEls.forEach((waterEl) => water.unshift(waterEl));

  return water;
};

// Input is in the form of rgb(r, g, b)
const rgbStringToHex = (rgb) => {
  // extract the values of the red, green, and blue components
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);

  // convert the values to HEX format
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + ('000000' + hex).slice(-6);
};

export const getColors = (waterContainer) => {
  const waterEls = getWaterEls(waterContainer);

  return waterEls.map((waterEl) =>
    rgbStringToHex(waterEl.style.backgroundColor)
  );
};

export const fullAndSameColor = (waterContainer) => {
  const waterEls = getWaterEls(waterContainer);

  // Container is not full --> false
  if (waterEls.length < 4) {
    return false;
  }

  // If any water has different color from the frist water --> false
  for (let i = 1; i < waterEls.length; i++) {
    if (
      waterEls[i].style.backgroundColor !== waterEls[0].style.backgroundColor
    ) {
      return false;
    }
  }

  return true;
};

export const removeWaterStreams = () => {
  const waterStreamEls = document.querySelectorAll('.water-stream');

  waterStreamEls.forEach((waterStreamEl) => waterStreamEl.remove());
};

const validContainerEndState = (colors) => {
  // If the container is empty --> valid
  if (colors.length === 0) {
    return true;
  }

  // If the container is not empty and contains less than 4 units of water --> invalid
  if (colors.length < 4) {
    return false;
  }

  // If any water has different color from the frist water --> invalid
  for (let i = 1; i < colors.length; i++) {
    if (colors[i] !== colors[0]) {
      return false;
    }
  }

  return true;
};

export const validEndState = (state) =>
  !state.some((s) => !validContainerEndState(s));

// let map = new Map();
// map.set('#e03131', 'red');
// map.set('#1c7ed6', 'blue');
// map.set('#ae3ec9', 'purple');
// map.set('#12b886', 'teal');
// map.set('#f783ac', 'pink');
// map.set('#fd7e14', 'orange');
// map.set('#ffe066', 'yellow');
// map.set('#2b8a3e', 'green');
// map.set('#91a7ff', 'indigo');

// export const printAllStatesColorString = (states) => {
//   const colorStates = [];

//   states.forEach((state) => {
//     colorStates.push(printStateColorString(state));
//   });

//   return colorStates;
// };

// export const printStateColorString = (state) => {
//   const colorState = [];

//   state.forEach((colors) => {
//     const colorStrings = [];

//     colors.forEach((color) => {
//       colorStrings.push(map.get(color));
//     });

//     colorState.push(colorStrings);
//   });

//   return colorState;
// };
