/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('createTrailCtrl', function ($scope) {
  $scope.trail = {
    name: '',
    description: '',
    transport: '',
    money: false,
    steps: 0,
    length: '',
  };

  $scope.step = {

  };

  $scope.steps = [

  ];

  $scope.trails = [
    $scope.exampleTrail,
    $scope.exampleTrail,
    $scope.exampleTrail,
  ];
});
