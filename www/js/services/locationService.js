const bread = angular.module('breadcrumb');
bread.factory('LocationService', function ($q) {
  const autocompleteService = new google.maps.places.AutocompleteService();
  const detailsService = new google.maps.places.PlacesService(document.createElement('input'));
  return {
    searchAddress: (input) => {
      const deferred = $q.defer();

      autocompleteService.getPlacePredictions({
        input,
      }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          deferred.resolve(result);
        } else {
          deferred.reject(status);
        }
      });

      return deferred.promise;
    },
    getDetails: (placeId) => {
      const deferred = $q.defer();
      detailsService.getDetails({ placeId }, (result) => {
        deferred.resolve(result);
      });
      return deferred.promise;
    },
  };
});
bread.directive('locationSuggestion', function ($ionicModal, LocationService) {
  return {
    restrict: 'A',
    scope: {
      location: '=',
    },
    link: ($scope, element) => {
      $scope.search = {};
      $scope.search.suggestions = [];
      $scope.search.query = '';
      $ionicModal.fromTemplateUrl('views/location.html', {
        scope: $scope,
        focusFirstInput: true,
      }).then(function (modal) {
        $scope.modal = modal;
      });
      element[0].addEventListener('focus', () => {
        $scope.open();
      });
      $scope.$watch('search.query', (newValue) => {
        if (newValue) {
          LocationService.searchAddress(newValue).then((result) => {
            $scope.search.error = null;
            $scope.search.suggestions = result;
          }, (status) => {
            $scope.search.error = `There was an error :( ${status}`;
          });
        }
        $scope.open = () => {
          $scope.modal.show();
        };
        $scope.close = () => {
          $scope.modal.hide();
        };
        $scope.choosePlace = (place) => {
          LocationService.getDetails(place.place_id).then((location) => {
            $scope.location = location;
            $scope.close();
          });
        };
      });
    },
  };
});
