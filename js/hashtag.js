'use strict';

(function () {

  window.hashtag = {
    textHashtag: document.querySelector('.text__hashtags'),
    validateHashtag: validateHashtag
  };

  // проверка введенного хэш-тега и изменение сообщения об ошибке
  function validateHashtag(evt) {
    var MAX_COUNT_HASHTAG = 5;
    var MIN_LENGTH_HASHTAG = 2;
    var MAX_LENGTH_HASHTAG = 20;

    var hashString = evt.target.value;

    var hashtags = hashString.split(' ').filter(Boolean);

    if (hashtags[0] === '') {
      hashtags.length = 0;
    }

    var textValidity = '';

    for (var i = 0; i < hashtags.length; i += 1) {

      textValidity = '';

      var currentHashtag = hashtags[i];

      if (currentHashtag.slice(0, 1) !== '#') {
        textValidity = textValidity + 'Теги должны начинаться с символа \'#\'.' + ' ';
      }

      if (currentHashtag.length < MIN_LENGTH_HASHTAG) {
        textValidity = textValidity + 'Хеш-тег не может состоять только из одной решётки.' + ' ';
      }

      if (currentHashtag.length > MAX_LENGTH_HASHTAG) {
        textValidity = textValidity + 'Максимальная длина хэш-тега не более 20 символов.' + ' ';
      }

      if (currentHashtag.indexOf('#', 1) > -1) {
        textValidity = textValidity + 'Теги должны быть разделены пробелами.' + ' ';
      }

      if (textValidity !== '') {
        break;
      }

    }

    if (hashtags.length > MAX_COUNT_HASHTAG) {
      textValidity = textValidity + 'Количество хэш-тегов не более ' + MAX_COUNT_HASHTAG;
    }

    if (hasDuplicates(hashtags)) {
      textValidity = textValidity + 'Одинаковых хэш-тегов быть не должно!';
    }

    window.hashtag.textHashtag.setCustomValidity(textValidity);

  }

  function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; i += 1) {
      var value = array[i].toLowerCase();
      if (valuesSoFar.indexOf(value) !== -1) {
        return true;
      }
      valuesSoFar.push(value);

    }
    return false;
  }

})();
