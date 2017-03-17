/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */

angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact, Data) {
  $scope.user = JSON.parse(localStorage.profile);

  $scope.userPic = {
    'background-image': `url('${$scope.user.picture}')`,
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
