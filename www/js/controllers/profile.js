angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact, UserFact, Data, Style, store) {
  $scope.loading = null;

  $scope.user = store.get('user');

  const populateUserTrails = () => {
    ListFact.get({ user_id: $scope.user.id })
    .then((trails) => {
      $scope.userTrails.push(trails[0]);
      $scope.userTrails.push(trails[1]);
      $scope.userTrails.push(trails[2]);
    })
    .catch(err => console.error(err));
  };

  const populatePastTrails = () => {
    $scope.pastTrails.forEach((req, index) => {
      ListFact.get(req)
      .then((trails) => {
        $scope.pastTrails[index] = trails[0];
      });
    });
    $scope.loading = Style.displayNone;
  };

  const getTrails = () => {
    $scope.userTrails = [];
    $scope.pastTrails = [];
    UserFact.getUser($scope.user.username)
    .then((data) => {
      $scope.pastTrails.push(data.savedtrail[0]);
      $scope.pastTrails.push(data.savedtrail[1]);
      $scope.pastTrails.push(data.savedtrail[2]);
      ListFact.get({ id: data.current_trail })
      .then((trail) => {
        $scope.user.trail = trail[0];
      });
      populateUserTrails();
      populatePastTrails();
    });
  };

  const getUser = () => {
    UserFact.getUser($scope.user.username)
    .then((user) => {
      $scope.user = user;
      getTrails();
    });
  };

  $scope.userPic = {
    'background-image': `url('${store.get('user').profile_picture}')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  $scope.userTrails = [];

  $scope.pastTrails = [];

  $scope.$on('$ionicView.beforeEnter', () => {
    getUser();
  });
});
