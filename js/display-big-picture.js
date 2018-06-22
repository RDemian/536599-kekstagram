'use strict';

(function () {

  // ф-ция показа увеличенного изображения
  var bigPicture = document.querySelector('.big-picture');

  function displayBigPicture(photosElement) {

    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
    var bigPicturelikesCount = bigPicture.querySelector('.likes-count');
    var bigPictureCommentsСount = bigPicture.querySelector('.comments-count');
    var bigPictureListComments = bigPicture.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    window.utilits.addRemoveClassHidden(bigPicture);
    // bigPicture.classList.remove('hidden');
    bigPictureImg.src = photosElement.url;
    bigPictureSocialCaption.textContent = photosElement.description;
    bigPicturelikesCount.textContent = photosElement.likes;
    bigPictureCommentsСount.textContent = photosElement.comments.length;

    for (var i = 0; i < photosElement.comments.length; i += 1) {
      var newCommentElement = createNewComment(photosElement.comments[i]);
      fragment.appendChild(newCommentElement);
    }

    bigPictureListComments.innerHTML = '';

    bigPictureListComments.appendChild(fragment);
  }

  // ф-ция отображения нового комментария
  function createNewComment(currentComment) {

    var newSocialComment = document.createElement('li');

    newSocialComment.classList.add('social__comment');
    newSocialComment.classList.add('social__comment--text');

    var socialPicture = document.createElement('img');

    socialPicture.classList.add('social__picture');
    socialPicture.src = 'img/avatar-' + window.utilits.getRandomInt(1, 6) + '.svg';
    socialPicture.alt = 'Аватар комментатора фотографии';
    socialPicture.width = '35';
    socialPicture.height = '35';
    newSocialComment.appendChild(socialPicture);

    var socialText = document.createElement('p');

    socialText.classList.add('social__text');
    socialText.textContent = currentComment;
    newSocialComment.appendChild(socialText);

    return newSocialComment;
  }

  // *********************** Обработка клика по фото **********************************************
  var picturesContainer = document.querySelector('.pictures');

  function onPictureClick(evt) {
    var pictureLinkElement = evt.target;

    // возвращает ссылку на элемент с фотографией по которой кликнули
    function returnPictureLinkElement(currentElement) {

      if ((pictureLinkElement.className !== 'picture__link') && (pictureLinkElement.className !== '')) {
        pictureLinkElement = currentElement.parentElement;
        pictureLinkElement = returnPictureLinkElement(pictureLinkElement);
      }

      return pictureLinkElement;

    }

    pictureLinkElement = returnPictureLinkElement(pictureLinkElement);

    var pictureLinks = picturesContainer.querySelectorAll('.picture__link');

    // позиция элемента в массиве displayPhotos соответствует его позиции в массиве данных photos
    for (var i = 0; i < pictureLinks.length; i += 1) {
      if (pictureLinks[i] === pictureLinkElement) {
        displayBigPicture(window.photos[i]);
        break;
      }
    }
  }

  picturesContainer.addEventListener('click', onPictureClick);

  var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  bigPictureCansel.addEventListener('click', function () {
    window.utilits.addRemoveClassHidden(bigPicture);
  });

  // ф-ция скрытия блока
  var hideBlock = function (block) {
    block.classList.add('visually-hidden');
  };

  // Скрытие блоков
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialLoadmore = document.querySelector('.social__loadmore');

  hideBlock(socialCommentCount);
  hideBlock(socialLoadmore);

})();
