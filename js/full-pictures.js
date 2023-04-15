import { isEnterKey, isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeModuleBtn = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = () => {
  if (isEscapeKey) {
    closeModal();
  }
};

const onCloseModalBtnKeydown = () => {
  if (isEnterKey) {
    closeModal();
  }
};

const onCloseModalBtnClick = () => {
  closeModal();
};

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeModuleBtn.addEventListener('keydown', onCloseModalBtnKeydown);
  closeModuleBtn.addEventListener('click', onCloseModalBtnClick);
}

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeModuleBtn.removeEventListener('keydown', onCloseModalBtnKeydown);
  closeModuleBtn.removeEventListener('click', onCloseModalBtnClick);
}

export { openModal };
