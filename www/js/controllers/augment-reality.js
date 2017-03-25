let $ = window.$
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
      }, (err) => {
        console.error(`unable to init ezar: ${err}`);
      });
    }
  };
  $scope.stopVideoOverlay = () => {
    ezar.getBackCamera().stop();
    stopAccelerometer();
    stopCompass();
    $('#spot').empty().remove();
    $('commentRender').html('<br><div id="spot"></div>');
  };
  $scope.displayComment = (comment) => {
    $ionicLoading.show({
      template: `Notification clicked: ${comment}`,
      noBackdrop: true,
      duration: 5000,
    });
  };
});
