/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('ListCtrl', function ($scope) {
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
