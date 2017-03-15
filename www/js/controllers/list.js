/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('ListCtrl', function ($scope, ListFact) {
  const closeStyle = {
    height: '73px',
    'transition-duration': '250ms',
    overflow: 'hidden',
  };

  const trailmaker = function () {
    const tran = Math.floor(Math.random() * 4) + 1;
    const stars = Math.floor(Math.random() * 5);
    const noStars = 5 - stars;
    const difficulty = Math.floor(Math.random() * 5) + 1;
    return {
      name: `Trail ${Math.floor(Math.random() * 100)}`,
      transport: tran,
      rating: _.range(stars),
      nostars: _.range(noStars),
      difficulty: _.range(difficulty),
      length: (Math.floor(Math.random() * 5) + 2) * tran,
      progress: Math.floor(Math.random() * 100),
      style: closeStyle,
    };
    // return Object.create($scope.trail);
  };

  $scope.specificTransport = false;

  $scope.trail = {
    name: 'My first trail',
    transport: 2,
    rating: 3,
    difficulty: 3,
    length: 25,
    progress: 50,
    style: closeStyle,
  };

  $scope.stars = function () {
    return _.range($scope.trail.rating);
  };

  $scope.nostars = function () {
    return _.range(5 - $scope.trail.rating);
  };

  $scope.difficulty = function () {
    return _.range($scope.trail.difficulty);
  };

  $scope.toggle = function (index) {
    return $scope.trails[index].style.height === '73px' ?
    $scope.open(index) :
    $scope.close(index);
  };

  $scope.open = function (index) {
    $scope.trails[index].style = {
      height: '400px',
      overflow: 'hidden',
      'transition-duration': '250ms',
    };
    $scope.trails.forEach(function (trail, place) {
      if (place !== index) {
        $scope.close(place);
      }
    });
  };

  $scope.close = function (index) {
    $scope.trails[index].style = closeStyle;
  };

  $scope.filter = function (type, value) {
    if (type === 'transport') $scope.specificTransport = true;
    $scope.trails = ListFact.filter($scope.trails, type, value);
  };

  $scope.reset = function () {
    $scope.specificTransport = false;
    $scope.trails = ListFact.filter($scope.trailsCache, 'name');
  };

  $scope.trailsCache = [
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
    trailmaker(),
  ];

  $scope.trails = ListFact.filter($scope.trailsCache, 'name');
});
