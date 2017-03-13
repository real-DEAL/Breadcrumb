angular.module('ionic-geofence').factory('GeofencePluginMock', function ($q, $log) {
  return {
    addOrUpdate: (fences) => {
      const deffered = $q.defer();

      $log.log('Mocked geofence plugin addOrUpdate', fences);
      deffered.resolve();

      return deffered.promise;
    },
    remove: (ids) => {
      const deffered = $q.defer();

      $log.log('Mocked geofence plugin remove', ids);
      deffered.resolve();

      return deffered.promise;
    },
    removeAll: () => {
      const deffered = $q.defer();

      $log.log('Mocked geofence plugin removeAll');
      deffered.resolve();

      return deffered.promise;
    },
    initialize: () => {},
    receiveTransition: () => {},
    TransitionType: {
      ENTER: 1,
      EXIT: 2,
      BOTH: 3,
    },
  };
});
