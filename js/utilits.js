'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var scale = document.querySelector('.img-upload__scale');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleLine = scale.querySelector('.scale__line');
  var scaleLevel = scale.querySelector('.scale__level');
  var scaleValue = scale.querySelector('.scale__value');

  window.utilits = {
    addRemoveClassHidden: addRemoveClassHidden,
    getRandomInt: getRandomInt,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    setScaleLevel: setScaleLevel,
    onScaleDown: onScaleDown
  };

  function addRemoveClassHidden(currentObject) {
    currentObject.classList.toggle('hidden');
  }

  // функция генерации случайного целого числа в заданном диапазоне включительно
  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  }

  // установка позиции пина на слайдере position: Number
  function setScaleLevel() {

    var position = scaleValue.value * scaleLine.offsetWidth / 100;

    scalePin.style.left = (position) + 'px';
    scaleLevel.style.width = (position) + 'px';

  }

  // нажатие пина на слайдере
  function onScaleDown(evt, action) {

    evt.preventDefault();
    var startX = evt.clientX;
    var shiftX = 0;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    var scaleWidth = scaleLine.offsetWidth;
    var newValue;
    var moved = false;

    function onMouseMove(moveEvt) {

      moveEvt.preventDefault();
      moved = true;

      shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;

      newValue = scalePin.offsetLeft - shiftX;
      newValue = (newValue < 0) ? 0 : newValue;
      newValue = (newValue > scaleWidth) ? scaleWidth : newValue;
      newValue = Math.round(100 / scaleWidth * newValue);
      scaleValue.value = newValue;

      window.utilits.setScaleLevel();

    }

    function onMouseUp(upEvt) {

      upEvt.preventDefault();

      if (moved) {
        action();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    }
  }

})();
