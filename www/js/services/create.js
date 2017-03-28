angular.module('breadcrumb').factory('Trail', function ($http, store) {
  const submitTrail = (trail, crumbs) => {
    const length = trail.length.replace(/\D/g, '');
    if (!trail.transport) {
      trail.transport = 'WALKING';
      if (length > 5) {
        trail.transport = 'BICYCLING';
      } else if (length > 20) {
        trail.transport = 'DRIVING';
      }
    }
    if (!trail.difficulty) {
      trail.difficulty = 1;
      if (length > 5) {
        trail.difficulty = 2;
      } else if (length > 20) {
        trail.difficulty = 3;
      }
    }
    trail.crumbs = crumbs;
    return $http({
      method: 'POST',
      // url: `http://54.203.104.113/trails?access_token=${store.get('access_token')}`,
      url: `http://192.168.99.100:3000/trails?access_token=${store.get('access_token')}`,
      header: {
        'Access-Control-Allow-Origin': '*',
      },
      data: trail,
      json: true,
    })
    .then(response => response)
    .catch(err => err);
  };
  return {
    submit: submitTrail,
  };
});
