// import { algorithm } from '../gameSetting.js';
// import Spinner from '../views/spinner.js';
// import { Dfs } from '../search/dfs.js';
// import { Bfs } from '../search/bfs.js';
// import { search, cancelSearch } from '../search/search.js';
// import { showModal, hideModal } from './modalController.js';
// import { gameState } from '../models/gameState.js';

// const aiModal = document.querySelector('.modal-ai');
// const aiModalTIleText = aiModal.querySelector('.ai-modal-title-text');

// let aiModalBtnsContainerEl = null;

// const spinner = new Spinner('#cc5de8');

// const cancelBtnHander = () => {
//   cancelSearch();
//   hideAiModal();
// };

// const confirmBtnHandler = () => {
//   hideAiModal();
// };

// const onSearchComplete = (result) => {
//   removeAiBtnEls();

//   spinner.finish(() => {
//     aiModal.appendChild(createBtnsContainer(createConfirmBtn()));

//     console.log(result);
//   }, 500);
// };

// const createCancelBtn = () => {
//   const cancelBtnEl = document.createElement('button');
//   cancelBtnEl.textContent = 'Cancel';

//   cancelBtnEl.classList.add('modal-btn');
//   cancelBtnEl.classList.add('modal-btn-restart');

//   cancelBtnEl.addEventListener('click', cancelBtnHander);

//   return cancelBtnEl;
// };

// const createConfirmBtn = () => {
//   const confirmBtnEl = document.createElement('button');
//   confirmBtnEl.textContent = 'Confirm';

//   confirmBtnEl.classList.add('modal-btn');
//   confirmBtnEl.classList.add('modal-btn-confirm__ai');

//   confirmBtnEl.addEventListener('click', confirmBtnHandler);

//   return confirmBtnEl;
// };

// const createBtnsContainer = (...btnEls) => {
//   removeAiBtnEls();

//   aiModalBtnsContainerEl = document.createElement('div');
//   aiModalBtnsContainerEl.classList.add('modal-btns-ctonainer');

//   btnEls.forEach((btnEl) => {
//     aiModalBtnsContainerEl.appendChild(btnEl);
//   });

//   return aiModalBtnsContainerEl;
// };

// const removeAiBtnEls = () => {
//   aiModalBtnsContainerEl && aiModalBtnsContainerEl.remove();
//   aiModalBtnsContainerEl = null;
// };

// const clearAiModal = () => {
//   removeAiBtnEls();
//   spinner.reset();
// };

// export const showAiModal = () => {
//   aiModal.appendChild(spinner.start());
//   aiModal.appendChild(createBtnsContainer(createCancelBtn()));

//   showModal(aiModal);

//   search(new Dfs(gameState.currentState()), onSearchComplete);
// };

// export const hideAiModal = () => {
//   clearAiModal();

//   hideModal(aiModal);
// };
