const $ = window.$;
angular.module('breadcrumb')
.controller('AugRealCtrl', function ($scope, Geofence, $ionicLoading, AugRealFact) {
  let watchAccelerometerID = null;
  let watchCompassID = null;

  const startAccelerometer = () => {
    const options = { frequency: 100 };
    watchAccelerometerID =
      navigator.accelerometer
        .watchAcceleration(AugRealFact.accelSucc, AugRealFact.accelErr, options);
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
      navigator.compass.watchHeading(AugRealFact.compSucc, AugRealFact.compErr, options);
  };
  const stopCompass = () => {
    if (watchCompassID) {
      const watch = navigator.compass.clearWatch(watchCompassID);
      watch.then(() => console.warn('Compass off'));
      watchCompassID = null;
    }
  };

  // $scope.messages = AugRealFact.messages;

  $scope.videoOverlay = () => {
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
  $scope.stopVideoOverlay = () => {
    ezar.getBackCamera().stop();
    $('#spot').css('display', 'none');
    $('.comment').css('display', 'none');
    stopAccelerometer();
    stopCompass();
  };
});
