angular.module('breadcrumb')
.controller('AuthCtrl', function ($scope, store, getUpdateUserFact) {
  $scope.test = input => console.warn(input);

  $scope.askIfYouAreSure = () => {
    $scope.areYouSure = !$scope.areYouSure;
  };
  $scope.areYouSure = true;

  $scope.emailInStore = () => {
    const email = store.get('email');
    if (email) {
      return true;
    }
    return false;
  };

  $scope.creds = {};
  $scope.updateUser = (deleteAccount) => {
    const profile = store.get('profile');
    const email = store.get('email');
    if (!$scope.creds.email) {
      $scope.creds.email = email;
    }
    getUpdateUserFact(profile, {
      username: $scope.creds.username,
      email: $scope.creds.email,
    }, deleteAccount);
  };
});
