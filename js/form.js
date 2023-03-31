const MAX_LENGTH_ARRAY_HASHTAG = 5;
const MAX_LENGTH_DESCRIPTION = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeOverlayBtn = imgUploadForm.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if(textHashtags === document.activeElement || textDescription === document.activeElement) {
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

  document.removeEventListener('keydown', onDocumentKeydown);
  closeOverlayBtn.removeEventListener('keydown', onCloseModalBtnKeydown);
  closeOverlayBtn.removeEventListener('click', onCloseModalBtnClick);
}

uploadFile.addEventListener('change', onFileChange);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  //errorClass: 'form__item--invalid',
  //successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  //errorTextTag: 'span',
  //errorTextClass: 'img-upload__field-wrapper__error-text'
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

//доделать, чтобы выводилось сообщение об ошибке правильно
const validateDoubleHashtags = (value) => {
  if (!value.length) {
    return true;
  } else {
    const valueArray = value.trim().split(' ');
    const currentArray = [];

    for (let i = 0; i < valueArray.length; i++) {
      currentArray.push(valueArray[i]);
      if (currentArray.includes(valueArray[i])) {
        return false;
      }
      return true;
    }
  }
};

const validateTextDescription = (value) => {
  if (!value.length) {
    return true;
  } else {
    return value.length <= MAX_LENGTH_DESCRIPTION;
  }
};

//2. хэш-теги разделяются пробелами сделать проверку
//3. проверить, чтобы элементы в массиве не повторялись
//4. если фокус находится в поле ввода хэш-тега,
//нажатие на Esc не должно приводить к закрытию формы редактирования изображения. - это еще не сделала

//для поля комментарии
//1.	если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию
//формы редактирования изображения. - это еще не сделала

pristine.addValidator(textHashtags, validateAmountHashtags, 'больше 5 хэштегов, уберите лишний');
pristine.addValidator(textHashtags, validateHashtag, 'хэштег должен начинаться со знака # и состоять из букв и цифр. Длина хэштега должа быть не более 20 символов.');
pristine.addValidator(textHashtags, validateDoubleHashtags, 'этот хэштег уже добавлен');
pristine.addValidator(textDescription, validateTextDescription, 'комментарий должен быть не более 140 символов');

//здесь надо событие на кнопку вешать или на всю форму? В демонстрации указано было на всю форму
/*imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});*/

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);
