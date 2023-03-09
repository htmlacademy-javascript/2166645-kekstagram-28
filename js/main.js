'use strict';

/*В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов.
Каждый объект массива — описание фотографии, опубликованной пользователем.

Структура каждого объекта должна быть следующей:
- id, число — идентификатор опубликованной фотографии. Это число от 1 до 25.
Идентификаторы не должны повторяться.
- url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25.
Адреса картинок не должны повторяться.
- description, строка — описание фотографии. Описание придумайте самостоятельно.
-likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.+
- comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
Количество комментариев к каждой фотографии вы определяете на своё усмотрение.
Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}

У каждого комментария есть идентификатор — id — любое число.(какой диапозон брать?)
Идентификаторы не должны повторяться.

Поле avatar — это строка, значение которой формируется
по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
Аватарки подготовлены в директории img. (как это влияет на код?)

Для формирования текста комментария — message — вам необходимо взять одно или два случайных
предложения из представленных ниже:+
Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

- Имена авторов также должны быть случайными.+
- Набор имён для комментаторов составьте сами. +
- Подставляйте случайное имя в поле name.+*/

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
];

const IMAGES_COUNT = 25;

const AVATAR_COUNT = 6;

const PERSON_ID_COUNT = 200;

const LIKES_MIN_COUNT = 15;

const LIKES_MAX_COUNT = 200;

const MAX_COMMENT_COUNT = 4;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return previousValues[length];
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

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
