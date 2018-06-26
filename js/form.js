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

  uploadFile.addEventListener('change', onUpLoadChange);

  function onUploadEscPress(evt) {
    // если курсор в поле, popUp не закрываем
    if ((document.activeElement.tagName === 'INPUT') || (document.activeElement.tagName === 'TEXTAREA')) {
      return;
    }

    window.utilits.isEscEvent(evt, closePopup);

  }

  function onUploadEnterPres(evt) {
    window.utilits.isEnterEvent(evt, closePopup);
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
  }

  function openPopup() {

    window.utilits.addRemoveClassHidden(imgOverlay);
    imgPreview.style = 'transform: scale(1)'; // мастаб фото 100%
    imgPreview.style.filter = '';
    imgPreview.classList.remove(imgPreview.classList[1]);
    scale.style.display = 'none';
    // Обработчик закрытия окна загрузки файла
    uploadCansel.addEventListener('click', onUploadCancelClick);
    uploadCansel.addEventListener('keydown', onUploadEnterPres);
    document.addEventListener('keydown', onUploadEscPress);

    // Обработчики изменения мастштаба фото
    resizeControlMinus.addEventListener('click', onResizeClick);
    resizeControlPlus.addEventListener('click', onResizeClick);

    // добавление обаработчиков смены эффектов

    for (var i = 0; i < effectsRadios.length; i += 1) {
      effectsRadios[i].addEventListener('change', onEffectChange);
    }
  }

  // Обработчик загрузки файла
  function onUpLoadChange(evtUpLoad) {

    evtUpLoad.stopPropagation();

    openPopup();

  }

  var uploadCansel = imgUpload.querySelector('.img-upload__cancel');

  // Закрыть превью фото
  function onUploadCancelClick(evt) {

    evt.stopPropagation();

    closePopup();

  }

  // *** Применение фильтров ***
  // Изменение масштаба

  function onResizeClick(evt) {

    var scaleValue = resizeControlValue.value;

    evt.stopPropagation();

    scaleValue = parseInt(scaleValue.slice(0, -1), 10); // обрезаем знак % в конце строки и преобразуем в число
    if (evt.target === resizeControlMinus) {
      scaleValue = scaleValue - 25;
    }
    if (evt.target === resizeControlPlus) {
      scaleValue = scaleValue + 25;
    }
    scaleValue = (scaleValue < 25) ? 25 : scaleValue;
    scaleValue = (scaleValue > 100) ? 100 : scaleValue;
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

  // Обработчик перетаскивания, изменения эффекта

  function onMouseDown(evt) {
    window.utilits.onScaleDown(evt, changeEffectValue);
  }

  scalePin.addEventListener('mousedown', onMouseDown);

  function changeEffectValue() {
    var persent = parseInt(scaleValue.value, 10) / 100;
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

    effectValue = (minValue + (persent * maxValue));
    effectValue = Math.round(effectValue * 100) / 100;
    effectType = effectType + '(' + effectValue + effectMeasure + ')';

    imgPreview.style.filter = effectType;
  }

})();
