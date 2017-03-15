angular.module('breadcrumb').controller('GeofencesCtrl', function (
/* eslint no-param-reassign: ["error", { "props": false }]*/
/* global someFunction google:true, angular:true, window:true*/
  $scope,
  $ionicActionSheet,
  $timeout,
  $log,
  $state,
  Geolocation,
  Geofence,
  $ionicLoading
) {
  $ionicLoading.show({ template: 'Getting geofences from device...', duration: 5000 });
  // var directionsDisplay = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  $scope.geofences = [];
  Geofence.getAll().then((geofences) => {
    $ionicLoading.hide();
    $scope.geofences = geofences;
  }, (reason) => {
    $ionicLoading.hide();
    $log.error('An Error has occured', reason);
  });

  $scope.createNew = () => {
    $log.log('Obtaining current location...');
    $ionicLoading.show({ template: 'Obtaining current location...', hideOnStateChange: true });

    Geolocation.getCurrentPosition().then((position) => {
      $log.log('sup');
      $log.info('Current position found', position);

      $state.go('app.geofence-new', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, (reason) => {
      $log.error('Cannot obtain current location', reason);
      $ionicLoading.show({ template: 'Cannot obtain current location', duration: 1500 });
    });
  };

  $scope.editGeofence = (geofence) => {
    $state.go('geofence-edit', { geofenceId: geofence.id });
  };

  $scope.removeGeofence = (geofence) => {
    Geofence.remove(geofence);
  };

  $scope.more = () => {
      // Show the action sheet
    $ionicActionSheet.show({
      titleText: 'More options',
      buttons: [
        {
          text: "<i class='icon ion-checkmark-circled'></i> Test application",
        },
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete all geofences",
      cancelText: "<i class='icon ion-android-cancel'></i> Cancel",
      destructiveButtonClicked: () => {
        Geofence.removeAll();
        return true;
      },
      buttonClicked: () => {
        window.location.href = 'cdvtests/index.html';
      },
    });
  };

  $scope.directions = {
    origin: '35 Madewood Dr, Marrero, LA 70072',
    waypoints: ['5727 Brighton Pl, New Orleans, LA 70131'],
    destination: '748 Camp St, New Orleans, LA 70130',
    showList: false,
  };
  const computeTotalDistance = (response) => {
    let total = 0;
    const myRoute = response.routes[0];
    myRoute.legs.forEach((leg) => { total += leg.distance.value; });
    total /= 1000;
    console.warn(total, 'km total');
  };
  const totalMiles = (response) => {
    const myRoute = response.routes[0].legs[0].distance.text;
      console.warn(myRoute);
  };
  const computeTotalDuration = (response) => {
    // let total = 0;
    const myRoute = response.routes[0].legs[0].duration.text;
    // myRoute.legs.forEach((leg) => { total += leg.duration.value; });
    console.warn(myRoute, 'mins total');
  };
  const arrayPathAddOn = (response) => {
    let res = '';
    const myRoute = response.routes[0];
    res = myRoute.overview_polyline;
    return res;
  };
  const url = 'http://maps.googleapis.com/maps/api/staticmap?size=400x400&path=enc:';
  $scope.addPath = () => {
    const request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    };
    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        computeTotalDistance(response);
        computeTotalDuration(response);
        totalMiles(response);
        arrayPathAddOn(response);
        console.warn(`${url}${arrayPathAddOn(response)}`);
      } else {
        console.warn('Google route unsuccessful!');
      }
    });
  };
});
