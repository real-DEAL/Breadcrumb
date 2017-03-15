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
    total /= 1000;
    return total;
    console.warn(total, 'km total');
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
  // let directions = {
  //   origin: '35 Madewood Dr, Marrero, LA 70072',
  //   waypoints: ['5727 Brighton Pl, New Orleans, LA 70131'],
  //   destination: '748 Camp St, New Orleans, LA 70130',
  //   showList: false,
  // };
  const url = 'http://maps.googleapis.com/maps/api/staticmap?size=200x200&path=enc:';
  const addPath = (directions) => {
    console.log('add path called')
    console.log(directions, 'directions array')
    console.log(directions[0].location, 'first crumb')
    console.log(directions[directions.length - 2].location, 'last crumb')
    console.log(directions[directions.length - 2], 'last crumb obj')
    let obj = {};

    // directions = [{location: ''}, {location: ''}]
    const request = {
      origin: directions[0].location,
      // waypoints: directions.slice(1, directions.length - 1).location,
      destination: directions[directions.length - 2].location,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    };
    return new Promise(function(resolve, reject) {
      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          arrayPathAddOn(response);
          console.warn(`${url}${arrayPathAddOn(response)}`);
          obj = {
            image: `${url}${arrayPathAddOn(response)}`,
            miles: totalMiles(response),
            km: computeTotalDistance(response),
            duration: computeTotalDuration(response),
          };
          resolve(obj)
        } else {
          console.warn('Fetch failed');
          reject('failed')
        }
        console.log(obj, 'obj')
        return obj;
      });
    });

    // .then(res => res);
    return obj;
  };
  return {
    trailFactory,
    addPath,
  };
});
