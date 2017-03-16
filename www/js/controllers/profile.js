/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact) {
  $scope.user = {
    name: 'NAME',
    picture: '',
    score: 500,
    finishedTrails: 3,
    totalTime: 0,
    trail: {
      name: `My ${Math.floor(Math.random() * 100)}th trail`,
      stars: ListFact.range(4),
      emptyStars: ListFact.range(1),
      progress: `${Math.floor(Math.random() * 100)}%`,
    },
  };

  $scope.userTrails = [
    ListFact.trail(),
    ListFact.trail(),
    ListFact.trail(),
  ];

  $scope.pastTrails = [
    ListFact.trail(),
    ListFact.trail(),
    ListFact.trail(),
  ];
});
