const bread = angular.module('breadcrumb')
bread.factory('LocationService', function ($q) {
  const autocompleteService = new google.maps.places.AutocompleteService();
  const detailsService = new google.maps.places.PlacesService(document.createElement("input"));
  return {
    searchAddress: function(input) {
      const deferred = $q.defer();

      autocompleteService.getPlacePredictions({
        input: input,
      }, function(result, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log(status);
          deferred.resolve(result);
        }else{
          deferred.reject(status)
        }
      });

      return deferred.promise;
    },
    getDetails: function(placeId) {
      const deferred = $q.defer();
      detailsService.getDetails({placeId: placeId}, function(result) {
        deferred.resolve(result);
      });
      return deferred.promise;
    }
  };
});
bread.directive('locationSuggestion', function ($ionicModal, LocationService, Trail, $rootScope){
  return {
    restrict: 'A',
    scope: {
      location: '=',
      fromDir2Ctrl: '=method',
      // step: '=',
      // dataFromDirective: '&',
      // selectedLocation: '=',
    },
    link: function($scope, element, scope){
      console.log('locationSuggestion started!');
      $scope.search = {};
      $scope.search.suggestions = [];
      $scope.search.query = "";
      $ionicModal.fromTemplateUrl('views/location.html', {
        scope: $scope,
        focusFirstInput: true
      }).then(function (modal) {
        $scope.modal = modal;
      });
      element[0].addEventListener('focus', function(event) {
        $scope.open();
      });
      $scope.$watch('search.query', function(newValue) {
        if (newValue) {
          LocationService.searchAddress(newValue).then(function(result) {
            $scope.search.error = null;
            $scope.search.suggestions = result;
          }, function(status){
            $scope.search.error = "There was an error :( " + status;
          });
        };
        $scope.open = function() {
          $scope.modal.show();
        };
        $scope.close = function() {
          $scope.modal.hide();
        };
        $scope.choosePlace = function(place, Ctrl) {
          LocationService.getDetails(place.place_id).then(function(location) {
            $scope.location = location;
            $scope.close();
          });
        };
      });
    },
  };
});
