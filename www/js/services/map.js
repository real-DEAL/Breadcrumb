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
        location: new google.maps.LatLng(point.latitude, point.longitude),
        stopover: true,
      };
      arr.push(obj);
    });

    return arr;
  };

  const addPath = (directions, transport) => {
    console.warn(transport, 'transport');
    let obj = {};
    const end = directions.length - 2;
    const request = {
      origin: new google.maps.LatLng(directions[0].latitude, directions[0].longitude),
      destination: new google.maps.LatLng(directions[end].latitude, directions[end].longitude),
      waypoints: wayPointsMakers(directions),
      travelMode: google.maps.DirectionsTravelMode[transport],
    };
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
