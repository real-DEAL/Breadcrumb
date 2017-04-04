angular.module('breadcrumb')
.controller('TrailCtrl', function (
  $scope,
  $sce,
  $state,
  $rootScope,
  store,
  Data,
  Style,
  ListFact,
  UserFact,
  Geofence,
  AugRealFact,
  TrailMapFact
) {
  $scope.loading = null;

  $scope.opacity = true;

  $scope.trailID = null;

  $scope.leaving = null;

  $scope.savedID = null;

  $scope.leave = () => {
    $scope.leaving = !$scope.leaving;
  };

  $scope.quit = () => {
    store.remove('geofences');
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
        $scope.score = $scope.trail.difficulty.length * 5 * $scope.crumbs.length;
        $scope.crumb = data.position;
        Geofence.removeAll();
        Geofence.addOrUpdate($scope.crumbs[$scope.crumb]);
        $scope.loading = { display: 'none' };
        UserFact.updateUser(store.get('user').id, { current_trail: $scope.trail.id });
      });
    });
  };

  $scope.finishTrail = () => {
    $scope.crumb = 0;
    const updates = {
      position: $scope.crumb,
      time_finished: new Date(),
    };
    UserFact.getUser(store.get('user').username)
    .then((data) => {
      const newScore = data.score + $scope.score;
      const newTrailCount = (data.total_completed || 0) + 1;
      UserFact.updateUser(data.id, {
        score: newScore,
        total_completed: newTrailCount,
      });
      $scope.save(updates);
    });
  };

  $scope.trail = null;

  $scope.switch = (type) => {
    switch (type) {
      case 'description':
        // $scope.page.description = false;
        // $scope.page.found = true;
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
          Geofence.addOrUpdate($scope.crumbs[$scope.crumb]);
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.bubbles = Style.bubbleDown;
          $scope.page.description = true;
          // $scope.save();
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

  $scope.callMap = () => {
    $scope.switch('description');
    TrailMapFact();
  };

  $scope.submit = () => {
    if ($scope.postTrail.rating) {
      ListFact.get('id')
      .then((data) => {
        const updates = {
          rating: data[0].rating + $scope.postTrail.rating,
          max_rating: (data[0].max_rating || 0) + 5,
        };
        ListFact.update($scope.trail.id, updates);
      });
    }
  };

  $scope.$on('$ionicView.beforeEnter', () => {
    $scope.startTrail();
  });
});
