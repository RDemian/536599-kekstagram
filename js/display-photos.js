'use strict';

(function () {

  window.displayPhotos = {
    picturesContainer: document.querySelector('.pictures'),
    loadedPhotos: [],
    currentPhotos: [],
    appendPhotos: appendPhotos
  };

  // ф-ция вывода массива фото в документ
  function appendPhotos(addedPhotos) {

    var contentPictureTemplate = document.querySelector('#picture').content;
    var pictureLinkTemplate = contentPictureTemplate.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    addedPhotos.forEach(function (item, i) {
      var newPicture = pictureLinkTemplate.cloneNode(true);
      newPicture.querySelector('.picture__img').src = item.url;
      newPicture.querySelector('.picture__stat--likes').textContent = item.likes;
      newPicture.querySelector('.picture__stat--comments').textContent = item.comments.length;

      window.displayPhotos.currentPhotos[i] = item;
      fragment.appendChild(newPicture);
    });

    window.displayPhotos.picturesContainer.appendChild(fragment);

  }

  var templatePictureContent = document.querySelector('#picture').content;
  var messageError = templatePictureContent.querySelector('.img-upload__message--error');
  var newMessageError = messageError.cloneNode(true);

  function onError(message) {
    newMessageError.classList.remove('hidden');
    newMessageError.textContent = message;
    window.displayPhotos.picturesContainer.appendChild(newMessageError);
  }

  // Вызываем ф-цию добавления фотографий из массива в документ
  function onLoadPhotos(loadPhotos) {
    window.displayPhotos.loadedPhotos = loadPhotos;
    window.displayPhotos.appendPhotos(loadPhotos);
  }

  window.backend.load(onLoadPhotos, onError);

})();
