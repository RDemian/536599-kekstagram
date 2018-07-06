'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var imgFilterButtons = imgFilters.querySelectorAll('.img-filters__button');

  // инициализация фильтров списка фотографий
  initFilters();

  function initFilters() {

    imgFilters.classList.remove('img-filters--inactive');

    for (var i = 0; i < imgFilterButtons.length; i += 1) {
      imgFilterButtons[i].addEventListener('click', onFilterClick);
    }

  }

  function onFilterClick(evt) {
    applyFilter(evt.target);
  }

  // применить фильтр
  function applyFilter(element) {

    var picturesContainer = document.querySelector('.pictures');
    var pictureLinks = picturesContainer.querySelectorAll('.picture__link');
    // очистка контейнера фотографий
    pictureLinks.forEach(function (item) {
      picturesContainer.removeChild(item);
    });

    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    element.classList.add('img-filters__button--active');

    var filterMap = {
      'filter-popular': filterPopular,
      'filter-new': filterNew,
      'filter-discussed': filterDiscussed
    };

    (filterMap[element.id])();

  }

  function filterPopular() {
    window.displayPhotos.appendPhotos(window.displayPhotos.loadedPhotos);
  }

  function filterNew() {

    var COUNT_NEW_PHOTO = 10;
    var indexElem = window.utilits.getRandomInt(1, window.displayPhotos.loadedPhotos.length);

    var sortPhotos = window.displayPhotos.loadedPhotos.slice(indexElem, window.displayPhotos.loadedPhotos.length);
    sortPhotos = sortPhotos.concat(window.displayPhotos.loadedPhotos.slice(0, indexElem));


    sortPhotos = sortPhotos.slice(0, COUNT_NEW_PHOTO);

    window.displayPhotos.appendPhotos(sortPhotos);

  }

  function filterDiscussed() {

    var sortPhotos = window.displayPhotos.loadedPhotos.slice();

    sortPhotos = sortPhotos.sort(function (n1, n2) {
      n1 = n1.comments.length;
      n2 = n2.comments.length;
      return n2 - n1;
    });

    window.displayPhotos.appendPhotos(sortPhotos);

  }
})();
