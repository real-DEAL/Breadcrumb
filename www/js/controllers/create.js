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
    text: '',
    location: '',
    media: '',
  };

  $scope.steps = [
  ];

  $scope.add = function () {
    const step = {
      text: '',
      location: '',
      media: '',
    };
    $scope.steps.push(step);
  };

  $scope.cardSwipedLeft = function () {
    console.log('LEFT SWIPE');
    // $scope.addCard();
  };

  $scope.cardSwipedRight = function () {
    console.log('RIGHT SWIPE');
    // $scope.addCard();
  };
});
