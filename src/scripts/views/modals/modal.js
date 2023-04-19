class Modal {
  constructor(gameState) {
    this.backdropEl = null;
    this.modalEl = null;

    this.gameState = gameState;

    this.backdropOnClick = null;
  }

  _initBackdrop() {
    this.backdropEl = document.createElement('div');
    this.backdropEl.classList.add('modal-backdrop');
    this.backdropEl.classList.add('content-hide');

    this.backdropOnClick &&
      this.backdropEl.addEventListener('click', this.backdropOnClick);

    document.body.appendChild(this.backdropEl);
  }

  _initModal() {}

  _createModal(...classes) {
    this.modalEl = document.createElement('div');
    this.modalEl.classList.add('modal');
    this.modalEl.classList.add('content-hide');

    classes.forEach((className) => this.modalEl.classList.add(className));
  }

  _createText(text, ...classes) {
    const textEl = document.createElement('p');
    textEl.textContent = text;

    classes.forEach((className) => textEl.classList.add(className));

    return textEl;
  }

  _createTitleText(text, ...classes) {
    return this._createText(text, 'modal-title-text', ...classes);
  }

  _createContentText(text, ...classes) {
    return this._createText(text, 'modal-content-text', ...classes);
  }

  _createBtnsContainer(...btns) {
    const container = document.createElement('div');

    container.classList.add('modal-btns-container');

    btns.forEach((btn) => container.appendChild(btn));

    return container;
  }

  _createBtn(text, clickHandler, id, ...classes) {
    const btn = document.createElement('button');

    if (id) {
      btn.id = id;
    }

    btn.textContent = text;
    btn.classList.add('modal-btn');

    classes.forEach((className) => btn.classList.add(className));

    btn.addEventListener('click', clickHandler);

    return btn;
  }

  show() {
    this._initBackdrop();
    this._initModal();

    this.backdropEl.classList.remove('content-hide');
    this.modalEl.classList.remove('content-hide');
    this.backdropEl.classList.add('modal-backdrop-fadeIn');
    this.modalEl.classList.add('modal-popup');
  }

  hide() {
    this.backdropEl?.remove();
    this.modalEl?.remove();

    this.backdropEl = null;
    this.modalEl = null;
  }
}

export default Modal;
