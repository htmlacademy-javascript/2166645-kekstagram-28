import {photosData} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const fullPictureOpenElement = document.querySelector('.pictures');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const fullPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsList = document.querySelector('.social__comments');
const commentsItems = document.querySelectorAll('.social__comment');
/*const commentsItem = document.querySelector('.social__comment');*/
const commentsBlockItem = document.querySelector('.social__comment');


fullPictureOpenElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
});

fullPictureCloseElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

fullPictureCloseElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

function makeTemplateSocialCommentLi ({avatar, name, message}) {
  return (`<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`);
}

/*const commentsLi = photosData.map((commentData) => makeTemplateSocialCommentLi(commentData));
commentsLi.join(' ');

commentsLi({comments});
console.log(commentsLi(photosData.comments));*/

const fillBigPictureComments = (array) => {
/*const commentsBlockItem = commentsItem.cloneNode(true);*/
  commentsItems.forEach((commentsList) => {
    commentsList.classList.add('hidden');
  });
  array[0].comments.forEach(({avatar, name, message}) => {

    commentsBlockItem.querySelector('.social__picture').src = avatar;
    commentsBlockItem.querySelector('.social__picture').alt = name;
    commentsBlockItem.querySelector('.social__text').textContent = message;
    commentsBlockItem.classList.remove('hidden');
    socialCommentsList.appendChild(commentsBlockItem);
  });

  return socialCommentsList;
};

/*const commentsMassive = photosData.map((comment) => {
  return comment.comments;
});
console.log(commentsMassive);

const fillComments = commentsMassive.forEach((element) => {

  makeTemplateSocialCommentLi();
  socialCommentsList.appendChild();
});

console.log(fillComments);*/
/*1 достать массив comments из общего массива
2. пройти по массиву comments, начиная с 1-го
3. заполнить шаблон элемента li
4. вставить элемент в разметку*/
const fillBigPicture = (array) => {
  const pictureBlock = document.querySelector('.big-picture');
  pictureBlock.querySelector('.big-picture__img>img').src = array[0].url;
  pictureBlock.querySelector('.big-picture__img>img').alt = array[0].description;
  pictureBlock.querySelector('.likes-count').textContent = array[0].likes;
  pictureBlock.querySelector('.comments-count').textContent = array[0].comments.length;
  pictureBlock.querySelector('.social__caption').textContent = array[0].description;

  return pictureBlock;
};

fillBigPicture(photosData);
fillBigPictureComments(photosData);
console.log(fillBigPicture(photosData));
console.log(fillBigPictureComments(photosData));

