angular.module('breadcrumb').factory('Map', function () {
  const directionsService = new google.maps.DirectionsService();

  const url = 'http://maps.googleapis.com/maps/api/staticmap?size=355x250&path=enc:';

  const computeTotalDistance = (response) => {
    let total = 0;
    const myRoute = response.routes[0];
    myRoute.legs.forEach((leg) => { total += leg.distance.value; });
    total /= 1000; // in km
    return total;
  };

  const totalMiles = (response) => {
    const myRoute = response.routes[0].legs[0].distance.text;
    return myRoute;
  };

  const computeTotalDuration = (response) => {
    const myRoute = response.routes[0].legs[0].duration.text;
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
      obj.location = point.address;
      arr.push(obj);
    });
    return arr;
  };

  const addPath = (directions) => {
    console.warn(directions, 'the directions added from Add()')
    let obj = {};
    const end = directions.length - 2;
    // const a = new google.maps.LatLng(directions[0].latitude, directions[0].longitude);
    // const a = new google.maps.LatLng(29.949840396909128, -100.0719690322876);
    const a = 'Chicago, IL';
    const b = 'Los Angeles, CA';
    // const a = {lat: 29.949840396909128, lng: -90.0719690322876};
    // const b = new google.maps.LatLng(directions[end].latitude, directions[end].longitude);
    // const b = new google.maps.LatLng(29.94757211353841, -90.0794792175293);

    // const b = {lat: 29.94757211353841, lng: -90.0794792175293};
    // console.warn(a, b, 'a,b', directions[0], 'whats wrong with the directions');

    // _.C {}lat: ()lng: ()__proto__: Object
    const request = {
      // origin: new google.maps.LatLng(29.951065, -90.071533),
      // destination: new google.maps.LatLng(40.730610, -73.935242),
      origin: new google.maps.LatLng(directions[0].latitude, directions[0].longitude),
      destination: new google.maps.LatLng(directions[directions.length - 2].latitude, directions[directions.length - 2].longitude),
      // origin: directions[0].address,
//       origin: new google.maps.LatLng(
// 29.949840396909128, -90.0719690322876),
// destination: new google.maps.LatLng(
// 29.94757211353841, -90.0794792175293),
      // waypoints: wayPointsMakers(directions),
      // destination: directions[directions.length - 2].address,
      // destination: new google.maps.LatLng(51.2244, -13.12221),
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    };
    console.warn(request, 'request')
    return new Promise(function (resolve, reject) {
      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          arrayPathAddOn(response);
          obj = {
            image: `${url}${arrayPathAddOn(response)}`,
            miles: totalMiles(response),
            km: computeTotalDistance(response),
            time: computeTotalDuration(response),
          };
          resolve(obj);
        } else {
          reject(status);
        }
        return obj;
      });
    });
  };
  return {
    add: addPath,
  };
});
