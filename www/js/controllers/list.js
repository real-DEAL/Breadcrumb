/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('ListCtrl', function ($scope, ListFact) {

  $scope.specificTransport = false;

  $scope.trail = {
    name: 'My first trail',
    transport: 2,
    rating: 3,
    difficulty: 3,
    length: 25,
    progress: 50,
    style: ListFact.close,
  };

  $scope.toggle = index => (
    $scope.trails[index].style.height === '95px' ?
    $scope.open(index) :
    $scope.close(index)
  );

  $scope.open = (index) => {
    $scope.trails[index].style = {
      height: '575px',
      overflow: 'hidden',
      'transition-duration': '250ms',
    };
    $scope.trails.forEach((trail, place) => {
      if (place !== index) {
        $scope.close(place);
      }
    });
  };

  $scope.close = (index) => {
    $scope.trails[index].style = ListFact.close;
  };

  $scope.filter = (type, value) => {
    $scope.trails = ListFact.filter($scope.trails, type, value);
    if (type === 'transport') $scope.specificTransport = true;
  };

  $scope.reset = () => {
    $scope.specificTransport = false;
    $scope.trails = ListFact.filter($scope.trailsCache, 'name');
  };

  $scope.trailsCache = ListFact.get().then((trails) => {
    $scope.trails = ListFact.filter(trails, 'name');
  });

  $scope.trails = null;
});
