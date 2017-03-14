/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('createTrailCtrl', function ($scope, Trail) {
  $scope.state = {
    review: false,
  };

  $scope.trail = {
    name: '',
    description: '',
    transport: '',
    money: false,
    steps: 0,
    length: '',
    left: 2.5,
    style: null,
  };

  $scope.step = function () {
    return {
      text: '',
      location: '',
      media: '',
      left: 2.5,
      style: null,
    };
  };

  $scope.steps = [
  ];

  $scope.add = function () {
    if (!$scope.state.review) {
      $scope.move(-100);
      $scope.trail.steps += 1;
      const step = $scope.step();
      $scope.steps.push(step);
    }
  };

  $scope.cardSwipedLeft = function (index) {
    if (!$scope.steps.length || index === $scope.steps.length) {
      return null;
    }
    return $scope.move(-100);
  };

  $scope.cardSwipedRight = function () {
    $scope.move(100);
  };

  $scope.move = function (num) {
    if (!$scope.state.review) {
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
          top: '0px',
          'transition-duration': '500ms',
        };
        step.style = style;
      });
    }
  };

  $scope.review = function () {
    $scope.state.review = true;
    $scope.steps.forEach(function (step) {
      const move = '-325px';
      const style = {
        left: step.left,
        top: move,
        'transition-duration': '1000ms',
      };
      console.log(style);
      step.style = style;
    });
  };

  $scope.edit = function () {
    $scope.state.review = false;
  };

  $scope.submit = function () {
    console.log(arguments);
  };
});
