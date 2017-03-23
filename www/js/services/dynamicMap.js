const bread = angular.module('breadcrumb');
bread.factory('DynamicMap', function ($scope, $cordovaGeolocation) {
  const latLng = new google.maps.LatLng(43.07493, -89.381388);
  // TODO: connect $scope.location to make the LatLng and see if it will show up
  // TODO: also fix the buttons for Add Crumb for underneath the map
  const mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
});
