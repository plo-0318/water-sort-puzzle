import Modal from './modal.js';
import Spinner from '../spinner.js';
import {
  statesSearchedIcon,
  statesGeneratedIcon,
  pathIcon,
  timeIcon,
} from '../icons.js';
import { cancelSearch } from '../../search/search.js';

class ModalAI extends Modal {
  constructor(gameState) {
    super(gameState);

    this.spinner = null;
    this.titleTextEl = null;
    this.btnsContainerEl = null;

    this.cancelBtnClickHandler = () => {
      cancelSearch();
      this.hide();
    };

    this.colors = {
      successColor: '#cc5de8',
      successHighlightColor: '#da77f2',
      failColor: '#ff922b',
      failHighlightColor: '#ffa94d',
    };
  }

  _setModalColor(success) {
    const color = success ? this.colors.successColor : this.colors.failColor;
    const highlightColor = success
      ? this.colors.successHighlightColor
      : this.colors.failHighlightColor;

    document.documentElement.style.setProperty('--ai-modal-color', color);
    document.documentElement.style.setProperty(
      '--ai-modal-color__hover',
      highlightColor
    );
  }

  _initModal() {
    this._createModal('modal-ai');

    this.titleTextEl = this._createTitleText(
      'Calculating',
      'ai-modal-title-text'
    );

    this.modalEl.appendChild(this.titleTextEl);

    this.spinner = new Spinner('#cc5de8');
    this.modalEl.appendChild(this.spinner.start());

    const cancelBtn = this._createBtn(
      'Cancel',
      this.cancelBtnClickHandler,
      null,
      'modal-btn-restart'
    );

    this.btnsContainerEl = this._createBtnsContainer(cancelBtn);

    this.btnsContainerWrapper = document.createElement('div');
    this.btnsContainerWrapper.classList.add('height-transition-wrapper');
    this.btnsContainerWrapper.appendChild(this.btnsContainerEl);

    this.modalEl.appendChild(this.btnsContainerWrapper);

    document.body.appendChild(this.modalEl);
  }

  _createStatsContainer(data) {
    const statsContainer = document.createElement('div');

    statsContainer.classList.add('game-end-stats-container');
    statsContainer.classList.add('game-end-stats-container__ai');

    statsContainer.appendChild(
      this._createStatContainer(
        statesGeneratedIcon(),
        'States Generated:',
        data.statesGenerated
      )
    );

    statsContainer.appendChild(
      this._createStatContainer(
        statesSearchedIcon(),
        'States Searched:',
        data.statesSearched
      )
    );

    data.foundSolution &&
      statsContainer.appendChild(
        this._createStatContainer(
          pathIcon(),
          'Steps to Goal:',
          data.path.length
        )
      );

    statsContainer.appendChild(
      this._createStatContainer(timeIcon(), 'Time:', `${data.time} ms`)
    );

    return statsContainer;
  }

  _createStatContainer(iconEl, label, value) {
    const statContainer = document.createElement('div');
    statContainer.classList.add('game-end-stat-container');
    statContainer.classList.add('game-end-stat-container__ai');

    const labelEl = document.createElement('p');
    labelEl.classList.add('stat-text');
    labelEl.classList.add('stat-text__ai');
    labelEl.textContent = label;

    const valueEl = document.createElement('p');
    valueEl.classList.add('stat-text__number');
    valueEl.classList.add('stat-text__number__ai');
    valueEl.textContent = value;

    statContainer.appendChild(iconEl, labelEl, valueEl);
    statContainer.appendChild(labelEl);
    statContainer.appendChild(valueEl);

    return statContainer;
  }

  _showResult(data) {
    const { foundSolution } = data;

    this.modalEl.classList.add('content-hide');
    this.modalEl.classList.remove('modal-popup');

    setTimeout(() => {
      // Set the modal color
      this._setModalColor(foundSolution);

      // Change the title text
      this.titleTextEl.textContent = 'Complete';

      // Add content text
      const contentText = foundSolution
        ? 'Solution found'
        : 'No soultion found';
      this.modalEl.appendChild(this._createContentText(contentText));

      // If no result found, add resolution text
      !foundSolution &&
        this.modalEl.appendChild(
          this._createContentText('Try some undos or restart the round')
        );

      // Add the stats
      this.modalEl.appendChild(this._createStatsContainer(data));

      // Create the confirm button click handler
      const onContinueClick = () => {
        this.hide();
      };

      // Create and add the continue button
      this.btnsContainerWrapper.remove();
      this.btnsContainerEl = this._createBtnsContainer(
        this._createBtn(
          'Continue',
          onContinueClick,
          null,
          'modal-btn-confirm__ai'
        )
      );

      this.modalEl.appendChild(this.btnsContainerEl);

      this.modalEl.classList.remove('content-hide');
      this.modalEl.classList.add('modal-popup');
    }, 50);
  }

  finish(data) {
    this.btnsContainerWrapper.classList.add('disable_click');

    this.btnsContainerWrapper.style.height = `${
      this.btnsContainerWrapper.getBoundingClientRect().height
    }px`;

    setTimeout(() => {
      this.btnsContainerWrapper.style.height = '0px';
    }, 100);

    this.spinner.finish(this._showResult.bind(this, data), 500);
  }

  hide() {
    super.hide();

    this._setModalColor(true);
  }
}

export default ModalAI;
