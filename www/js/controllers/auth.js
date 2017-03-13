/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('AuthCtrl', function ($scope) {
  $scope.user = {
    name: 'NAME',
    score: 500,
    finishedTrails: 0,
    totalTime: 0,
    trail: 'Trail name goes here',
  };

  $scope.exampleTrail = {
    name: 'My first trail',
    rating: 5,
    difficulty: 3,
    length: 25,
    progress: '50%',
  };

  $scope.trails = [
    $scope.exampleTrail,
    $scope.exampleTrail,
    $scope.exampleTrail,
  ];
});
