/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('ListFact', function () {
  const filterListItems = function (list, type, value) {
    const items = list.slice();
    if (value) {
      return items.filter(function (item) {
        return item[type] === value;
      });
    } else if (type === 'rating') {
      return items.sort(function (a, b) {
        if (a[type] > b[type]) return -1;
        if (a[type] < b[type]) return 1;
        return 0;
      });
    }
    return items.sort(function (a, b) {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
  };

  return {
    filter: filterListItems,
  };
});
