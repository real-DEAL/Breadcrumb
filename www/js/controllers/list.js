/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('ListCtrl', function ($scope) {
  const closeStyle = {
    height: '45px',
    'transition-duration': '250ms',
  };

  const trailmaker = function () {
    return Object.create($scope.trail);
  };

  $scope.trail = {
    name: 'My first trail',
    rating: 3,
    difficulty: 3,
    length: 25,
    progress: '50%',
    style: { height: '45px' },
  };

  $scope.stars = function () {
    return _.range($scope.trail.rating);
  };

  $scope.nostars = function () {
    return _.range(5 - $scope.trail.rating);
  };

  $scope.difficulty = function () {
    return _.range($scope.trail.difficulty);
  };

  $scope.toggle = function (index) {
    return $scope.trails[index].style.height === '45px' ?
    $scope.open(index) :
    $scope.close(index);
  };

  $scope.open = function (index) {
    $scope.trails[index].style = {
      height: '320px',
      'transition-duration': '250ms',
    };
    $scope.trails.forEach(function (trail, place) {
      if (place !== index) {
        $scope.close(place);
      }
    });
  };

  $scope.close = function (index) {
    $scope.trails[index].style = closeStyle;
  };

  $scope.trails = [
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
  ];
});
