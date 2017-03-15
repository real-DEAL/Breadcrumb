/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact) {
  $scope.user = {
    name: 'NAME',
    score: 500,
    finishedTrails: 3,
    totalTime: 0,
    trail: {
      name: `My ${Math.floor(Math.random() * 100)}th trail`,
      stars: ListFact.range(4),
      nostars: ListFact.range(1),
      progress: `${Math.floor(Math.random() * 100)}%`,
    },
  };

  const trailmaker = () => {
    const tran = Math.floor(Math.random() * 4) + 1;
    const stars = Math.floor(Math.random() * 5);
    const noStars = 5 - stars;
    const difficulty = Math.floor(Math.random() * 5) + 1;
    return {
      name: `Trail ${Math.floor(Math.random() * 100)}`,
      transport: tran,
      stars: ListFact.range(stars),
      nostars: ListFact.range(noStars),
      difficulty: ListFact.range(difficulty),
      length: (Math.floor(Math.random() * 5) + 2) * tran,
      progress: `${Math.floor(Math.random() * 100)}%`,
    };
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
