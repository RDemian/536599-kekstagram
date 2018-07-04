'use strict';

(function () {

  var STATUS_SUCCESS = 200;

  function load(onLoad, onError) {

    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  }

  function upLoad(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {

      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.open('POST', URL);
    xhr.send(data);

  }

  window.backend = {
    load: load,
    upLoad: upLoad
  };

})();
