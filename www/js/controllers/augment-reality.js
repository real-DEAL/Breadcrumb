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
      navigator.accelerometer.clearWatch(watchAccelerometerID);
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
      navigator.compass.clearWatch(watchCompassID);
      watchCompassID = null;
    }
  };

  $scope.videoOverlay = () => {
    if (window.ezar) {
      ezar.initializeVideoOverlay(() => {
        ezar.getBackCamera().start();
        startAccelerometer();
        startCompass();
        $('#spot').css('display', 'block');
      }, (err) => {
        console.error(`unable to init ezar: ${err}`);
      });
    }
  };
  $scope.stopVideoOverlay = () => {
    ezar.getBackCamera().stop();
    stopAccelerometer();
    stopCompass();
    $('#spot').css('display', 'none');
  };
  $scope.displayComment = (comment) => {
    $ionicLoading.show({
      template: `Notification clicked: ${comment}`,
      noBackdrop: true,
      duration: 5000,
    });
  };
});
