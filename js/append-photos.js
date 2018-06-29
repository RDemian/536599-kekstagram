'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');
  window.loadPhotosArray = [];
  window.currentPhotosArray = [];

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

      window.currentPhotosArray[i] = addedPhotos[i];
      fragment.appendChild(newPicture);
    }

    picturesContainer.appendChild(fragment);

    initialFilters();

  }

  function initialFilters() {

    var imgFilters = document.querySelector('.img-filters');

    imgFilters.classList.remove('img-filters--inactive');

    var imgFilterButtons = imgFilters.querySelectorAll('.img-filters__button');
    for (var i = 0; i < imgFilterButtons.length; i += 1) {
      imgFilterButtons[i].addEventListener('click', onFilterClick);
    }

  }

  function onFilterClick(evt) {
    applyFilter(evt.target.id);
  }

  function applyFilter(id) {

    var pictureLinks = picturesContainer.querySelectorAll('.picture__link');
    // очистка контейнера фотографий
    for (var i = 0; i < pictureLinks.length; i += 1) {
      picturesContainer.removeChild(pictureLinks[i]);
    }

    var filterList = {
      'filter-popular': filterPopular,
      'filter-new': filterNew,
      'filter-discussed': filterDiscussed
    };

    (filterList[id])();

  }

  function filterPopular() {
    appendPhotos(window.loadPhotosArray);
  }

  function filterNew() {

    var indexElem = window.utilits.getRandomInt(1, window.loadPhotosArray.length);

    var sortPhotos = window.loadPhotosArray.slice(indexElem, window.loadPhotosArray.length);
    sortPhotos = sortPhotos.concat(window.loadPhotosArray.slice(0, indexElem));

    var countNewPhoto = 10;
    sortPhotos = sortPhotos.slice(0, countNewPhoto);

    appendPhotos(sortPhotos);

  }

  function filterDiscussed() {

    var sortPhotos = window.loadPhotosArray.slice();

    sortPhotos = sortPhotos.sort(function (n1, n2) {
      n1 = n1.comments.length;
      n2 = n2.comments.length;
      return n2 - n1;
    });

    appendPhotos(sortPhotos);

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
    window.loadPhotosArray = loadPhotos;
    appendPhotos(loadPhotos);
  }

  window.backend.load(onLoadPhotos, onError);

})();
