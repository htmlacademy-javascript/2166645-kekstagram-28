import { resetScale } from './scaleimage.js';
import { resetEffects } from './effectimage.js';

const MAX_LENGTH_ARRAY_HASHTAG = 5;
const MAX_LENGTH_DESCRIPTION = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeOverlayBtn = imgUploadForm.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');


const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (textHashtags === document.activeElement || textDescription === document.activeElement) {
      evt.stopPropagation();
    } else {
      closeOverlay();
      imgUploadForm.reset();
    }
  }
};

const onCloseModalBtnKeydown = (evt) => {
  if (evt.key === 'Enter') {
    closeOverlay();
    imgUploadForm.reset();
  }
};

const onCloseModalBtnClick = () => {
  closeOverlay();
  imgUploadForm.reset();
};

const openImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeOverlayBtn.addEventListener('keydown', onCloseModalBtnKeydown);
  closeOverlayBtn.addEventListener('click', onCloseModalBtnClick);
};

const onFileChange = () => {
  openImgUploadOverlay();
};

function closeOverlay() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
  closeOverlayBtn.removeEventListener('keydown', onCloseModalBtnKeydown);
  closeOverlayBtn.removeEventListener('click', onCloseModalBtnClick);
}

uploadFile.addEventListener('change', onFileChange);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
});

//здесь добавляем все проверки правильности заполнения полей
const isHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => {
  if (!value.length) {
    return true;
  } else {
    const valueArray = value.trim().split(' ');

    return valueArray.every((element) => isHashtag.test(element));
  }
};

const validateAmountHashtags = (value) => {
  const valueArray = value.trim().split(' ');
  return valueArray.length <= MAX_LENGTH_ARRAY_HASHTAG;
};

const validateDoubleHashtags = (value) => {
  if (!value.length) {
    return true;
  } else {
    const string = value.toLowerCase();
    const valueArray = string.trim().split(' ');
    const currentArray = [];

    for (let i = 0; i < valueArray.length; i++) {
      currentArray.push(valueArray[i]);
      if (currentArray !== ' ' && currentArray.includes(valueArray[i + 1])) {
        return false;
      }
    }
    return true;
  }
};

const validateSpaces = (value) => {
  const valueArray = value.split('');
  for (let i = 0; i < valueArray.length; i++) {
    if (valueArray[i] === ' ' && valueArray[i + 1] === ' ') {
      return false;
    }
  }
  return true;
};

const validateTextDescription = (value) => {
  if (!value.length) {
    return true;
  } else {
    return value.length <= MAX_LENGTH_DESCRIPTION;
  }
};

pristine.addValidator(textHashtags, validateAmountHashtags, 'Больше 5 хэштегов, уберите лишний.');
pristine.addValidator(textHashtags, validateHashtag, 'Хэштег должен начинаться со знака # и состоять из букв и цифр. Длина хэштега должна быть не более 20 символов.');
pristine.addValidator(textHashtags, validateDoubleHashtags, 'Этот хэштег уже добавлен.');
pristine.addValidator(textHashtags, validateSpaces, 'Уберите лишний пробел.');
pristine.addValidator(textDescription, validateTextDescription, 'Комментарий должен быть не более 140 символов.');

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);
