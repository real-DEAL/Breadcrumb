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
    ListFact.get()
    .then((trails) => {
      $scope.pastTrails.push(trails[0]);
      $scope.pastTrails.push(trails[1]);
      $scope.pastTrails.push(trails[2]);
      $scope.loading = Style.displayNone;
    });
  };

  $scope.userPic = {
    'background-image': `url('${store.get('user').profile_picture}')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  $scope.userTrails = [];

  $scope.pastTrails = [];

  populateUserTrails();
  populatePastTrails();
});
