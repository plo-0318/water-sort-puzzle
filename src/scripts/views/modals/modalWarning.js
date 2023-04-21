import Modal from './modal.js';
import { startNewGame } from '../../game.js';

class ModalWarning extends Modal {
  constructor(gameState, options) {
    super(gameState);

    this.options = options;

    this.restartBtnClickHandler = this.restartBtnOnClick
      ? this.restartBtnOnClick
      : () => {
          startNewGame(
            this.gameState.difficulty,
            this.gameState.startingState()
          );
          this.hide();
        };
    this.cancelBtnClickHandler = () => {
      this.hide();
    };
  }

  _initModal() {
    this._createModal('modal-restart');

    this.modalEl.appendChild(
      this._createTitleText(this.options.title, 'restart-modal-title-text')
    );

    const contents = this.options.contents;

    if (contents) {
      contents.forEach((content) => {
        this.modalEl.appendChild(this._createContentText(content));
      });
    }

    const btns = this.options.btns;
    const buttonEls = [];

    if (btns) {
      btns.forEach((btn) => {
        buttonEls.push(
          this._createBtn(btn.text, btn.onClick, btn.id, ...btn.classes)
        );
      });
    }

    this.modalEl.appendChild(this._createBtnsContainer(...buttonEls));

    document.body.appendChild(this.modalEl);
  }
}

export default ModalWarning;
