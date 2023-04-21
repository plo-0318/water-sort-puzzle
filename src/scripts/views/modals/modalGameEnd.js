import Modal from './modal.js';
import { movesIcon, undosIcon, hintsIcon } from '../icons.js';

class ModalGameEnd extends Modal {
  constructor(gameState, onModalConfirm) {
    super(gameState);

    this.onModalConfirm = onModalConfirm;

    this.options = {
      gameWon: {
        color: '#69db7c',
        highlightColor: '#8ce99a',
        title: 'You Won',
        content: 'You completed the game without any hints!',
      },
      gameWonWithHint: {
        color: '#ff922b',
        highlightColor: '#ffa94d',
        title: 'You Won',
        content: 'You completed the game with some hints or undos!',
      },
      gameWonByAI: {
        color: '#cc5de8',
        highlightColor: '#da77f2',
        title: 'AI Won',
        content: 'The AI completed the game without any hints!',
      },
    };
  }

  _getOption() {
    if (this.gameState.ai) {
      return this.options.gameWonByAI;
    }

    if (this.gameState.hints > 0 || this.gameState.undos > 0) {
      return this.options.gameWonWithHint;
    }

    return this.options.gameWon;
  }

  _setAttributes(option) {
    // Initialize the modal's content and style
    document.documentElement.style.setProperty(
      '--game-end-modal-title-text-color',
      option.color
    );
    document.documentElement.style.setProperty(
      '--game-end-modal-btn-background-color',
      option.color
    );
    document.documentElement.style.setProperty(
      '--game-end-modal-btn-background-color__hover',
      option.highlightColor
    );
  }

  _createStatsContainer() {
    const statsContainer = document.createElement('div');

    statsContainer.classList.add('game-end-stats-container');
    statsContainer.appendChild(
      this._createStatContainer(movesIcon(), 'Moves', this.gameState.moves)
    );
    statsContainer.appendChild(
      this._createStatContainer(undosIcon(), 'Undos:', this.gameState.undos)
    );
    statsContainer.appendChild(
      this._createStatContainer(hintsIcon(), 'Hints:', this.gameState.hints)
    );

    return statsContainer;
  }

  _createStatContainer(iconEl, label, value) {
    const statContainer = document.createElement('div');
    statContainer.classList.add('game-end-stat-container');

    const labelEl = document.createElement('p');
    labelEl.classList.add('stat-text');
    labelEl.textContent = label;

    const valueEl = document.createElement('p');
    valueEl.classList.add('stat-text__number');
    valueEl.textContent = value;

    statContainer.appendChild(iconEl, labelEl, valueEl);
    statContainer.appendChild(labelEl);
    statContainer.appendChild(valueEl);

    return statContainer;
  }

  _initModal() {
    this._createModal('modal-game-end');

    const option = this._getOption();
    this._setAttributes(option);

    this.modalEl.appendChild(
      this._createTitleText(option.title, 'game-end-modal-title-text')
    );
    this.modalEl.appendChild(this._createContentText(option.content));
    !this.gameState.ai &&
      this.modalEl.appendChild(this._createStatsContainer());

    const playAgainBtn = this._createBtn('Play Again', () => {
      this.onModalConfirm();
      this.hide();
    });

    this.modalEl.appendChild(this._createBtnsContainer(playAgainBtn));

    document.body.appendChild(this.modalEl);
  }
}

export default ModalGameEnd;
