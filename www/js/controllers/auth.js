/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('AuthCtrl', function ($scope, store, getUpdateUserFact) {
  // $scope.user = {
  //   name: 'NAME',
  //   score: 500,
  //   finishedTrails: 0,
  //   totalTime: 0,
  //   trail: 'Trail name goes here',
  // };
  //
  // $scope.exampleTrail = {
  //   name: 'My first trail',
  //   rating: 5,
  //   difficulty: 3,
  //   length: 25,
  //   progress: '50%',
  // };
  //
  // $scope.trails = [
  //   $scope.exampleTrail,
  //   $scope.exampleTrail,
  //   $scope.exampleTrail,
  // ];

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
    getUpdateUserFact(profile.user_id, {
      username: $scope.creds.username,
      email: $scope.creds.email,
    });
  };
});
