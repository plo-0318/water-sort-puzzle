import Modal from './modal.js';
import {
  animationSpeed,
  setAnimationSpeed,
  algorithm,
  setAlgorithm,
} from '../../gameSetting.js';
import { closeIcon, normalAnimationIcon, fastAnimationIcon } from '../icons.js';
import { startNewGame } from '../../game.js';

class ModalGameSettings extends Modal {
  constructor(gameState) {
    super(gameState);

    this.backdropOnClick = () => {
      this.hide();
    };

    this.closeIconClickHandler = () => {
      this.hide();
    };

    this.switchDifficultyModalEl = null;

    this.easyBtn = null;
    this.mediumBtn = null;
    this.hardBtn = null;

    this.normalAnimationBtn = null;
    this.fastAnimationBtn = null;

    this.dfsBtn = null;
    this.bfsBtn = null;

    this.selectedDifficulty = {};

    this.easyBtnClickHandler = () => {
      this.selectedDifficulty.difficulty = 'easy';
      this.selectedDifficulty.btn = this.easyBtn;

      if (this.gameState.numStates() > 1) {
        this._showSwitchDifficultyModal();
      } else {
        this._selectDifficultyOption(this.selectedDifficulty.btn);
      }
    };
    this.mediumBtnClickHandler = () => {
      this.selectedDifficulty.difficulty = 'medium';
      this.selectedDifficulty.btn = this.mediumBtn;

      if (this.gameState.numStates() > 1) {
        this._showSwitchDifficultyModal();
      } else {
        this._selectDifficultyOption(this.selectedDifficulty.btn);
      }
    };
    this.hardBtnClickHandler = () => {
      this.selectedDifficulty.difficulty = 'hard';
      this.selectedDifficulty.btn = this.hardBtn;

      if (this.gameState.numStates() > 1) {
        this._showSwitchDifficultyModal();
      } else {
        this._selectDifficultyOption(this.selectedDifficulty.btn);
      }
    };

    this.normalAnimationBtnClickHandler = () => {
      if (
        this.normalAnimationBtn.classList.contains('setting-option__selected')
      ) {
        return;
      }

      this._unselectOptions(this.fastAnimationBtn);
      this._selectOption(this.normalAnimationBtn);
      setAnimationSpeed(1);
    };
    this.fastAnimationBtnClickHandler = () => {
      if (
        this.fastAnimationBtn.classList.contains('setting-option__selected')
      ) {
        return;
      }

      this._unselectOptions(this.normalAnimationBtn);
      this._selectOption(this.fastAnimationBtn);
      setAnimationSpeed(2);
    };

    this.dfsBtnClickHandler = () => {
      if (this.dfsBtn.classList.contains('setting-option__selected')) {
        return;
      }

      this._unselectOptions(this.bfsBtn);
      this._selectOption(this.dfsBtn);
      setAlgorithm('dfs');
    };

    this.bfsBtnClickHandler = () => {
      if (this.bfsBtn.classList.contains('setting-option__selected')) {
        return;
      }

      this._unselectOptions(this.dfsBtn);
      this._selectOption(this.bfsBtn);
      setAlgorithm('bfs');
    };
  }

  // Get the difficulty button corresponding to the current game difficulty
  _getDifficultyBtn() {
    if (this.gameState.difficulty === 'easy') {
      return this.easyBtn;
    }

    if (this.gameState.difficulty === 'medium') {
      return this.mediumBtn;
    }

    return this.hardBtn;
  }

  // Get the animation button corresponding to the current game animation speed
  _getAnimationBtn() {
    return animationSpeed === 1
      ? this.normalAnimationBtn
      : this.fastAnimationBtn;
  }

  // Get the algorithm button corresponding to the current game algorithm
  _getAlgorithmBtn() {
    return algorithm === 'bfs' ? this.bfsBtn : this.dfsBtn;
  }

  // Select an option
  _selectOption(option) {
    option.classList.add('setting-option__selected');
  }

  // Select a difficulty button
  _selectDifficultyOption(btn) {
    if (btn.classList.contains('setting-option__selected')) {
      return;
    }

    this._unselectOptions(
      ...[this.easyBtn, this.mediumBtn, this.hardBtn].filter(
        (option) => !option.isEqualNode(btn)
      )
    );
    this._selectOption(btn);

    startNewGame(this.selectedDifficulty.difficulty);
  }

  // Unselect options
  _unselectOptions(...options) {
    options.forEach(
      (option) =>
        option.classList.contains('setting-option__selected') &&
        option.classList.remove('setting-option__selected')
    );
  }

  _createActionIcon(icon, onClick, ...containerClasses) {
    const container = document.createElement('div');
    containerClasses.forEach((className) => container.classList.add(className));

    container.appendChild(icon);

    onClick && container.addEventListener('click', onClick);

    return container;
  }

  _createSettingContainer(title, ...optionContainers) {
    const titleEl = document.createElement('p');
    titleEl.textContent = title;
    titleEl.classList.add('setting-container-title-text');

    const container = document.createElement('div');
    container.classList.add('setting-container');

    container.appendChild(titleEl);

    optionContainers.forEach((optionContainer) =>
      container.appendChild(optionContainer)
    );

    return container;
  }

  _createOptionsContainer(...options) {
    const container = document.createElement('div');
    container.classList.add('setting-options-container');

    options.forEach((option) => container.appendChild(option));

    return container;
  }

  _createOption(childEl, onClick, ...classes) {
    const option = document.createElement('div');
    option.classList.add('setting-option');

    classes.forEach((className) => option.classList.add(className));

    option.appendChild(childEl);

    option.addEventListener('click', onClick);

    return option;
  }

  _createDifficultyContainer() {
    const easyText = document.createElement('p');
    easyText.textContent = 'Easy';
    easyText.classList.add('setting-option-text');

    const mediumText = document.createElement('p');
    mediumText.textContent = 'Medium';
    mediumText.classList.add('setting-option-text');

    const hardText = document.createElement('p');
    hardText.textContent = 'Hard';
    hardText.classList.add('setting-option-text');

    this.easyBtn = this._createOption(easyText, this.easyBtnClickHandler);
    this.mediumBtn = this._createOption(mediumText, this.mediumBtnClickHandler);
    this.hardBtn = this._createOption(hardText, this.hardBtnClickHandler);

    return this._createSettingContainer(
      'Difficulty',
      this._createOptionsContainer(this.easyBtn, this.mediumBtn, this.hardBtn)
    );
  }

  _createAnimationContainer() {
    this.normalAnimationBtn = this._createOption(
      normalAnimationIcon(),
      this.normalAnimationBtnClickHandler,
      'setting-option-icon-wrapper'
    );

    this.fastAnimationBtn = this._createOption(
      fastAnimationIcon(),
      this.fastAnimationBtnClickHandler,
      'setting-option-icon-wrapper'
    );

    return this._createSettingContainer(
      'Animation Speed',
      this._createOptionsContainer(
        this.normalAnimationBtn,
        this.fastAnimationBtn
      )
    );
  }

  _createAlgorithmContainer() {
    const dfsText = document.createElement('p');
    dfsText.textContent = 'DFS';
    dfsText.classList.add('setting-option-text');

    const bfsText = document.createElement('p');
    bfsText.textContent = 'BFS';
    bfsText.classList.add('setting-option-text');

    this.dfsBtn = this._createOption(dfsText, this.dfsBtnClickHandler);
    this.bfsBtn = this._createOption(bfsText, this.bfsBtnClickHandler);

    return this._createSettingContainer(
      'Algorithm',
      this._createOptionsContainer(this.dfsBtn, this.bfsBtn)
    );
  }

  _createSwitchDifficultyModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('modal-switch-difficulty');
    modal.classList.add('content-hide');

    modal.appendChild(
      this._createTitleText('Switch Difficulty', 'restart-modal-title-text')
    );

    modal.appendChild(
      this._createContentText('Are you sure you want to switch difficulty?')
    );
    modal.appendChild(
      this._createContentText('Your current progress will be lost')
    );

    const switchBtn = this._createBtn(
      'Switch',
      () => {
        this._selectDifficultyOption(this.selectedDifficulty.btn);
        this._hideSwitchDifficultyModal();
        this.hide();
      },
      null,
      'modal-btn-restart'
    );
    const cancelBtn = this._createBtn(
      'Cancel',
      () => {
        this._hideSwitchDifficultyModal();
      },
      null,
      'modal-btn-cancel'
    );

    modal.appendChild(this._createBtnsContainer(switchBtn, cancelBtn));

    return modal;
  }

  _showSwitchDifficultyModal() {
    this.switchDifficultyModalEl = this._createSwitchDifficultyModal();

    this.switchDifficultyModalEl.classList.remove('content-hide');
    this.switchDifficultyModalEl.classList.add('modal-popup');

    document.body.appendChild(this.switchDifficultyModalEl);

    this.modalEl.classList.add('modal-settings__hide');
  }

  _hideSwitchDifficultyModal() {
    this.switchDifficultyModalEl?.remove();
    this.switchDifficultyModalEl = null;

    this.modalEl.classList.remove('modal-settings__hide');
  }

  _initModal() {
    this._createModal('modal-settings');

    this.modalEl.appendChild(
      this._createActionIcon(
        closeIcon(),
        this.closeIconClickHandler,
        'modal-settings-close-icon-wrapper'
      )
    );

    this.modalEl.appendChild(
      this._createTitleText('Settings', 'settings-modal-title-text')
    );

    this.modalEl.appendChild(this._createDifficultyContainer());
    this.modalEl.appendChild(this._createAnimationContainer());
    this.modalEl.appendChild(this._createAlgorithmContainer());

    this._selectOption(this._getDifficultyBtn());
    this._selectOption(this._getAnimationBtn());
    this._selectOption(this._getAlgorithmBtn());

    document.body.appendChild(this.modalEl);
  }

  hide() {
    this._hideSwitchDifficultyModal();

    super.hide();
  }
}

export default ModalGameSettings;
