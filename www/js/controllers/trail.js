angular.module('breadcrumb')
.controller('TrailCtrl', function ($scope, $sce, ListFact) {
  console.log('trail cntrl');
  $scope.loading = null;

  $scope.page = {
    description: true,
    map: false,
    found: false,
    media: {},
    challenge: false,
  };

  $scope.bubbles = {
    top: '320px',
  };

  $scope.crumb = 0;

  $scope.crumbs = [];

  $scope.trail = ListFact.get().then((trails) => {
    console.log('hey');
    $scope.crumbs = trails[0].crumb;
    $scope.trail = trails[0];
    $scope.loading = { display: 'none' };
    $scope.crumbs.unshift({
      data: null,
      id: 31,
      trail_id: 14,
      order_number: 0,
      clue: 'Someone\'s Circle',
      description: 'A famous genera\'s statue, surrounded by controversy!',
      name: 'Lee\'s Circle',
      media_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '../img/breadfalls.gif',
      video: 'https://www.youtube.com/embed/ZuA6bPvHvwE',
      ar: null,
      audio: null,
    });
  });

  $scope.video = () => $sce.trustAsResourceUrl($scope.crumbs[$scope.crumb].video);

  $scope.switch = (type) => {
    switch (type) {
      case 'description':
        $scope.page.description = false;
        $scope.page.found = true;
        break;
      case 'next':
        $scope.crumb += 1;
        $scope.page.found = false;
        $scope.page.description = true;
        $scope.page.media.show = false;
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
