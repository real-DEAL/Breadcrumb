/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, $location, Trail, Map) {
  const moveX = (crumb, num) => {
    const move = `${crumb.left += num}%`;
    const style = {
      left: move,
      'transition-duration': '250ms',
    };
    crumb.style = style;
  };

  const addresses = [
    '727 Mandeville St, New Orleans, LA, 70117',
    '15828 196th Pl NE, Woodinville, WA, 98077',
    '748 Camp St, New Orleans, LA 70130',
    '24700 McBean Pkwy, Valencia, CA 91355',
    '60 Lincoln Center Plaza, New York, NY 10023',
  ];

  const i = () => Math.floor(Math.random() * 5);

  const moveY = (crumb, num) => {
    const style = {
      'transition-duration': '1000ms',
      transform: `translate(0px, ${num}px)`,
    };
    crumb.style = style;
  };

  const moveReset = (crumb, index) => {
    crumb.left = 100 * index;
    const move = `${crumb.left += 2.5}%`;
    const style = {
      'transition-duration': '1000ms',
      top: '0px',
      left: move,
    };
    crumb.style = style;
  };

  $scope.loading = { display: 'none' };

  $scope.map = {};

  $scope.time = '';

  $scope.distance = '';

  $scope.staticMap = '';

  $scope.review = {
    check: false,
    style: { display: 'none' },
  };

  $scope.noOverflow = {
    height: '700px',
    overflow: 'hidden',
  };

  $scope.trail = {
    name: 'Liv\'s trail',
    description: 'A trail that takes you places',
    type: '',
    length: '',
    requires_money: false,
    transport: null,
    crumbs: 0,
    left: 2.5,
    style: null,
  };

  $scope.crumb = () => ({
    name: '',
    description: '',
    location: addresses[i()],
    text: '',
    media: '',
    image: '',
    video: '',
    ar: '',
    left: 2.5,
    style: { 'animation-name': 'moveInFromRight' },
  });

  $scope.crumbs = [];

  $scope.add = () => {
    if (!$scope.review.check) {
      $scope.move(-100);
<<<<<<< HEAD
      const step = $scope.step();
      $scope.steps.push(step);
      $scope.trail.steps += 1;
      console.warn($scope.trail, 'trail')
=======
      $scope.trail.crumbs += 1;
      const crumb = $scope.crumb();
      $scope.crumbs.push(crumb);
      console.warn($scope.crumb, 'crumb');
>>>>>>> (feature) trails and crumbs save to database
    }
  };

  $scope.remove = (index) => {
    $scope.crumbs.splice(index, 1);
    if (!$scope.review.check) {
      $scope.trail.crumbs -= 1;
      moveReset($scope.trail, 0);
      $scope.crumbs.forEach((crumb, ind) => {
        moveReset(crumb, ind + 1);
      });
    }
  };

  $scope.cardSwipedLeft = (index) => {
    if (!$scope.crumbs.length || index === $scope.crumbs.length) {
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
      $scope.crumbs.forEach((crumb) => {
        moveX(crumb, num);
      });
    }
  };

  $scope.reviewMap = () => {
    $scope.loading = null;
    $scope.review.check = true;
    Map.add($scope.steps, $scope.trail.transport)
    .then((data) => {
      $scope.loading = { display: 'none' };
      $scope.staticMap = data.image;
      $scope.time = data.time;
      $scope.distance = data.miles;
      moveY($scope.trail, -475);
      $scope.crumbs.forEach((crumb) => {
        moveY(crumb, -325);
      });
      $scope.review.style = {
        'animation-name': 'moveUp',
      };
      $scope.$apply();
      console.warn(data, 'data');
    });
  };


  $scope.reset = () => {
    $scope.review.check = false;
    moveReset($scope.trail, 0);
    $scope.crumbs.forEach((crumb, index) => {
      moveReset(crumb, index + 1);
    });
    $scope.review.style = {
      'animation-name': 'moveDown',
    };
  };

  $scope.submit = () => {
    $scope.loading = null;
    Trail.submit($scope.trail, $scope.crumbs)
    .then(() => {
      $scope.reset();
      $scope.loading = { display: 'none' };
      $location.path('/dashboard');
    });
  };
});
