angular.module('breadcrumb')
.controller('AuthCtrl', function ($scope, store, getUpdateUserFact) {
  $scope.test = input => console.warn(input);

  $scope.emailInStore = () => {
    const profile = store.get('profile');
    if (profile.email) {
      return true;
    }
    return false;
  };

  $scope.creds = {};
  $scope.updateUser = () => {
    const profile = store.get('profile');
    if (!$scope.creds.email) {
      $scope.creds.email = profile.email;
    }
    getUpdateUserFact(profile, {
      username: $scope.creds.username,
      email: $scope.creds.email,
    });
  };
});
