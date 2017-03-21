/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('TrailCtrl', function ($scope, $sce, ListFact) {
  $scope.loading = null;

  $scope.page = {
    description: true,
    map: false,
    found: false,
    media: {},
    challenge: false,
  };

  $scope.now = {
    image: 1,
    text: 1,
    ar: 0,
    video: 0,
    audio: 1,
  };

  $scope.bubbles = {
    top: '320px',
  };

  $scope.crumb = 0;

  $scope.crumbs = [];

  $scope.trail = ListFact.get().then((trails) => {
    $scope.crumbs = trails[0].crumb;
    $scope.trail = trails[0];
    $scope.loading = { display: 'none' };
    $scope.crumbs.unshift({
      data: null,
      description: 'Check out the awesome grafitti near here!',
      id: 31,
      image: '../img/breadfalls.gif',
      latitude: null,
      longitude: null,
      name: null,
      notification_id: null,
      open_app_on_click: null,
      order_number: 0,
      radius: null,
      small_icon: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      title: null,
      trail_id: 14,
      vibration: null,
      video: 'https://www.youtube.com/embed/ZuA6bPvHvwE',
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
