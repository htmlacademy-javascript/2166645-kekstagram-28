import { isEscapeKey } from './util.js';

const successMessageElement = document
  .querySelector('#success')
  .content.querySelector('.success');
const successButton = document
  .querySelector('#success')
  .content.querySelector('.success__button');
const errorMessageElement = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorButton = document
  .querySelector('#error')
  .content.querySelector('.error__button');
const bodyElement = document.querySelector('body');

const onErrorClickEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onWindowWarningClose();
  }
};

const onDocumentKeydown = () => {
  onWindowWarningClose();
};

function onWindowWarningClose() {
  const successSectionElement = document.querySelector('.success');
  const errorSectionElement = document.querySelector('.error');

  if (successSectionElement) {
    successSectionElement.remove();
  }

  if (errorSectionElement) {
    errorSectionElement.remove();
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    onWindowWarningClose();
  }
};

const showSuccesMessage = () => {
  const elementSuccessMessage = successMessageElement.cloneNode(true);
  document.addEventListener('keydown', onErrorClickEsc);
  document.addEventListener('click', onAreaWindowClose);
  successButton.addEventListener('click', onWindowWarningClose);
  bodyElement.append(elementSuccessMessage);
  bodyElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const elementErrorMessage = errorMessageElement.cloneNode(true);
  document.addEventListener('keydown', onWindowWarningClose);
  document.addEventListener('click', onAreaWindowClose);
  errorButton.addEventListener('click', onDocumentKeydown);
  bodyElement.append(elementErrorMessage);
  bodyElement.style.overflow = 'hidden';
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { showSuccesMessage, showErrorMessage };
