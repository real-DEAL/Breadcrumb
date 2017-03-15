/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('ionic-geofence')
.controller('ProfileCtrl', function ($scope) {
  $scope.user = {
    name: 'NAME',
    score: 500,
    finishedTrails: 3,
    totalTime: 0,
    trail: {
      name: `My ${Math.floor(Math.random() * 100)}th trail`,
      stars: _.range(4),
      nostars: _.range(1),
      progress: `${Math.floor(Math.random() * 100)}%`,
    },
  };

  const trailmaker = function () {
    const tran = Math.floor(Math.random() * 4) + 1;
    const stars = Math.floor(Math.random() * 5);
    const noStars = 5 - stars;
    const difficulty = Math.floor(Math.random() * 5) + 1;
    return {
      name: `Trail ${Math.floor(Math.random() * 100)}`,
      transport: tran,
      stars: _.range(stars),
      nostars: _.range(noStars),
      difficulty: _.range(difficulty),
      length: (Math.floor(Math.random() * 5) + 2) * tran,
      progress: `${Math.floor(Math.random() * 100)}%`,
    };
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

  $scope.exampleTrail = {
    name: 'My first trail',
    rating: 5,
    difficulty: 3,
    length: 25,
    progress: '50%',
  };

  $scope.userTrails = [
    trailmaker(),
    trailmaker(),
    trailmaker(),
  ];

  $scope.pastTrails = [
    trailmaker(),
    trailmaker(),
    trailmaker(),
  ];
});
