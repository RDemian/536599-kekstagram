'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');

  window.displayPhotos = {
    loadedPhotos: [],
    currentPhotos: [],
    appendPhotos: appendPhotos
  };

  // ф-ция вывода массива фото в документ
  function appendPhotos(addedPhotos) {

    var contentPictureTemplate = document.querySelector('#picture').content;
    var pictureLinkTemplate = contentPictureTemplate.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < addedPhotos.length; i += 1) {
      var newPicture = pictureLinkTemplate.cloneNode(true);

      newPicture.querySelector('.picture__img').src = addedPhotos[i].url;
      newPicture.querySelector('.picture__stat--likes').textContent = addedPhotos[i].likes;
      newPicture.querySelector('.picture__stat--comments').textContent = addedPhotos[i].comments.length;

      window.displayPhotos.currentPhotos[i] = addedPhotos[i];
      fragment.appendChild(newPicture);
    }

    picturesContainer.appendChild(fragment);

  }

  var templatePictureContent = document.querySelector('#picture').content;
  var messageError = templatePictureContent.querySelector('.img-upload__message--error');
  var newMessageError = messageError.cloneNode(true);

  function onError(message) {
    newMessageError.classList.remove('hidden');
    newMessageError.textContent = message;
    picturesContainer.appendChild(newMessageError);
  }

  // Вызываем ф-цию добавления фотографий из массива в документ
  function onLoadPhotos(loadPhotos) {
    window.displayPhotos.loadPhotosArray = loadPhotos;
    window.displayPhotos.appendPhotos(loadPhotos);
  }

  window.backend.load(onLoadPhotos, onError);

})();
