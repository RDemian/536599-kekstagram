'use strict';
// *********************** Обработка загрузки новой фото ****************************************
(function () {

  var imgUpload = document.querySelector('.img-upload');
  var imgOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgPreview = imgUpload.querySelector('.img-upload__preview');

  var uploadFile = imgUpload.querySelector('#upload-file');

  var resizeControlMinus = imgUpload.querySelector('.resize__control--minus');
  var resizeControlPlus = imgUpload.querySelector('.resize__control--plus');
  var resizeControlValue = imgUpload.querySelector('.resize__control--value');
  var effectsRadios = imgUpload.querySelectorAll('.effects__radio'); // массив input-переключателей эффектов

  // Обработчик загрузки файла
  uploadFile.addEventListener('change', onUpLoadChange);

  function onUpLoadChange(evtUpLoad) {

    evtUpLoad.stopPropagation();
    evtUpLoad.preventDefault();
    readFile();
    openPopup();

  }

  var uploadCancel = imgUpload.querySelector('.img-upload__cancel');
  function openPopup() {

    window.utilits.addRemoveClassHidden(imgOverlay);
    imgPreview.style = 'transform: scale(1)'; // мастаб фото 100%
    imgPreview.style.filter = '';
    imgPreview.classList.remove(imgPreview.classList[1]);
    scale.style.display = 'none';
    // Обработчик закрытия окна загрузки файла
    document.addEventListener('keydown', onUploadEscPress);

    uploadCancel.addEventListener('click', onUploadCancelClick);
    uploadCancel.addEventListener('keydown', onUploadEnterPres);

    // Обработчики изменения мастштаба фото
    resizeControlMinus.addEventListener('click', onMinusClick);
    resizeControlPlus.addEventListener('click', onPlusClick);

    // добавление обаработчиков смены эффектов

    effectsRadios.forEach(function (item) {
      item.addEventListener('change', onEffectChange);
    });

    // Обработчик изменения эффекта, перетаскивания
    scalePin.addEventListener('mousedown', onMouseDown);

    // очистка полей хэш-тегов и комментария
    imgUpload.querySelector('.text__hashtags').value = '';
    imgUpload.querySelector('.text__description').value = '';

    // отправка фото на сервер
    imgUploadForm.addEventListener('submit', onImgSubmit);

    // проверка хэштегов
    window.hashtag.textHashtag.addEventListener('input', onHashtagChange);


  }

  function readFile() {

    var DEFAULT_IMG = 'img/upload-default-image.jpg';
    var imgPicture = imgPreview.querySelector('img');
    var previewPicture = imgUpload.querySelectorAll('.effects__preview');
    var file = uploadFile.files[0];
    var reader = new FileReader();

    imgPicture.src = DEFAULT_IMG;
    previewPicture.forEach(function (item) {
      item.style = '';
    });

    if (file.type === 'image/jpeg') {

      reader.addEventListener('load', onReaderLoad);
      reader.readAsDataURL(file);

    }

    function onReaderLoad() {
      imgPicture.src = reader.result;
      previewPicture.forEach(function (item) {
        item.style = 'background-image: url(' + reader.result + ');';
      });
      reader.removeEventListener('load', onReaderLoad);
    }

  }

  function onHashtagChange(evt) {
    window.hashtag.validateHashtag(evt);
  }

  // Закрыть превью фото
  function onUploadEscPress(evt) {
    // если курсор в поле, popUp не закрываем
    if ((document.activeElement.name === 'hashtags') || (document.activeElement.name === 'description')) {
      return;
    }

    window.utilits.isEscEvent(evt, closePopup);

  }

  function onUploadEnterPres(evt) {
    window.utilits.isEnterEvent(evt, closePopup);
  }

  function onUploadCancelClick(evt) {

    evt.stopPropagation();

    closePopup();

  }

  function closePopup() {

    window.utilits.addRemoveClassHidden(imgOverlay);

    uploadCancel.removeEventListener('click', onUploadCancelClick);
    uploadCancel.removeEventListener('keydown', onUploadEnterPres);
    document.removeEventListener('keydown', onUploadEscPress);

    uploadFile.value = '';

    resizeControlMinus.removeEventListener('click', onMinusClick);

    resizeControlPlus.removeEventListener('click', onPlusClick);

    effectsRadios.forEach(function (item) {
      item.removeEventListener('change', onEffectChange);
    });

    // Обработчик изменения эффекта, перетаскивания
    scalePin.removeEventListener('mousedown', onMouseDown);

    if (imgPreview.contains(newMessageError)) {
      imgPreview.removeChild(newMessageError);
    }

    // отправка фото на сервер
    imgUploadForm.removeEventListener('submit', onImgSubmit);
    errorLinkAgain.removeEventListener('click', onAgainClick);
    errorLinkAnother.removeEventListener('click', onAnotherClick);

    // проверка хэштегов
    window.hashtag.textHashtag.removeEventListener('input', onHashtagChange);

  }

  // *** Применение фильтров ***

  // Изменение масштаба
  function onMinusClick(evt) {
    evt.stopPropagation();
    resizeScale(evt);
  }

  function onPlusClick(evt) {
    evt.stopPropagation();
    resizeScale(evt);
  }

  function resizeScale(evt) {

    var scaleValue = resizeControlValue.value;
    var SCALE_STEP = 25;
    var MIN_SCALE = 25;
    var MAX_SCALE = 100;

    scaleValue = parseInt(scaleValue.slice(0, -1), 10); // обрезаем знак % в конце строки и преобразуем в число
    if (evt.target === resizeControlMinus) {
      scaleValue = scaleValue - SCALE_STEP;
    }
    if (evt.target === resizeControlPlus) {
      scaleValue = scaleValue + SCALE_STEP;
    }
    scaleValue = (scaleValue < MIN_SCALE) ? MIN_SCALE : scaleValue;
    scaleValue = (scaleValue > MAX_SCALE) ? MAX_SCALE : scaleValue;
    imgPreview.style = 'transform: scale(' + scaleValue / 100 + ')';
    resizeControlValue.value = String(scaleValue) + '%';

  }

  // Обработчик наложения эффекта
  var scale = imgUpload.querySelector('.img-upload__scale');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleValue = scale.querySelector('.scale__value');

  function onEffectChange(evt) {
    var MAX_EFFECT = 100;
    var targetElem = evt.target;
    var effectsPreview = targetElem.parentElement.querySelector('.effects__preview');
    var selectedEffect = effectsPreview.classList[1];

    imgPreview.style.filter = '';
    imgPreview.classList.remove(imgPreview.classList[1]);
    imgPreview.classList.add(selectedEffect);

    scale.style.display = '';

    if (selectedEffect === 'effects__preview--none') {
      scale.style.display = 'none';
    }

    scaleValue.value = MAX_EFFECT;

    changeEffectValue();

    window.utilits.setScaleLevel();

  }

  function onMouseDown(evt) {
    window.utilits.onScaleDown(evt, changeEffectValue);
  }

  function changeEffectValue() {
    var percent = parseInt(scaleValue.value, 10) / 100; // проценты в число
    var selectedEffect = imgPreview.classList[1];
    var minValue = 0;
    var maxValue = 1;
    var effectValue = 0;
    var effectType = '';
    var effectMeasure = '';

    switch (selectedEffect) {
      case 'effects__preview--chrome':
        effectType = 'grayscale';
        break;
      case 'effects__preview--sepia':
        effectType = 'sepia';
        break;
      case 'effects__preview--marvin':
        effectMeasure = '%';
        effectType = 'invert';
        maxValue = 100;
        break;
      case 'effects__preview--phobos':
        maxValue = 3;
        effectMeasure = 'px';
        effectType = 'blur';
        break;
      case 'effects__preview--heat':
        minValue = 1;
        maxValue = 2;
        effectType = 'brightness';
        break;
    }

    effectValue = (minValue + (percent * maxValue));
    effectValue = Math.round(effectValue * 100) / 100; // округляем до сотых
    effectType = effectType + '(' + effectValue + effectMeasure + ')';

    imgPreview.style.filter = effectType;
  }

  // отправка фото на сервер
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');
  var templatePictureContent = document.querySelector('#picture').content;
  var messageError = templatePictureContent.querySelector('.img-upload__message--error');
  var newMessageError = messageError.cloneNode(true);
  var errorLinkAgain = newMessageError.querySelector('.error__link--again');
  var errorLinkAnother = newMessageError.querySelector('.error__link--another');

  function onImgSubmit(evt) {
    window.backend.upLoad(new FormData(imgUploadForm), onLoad, onError);
    evt.preventDefault();
  }

  function onLoad() {
    // закрываем форму после отправки изображения на сервер
    closePopup();
  }

  function onError(message) {
    var errorLinks = newMessageError.querySelector('.error__links');
    newMessageError.classList.remove('hidden');
    newMessageError.textContent = message;
    newMessageError.appendChild(errorLinks);
    imgPreview.appendChild(newMessageError);
    errorLinkAgain.addEventListener('click', onAgainClick);
    errorLinkAnother.addEventListener('click', onAnotherClick);
  }

  function onAgainClick() {

    newMessageError.classList.add('hidden');

  }

  function onAnotherClick() {

    closePopup();

  }

})();
