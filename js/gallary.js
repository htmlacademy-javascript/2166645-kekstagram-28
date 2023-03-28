import { photosData } from './data.js';
import { openModal } from './fullpictures.js';

const picturesContainer = document.querySelector('.pictures');

function makeTemplateSocialCommentLi({ avatar, name, message }) {
  return (`<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`);
}

const fillBigPicture = (photoData) => {
  const pictureBlock = document.querySelector('.big-picture');

  pictureBlock.querySelector('.big-picture__img img').src = photoData.url;
  pictureBlock.querySelector('.big-picture__img img').alt = photoData.description;
  pictureBlock.querySelector('.likes-count').textContent = photoData.likes;
  pictureBlock.querySelector('.comments-count').textContent = photoData.comments.length;
  pictureBlock.querySelector('.social__caption').textContent = photoData.description;

  pictureBlock.querySelector('.social__comments').innerHTML = '';
  pictureBlock.querySelector('.social__comments').innerHTML = photoData.comments
    .map((commentObj) => makeTemplateSocialCommentLi(commentObj)).join('');
};

picturesContainer.addEventListener('click', (evt) => {
  const photoAttrId = evt.target.parentNode.dataset.thumbnailId;
  const photoDataObj = photosData.find((element) => element.id === Number(photoAttrId));

  fillBigPicture(photoDataObj);
  openModal();
});


