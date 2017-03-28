angular.module('breadcrumb')
  .controller('MapCtrl', function ($scope) {
    $scope.location = {
      x: 43.07493,
      y: -89.381388,
    };
    const latLng = new google.maps.LatLng($scope.location.x, $scope.location.y);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  });
