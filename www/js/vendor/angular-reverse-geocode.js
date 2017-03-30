/* eslint unicode-bom: "error"*/

/**
 * AngularJS reverse geocoding directive
 * @author Jason Watmore <jason@pointblankdevelopment.com.au> (http://jasonwatmore.com)
 * @version 1.0.0
 */
(function () {
  angular.module('angularReverseGeocode', [])
.directive('reverseGeocode', function () {
  return {
    restrict: 'E',
    template: '<div> </div>',
    scope: false,
    link: (scope, element, attrs) => {
      scope.$on('leafletDirectiveMarker.dragend', () => {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
        geocoder.geocode({ latLng: latlng }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              scope.place.address = results[1].formatted_address;
              console.warn('Reverse Geocode -- scope.place', scope.place.address);
              scope.$apply();
            } else {
              element.text('Location not found');
            }
          } else {
            element.text(`Geocoder failed due to: ${status}`);
          }
        });
      });
    },
    replace: true,
  };
});
}());
