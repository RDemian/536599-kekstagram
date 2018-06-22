'use strict';

(function () {

  var textHashtag = document.querySelector('.text__hashtags');

  textHashtag.addEventListener('input', onHashtagChange);

  // проверка введенного хэш-тега и изменение сообщения об ошибке
  function onHashtagChange(evt) {

    var hashString = evt.target.value;

    var hashtags = hashString.split(' ').filter(Boolean);

    if (hashtags[0] === '') {
      hashtags.length = 0;
    }

    var textValidity = '';

    for (var i = 0; i < hashtags.length; i += 1) {

      textValidity = '';

      if (hashtags[i].slice(0, 1) !== '#') {
        textValidity = textValidity + 'Теги должны начинаться с символа \'#\'.' + ' ';
      }

      if (hashtags[i].length > 20) {
        textValidity = textValidity + 'Максимальная длина хэш-тега не более 20 символов.' + ' ';
      }

      if (hashtags[i].indexOf('#', 1) > -1) {
        textValidity = textValidity + 'Теги должны быть разделены пробелами.' + ' ';
      }

    }

    if (hashtags.length > 5) {
      textValidity = textValidity + 'Количество хэш-тегов не более 5.';
    }

    if (hasDuplicates(hashtags)) {
      textValidity = textValidity + 'Одинаковых хэш-тегов быть не должно!';
    }

    textHashtag.setCustomValidity(textValidity);

  }

  function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
      var value = array[i].toLowerCase();
      if (valuesSoFar.indexOf(value) !== -1) {
        return true;
      }
      valuesSoFar.push(value);

    }
    return false;
  }

})();
