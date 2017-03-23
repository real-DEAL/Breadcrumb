angular.module('breadcrumb').factory('Geolocation', function ($q, $interval) {
  let currentPositionCache = null;

  return {
    getCurrentPosition() {
      if (!currentPositionCache) {
        const deffered = $q.defer();

        navigator.geolocation.getCurrentPosition((position) => {
          deffered.resolve(currentPositionCache = position);
          $interval(() => {
            currentPositionCache = undefined;
          }, 10000, 1);
        }, (error) => {
          deffered.reject(error);
        }, { timeout: 10000, enableHighAccuracy: true });

        return deffered.promise;
      }

      return $q.when(currentPositionCache);
    },
  };
});
