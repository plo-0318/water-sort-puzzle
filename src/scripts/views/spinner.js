class Spinner {
  constructor(color, width, circleSize, parentEl) {
    this.reset();
    this.color = color || '#f59f00';

    this.width = width;
    this.circleSize = circleSize;

    this.parentEl = parentEl;
  }

  reset() {
    this.spinnerEl && this.spinnerEl.remove();
    this.checkmarkEl && this.checkmarkEl.remove();

    this.spinnerEl = null;
    this.checkmarkEl = null;
    this.callback = null;
    this.delay = null;
  }

  setAttributes() {
    this.color &&
      this.spinnerEl.style.setProperty('--spinner-color', this.color);

    this.width &&
      this.spinnerEl.style.setProperty('--spinner-width', this.width);

    this.circleSize &&
      this.spinnerEl.style.setProperty(
        '--spinner-circle-size',
        this.circleSize
      );
  }

  #getSpinnerAngle() {
    // Get the computed styles of the element
    const computedStyles = window.getComputedStyle(this.spinnerEl);

    // Get the transform property
    const transform = computedStyles.getPropertyValue('transform');

    // Extract the rotation values from the transform property
    const matrix = transform.match(/^matrix\((.+)\)$/)[1].split(',');
    return (
      (Math.atan2(parseFloat(matrix[1]), parseFloat(matrix[0])) * 180) / Math.PI
    );
  }

  #addEventListener() {
    this.spinnerEl.addEventListener('animationend', (e) => {
      if (
        e.target.classList.contains('spinner_fill') &&
        e.target.classList.contains('spinner_complete')
      ) {
        const checkmarkEl = document.createElement('span');
        this.checkmarkEl = checkmarkEl;

        checkmarkEl.classList.add('spinner_checkmark');

        this.spinnerEl.appendChild(checkmarkEl);

        this.time = Date.now();

        this.checkmarkEl.addEventListener('animationend', () => {
          setTimeout(() => {
            this.callback();
            this.reset();
          }, this.delay);
        });
      }

      if (e.target.classList.contains('spinner_complete')) {
        e.target.classList.add('spinner_fill');
      }
    });
  }

  start() {
    this.reset();

    const spinnerEl = document.createElement('div');
    spinnerEl.classList.add('spinner');
    spinnerEl.classList.add('spinner_spin');

    this.spinnerEl = spinnerEl;
    this.setAttributes();

    if (this.parentEl) {
      this.parentEl.appendChild(spinnerEl);
    }

    this.#addEventListener();

    return this.spinnerEl;
  }

  finish(callback, delay) {
    this.callback = callback;
    this.delay = delay || 0;

    const angle = this.#getSpinnerAngle();

    this.spinnerEl.style.setProperty(
      '--spinner-rotation',
      `${Math.round(angle)}deg`
    );

    this.spinnerEl.classList.remove('spinner_spin');
    this.spinnerEl.classList.add('spinner_complete');
  }
}

export default Spinner;
