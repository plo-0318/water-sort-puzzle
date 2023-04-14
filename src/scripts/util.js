'use strict';

export const getWaterEls = (waterContainer) => {
  const waterEls = waterContainer.querySelectorAll('.water');

  const water = [];

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

  if (waterEls.length < 4) {
    return false;
  }

  let sameColor = 1;

  for (let i = 1; i < waterEls.length; i++) {
    if (
      waterEls[i].style.backgroundColor === waterEls[0].style.backgroundColor
    ) {
      sameColor++;
    }
  }

  return sameColor === 4;
};

export const removeWaterStreams = () => {
  const waterStreamEls = document.querySelectorAll('.water-stream');

  waterStreamEls.forEach((waterStreamEl) => waterStreamEl.remove());
};

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
