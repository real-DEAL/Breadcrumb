/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('createTrailCtrl', function ($scope, Trail) {
  $scope.style = function () {
    return {
      left: '2.5%',
    };
  };

  $scope.trail = {
    name: '',
    description: '',
    transport: '',
    money: false,
    steps: 0,
    length: '',
    left: 2.5,
    style: $scope.style(),
  };

  $scope.step = function () {
    return {
      text: '',
      location: '',
      media: '',
      left: 2.5,
      style: $scope.style(),
    };
  };

  $scope.steps = [
  ];

  $scope.add = function () {
    $scope.move(-100);
    $scope.trail.steps += 1;
    const step = $scope.step();
    $scope.steps.push(step);
  };

  $scope.cardSwipedLeft = function () {
    // console.log('LEFT SWIPE');
    // $scope.addCard();
  };

  $scope.cardSwipedRight = function () {
    // console.log('RIGHT SWIPE');
    // $scope.addCard();
  };

  $scope.move = function (num) {
    let move = `${$scope.trail.left += num}%`;
    let style = {
      left: move,
      'transition-duration': '500ms',
    };
    $scope.trail.style = style;
    $scope.steps.forEach(function (step) {
      move = `${step.left += num}%`;
      style = {
        left: move,
        'transition-duration': '500ms',
      };
      step.style = style;
    });
  };
});
