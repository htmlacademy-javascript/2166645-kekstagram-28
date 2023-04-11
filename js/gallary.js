import { getData } from './api.js';
import { openModal } from './fullpictures.js';

const picturesContainer = document.querySelector('.pictures');

const data = await getData();

function makeTemplateSocialCommentLi({ avatar, name, message }) {
  return (`<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`);
}

const fillBigPicture = (getData) => {
  const pictureBlock = document.querySelector('.big-picture');

  pictureBlock.querySelector('.big-picture__img img').src = getData.url;
  pictureBlock.querySelector('.big-picture__img img').alt = getData.description;
  pictureBlock.querySelector('.likes-count').textContent = getData.likes;
  pictureBlock.querySelector('.comments-count').textContent = getData.comments.length;
  pictureBlock.querySelector('.social__caption').textContent = getData.description;

  pictureBlock.querySelector('.social__comments').innerHTML = '';
  pictureBlock.querySelector('.social__comments').innerHTML = getData.comments
    .map((commentObj) => makeTemplateSocialCommentLi(commentObj)).join('');
};

picturesContainer.addEventListener('click', (evt) => {
  const photoAttrId = evt.target.parentNode.dataset.thumbnailId;
  if (!photoAttrId) {
    return;
  }
  const photoDataObj = data.find((element) => element.id === Number(photoAttrId));

  fillBigPicture(photoDataObj);
  openModal();
});
