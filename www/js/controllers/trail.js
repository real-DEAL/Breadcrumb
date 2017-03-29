angular.module('breadcrumb')
.controller('TrailCtrl', function ($scope, $sce, $state, $rootScope, store, Data, Style, ListFact, Geofence, AugRealFact) {
  $scope.loading = null;

  $scope.opacity = true;

  $scope.trailID = null;

  $scope.leaving = null;

  $scope.savedID = null;

  $scope.leave = () => {
    $scope.leaving = !$scope.leaving;
  };

  $scope.quit = () => {
    $state.go('app.dashboard');
  };

  $scope.save = (input) => {
    const user = store.get('user').id;
    const id = $scope.savedID;
    const update = input || { position: $scope.crumb };
    ListFact.updateSaved(user, id, update);
  };

  $scope.saveQuit = () => {
    $scope.save();
    $scope.quit();
  };

  $scope.page = {
    description: true,
    map: false,
    found: false,
    media: {},
    challenge: false,
    finish: false,
  };

  $scope.bubbles = Style.bubbleDown;

  $scope.crumb = 0;

  $scope.crumbs = [];

  $scope.video = () => $sce.trustAsResourceUrl($scope.crumbs[$scope.crumb].video.replace('watch?v=', 'embed/'));

  $scope.startTrail = () => {
    $scope.loading = null;
    ListFact.get('id').then((trails) => {
      $scope.trail = trails[0];
      ListFact.getSaved(store.get('user').id, $scope.trail.id)
      .then((data) => {
        $scope.savedID = data.id;
        $scope.crumbs = trails[0].crumb;
        $scope.crumb = data.position || 0;
        console.log('Current crumb number is', $scope.crumb);
        $scope.trailID = $rootScope.trailID;
        $scope.loading = { display: 'none' };
      });
    });
  };

  $scope.finishTrail = () => {
    $scope.crumb = 0;
    const updates = {
      position: $scope.crumb,
      time_finished: new Date(),
    };
    $scope.save(updates);
  };

  $scope.trail = $scope.startTrail();

  $rootScope.$watch('trailID', () => {
    if ($rootScope.trailID !== $scope.trailID) {
      $scope.startTrail();
    }
  });

  $scope.switch = (type) => {
    switch (type) {
      case 'description':
        $scope.page.description = false;
        $scope.page.found = true;
        Geofence.addOrUpdate($scope.crumbs[$scope.crumb]);
        break;
      case 'found':
        $scope.page.found = true;
        $scope.page.description = false;
        break;
      case 'next':
        $scope.crumb += 1;
        $rootScope.pinged = false;
        Geofence.removeAll();
        if ($scope.crumb > $scope.crumbs.length) {
          $scope.crumb = 0;
        }
        if ($scope.crumb === $scope.crumbs.length) {
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.bubbles = Style.bubbleDown;
          $scope.page.finish = true;
          $scope.finishTrail();
        } else {
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.bubbles = Style.bubbleDown;
          $scope.page.description = true;
          $scope.save();
        }
        break;
      default: $scope.page.description = true;
    }
  };

  $scope.startAR = () => {
    AugRealFact.startAR();
    $scope.media('ar');
    $scope.opacity = false;
    $rootScope.toggleSide = false;
  };

  $scope.stopAR = () => {
    $scope.media('show');
    $scope.opacity = true;
    $rootScope.toggleSide = true;
    AugRealFact.stopAR();
  };

  $rootScope.$watch('pinged', () => {
    if ($rootScope.pinged) {
      $scope.switch('found');
    }
  });

  $scope.rating = Data.rating();

  $scope.ratingToggle = (value) => {
    $scope.rating = Data.fillIcons('rating', value);
    $scope.postTrail.rating = value + 1;
  };

  $scope.postTrail = {
    rating: null,
  };

  $scope.media = (type) => {
    $scope.bubbles = Style.bubbleUp;
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

  $scope.submit = () => {
    if ($scope.postTrail.rating) {
      ListFact.get('id')
      .then((data) => {
        const updates = {
          rating: data[0].rating + $scope.postTrail.rating,
          ratings: data[0].ratings + 5,
        };
        ListFact.update($scope.trail.id, updates);
      });
    }
  };
});
