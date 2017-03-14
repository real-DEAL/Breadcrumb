/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('createTrailCtrl', function ($scope) {
  const moveX = function (step, num) {
    const move = `${step.left += num}%`;
    const style = {
      left: move,
      'transition-duration': '500ms',
    };
    step.style = style;
  };

  const moveY = function (step, num) {
    const style = {
      transform: `translate(0px, ${num}px)`,
      'transition-duration': '1000ms',
    };
    step.style = style;
  };

  const moveReset = function (step, index) {
    step.left = 100 * index;
    const move = `${step.left += 2.5}%`;
    const style = {
      top: '0px',
      left: move,
      'transition-duration': '1000ms',
    };
    step.style = style;
  };

  $scope.review = false;

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
    if (!$scope.review) {
      $scope.move(-100);
      $scope.trail.steps += 1;
      const step = $scope.step();
      $scope.steps.push(step);
    }
  };

  $scope.remove = function (index) {
    if (!$scope.review) {
      $scope.trail.steps -= 1;
      $scope.steps.splice(index, 1);
      moveReset($scope.trail, 0);
      $scope.steps.forEach(function (step, ind) {
        moveReset(step, ind + 1);
      });
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
    if (!$scope.review) {
      moveX($scope.trail, num);
      $scope.steps.forEach(function (step) {
        moveX(step, num);
      });
    }
  };

  $scope.reviewMap = function () {
    $scope.review = true;
    moveY($scope.trail, -450);
    $scope.steps.forEach(function (step) {
      moveY(step, -325);
    });
  };

  $scope.edit = function () {
    $scope.review = false;
    moveReset($scope.trail, 0);
    $scope.steps.forEach(function (step, index) {
      moveReset(step, index + 1);
    });
  };

  $scope.submit = function () {
    return null;
  };
});
