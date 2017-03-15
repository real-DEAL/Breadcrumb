/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope) {
  const moveX = (step, num) => {
    const move = `${step.left += num}%`;
    const style = {
      left: move,
      'transition-duration': '250ms',
    };
    step.style = style;
  };

  const moveY = (step, num) => {
    const style = {
      transform: `translate(0px, ${num}px)`,
      'transition-duration': '1000ms',
    };
    step.style = style;
  };

  const moveReset = (step, index) => {
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

  $scope.step = () => ({
    text: '',
    location: '',
    media: '',
    left: 2.5,
    style: null,
  });

  $scope.steps = [];

  $scope.add = () => {
    if (!$scope.review) {
      $scope.move(-100);
      const step = $scope.step();
      $scope.steps.push(step);
      $scope.trail.steps += 1;
    }
  };

  $scope.remove = (index) => {
    if (!$scope.review) {
      $scope.trail.steps -= 1;
      $scope.steps.splice(index, 1);
      moveReset($scope.trail, 0);
      $scope.steps.forEach((step, ind) => {
        moveReset(step, ind + 1);
      });
    }
  };

  $scope.cardSwipedLeft = (index) => {
    if (!$scope.steps.length || index === $scope.steps.length) {
      return null;
    }
    return $scope.move(-100);
  };

  $scope.cardSwipedRight = () => {
    $scope.move(100);
  };

  $scope.move = (num) => {
    if (!$scope.review) {
      moveX($scope.trail, num);
      $scope.steps.forEach((step) => {
        moveX(step, num);
      });
    }
  };

  $scope.reviewMap = () => {
    $scope.review = true;
    moveY($scope.trail, -450);
    $scope.steps.forEach((step) => {
      moveY(step, -325);
    });
  };

  $scope.edit = () => {
    $scope.review = false;
    moveReset($scope.trail, 0);
    $scope.steps.forEach((step, index) => {
      moveReset(step, index + 1);
    });
  };

  $scope.submit = () => null;
});
