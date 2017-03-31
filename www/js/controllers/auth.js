angular.module('breadcrumb')
.controller('AuthCtrl', function ($scope, store, getUpdateUserFact, Data) {
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
    console.log('CALLED');
    const profile = store.get('profile');
    const info = {};
    // if ($scope.creds.email) {
    //   info.email = $scope.creds.email;
    // }
    // if ($scope.creds.username) {
    //   info.username = $scope.creds.username;
    // }
    Object.entries($scope.creds).forEach((pair) => {
      if (pair[1] !== undefined) {
        info[pair[0]] = pair[1];
      }
    });
    console.log(info);
    getUpdateUserFact(profile, info, deleteAccount);
  };

  $scope.child1 = Data.child();
  $scope.child2 = Data.child();
});
