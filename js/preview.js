'use strict';

(function () {

  // ф-ция показа увеличенного изображения
  var bigPicture = document.querySelector('.big-picture');
  var SIZE_COMMENTS_FRAGMENT = 5;
  // *********************** Обработка клика по фото **********************************************
  var picturesContainer = document.querySelector('.pictures');
  var currentElement; // текущий элемент в массиве отображаемых фото window.displayPhotos.currentPhotosArray
  picturesContainer.addEventListener('click', onPictureClick);

  function onPictureClick(evt) {
    var pictureLinkElement = evt.target;
    // находим конкретный элемент по которому кликнули, обработчик на контейнере
    pictureLinkElement = returnPictureLinkElement(pictureLinkElement);

    // находим элемент в массиве фотографий
    var pictureLinks = picturesContainer.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureLinks.length; i += 1) {
      if (pictureLinks[i] === pictureLinkElement) {
        currentElement = window.displayPhotos.currentPhotosArray[i];
        displayBigPicture(currentElement);
        break;
      }
    }
  }

  // возвращает ссылку на элемент с фотографией по которой кликнули
  function returnPictureLinkElement(clickElement) {

    if ((clickElement.className !== 'picture__link') && (clickElement.className !== '')) {
      clickElement = clickElement.parentElement;
      clickElement = returnPictureLinkElement(clickElement);
    }

    return clickElement;

  }

  function displayBigPicture(photosElement) {

    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
    var bigPicturelikesCount = bigPicture.querySelector('.likes-count');
    // var bigPictureCommentsСount = bigPicture.querySelector('.comments-count');

    // var bigPictureListComments = bigPicture.querySelector('.social__comments');

    window.utilits.addRemoveClassHidden(bigPicture);
    // bigPicture.classList.remove('hidden');
    bigPictureImg.src = photosElement.url;
    bigPictureSocialCaption.textContent = photosElement.description;
    bigPicturelikesCount.textContent = photosElement.likes;
    // bigPictureCommentsСount.textContent = commentCount;

    createNextCommentsFragment(SIZE_COMMENTS_FRAGMENT, true);

  }

  // отображение комментариев
  var socialLoadmoreBtn = bigPicture.querySelector('.social__loadmore');
  socialLoadmoreBtn.addEventListener('click', onLoadmoreClick);

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

  var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  bigPictureCansel.addEventListener('click', function () {
    window.utilits.addRemoveClassHidden(bigPicture);
  });

})();
