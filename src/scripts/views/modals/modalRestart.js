import Modal from './modal.js';
import { startNewGame } from '../../game.js';

class ModalRestart extends Modal {
  constructor(gameState) {
    super(gameState);

    this.restartBtnClickHandler = () => {
      startNewGame(this.gameState.difficulty, this.gameState.startingState());
      this.hide();
    };
    this.cancelBtnClickHandler = () => {
      this.hide();
    };
  }

  _initModal() {
    this._createModal('modal-restart');

    this.modalEl.appendChild(
      this._createTitleText('Restart', 'restart-modal-title-text')
    );
    this.modalEl.appendChild(
      this._createContentText('Are you sure you want to restart the game?')
    );
    this.modalEl.appendChild(
      this._createContentText('This action is irreversible')
    );

    const restartBtn = this._createBtn(
      'Restart',
      this.restartBtnClickHandler,
      null,
      'modal-btn-restart'
    );
    const cancelBtn = this._createBtn(
      'Cancel',
      this.cancelBtnClickHandler,
      null,
      'modal-btn-cancel'
    );

    this.modalEl.appendChild(this._createBtnsContainer(restartBtn, cancelBtn));

    document.body.appendChild(this.modalEl);
  }
}

export default ModalRestart;
