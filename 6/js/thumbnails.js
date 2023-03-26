import {photosData} from './data.js';

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsListFragment = document.createDocumentFragment();

const fillPhotoTemplate = ({url, description, comments, likes, id}) => {
  const element = templateFragment.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.dataset.thumbnailId = id;

  return element;
};

const renderPhotos = (thumbnails) => {
  thumbnails.forEach((thumbnail) => {
    thumbnailsListFragment.appendChild(fillPhotoTemplate(thumbnail));
  });
  pictures.appendChild(thumbnailsListFragment);
};

renderPhotos(photosData);

export {renderPhotos};
