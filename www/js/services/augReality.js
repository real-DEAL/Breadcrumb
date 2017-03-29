angular.module('breadcrumb').factory('AugRealFact', function ($http) {
  // TODO: replace with data from database
  const messages = [
    { username: 'broHeim', text: 'sup bro', bearing: 130 },
    { username: 'Munch', text: 'hey man', bearing: 39 },
    { username: 'ali', text: 'yooo', bearing: 273 },
  ];
  // TODO: uncomment when database is available and inject 'store'
  // const user = store.get('user');
  // $http({
  //   url: 'http://54.203.104.113/ar_messages',
  //   method: 'GET',
  //   params: {
  //     access_token: user.access_token,
  //   },
  // })
  // .then((res) => {
  //   // TODO: where on res is the data?
  // })
  // .catch(() => {
  //   messages = [
  //     { username: 'broHeim', text: 'sup bro', bearing: 130 },
  //     { username: 'friendlyfello', text: 'hey man', bearing: 39 },
  //     { username: 'ali', text: 'yooo', bearing: 273 },
  //   ];
  // });

  const calculateDirection = (degree) => {
    let detected = 0;
    $('#spot').html('');
    messages.forEach((val, i) => {
      const fontSize = 6;
      const fontColor = 'white';
      $('#spot').append(`<div class="comment" data-id=${i} style="display:block;margin-left:${(((messages[i].bearing - degree) * 5) + 50)}px;width:${($(window).width() - 100)}px;font-size:${fontSize}px;color:${fontColor}">${messages[i].username}<div>${messages[i].text}</div></div>`);
      detected = 1;
    });
    if (!detected) {
      $('#spot').html('');
    }
  };

  const onAccelerometerSuccess = () => {};

  const onAccelerometerError = () => console.error('Accelerometer error');

  const onCompassSuccess = (heading) => {
    const degree = heading.magneticHeading;
    calculateDirection(degree);
  };

  const onCompassError = (compassError) => {
    console.error(`Compass failed: ${compassError}`);
  };

  let watchAccelerometerID = null;
  let watchCompassID = null;

  const startAccelerometer = () => {
    const options = { frequency: 100 };
    watchAccelerometerID =
      navigator.accelerometer
        .watchAcceleration(onAccelerometerSuccess, onAccelerometerError, options);
  };
  const stopAccelerometer = () => {
    if (watchAccelerometerID) {
      const accel = navigator.accelerometer.clearWatch(watchAccelerometerID);
      accel.then(() => console.warn('Accelerometer off'));
      watchAccelerometerID = null;
    }
  };
  const startCompass = () => {
    const options = { frequency: 100 };
    watchCompassID =
      navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
  };
  const stopCompass = () => {
    if (watchCompassID) {
      const watch = navigator.compass.clearWatch(watchCompassID);
      watch.then(() => console.warn('Compass off'));
      watchCompassID = null;
    }
  };


  const videoOverlay = () => {
    if (window.ezar) {
      ezar.initializeVideoOverlay(() => {
        $('#spot').css('display', 'block');
        $('.comment').css('display', 'block');
        ezar.getBackCamera().start();
        startAccelerometer();
        startCompass();
      }, (err) => {
        console.error(`unable to init ezar: ${err}`);
      });
    }
  };

  const stopVideoOverlay = () => {
    ezar.getBackCamera().stop();
    $('#spot').css('display', 'none');
    $('.comment').css('display', 'none');
    stopAccelerometer();
    stopCompass();
  };

  return {
    startAR: videoOverlay,
    stopAR: stopVideoOverlay,
    accelSucc: onAccelerometerSuccess,
    accelErr: onAccelerometerError,
    compSucc: onCompassSuccess,
    compErr: onCompassError,
    messages,
  };
});
