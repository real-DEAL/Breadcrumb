/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb').controller('GeofenceCtrl', function (
  $scope,
  $ionicLoading,
  $state,
  geofence,
  Geofence
) {
  $scope.geofence = geofence;
  $scope.TransitionType = TransitionType;

  $scope.center = {
    lat: geofence.latitude,
    lng: geofence.longitude,
    zoom: 12,
  };
  $scope.markers = {
    marker: {
      draggable: true,
      message: geofence.notification.text,
      lat: geofence.latitude,
      lng: geofence.longitude,
      icon: {},
    },
  };
  $scope.paths = {
    circle: {
      type: 'circle',
      radius: geofence.radius,
      latlngs: $scope.markers.marker,
      clickable: false,
    },
  };

  $scope.tiles = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  };

  $scope.isTransitionOfType = function (transitionType) {
    return ($scope.geofence.transitionType & transitionType);
  };

  $scope.isWhenGettingCloser = function () {
    return $scope.geofence.transitionType === TransitionType.ENTER;
  };

  $scope.toggleWhenIgetCloser = function () {
    $scope.geofence.transitionType ^= TransitionType.ENTER;
  };

  $scope.toggleWhenIamLeaving = function () {
    $scope.geofence.transitionType ^= TransitionType.EXIT;
  };

  function validate() {
    if (!$scope.geofence.notification.text) {
      $ionicLoading.show({
        template: 'Please enter some notification text.',
        duration: 3000,
      });
      return false;
    }

    if ($scope.geofence.transitionType === 0) {
      $ionicLoading.show({
        template: 'You must select when you want notification. When entering or/and exiting region?',
        duration: 3000,
      });
      return false;
    }

    return true;
  }

  $scope.save = function () {
    if (validate()) {
      $scope.geofence.radius = parseInt($scope.paths.circle.radius, 10);
      $scope.geofence.latitude = $scope.markers.marker.lat;
      $scope.geofence.longitude = $scope.markers.marker.lng;
      $scope.geofence.notification.data = angular.copy($scope.geofence);

      Geofence.addOrUpdate($scope.geofence).then(function () {
        $state.go('app.geofences');
      }, function (error) {
        $ionicLoading.show({
          template: 'Failed to add geofence, check if your location provider is enabled',
          duration: 3000,
        });
        console.warn('Failed to add geofence', error);
      });
    }
  };
});
