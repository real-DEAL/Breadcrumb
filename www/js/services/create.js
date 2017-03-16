/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('Trail', function (
  $rootScope,
  $window,
  $q,
  $log,
  $ionicLoading
) {
  const trailFactory = {

  };
  const directionsService = new google.maps.DirectionsService();

  const computeTotalDistance = (response) => {
    let total = 0;
    const myRoute = response.routes[0];
    myRoute.legs.forEach((leg) => { total += leg.distance.value; });
    total /= 1000; // in km
    return total;
  };
  const totalMiles = (response) => {
    const myRoute = response.routes[0].legs[0].distance.text;
    console.warn(myRoute);
    return myRoute;
  };
  const computeTotalDuration = (response) => {
    const myRoute = response.routes[0].legs[0].duration.text;
    console.warn(myRoute, 'mins total');
    return myRoute;
  };
  const arrayPathAddOn = (response) => {
    let res = '';
    const myRoute = response.routes[0];
    res = myRoute.overview_polyline;
    return res;
  };
  const wayPointsMakers = (directions) => {
    const arr = [];
    const wypts = directions.slice(1, directions.length - 2);
    wypts.forEach((point) => {
      const obj = {
        location: '',
        stopover: true,
      };
      obj.location = point.location;
      arr.push(obj);
    });
    return arr;
  };

  const url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x200&path=enc:';
  const addPath = (directions, transport) => {
    let obj = {};
    const request = {
      origin: directions[0].location,
      waypoints: wayPointsMakers(directions),
      destination: directions[directions.length - 2].location,
      travelMode: google.maps.DirectionsTravelMode[transport],
    };
    return new Promise(function (resolve, reject) {
      directionsService.route(request, (response, status) => {
        console.warn(request, 'request');
        if (status === google.maps.DirectionsStatus.OK) {
          arrayPathAddOn(response);
          console.warn(`${url}${arrayPathAddOn(response)}`);
          obj = {
            image: `${url}${arrayPathAddOn(response)}`,
            miles: totalMiles(response),
            km: computeTotalDistance(response),
            time: computeTotalDuration(response),
          };
          resolve(obj);
        } else {
          console.warn('Fetch failed');
          reject('failed');
        }
        console.warn(obj, 'obj');
        return obj;
      });
    });
  };
  return {
    trailFactory,
    addPath,
  };
});
