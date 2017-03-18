/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
  // const options = {timeout: 10000, enableHighAccuracy: true};

  // $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    // var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  const latLng = new google.maps.LatLng(43.07493, -89.381388);

  const mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // }, function(error){
  //   console.log("Could not get location");
  // });
});
