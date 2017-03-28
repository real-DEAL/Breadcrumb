angular.module('breadcrumb')
.controller('TrailMapCtrl', function ($scope) {
  // TODO: show where you are -- test on Android in regards to autoDiscover
  // TODO: give directions to the next crumb from where you are
      // retrieve from Database the next crumb based on which trail you're on
      // then do a Google API call to show you how to get to the next area
  // TODO: show the current address in words

  // sample route
  // route 1: current location -- 348 Camp St -- use coordinates
  // route 2: Cafe Du Monde -- coordinates
// how will it be retrieved from the Database
  // ListFact -- do this later

  $scope.pointA = {
    latitude: 29.12123143,
    longitude: -90.23423423,
  };
  $scope.pointB = {
    latitude: 29.12123123,
    longitude: -90.23423443,
  };
  $scope.trail = [];

  // $scope.initialize = () => {
  //   $scope.trail.push($scope.pointA, $scope.pointB);
  //   console.warn($scope.trail);
  //   MapDirections.add($scope.trail)
  //   .then((data) => {
  //     console.warn(data, 'data');
  //     // $scope.loading = { display: 'none' };
  //     // $scope.trail.map = data.image;
  //     // $scope.trail.time = data.time;
  //     // $scope.trail.length = data.miles;
  //     // $scope.$apply();
  //   });
  // };
  // google.maps.event.addDomListener(window, 'load', function () {
  //   new google.maps.places.SearchBox(document.getElementById('txtSource'));
  //   new google.maps.places.SearchBox(document.getElementById('txtDestination'));
  //   directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
  // });

  // $scope.initialize();
  if (window.Android) {
    angular.extend($scope, {
      center: {
        lat: 29.9511,
        lng: -90.0715,
        zoom: 15,
        autoDiscover: true,
      },
      events: {},
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            url: 'https://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
            type: 'xyz',
          },
        },
      },
      markers: {
        marker: {
          lat: 29.9511,
          lng: -90.0715,
          draggable: true,
        },
      },
      defaults: {
        scrollWheelZoom: false,
      },
    });
  } else {
    angular.extend($scope, {
      center: {
        lat: 29.9511,
        lng: -90.0715,
        zoom: 15,
        autoDiscover: false,
      },
      events: {
        map: {
          enable: ['zoomstart', 'drag', 'click', 'mousemove'],
          logic: 'emit',
        },
      },
      markers: {
        marker: {
          lat: 29.9511,
          lng: -90.0715,
          draggable: true,
        },
      },
      defaults: {
        scrollWheelZoom: false,
      },
    });
  }
  $scope.tiles = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  };
});
