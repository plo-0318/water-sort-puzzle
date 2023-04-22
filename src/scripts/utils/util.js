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

export const deepCompareArrays = (arr1, arr2) => {
  // If the arrays have different lengths, they are not equal
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Iterate over the arrays and compare each element
  for (let i = 0; i < arr1.length; i++) {
    // If the current element is an array, recursively call the function
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!deepCompareArrays(arr1[i], arr2[i])) {
        return false;
      }
    }
    // Otherwise, compare the elements
    else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If haven't returned false by this point, the arrays are equal
  return true;
};

//// TESTS ////

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

//// TEST STATES ////
// const state1 = [
//   ['#ae3ec9', '#e03131', '#1c7ed6', '#ae3ec9'],
//   ['#1c7ed6', '#e03131', '#ae3ec9', '#e03131'],
//   ['#1c7ed6', '#ae3ec9', '#e03131'],
//   ['#1c7ed6'],
//   [],
// ];

// const state2 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   [],
//   ['#1c7ed6', '#1c7ed6'],
// ];

// const state3 = [
//   ['#e03131', '#ae3ec9', '#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#e03131', '#ae3ec9', '#e03131'],
//   [],
//   [],
// ];

// const state4 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#1c7ed6'],
//   ['#1c7ed6'],
// ];

// const state5 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6', '#e03131'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#1c7ed6', '#1c7ed6'],
//   [],
// ];

// const state6 = [
//   ['#e03131', '#ae3ec9', '#1c7ed6'],
//   ['#ae3ec9', '#e03131'],
//   ['#ae3ec9', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#e03131'],
//   ['#1c7ed6', '#1c7ed6'],
// ];

// const state7 = [
//   ['#f783ac', '#fd7e14', '#f783ac', '#12b886'],
//   ['#ae3ec9', '#ae3ec9', '#f783ac', '#1c7ed6'],
//   ['#fd7e14', '#1c7ed6', '#1c7ed6'],
//   ['#fd7e14', '#e03131', '#12b886', '#e03131'],
//   ['#12b886', '#f783ac', '#fd7e14', '#ae3ec9'],
//   ['#e03131', '#e03131', '#1c7ed6', '#ae3ec9'],
//   ['#12b886'],
//   [],
// ];

// const state8 = [
//   ['#2b8a3e', '#ae3ec9', '#91a7ff', '#12b886'],
//   ['#1c7ed6', '#2b8a3e', '#1c7ed6', '#1c7ed6'],
//   ['#ffe066', '#12b886', '#ffe066', '#e03131'],
//   ['#e03131', ' #fd7e14', ' #fd7e14', '#f783ac'],
//   ['#e03131', '#91a7ff', '#2b8a3e', '#12b886'],
//   [' #fd7e14', '#f783ac', '#f783ac', '#f783ac'],
//   ['#ae3ec9', ' #fd7e14', '#91a7ff', '#e03131'],
//   ['#ffe066', '#2b8a3e', '#ae3ec9', '#91a7ff'],
//   ['#12b886', '#1c7ed6', '#ae3ec9', '#ffe066'],
//   [],
//   [],
// ];

// const state9 = [
//   ['#e03131', '#12b886', '#ae3ec9', '#1c7ed6'],
//   ['#ae3ec9', ' #fd7e14', '#e03131', '#f783ac'],
//   [' #fd7e14', '#e03131', '#12b886', '#1c7ed6'],
//   ['#ae3ec9', '#f783ac', '#12b886', '#f783ac'],
//   [' #fd7e14', '#ae3ec9', '#e03131', '#1c7ed6'],
//   ['#1c7ed6', '#f783ac', ' #fd7e14', '#12b886'],
//   [],
//   [],
// ];
