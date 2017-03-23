/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */

angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact, Data, store) {
  $scope.user = store.get('user');
  // $scope.user.pic = JSON.parse(localStorage.profile).picture;

  $scope.userPic = {
    'background-image': `url('${JSON.parse(localStorage.profile).picture}')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  $scope.userTrails = [
    Data.trail(),
    Data.trail(),
    Data.trail(),
  ];

  $scope.pastTrails = [
    Data.trail(),
    Data.trail(),
    Data.trail(),
  ];
});
