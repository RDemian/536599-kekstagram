'use strict';

var photos = []; // массив данных с фото
var displayPhotos = []; // массив отрисованных фотографий picture__img для определения номера картинки
var socialCommentCount = document.querySelector('.social__comment-count');
var socialLoadmore = document.querySelector('.social__loadmore');
var picturesContainer = document.querySelector('.pictures');

// функция генерации случайного целого числа в заданном диапазоне
// допустимо так объявлять функции, в контексте этого проекта?
function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// Скрывает или показывает окна загрузки и увеличенного просмотра
function openCloseOverlay(currentOverlay) {
  currentOverlay.classList.toggle('hidden');
}

// ф-ция создания объекта фотография
var generatePhoto = function (numPhoto) {
  var photo = {
    url: '',
    likes: 0,
    comments: [],
    description: ''
  };
  var k = 0; // итератор

  // заполняем адрес фото в зависимости от номера
  photo.url = 'photos/' + numPhoto + '.jpg';

  // Случайным образом устанавливаем количество лайков
  k = getRandomInt(15, 200);
  photo.likes = k;

  // Случайным образом заполняем комментарий к фото
  var n = getRandomInt(1, 2);
  for (var j = 1; j <= n; j += 1) {
    k = getRandomInt(1, 6);
    switch (k) {
      case 1:
        photo.comments[j - 1] = 'Всё отлично!';
        break;
      case 2:
        photo.comments[j - 1] = 'В целом всё неплохо. Но не всё.';
        break;
      case 3:
        photo.comments[j - 1] = 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.';
        break;
      case 4:
        photo.comments[j - 1] = 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.';
        break;
      case 5:
        photo.comments[j - 1] = 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.';
        break;
      case 6:
        photo.comments[j - 1] = 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';
        break;
    }
  }
  // Подбираем описание фото в зависимости от номера фото
  switch (numPhoto) {
    case 10:
    case 11:
    case 14:
    case 20:
    case 23:
      photo.description = 'Тестим новую камеру!';
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 9:
    case 21:
    case 22:
      photo.description = 'Затусили с друзьями на море';
      break;
    case 5:
    case 7:
    case 8:
    case 13:
      photo.description = 'Как же круто тут кормят';
      break;
    case 15:
    case 17:
    case 24:
      photo.description = 'Отдыхаем...';
      break;
    case 16:
    case 19:
      photo.description = 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......';
      break;
    case 6:
    case 12:
    case 18:
    case 25:
      photo.description = 'Вот это тачка!';
      break;
    default:
      photo.description = 'Не получилось:' + numPhoto;
  }

  return photo;
};

// ф-ция для заполнения тестового массива
var fillPhotos = function (countPhotos) {
  var i = 0;
  for (i = 0; i < countPhotos; i += 1) {
    var currentPhoto = generatePhoto(i + 1);
    photos[i] = currentPhoto;
  }

  return photos;
};

// ф-ция вывода массива фото в документ
var appendNewPhotos = function (addedPhotos) {

  var contentPictureTemplate = document.querySelector('#picture').content;
  var pictureLinkTemplate = contentPictureTemplate.querySelector('.picture__link');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < addedPhotos.length; i += 1) {
    var newPicture = pictureLinkTemplate.cloneNode(true);

    newPicture.querySelector('.picture__img').src = addedPhotos[i].url;
    newPicture.querySelector('.picture__stat--likes').textContent = addedPhotos[i].likes;
    newPicture.querySelector('.picture__stat--comments').textContent = addedPhotos[i].comments.length;
    displayPhotos[i] = newPicture;
    fragment.appendChild(newPicture);
  }

  picturesContainer.appendChild(fragment);
};

// ф-ция формирования увеличенного изображения
var createNewComment = function (currentComment) {
  var newSocialComment = document.createElement('li');
  newSocialComment.classList.add('social__comment');
  newSocialComment.classList.add('social__comment--text');
  // newSocialComment.classList.add('social__comment social__comment--text');
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  socialPicture.alt = 'Аватар комментатора фотографии';
  socialPicture.width = '35';
  socialPicture.height = '35';
  newSocialComment.appendChild(socialPicture);
  var socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = currentComment;
  newSocialComment.appendChild(socialText);
  return newSocialComment;
};

// ф-ция показа увеличенного изображения
var bigPicture = document.querySelector('.big-picture');
var displayBigPicture = function (photosElement) {

  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPicturelikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsСount = bigPicture.querySelector('.comments-count');
  var bigPictureListComments = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photosElement.url;
  // bigPicturelikesCount.classList.add('hidden');
  bigPicturelikesCount.textContent = photosElement.likes;
  bigPictureCommentsСount.textContent = photosElement.comments.length;

  var commentsString = '';
  for (var i = 0; i < photosElement.comments.length; i += 1) {
    var newCommentElement = createNewComment(photosElement.comments[i]);
    /* commentsString = commentsString +
    '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' +
      getRandomInt(1, 6) + '.svg" alt="Аватар комментатора фотографии 1" width="35" height="35"><p class="social__text">' + photosElement.comments[i] + '</p></li>'; */

    fragment.appendChild(newCommentElement);
  }

  bigPictureListComments.innerHTML = commentsString;

  bigPictureListComments.appendChild(fragment);
};

// ф-ция скрытия блока
var hideBlock = function (block) {
  block.classList.add('visually-hidden');
};

// Вызываем функцию заполнения тестового массива с нужным количеством фото
photos = fillPhotos(25);
// Вызываем ф-цию добавления фотографий из массива в документ
appendNewPhotos(photos);
// Вызываем ф-цию увеличения фотографии
// displayBigPicture(photos[0]);
// Скрытие блоков
hideBlock(socialCommentCount);
hideBlock(socialLoadmore);

// *********************** Module4 **************************************************************
// *********************** Обработка клика по фото **********************************************
var onPicturesClick = function (evt) {
  var pictureLinkElement = evt.target;

  var returnPictureLinkElement = function (currentElement) {

    if ((pictureLinkElement.className !== 'picture__link') && (pictureLinkElement.className !== '')) {
      pictureLinkElement = currentElement.parentElement;
      pictureLinkElement = returnPictureLinkElement(pictureLinkElement);
    }

    return pictureLinkElement;

  };

  pictureLinkElement = returnPictureLinkElement(pictureLinkElement);

  // позиция элемента в массиве displayPhotos соответствует его позиции в массиве данных photos
  for (var i = 0; i < displayPhotos.length; i += 1) {
    if (displayPhotos[i] === pictureLinkElement) {
      displayBigPicture(photos[i]);
      break;
    }
  }
};


picturesContainer.addEventListener('click', onPicturesClick);

var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
bigPictureCansel.addEventListener('click', function () {
  openCloseOverlay(bigPicture);
});

// *********************** Обработка загрузки новой фото ****************************************
var imgUpload = document.querySelector('.img-upload');

// *** Показать загружаемую фотографию ***
var imgOverlay = imgUpload.querySelector('.img-upload__overlay');

// Обработчик загрузки файла
var onInputChange = function () {

  openCloseOverlay(imgOverlay);

};

var uploadFile = imgUpload.querySelector('#upload-file');
uploadFile.addEventListener('change', onInputChange);

// Обработчик закрытия окна загрузки файла
var onUploadCancelClick = function () {

  openCloseOverlay(imgOverlay);
  uploadFile.value = ''; // нужно сбрасывать значение поля выбора файла #upload-file иначе не будет срабатывать событие change, а у меня срабатывает и без сброса?...

};

var uploadCansel = imgUpload.querySelector('.img-upload__cancel');
uploadCansel.addEventListener('click', onUploadCancelClick);

// *** Применение фильтров ***

// Обработчик наложения эффекта
var onEffectChange = function (evt) {
  var targetElem = evt.target;
  var effectsPreview = targetElem.parentElement.querySelector('.effects__preview');
  var selectedEffect = effectsPreview.classList[1];
  var imgPreview = imgUpload.querySelector('.img-upload__preview img');
  imgPreview.classList.remove(imgPreview.classList[0]);
  imgPreview.classList.add(selectedEffect);
};

var effectsRadios = imgUpload.querySelectorAll('.effects__radio'); // массив переключателей

// добавление обаработчиков смены эффектов
for (var i = 0; i < effectsRadios.length; i += 1) {
  effectsRadios[i].addEventListener('change', onEffectChange);
}
