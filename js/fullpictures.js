import {photosData} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeModuleBtn = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = document.querySelector('.social__comments');
const commentsItems = document.querySelectorAll('.social__comment');
/*const commentsItem = document.querySelector('.social__comment');*/
const commentsBlockItem = document.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

const onCloseModalBtnKeydown = (evt) => {
  if (evt.key === 'Enter') {
    closeModal();
  }
};

const onCloseModalBtnClick = () => {
  closeModal();
};

function openModal () {
  //открываем модалку
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  closeModuleBtn.addEventListener('keydown', onCloseModalBtnKeydown);
  closeModuleBtn.addEventListener('click', onCloseModalBtnClick);
}

function closeModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeModuleBtn.removeEventListener('keydown', onCloseModalBtnKeydown);
  closeModuleBtn.removeEventListener('click', onCloseModalBtnClick);
}

function makeTemplateSocialCommentLi ({avatar, name, message}) {
  return (`<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`);
}

const fillBigPicture = (photoData) => {
  const pictureBlock = document.querySelector('.big-picture');

  pictureBlock.querySelector('.big-picture__img>img').src = photoData.url;
  pictureBlock.querySelector('.big-picture__img>img').alt = photoData.description;
  pictureBlock.querySelector('.likes-count').textContent = photoData.likes;
  pictureBlock.querySelector('.comments-count').textContent = photoData.comments.length;
  pictureBlock.querySelector('.social__caption').textContent = photoData.description;

  pictureBlock.querySelector('.social.comments').inner = '';
  pictureBlock.querySelector('.social.comments').innerHTML = photoData.comments
    .map((commentObj) => makeTemplateSocialCommentLi(commentObj)).join('');
};

picturesContainer.addEventListener('click', (evt) => {
  const photoAttrId = evt.target.parentNode.dataset.thumbnailId;
  const photoDataObj = photosData.find((element) => element.id === Number(photoAttrId));

  fillBigPicture(photoDataObj);
  openModal();
});


