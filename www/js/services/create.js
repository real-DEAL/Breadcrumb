/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
/* eslint camelcase: "off" */

angular.module('breadcrumb').factory('Trail', function ($http) {
  const submitTrail = (trail, crumbs) => {
    const length = trail.length.replace(/\D/g, '');
    console.log(length, trail.transport);
    if (!trail.transport) {
      console.log(length, length < 6);
      console.log(length, length > 5);
      if (length < 6) {
        trail.transport = 'WALKING';
      }
      if (length > 5) {
        trail.transport = 'BICYCLING';
      }
      if (length > 20) {
        trail.transport = 'DRIVING';
      }
    }
    console.log(trail.transport);
    if (!trail.difficulty) {
      trail.difficulty = 1;
      if (length > 5) {
        trail.difficulty = 2;
      } else if (length > 20) {
        trail.difficulty = 3;
      }
    }
    console.log(trail);
    return $http({
      method: 'POST',
      url: 'http://192.168.99.100/trails',
      data: trail,
      json: true,
    })
    .then((response) => {
      const trail_id = response.data.data[0].id;
      crumbs.forEach((crumb, index) => {
        crumb.trail_id = trail_id;
        crumb.order_number = index + 1;
        return $http({
          method: 'POST',
          url: 'http://192.168.99.100/crumbs',
          data: crumb,
          json: true,
        });
      });
    });
  };

  return {
    submit: submitTrail,
  };
});
