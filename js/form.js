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

    openPopup();

  }

  var uploadCansel = imgUpload.querySelector('.img-upload__cancel');
  function openPopup() {

    window.utilits.addRemoveClassHidden(imgOverlay);
    imgPreview.style = 'transform: scale(1)'; // мастаб фото 100%
    imgPreview.style.filter = '';
    imgPreview.classList.remove(imgPreview.classList[1]);
    scale.style.display = 'none';
    // Обработчик закрытия окна загрузки файла
    document.addEventListener('keydown', onUploadEscPress);

    uploadCansel.addEventListener('click', onUploadCancelClick);
    uploadCansel.addEventListener('keydown', onUploadEnterPres);

    // Обработчики изменения мастштаба фото
    resizeControlMinus.addEventListener('click', onResizeClick);
    resizeControlPlus.addEventListener('click', onResizeClick);

    // добавление обаработчиков смены эффектов

    for (var i = 0; i < effectsRadios.length; i += 1) {
      effectsRadios[i].addEventListener('change', onEffectChange);
    }

    // очистка полей хэш-тегов и комментария
    imgUpload.querySelector('.text__hashtags').value = '';
    imgUpload.querySelector('.text__description').value = '';
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

    uploadCansel.removeEventListener('click', onUploadCancelClick);
    uploadCansel.removeEventListener('keydown', onUploadEnterPres);
    document.removeEventListener('keydown', onUploadEscPress);

    uploadFile.value = '';

    resizeControlMinus.removeEventListener('click', onResizeClick);

    resizeControlPlus.removeEventListener('click', onResizeClick);

    for (var i = 0; i < effectsRadios.length; i += 1) {
      effectsRadios[i].removeEventListener('change', onEffectChange);
    }

    if (imgPreview.contains(newMessageError)) {
      imgPreview.removeChild(newMessageError);
    }
    errorLinkAgain.removeEventListener('click', onAgainClick);
    errorLinkAnother.removeEventListener('click', onAnotherClick);

  }

  // *** Применение фильтров ***

  // Изменение масштаба
  function onResizeClick(evt) {

    var scaleValue = resizeControlValue.value;
    var SCALE_STEP = 25;
    var MIN_SCALE = 25;
    var MAX_SCALE = 100;

    evt.stopPropagation();

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

    // imgPreview.style = '-webkit - filter: none; filter: none;';
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

  // Обработчик изменения эффекта, перетаскивания
  scalePin.addEventListener('mousedown', onMouseDown);

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

  imgUploadForm.addEventListener('submit', onImgSubmit);

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
