import {photosData} from './data.js';

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsBlock = photosData;

const thumbnailsListFragment = document.createDocumentFragment();

thumbnailsBlock.forEach(({url, comments, likes}) => {
  const element = templateFragment.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  thumbnailsListFragment.appendChild(element);
});

pictures.appendChild(thumbnailsListFragment);
