import { getData } from './api.js';
import { openModal } from './full-pictures.js';

const COMMENTS_PER_PORTION = 5;

const pictureBlock = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const data = await getData();

function makeTemplateSocialCommentLi({ avatar, name, message }) {
  return (`<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`);
}

const renderCommentsCounter = (loadedComments, totalComments) => {
  commentCount.textContent = `${loadedComments} из ${totalComments} комментариев`;

  if (loadedComments === totalComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderCommentList = (comments) => {
  pictureBlock.querySelector('.social__comments').innerHTML = '';
  pictureBlock.querySelector('.social__comments').innerHTML = comments
    .map((commentObj) => makeTemplateSocialCommentLi(commentObj))
    .join('');
};

const fillBigPicture = ({ url, description, likes, comments }) => {
  pictureBlock.querySelector('.big-picture__img img').src = url;
  pictureBlock.querySelector('.big-picture__img img').alt = description;
  pictureBlock.querySelector('.likes-count').textContent = likes;
  pictureBlock.querySelector('.social__caption').textContent = description;

  const initialComments = comments.slice(0, COMMENTS_PER_PORTION);

  let step = 1;
  renderCommentsCounter(initialComments.length, comments.length);
  renderCommentList(initialComments);

  const onCommentsLoaderClick = () => {
    step = step + 1;
    const restComments = comments.slice(0, step * COMMENTS_PER_PORTION);
    renderCommentsCounter(restComments.length, comments.length);
    renderCommentList(restComments);
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

picturesContainer.addEventListener('click', (evt) => {
  const photoAttrId = evt.target.parentNode.dataset.thumbnailId;
  if (!photoAttrId) {
    return;
  }
  const photoDataObj = data.find(
    (element) => element.id === Number(photoAttrId)
  );

  fillBigPicture(photoDataObj);
  openModal();
});
