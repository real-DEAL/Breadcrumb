angular.module('breadcrumb')
.factory('TrailMapFact', function (store) {
  return () => {
    const dest = store.get('geofences')[0];
    launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, (isAvailable) => {
      let app = '';
      if (isAvailable) {
        app = launchnavigator.APP.GOOGLE_MAPS;
      } else {
        console.warn('Google Maps not available - falling back to user selection');
        app = launchnavigator.APP.USER_SELECT;
      }
      launchnavigator.navigate([dest.latitude, dest.longitude], {
        app,
      });
    });
  };
});
