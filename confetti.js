'use strict';

const Confetti = function (mainContainerEl) {
  this.mainContainerEl = mainContainerEl;
  this.confettiContainerEl = null;
  this.confettiAliveTime = [1.3, 1.8];
  this.confettiSize = [7, 10];

  // The possible colors for the confetti
  this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
  // The possible animations for the confetti
  this.confettiAnimations = ['slow', 'medium', 'fast'];

  this.confettiInterval = null;

  this._setupElements();
};

Confetti.prototype._setupElements = function () {
  // Create a confetti container element
  const containerEl = document.createElement('div');

  // Get the position style of the main container
  const mainContainerElPosition = this.mainContainerEl.style.position;

  // Set the main container element's position style to relative
  // Since the confetti container has position absolute
  this.mainContainerEl.style.position = 'relative';

  // Add the style to the confetti container
  containerEl.classList.add('confetti-container');

  // Append the confetti container element to the main container element
  this.mainContainerEl.appendChild(containerEl);

  // Storing the reference of the confetti container element
  this.confettiContainerEl = containerEl;
};

Confetti.prototype.render = function () {
  // Generate a confetti element every 25ms
  this.confettiInterval = setInterval(() => {
    // Create the confetti element
    const confettiEl = document.createElement('div');

    // Generate a random size between min and max size
    const minConfettiSize = this.confettiSize[0];
    const maxConfettiSize = this.confettiSize[1];
    const confettiSize =
      Math.floor(Math.random() * (maxConfettiSize - minConfettiSize + 1)) +
      minConfettiSize +
      'px';

    // Generate a random background color from the list of colors
    const confettiBackground =
      this.confettiColors[
        Math.floor(Math.random() * this.confettiColors.length)
      ];

    // Get the offsetWidth of the main container
    // The offsetWidth = width + borders + padding, but not the margin or scrollbar
    // Use the offsetWidth to calculate a random position between left most and right most of the container
    const confettiLeft =
      Math.floor(Math.random() * this.mainContainerEl.offsetWidth) + 'px';

    // Generate a random animation from the animation list
    const confettiAnimation =
      this.confettiAnimations[
        Math.floor(Math.random() * this.confettiAnimations.length)
      ];

    // Add the styles to the confetti element
    confettiEl.classList.add(
      'confetti',
      'confetti--animation-' + confettiAnimation
    );

    // Set the initial position of the confetti element
    confettiEl.style.left = confettiLeft;

    // Set the size of the confetti elment
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;

    // Set the color of the confetti
    confettiEl.style.backgroundColor = confettiBackground;

    // Generate alive time
    const minAliveTime = this.confettiAliveTime[0];
    const maxAliveTime = this.confettiAliveTime[1];

    const aliveTime =
      (Math.random() * (maxAliveTime - minAliveTime) + minAliveTime) * 1000;

    // Remove the confetti element after aliveTime
    confettiEl.removeTimeout = setTimeout(function () {
      confettiEl.parentNode.removeChild(confettiEl);
    }, aliveTime);

    // Add the confetti element to the confetti container element
    this.confettiContainerEl.appendChild(confettiEl);
  }, 25);
};

Confetti.prototype.stopRender = function () {
  if (this.confettiInterval) {
    clearInterval(this.confettiInterval);
  }
};

export default Confetti;
