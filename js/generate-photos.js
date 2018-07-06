'use strict';

(function () {

  var COUNT_PHOTOS = 25;
  // ф-ция создания объекта фотография
  var PHOTO_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var PHOTO_DESCRIPTIONS = ['Вот это тачка!', 'Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......'];

  window.photos = []; // массив данных с фото

  function generatePhoto(numPhoto) {
    var photo = {
      url: '',
      likes: 0,
      comments: [],
      description: ''
    };
    var k = 0; // итератор

    // заполняем адрес фото в зависимости от номера
    photo.url = 'photos/' + numPhoto + '.jpg';

    // Случайным образом устанавливаем количество лайков от 15 до 200
    k = window.utilits.getRandomInt(15, 200);
    photo.likes = k;

    // Случайным образом заполняем комментарий к фото
    var n = window.utilits.getRandomInt(1, 2); // комментарий состоит из одной или двух фраз
    var currentComment = '';
    for (var j = 1; j <= n; j += 1) {
      k = window.utilits.getRandomInt(0, 5);
      currentComment = currentComment + ' ' + PHOTO_COMMENTS[k];
    }
    photo.comments[0] = currentComment;

    // Подбираем описание фото в зависимости от номера фото
    k = window.utilits.getRandomInt(0, 5);

    photo.description = PHOTO_DESCRIPTIONS[k];

    return photo;

  }

  // ф-ция для заполнения тестового массива
  function fillPhotos(count) {
    var i = 0;
    for (i = 0; i < count; i += 1) {
      var currentPhoto = generatePhoto(i + 1);
      window.photos[i] = currentPhoto;
    }

    return window.photos;
  }

  // Вызываем функцию заполнения тестового массива с нужным количеством фото
  window.photos = fillPhotos(COUNT_PHOTOS);

})();
