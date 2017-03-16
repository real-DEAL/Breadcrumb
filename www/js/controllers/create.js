/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, Trail) {
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
      'transition-duration': '1000ms',
      transform: `translate(0px, ${num}px)`,
    };
    step.style = style;
  };

  const moveReset = (step, index) => {
    step.left = 100 * index;
    const move = `${step.left += 2.5}%`;
    const style = {
      'transition-duration': '1000ms',
      top: '0px',
      left: move,
    };
    step.style = style;
  };

  $scope.map = {};

  $scope.time = '';

  $scope.distance = '';

  $scope.staticMap = '';

  $scope.review = {
    check: false,
  };

  $scope.noOverflow = {
    height: '700px',
    overflow: 'hidden',
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

  $scope.step = () => ({
    text: '',
    location: '',
    media: '',
    left: 2.5,
    style: { 'animation-name': 'moveInFromRight' },
  });

  $scope.steps = [];

  $scope.add = () => {
    if (!$scope.review.check) {
      $scope.move(-100);
      const step = $scope.step();
      $scope.steps.push(step);
      $scope.trail.steps += 1;
      console.warn($scope.trail, 'trail')
    }
  };

  $scope.remove = (index) => {
    if (!$scope.review.check) {
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
    if (!$scope.review.check) {
      moveX($scope.trail, num);
      $scope.steps.forEach((step) => {
        moveX(step, num);
      });
    }
  };

  $scope.reviewMap = () => {
    $scope.review.check = true;
    moveY($scope.trail, -450);
    $scope.steps.forEach((step) => {
      moveY(step, -325);
    });
    moveY($scope.review, 0);
    $scope.review.style = {
      'animation-name': 'moveUp',
    };
    Trail.addPath($scope.steps, $scope.trail.transport)
    .then((data) => {
      $scope.staticMap = data.image;
      $scope.time = data.time;
      $scope.distance = data.miles;
      $scope.$apply();
      console.warn(data, 'data');
    });
  };


  $scope.edit = () => {
    $scope.review.check = false;
    moveReset($scope.trail, 0);
    $scope.steps.forEach((step, index) => {
      moveReset(step, index + 1);
    });
    $scope.review.style = {
      'animation-name': 'moveDown',
    };
  };

  $scope.submit = () => null;
});
