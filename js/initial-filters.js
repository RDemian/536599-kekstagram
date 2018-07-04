'use strict';

(function () {

  // инициализация фильтров списка фотографий
  initialFilters();

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

  // применить фильтр
  function applyFilter(id) {

    var picturesContainer = document.querySelector('.pictures');
    var pictureLinks = picturesContainer.querySelectorAll('.picture__link');
    // очистка контейнера фотографий
    for (var i = 0; i < pictureLinks.length; i += 1) {
      picturesContainer.removeChild(pictureLinks[i]);
    }

    var filterMap = {
      'filter-popular': filterPopular,
      'filter-new': filterNew,
      'filter-discussed': filterDiscussed
    };

    (filterMap[id])();

  }

  function filterPopular() {
    window.displayPhotos.appendPhotos(window.displayPhotos.loadPhotosArray);
  }

  function filterNew() {

    var indexElem = window.utilits.getRandomInt(1, window.displayPhotos.loadPhotosArray.length);

    var sortPhotos = window.displayPhotos.loadPhotosArray.slice(indexElem, window.displayPhotos.loadPhotosArray.length);
    sortPhotos = sortPhotos.concat(window.displayPhotos.loadPhotosArray.slice(0, indexElem));

    var COUNT_NEW_PHOTO = 10;
    sortPhotos = sortPhotos.slice(0, COUNT_NEW_PHOTO);

    window.displayPhotos.appendPhotos(sortPhotos);

  }

  function filterDiscussed() {

    var sortPhotos = window.displayPhotos.loadPhotosArray.slice();

    sortPhotos = sortPhotos.sort(function (n1, n2) {
      n1 = n1.comments.length;
      n2 = n2.comments.length;
      return n2 - n1;
    });

    window.displayPhotos.appendPhotos(sortPhotos);

  }
})();
