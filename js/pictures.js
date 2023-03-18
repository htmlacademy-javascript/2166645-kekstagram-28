import {photosData} from './data.js';

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsListFragment = document.createDocumentFragment();

const fillPhotoTemplate = ({url, comments, likes}) => {
  const element = templateFragment.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  return element;
};

const renderPhotos = (thumbnails) => {
  thumbnails.forEach((thumbnail) => {
    thumbnailsListFragment.appendChild(fillPhotoTemplate(thumbnail));
  });
  pictures.appendChild(thumbnailsListFragment);
};

renderPhotos(photosData);
