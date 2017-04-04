angular.module('breadcrumb').factory('Geofence', function (
  $rootScope,
  $window,
  $q,
  $log,
  $ionicLoading
) {
  const geofenceService = {
    _geofences: [],
    _geofencesPromise: null,

    loadFromLocalStorage() {
      const result = localStorage.geofences;
      let geofences = [];

      if (result) {
        try {
          geofences = angular.fromJson(result);
        } catch (ex) {
          console.error(ex);
        }
      }
      this._geofences = geofences;

      return $q.when(this._geofences);
    },

    saveToLocalStorage() {
      localStorage.geofences = angular.toJson(this._geofences);
    },

    loadFromDevice() {
      const self = this;

      if ($window.geofence && $window.geofence.getWatched) {
        return $window.geofence.getWatched().then((geofencesJson) => {
          self._geofences = angular.fromJson(geofencesJson);
          return self._geofences;
        });
      }

      return this.loadFromLocalStorage();
    },

    addOrUpdate(crumb) {
      const self = this;
      const geofence = {
        id: crumb.id,
        latitude: Number(crumb.latitude),
        longitude: Number(crumb.longitude),
        radius: 100,
        transitionType: 1,
        notification: {
          id: this.getNextNotificationId(),
          title: crumb.title,
          text: crumb.name,
          icon: crumb.icon,
          openAppOnClick: true,
        },
      };

      return $window.geofence.addOrUpdate(geofence).then(() => {
        const searched = self.findById(geofence.id);

        if (!searched) {
          self._geofences.push(geofence);
        } else {
          const index = self._geofences.indexOf(searched);

          self._geofences[index] = geofence;
        }

        self.saveToLocalStorage();
      });
    },

    findById(id) {
      const geoFences = this._geofences.filter(g => g.id === id);

      if (geoFences.length > 0) {
        return geoFences[0];
      }

      return undefined;
    },

    removeAll() {
      const self = this;

      $ionicLoading.show({
        template: 'Removing all geofences...',
      });
      $window.geofence.removeAll().then(function () {
        $ionicLoading.hide();
        self._geofences.length = 0;
        self.saveToLocalStorage();
      }, (reason) => {
        $log.error('Error while removing all geofences', reason);
        $ionicLoading.show({
          template: 'Error',
          duration: 1500,
        });
      });
    },

    getNextNotificationId() {
      let max = 0;

      this._geofences.forEach(function (gf) {
        if (gf.notification && gf.notification.id) {
          if (gf.notification.id > max) {
            max = gf.notification.id;
          }
        }
      });

      return max + 1;
    },
  };

  return geofenceService;
});
