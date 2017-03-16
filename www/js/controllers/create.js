/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, $location, Trail, Map) {


  const addresses = [
    '727 Mandeville St, New Orleans, LA, 70117',
    '15828 196th Pl NE, Woodinville, WA, 98077',
    '748 Camp St, New Orleans, LA 70130',
    '24700 McBean Pkwy, Valencia, CA 91355',
    '60 Lincoln Center Plaza, New York, NY 10023',
  ];

  const i = () => Math.floor(Math.random() * 5);

  const moveX = (crumb, num) => {
    const move = `${crumb.left += num}%`;
    const style = {
      left: move,
      'transition-duration': '250ms',
    };
    crumb.style = style;
  };

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

  $scope.trailTypes = [
    'adventure',
    'mystery',
    'casual',
    'tour',
    'scavenger',
    'nature',
    'history',
  ].sort();

  $scope.step = 0;

  $scope.changeStep = (change) => {
    if (change) {
      $scope.step += 1;
    } else if (!change) {
      $scope.step -= 1;
    }
    if ($scope.step < 0) {
      $scope.step = $scope.trailTypes.length - 1;
    } else if ($scope.step === $scope.trailTypes.length) {
      $scope.step -= $scope.trailTypes.length;
    }
    console.log($scope.step);
    $scope.trail.type = $scope.trailTypes[$scope.step];
  };

  $scope.difficulty = {
    1: 'easy',
    2: 'normal',
    3: 'hard',
  };

  $scope.transport = {
    WALKING: 'walk',
    BICYCLING: 'bicycle',
    TRANSIT: 'bus',
    DRIVING: 'car',
  };

  $scope.money = (boolean) => {
    $scope.trail.requires_money = !boolean;
    if (boolean) $scope.moneyStyle = null;
    else $scope.moneyStyle = { color: '#33CD61' };
  };

  $scope.moneyStyle = null;

  $scope.review = {
    check: false,
    style: { display: 'none' },
  };

  $scope.trail = {
    name: 'Liv\'s trail',
    description: 'A trail that takes you places',
    type: $scope.trailTypes[0],
    map: '',
    time: '',
    length: '',
    requires_money: false,
    transport: '',
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
      $scope.trail.crumbs += 1;
      const crumb = $scope.crumb();
      $scope.crumbs.push(crumb);
      console.warn($scope.crumb, 'crumb');
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
      $scope.trail.map = data.image;
      $scope.trail.time = data.time;
      $scope.trail.length = data.miles;
      moveY($scope.trail, -475);
      $scope.crumbs.forEach((crumb) => {
        moveY(crumb, -400);
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
