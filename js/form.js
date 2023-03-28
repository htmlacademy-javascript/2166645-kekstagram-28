const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const closeOverlayBtn = imgUploadForm.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeOverlay();
    imgUploadForm.reset();
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
  //classTo: 'form__item',
  //errorClass: 'form__item--invalid',
  //successClass: 'form__item--valid',
  //errorTextParent: 'form__item',
  //errorTextTag: 'span',
  //errorTextClass: 'form__error'
});

//здесь добавляем все проверки правильности заполнения полей
const heshteg = /^#[a-zа-яё0-9]{1,19}/i;

const validateHeshteg = (value) => {
  const valueArray = value.trim().split(' ');
  return valueArray.length <= 5;
};

//1. проверить каждый элемент массива на соответствие правильности заполнения
//2. хэш-теги разделяются пробелами
//3. проверить, чтобы элементы в массиве не повторялись
//4. если фокус находится в поле ввода хэш-тега,
//нажатие на Esc не должно приводить к закрытию формы редактирования изображения.


pristine.addValidator(textHashtags, validateHeshteg, 'больше 5 хэштегов');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
