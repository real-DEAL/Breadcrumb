angular.module('ionic-geofence').factory('Directions', function ($http) {
  // This google directions service is responsbile
  // for exchanging a location/address as a string
  // for an object of directions, duration, distance
  // from Google API Service.
  // This object is then stored on the database as an object
  // so that it can be generated onto a map so that
  // users can view the path that they are about to take.
  const API_KEY = 'AIzaSyCHft9iNvL1izkhggFDTKVckFWW-_s2nDM';
  const directionsUrl = 'http://maps.googleapis.com/maps/api/directions/json?origin=759thAve,New York, NY&destination=MetLife Stadium Dr East Rutherford, NJ 07073&mode=driving';
  // const directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json';
  const fetchDirections = (steps) => { //or array of crumbs
    // console.log(directionsUrl);
    // $http.get(directionsUrl)
    //   .then(val => console.log(val, 'success'))
    //   .catch(err => console.error(err, 'error'))
    return $http({
      method: 'GET',
      url: directionsUrl,
      // data: {
      //   origin: steps[0],
      //   destination: steps[steps.length - 1],
      //   waypoints: steps.slice(1, steps.length - 1),
      // },
      // key: API_KEY,
    })
    .then(res => res.data);
  };

  const fetchStaticMap = (steps) => { //or array of crumbs
    // loop through the steps to make an output like this
    // how to make it based on the length???
    const convertSteps = steps => {
      steps = `${long},${lat}|${long},${lat}|${long},${lat}|${long},${lat}|${long},${lat}`;
    };
    const staticUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const size = '400x400';
    const path = `color${color}:|weight:${weight}|${convertSteps(steps)}|&sensor=false`;
    const color = '0x0000ff';
    const weight = 5;

    return $http({
      method: 'GET',
      url: staticUrl,
      data: {
        size,
        path,
      },
      key: API_KEY,
    })
    .then(res => res.data);
  };
  return {
    fetchStaticMap,
    fetchDirections,
  };
});
