'use strict';

(function () {

  var SIZE_COMMENTS_FRAGMENT = 5;
  // ф-ция показа увеличенного изображения
  var bigPicture = document.querySelector('.big-picture');
  // *********************** Обработка клика по фото **********************************************
  var picturesContainer = document.querySelector('.pictures');
  var currentElement; // текущий элемент в массиве отображаемых фото window.displayPhotos.currentPhotosArray
  picturesContainer.addEventListener('click', onPictureClick);

  function onPictureClick(evt) {
    var pictureLink = evt.target;
    // находим конкретный элемент по которому кликнули, обработчик на контейнере
    pictureLink = returnPictureLink(pictureLink);

    // находим элемент в массиве фотографий
    var pictureLinks = picturesContainer.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureLinks.length; i += 1) {
      if (pictureLinks[i] === pictureLink) {
        currentElement = window.displayPhotos.currentPhotosArray[i];
        displayBigPicture(currentElement);
        break;
      }
    }
  }

  // возвращает ссылку на элемент с фотографией по которой кликнули
  function returnPictureLink(clickElement) {

    if ((clickElement.className !== 'picture__link') && (clickElement.className !== '')) {
      clickElement = clickElement.parentElement;
      clickElement = returnPictureLink(clickElement);
    }

    return clickElement;

  }

  // показ увеличенного изображения
  var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  var socialLoadmoreBtn = bigPicture.querySelector('.social__loadmore');


  function displayBigPicture(photosElement) {

    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
    var bigPicturelikesCount = bigPicture.querySelector('.likes-count');

    window.utilits.addRemoveClassHidden(bigPicture);

    bigPictureImg.src = photosElement.url;
    bigPictureSocialCaption.textContent = photosElement.description;
    bigPicturelikesCount.textContent = photosElement.likes;

    if (socialLoadmoreBtn.classList.contains('hidden')) {
      socialLoadmoreBtn.classList.remove('hidden');
    }
    socialLoadmoreBtn.focus();
    socialLoadmoreBtn.addEventListener('click', onLoadmoreClick);

    createNextCommentsFragment(SIZE_COMMENTS_FRAGMENT, true);

    bigPictureCansel.addEventListener('click', hideBigPicture);
    document.addEventListener('keydown', onEscPress);

  }

  function onEscPress(evt) {
    window.utilits.isEscEvent(evt, hideBigPicture);
  }

  function hideBigPicture() {
    window.utilits.addRemoveClassHidden(bigPicture);
    bigPictureCansel.removeEventListener('click', hideBigPicture);
    socialLoadmoreBtn.removeEventListener('click', onLoadmoreClick);
    document.removeEventListener('keydown', onEscPress);
  }

  // отображение комментариев
  function onLoadmoreClick() {

    createNextCommentsFragment(SIZE_COMMENTS_FRAGMENT, false);

  }

  // добавляет указанное количество комментариев в блок
  // sizeFragment - (int) количество добавляемых комментариев
  // clearCommentsList - (boolean) удалить текущие комментарии
  function createNextCommentsFragment(sizeFragment, clearCommentsList) {

    var bigPictureListComments = bigPicture.querySelector('.social__comments');

    if (clearCommentsList) {
      bigPictureListComments.innerHTML = '';
    }

    var fragment = document.createDocumentFragment();
    var countDisplaedComment = bigPictureListComments.querySelectorAll('.social__comment').length;

    for (var i = countDisplaedComment; i < currentElement.comments.length; i += 1) {
      if (i === (sizeFragment + countDisplaedComment)) {
        break;
      }
      var newCommentElement = createNewComment(currentElement.comments[i]);
      fragment.appendChild(newCommentElement);
    }

    if ((countDisplaedComment + sizeFragment) >= currentElement.comments.length) {
      socialLoadmoreBtn.classList.add('hidden');
      console.log(socialLoadmoreBtn.classList);
    }

    bigPictureListComments.appendChild(fragment);

    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentCount = currentElement.comments.length;
    countDisplaedComment = bigPictureListComments.querySelectorAll('.social__comment').length;
    socialCommentCount.innerHTML = '' + countDisplaedComment + ' из <span class="comments-count">' + commentCount + '</span> комментариев';

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

})();
