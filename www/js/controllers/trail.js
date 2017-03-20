/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('TrailCtrl', function ($scope, $state, ListFact) {
  $scope.specificTransport = false;
  $scope.loading = null;

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
      height: '650px',
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

// TODO: splice deleted trail from dashboard display
  $scope.delete = (trail, index) => {
    $scope.trails.splice(index, 1);
    ListFact.del(trail);
  };

  $scope.filter = (type, value) => {
    $scope.loading = null;
    $scope.trails = ListFact.filter($scope.trails, type, value);
    $scope.loading = { display: 'none' };
    if (type === 'transport') $scope.specificTransport = true;
  };

  $scope.reset = () => {
    $scope.loading = null;
    $scope.specificTransport = false;
    $scope.trails = ListFact.filter($scope.trailsCache, 'name');
    $scope.loading = { display: 'none' };
  };

  $scope.trailsCache = ListFact.get().then((trails) => {
    $scope.trails = ListFact.filter(trails, 'name');
    $scope.loading = { display: 'none' };
    $scope.trailsCache = ListFact.filter(trails, 'name');
  });

  $scope.trails = null;

  // SEARCH

  $scope.search = {
    username: null,
    trailName: null,
    trailLength: 'Any',
    transport: 'Any',
    rating: 'Any',
    difficulty: 'Any',
  };

  $scope.searchFilter = (request) => {
    ListFact.get(request);
    $state.go('app.dashboard');
  };
});
