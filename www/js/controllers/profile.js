/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */

angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact, Data) {
  $scope.user = JSON.parse(localStorage.user);

  $scope.userPic = {
    'background-image': `url('${$scope.user.profile_picture}')`,
    'background-position': 'center',
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
