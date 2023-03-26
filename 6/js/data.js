import {createRandomIdFromRangeGenerator, getRandomInteger} from './util.js';

const NAMES = [
  'Иван',
  'Павел',
  'Мария',
  'Кристина',
  'Виктор',
  'Юлия',
  'Ольга',
  'Александр',
  'Ярослав',
  'Евангелина',
  'Настя',
  'Вероника',
  'Мирослава',
  'Илария',
  'Сергей'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Прогулка на открытом воздухе',
  'Охоту никто не отменял',
  'Сон - лучшее лекарство',
  'Хозяин, вставай! Уже 3 ночи, я есть хочу!',
  'Спасайте меня все',
  'Кто не работает - тот ест',
  'Гигиена - залог здоровья',
  'Это не она кот - это я кот',
  'Чучело-мяучело на трубе сидело...',
  'Кто первым встал, того и тапки',
  'Жить, как говорится, хорошо! А хорошо жить - еще лучше!'
];

const IMAGES_COUNT = 25;

const AVATAR_COUNT = 6;

const PERSON_ID_COUNT = 200;

const LIKES_MIN_COUNT = 15;

const LIKES_MAX_COUNT = 200;

const MAX_COMMENT_COUNT = 4;

const generatePersonId = createRandomIdFromRangeGenerator(1, PERSON_ID_COUNT);

const createComment = () => {
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  const randomMessageIndex = getRandomInteger(0, MESSAGES.length - 1);
  const randomPhotoNumberIndex = getRandomInteger(1, AVATAR_COUNT);

  return {
    id: generatePersonId(),
    avatar: `img/avatar-${randomPhotoNumberIndex}.svg`,
    message: MESSAGES[randomMessageIndex],
    name: NAMES[randomNameIndex],
  };
};

const generateImageId = createRandomIdFromRangeGenerator(1, IMAGES_COUNT);
const generateUrlPhotos = createRandomIdFromRangeGenerator(1, IMAGES_COUNT);

const createPhotoData = () => {
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomLikesIndex = getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT);
  const randomCommentIndex = getRandomInteger(1, MAX_COMMENT_COUNT);
  const arrayMessages = Array.from({ length: randomCommentIndex }, createComment);

  return {
    id: generateImageId(),
    url: `photos/${generateUrlPhotos()}.jpg`,
    description: DESCRIPTION[randomDescriptionIndex],
    likes: randomLikesIndex,
    comments: arrayMessages,
  };
};

const photosData = Array.from({length: IMAGES_COUNT}, createPhotoData);
console.log(photosData);

export {photosData};
