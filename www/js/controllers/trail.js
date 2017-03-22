angular.module('breadcrumb')
.controller('TrailCtrl', function ($scope, $sce, $rootScope, ListFact, Geofence, $ionicLoading) {
  $scope.loading = null;

  $scope.page = {
    description: true,
    map: false,
    found: false,
    media: {},
    challenge: false,
    finish: false,
  };

  $scope.bubbles = {
    top: '320px',
  };

  $scope.crumb = 0;

  $scope.crumbs = [];

  $scope.trail = ListFact.get('id').then((trails) => {
    console.log(trails[0].crumb.sort());
    $scope.trail = trails[0];
    $scope.crumbs = trails[0].crumb;
    Geofence.addOrUpdate($scope.crumbs[0]);
    $scope.loading = { display: 'none' };
    // $scope.crumbs.unshift({
    //   data: null,
    //   id: 31,
    //   trail_id: 14,
    //   order_number: 0,
    //   clue: 'Someone\'s Circle',
    //   description: 'A famous genera\'s statue, surrounded by controversy!',
    //   name: 'Lee\'s Circle',
    // media_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //   image: 'http://res.cloudinary.com/realdeal/image/upload/v1490205277/breadfalls_cnvvbe.gif',
    //   video: 'https://www.youtube.com/embed/ZuA6bPvHvwE',
    //   ar: null,
    //   audio: null,
    // });
  });

  $scope.video = () => $sce.trustAsResourceUrl($scope.crumbs[$scope.crumb].video);

  $rootScope.$watch('pinged', () => {
    if ($rootScope.pinged) {
      $scope.switch('found');
    }
  });

  $scope.switch = (type) => {
    switch (type) {
      case 'description':
        $scope.page.description = false;
        $scope.page.found = true;
        break;
      case 'found':
        $scope.page.found = true;
        break;
      case 'next':
        $scope.crumb += 1;
        $rootScope.pinged = false;
        Geofence.removeAll();
        if ($scope.crumb === $scope.crumbs.length) {
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.page.finish = true;
        } else {
          Geofence.addOrUpdate($scope.crumbs[$scope.crumb]);
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.page.description = true;
        }
        break;
      default: $scope.page.description = true;
    }
  };

  $scope.media = (type) => {
    $scope.bubbles = {
      top: '0px',
    };
    $scope.page.media = {
      show: true,
      image: false,
      ar: false,
      audio: false,
      video: false,
      text: false,
    };
    $scope.page.media[type] = true;
  };
});
