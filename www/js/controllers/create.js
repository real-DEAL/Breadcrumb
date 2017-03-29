angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, $rootScope, $state, Trail, Map, Data, Style, store) {

  const moveX = (crumb, num) => {
    const move = `${crumb.left += num}%`;

    const style = {
      left: move,
      'transition-duration': '250ms',
    };
    crumb.style = style;
  };

  const moveY = (crumb, num) => {
    const style = {
      'transition-duration': '1000ms',
      transform: `translate(0px, ${num}px)`,
    };
    crumb.style = style;
  };

  const moveReset = (crumb, index) => {
    crumb.left = 100 * index;
    const move = `${crumb.left += 5}%`;
    crumb.style = Style.moveReset(move);
  };

  const trailMaker = () => ({
    user_id: store.get('user').id,
    name: null,
    description: null,
    type: $scope.trailTypes[0],
    difficulty: null,
    map: null,
    time: null,
    length: null,
    requires_money: false,
    transport: null,
    crumbs: {},
    left: 5,
    style: null,
  });

  $scope.loading = { display: 'none' };

  $scope.info = {
    show: false,
    name: 'Description',
    text: 'What do you want the traveler to know when they see where they\'re going next? This could be a clue, like a distinct feature of the area they\'re looking for, or a landmark they should look out for!',
  };

  $scope.toggleInfo = () => {
    $scope.info.show = !$scope.info.show;
  };

  // TRAIL TYPES

  $scope.trailTypes = Data.trailTypes();

  $scope.step = 0;

  $scope.changeStep = (change) => {
    if (change) {
      $scope.step += 1;
    } else if (!change) {
      $scope.step -= 1;
    }
    if ($scope.step < 0) {
      $scope.step = $scope.trailTypes.length - 1;
    } else if ($scope.step === $scope.trailTypes.length) {
      $scope.step -= $scope.trailTypes.length;
    }
    $scope.trail.type = $scope.trailTypes[$scope.step];
  };

  $scope.location = {
    lat: 29.9511,
    lng: -90.0715,
  };

  $scope.obj = {};

  // DIFFICULTIES

  $scope.difficulty = Data.difficulty();

  $scope.fillDifficulties = (index) => {
    let fill;
    if (index === 0) {
      fill = { color: '#3a7ec7' };
    } else if (index === 1) {
      fill = { color: '#db6a32' };
    } else if (index === 2) {
      fill = { color: '#a0030c' };
    }
    $scope.difficulty = Data.fillIcons('difficulty', index, fill);
    $scope.trail.difficulty = index + 1;
  };

  // TRANSPORT

  $scope.transport = Data.transport();


  $scope.transChange = (type) => {
    $scope.transport.WALKING.style = null;
    $scope.transport.BICYCLING.style = null;
    $scope.transport.TRANSIT.style = null;
    $scope.transport.DRIVING.style = null;
    $scope.transport[type].style = {
      'background-color': '#F8F8F8',
      'border-radius': '50px',
    };
  };

  // MONEY

  $scope.money = (boolean) => {
    $scope.trail.requires_money = !boolean;
    if (boolean) $scope.moneyStyle = null;
    else {
      $scope.moneyStyle = {
        'background-color': '#F8F8F8',
        'border-radius': '50px',
        color: '#33CD61',
      };
    }
  };

  $scope.moneyStyle = null;

  // REVIEW

  $scope.review = {
    check: false,
    style: { display: 'none' },
  };

  $scope.trail = trailMaker();

  $scope.crumb = () => ({
    clue: null,
    description: null,
    name: null,
    media_text: null,
    image: null,
    video: null,
    audio: null,
    ar: null,
    latitude: null,
    longitude: null,
    address: null,
    left: 5,
    style: { 'animation-name': 'moveInFromRight' },
  });

  $scope.crumbs = [];

  $scope.media = false;

  $scope.mediaType = {
    image: false,
    audio: false,
    video: false,
  };

  $scope.toggleMedia = (type) => {
    if (type === 'media') {
      $scope.media = !$scope.media;
    }
    const state = $scope.mediaType[type];
    $scope.mediaType = {
      image: false,
      audio: false,
      video: false,
    };
    $scope.mediaType[type] = !state;
  };


  $scope.add = (arg) => {
    if (!$scope.review.check) {
      $scope.move(-100);
      $scope.trail.crumbs = $scope.crumbs.slice();
      $scope.trail.crumbs += 1;
      const crumb = $scope.crumb();
      $scope.crumbs.push(crumb);
      // if (arg) {
        // currently the location.lat and location.lng is being updated
        // if ($scope.crumbs.length > 1) {
        //   console.warn(arg, 'arg')
        //   $scope.crumbs[$scope.crumbs.length - 2].latitude = arg.geometry.location.lat();
        //   $scope.crumbs[$scope.crumbs.length - 2].longitude = arg.geometry.location.lng();
        //   $scope.crumbs[$scope.crumbs.length - 2].address = arg.formatted_address;
        // }
      // } else {
        if ($scope.crumbs.length > 1) {
          console.warn($scope.center.lat, 'center.lat is updated')
          $scope.crumbs[$scope.crumbs.length - 2].latitude = $scope.center.lat;
          $scope.crumbs[$scope.crumbs.length - 2].longitude = $scope.center.lng;
          // TODO: get the formatted_address
          // $scope.crumbs[$scope.crumbs.length - 2].address = arg.formatted_address;
        }
      // }
    }
  };

  $scope.remove = (index) => {
    $scope.crumbs.splice(index, 1);
    if (!$scope.review.check) {
      $scope.trail.crumbs = $scope.crumbs.slice();
      moveReset($scope.trail, 0);
      $scope.crumbs.forEach((crumb, ind) => {
        moveReset(crumb, ind + 1);
      });
    }
  };

  $scope.cardSwipedLeft = (index) => {
    if (!$scope.crumbs.length || index === $scope.crumbs.length) {
      return null;
    }
    return $scope.move(-100);
  };

  $scope.cardSwipedRight = () => {
    $scope.move(100);
  };

  $scope.move = (num) => {
    if (!$scope.review.check) {
      moveX($scope.trail, num);
      $scope.crumbs.forEach((crumb) => {
        moveX(crumb, num);
      });
    }
  };

  $scope.reviewMap = () => {
    $scope.loading = null;
    Map.add($scope.crumbs, $scope.trail.transport)
    .then((data) => {
      $scope.trail.map = data.image;
      $scope.trail.time = data.time;
      $scope.trail.length = data.miles;
      moveY($scope.trail, -120);
      $scope.crumbs.forEach((crumb) => {
        moveY(crumb, -120);
      });
      $scope.review.style = Style.moveUp;
      $scope.review.check = true;
      $scope.$apply();
    })
    .catch((err) => {
      console.log(err);
      $scope.toggleInfo('errorMap');
    });
    // if (!$scope.review.check) {
    //
    // }
    $scope.loading = Style.displayNone;
  };

  $scope.reset = () => {
    $scope.review.check = false;
    moveReset($scope.trail, 0);
    $scope.crumbs.forEach((crumb, index) => {
      moveReset(crumb, index + 1);
    });
    $scope.review.style = {
      'animation-name': 'moveDown',
    };
  };

  $scope.submit = () => {
    $scope.loading = null;
    $scope.crumbs.pop();
    Trail.submit($scope.trail, $scope.crumbs)
    .then(() => {
      $scope.reset();
      $scope.crumbs = [];
      $scope.trail = trailMaker();
      $scope.loading = { display: 'none' };
      $state.go('app.dashboard');
    });
  };

  // this sets the default of the leaflet map
  // ------------------------------------------------------------------------------
  if (window.Android) {
    angular.extend($scope, {
      center: {
        lat: 29.9511,
        lng: -90.0715,
        zoom: 15,
        autoDiscover: true,
      },
      events: {},
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            url: 'https://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
            type: 'xyz',
          },
        },
      },
      markers: {
        marker: {
          lat: 29.9511,
          lng: -90.0715,
          draggable: true,
        },
      },
      defaults: {
        scrollWheelZoom: false,
      },
    });
  } else {
    angular.extend($scope, {
      center: {
        lat: 29.9511,
        lng: -90.0715,
        zoom: 15,
        autoDiscover: false,
      },

      events: {
        map: {
          enable: ['zoomstart', 'drag', 'click', 'mousemove'],
          logic: 'emit',
        },
      },


      markers: {
        marker: {
          lat: 29.9511,
          lng: -90.0715,
          draggable: true,
        },
      },
      events: {
        map: {
          enable: ['zoomstart', 'drag', 'click', 'mousemove'],
          logic: 'emit',
        },
      },
      defaults: {
        scrollWheelZoom: false,
      },
    });
  }
  $scope.tiles = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  };

  // ==========================================================================


  // $scope.$on('leafletDirectiveMap.move', (event, args) => {
  //   // Get the Leaflet map from the triggered event.
  //   const map = args.leafletEvent.target;
  //   const center = (map.getCenter());
  //   $scope.center.lat = center.lat;
  //   $scope.center.lng = center.lng;
  //   $scope.location.lat = center.lat;
  //   $scope.location.lng = center.lng;
  //   // $scope.updateMap();
  //   $scope.markers = {
  //     marker: {
  //       lat: $scope.center.lat,
  //       lng: $scope.center.lng,
  //     },
  //   };
  //   console.warn($scope.location, '$scope.location at the same time');
  // });
  //
  // $scope.$on('leafletDirectiveMarker.dragend', (event, args) => {
  //   const map = args.leafletEvent.target;
  //   const center = (map.panTo());
  //   $scope.center.lat = center.lat;
  //   $scope.center.lng = center.lng;
  //   console.warn('get new center', $scope.center);
  // });
  // TODO: this currently updates the center of the map the first time, but not the 2nd
  $scope.$on('leafletDirectiveMarker.dragend', (event, args) => {
    const map = args.leafletEvent.target;
    const center = map.getLatLng();
    $scope.center.lat = center.lat; // this currently doesn't work
    $scope.center.lng = center.lng;
    // change the location which speaks to the input box in view
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
    // setInterval(() => {
    //   $scope.updateMap();
    // })

    console.warn($scope.location, '$scope.location updated');
    console.warn($scope.markers.marker, '$scope.markers.marker updated');
    //TODO: how to make it work continually and let angular know to update the center as well???
    // i mean the scope is clearly changing in the updateCoords function, but it's just updating
    // the view!!! -- i want to use the panTo function for that reason!!!

  });


  $scope.updateMap = () => {
    $scope.center = {
      lat: $scope.location.lat,
      lng: $scope.location.lng,
      zoom: 15,
    };
    $scope.markers = {
      marker: {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
        draggable: true,
      },
    };
  };


  // TODO: when autocomplete updates, get its coordinates and use
  // it to also update the marker on the map


  $scope.place = {
    address: '',
  };
  $scope.updateCoords = () => {
    if ($scope.place.address.length >= 15) {
      const geocoder = new google.maps.Geocoder();
      console.warn($scope.place.address, 'the address');
      geocoder.geocode({ address: $scope.place.address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
              console.warn('Getting geocode lng', results[0].geometry.location.lat());
              $scope.markers.marker.lat = results[0].geometry.location.lat();
              $scope.markers.marker.lng = results[0].geometry.location.lng();
              angular.extend($scope, {
                center: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                  zoom: 15,
                },
              });
              $scope.center.lat = results[0].geometry.location.lat();
              $scope.center.lng = results[0].geometry.location.lng();

            // listen to marker changed or place_changed, then get event and panto
            // window.L.panTo($scope.center);
            console.warn('center lat get updated', $scope.center.lat);
            console.warn('markers lat get updated', $scope.markers.marker.lat);
            $scope.$apply();
          } else {
            console.warn('Location not found');
          }
        } else {
          console.warn(`Geocoder failed due to: ${status}`);
        }
      });
    }
  };


  $scope.$on('leafletDirectiveMap.move', (event, args) => {
    // Get the Leaflet map from the triggered event.
    const map = args.leafletEvent.target;
    const center = (map.getCenter());
    $scope.center.lat = center.lat;
    $scope.center.lng = center.lng;
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
    // $scope.updateMap();
    $scope.markers = {
      marker: {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
      },
    };
    console.warn($scope.location, '$scope.location at the same time');
  });

  $scope.$on('leafletDirectiveMarker.dragend', (event, args) => {
    const map = args.leafletEvent.target;
    const center = map.getLatLng();
    $scope.center.lat = center.lat; // this currently doesn't work
    $scope.center.lng = center.lng;
    // change the location which speaks to the input box in view
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
    // $scope.updateMap();
    console.warn($scope.location, '$scope.location updated');
    console.warn($scope.markers.marker, '$scope.markers.marker updated');
  });


  // this updates map when location from autocomplete changes $watch
  // ==========================================================================


  // $scope.$on('leafletDirectiveMap.move', (event, args) => {
  //   // Get the Leaflet map from the triggered event.
  //   const map = args.leafletEvent.target;
  //   const center = (map.getCenter());
  //   $scope.center.lat = center.lat;
  //   $scope.center.lng = center.lng;
  //   $scope.location.lat = center.lat;
  //   $scope.location.lng = center.lng;
  //   // $scope.updateMap();
  //   $scope.markers = {
  //     marker: {
  //       lat: $scope.center.lat,
  //       lng: $scope.center.lng,
  //     },
  //   };
  //   console.warn($scope.location, '$scope.location at the same time');
  // });
  //
  // $scope.$on('leafletDirectiveMarker.dragend', (event, args) => {
  //   const map = args.leafletEvent.target;
  //   const center = (map.panTo());
  //   $scope.center.lat = center.lat;
  //   $scope.center.lng = center.lng;
  //   console.warn('get new center', $scope.center);
  // });
  // TODO: this currently updates the center of the map the first time, but not the 2nd
  $scope.$on('leafletDirectiveMarker.dragend', (event, args) => {
    const map = args.leafletEvent.target;
    const center = map.getLatLng();
    $scope.center.lat = center.lat; // this currently doesn't work
    $scope.center.lng = center.lng;
    // change the location which speaks to the input box in view
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
    // setInterval(() => {
    //   $scope.updateMap();
    // })

    console.warn($scope.location, '$scope.location updated');
    console.warn($scope.markers.marker, '$scope.markers.marker updated');
    //TODO: how to make it work continually and let angular know to update the center as well???
    // i mean the scope is clearly changing in the updateCoords function, but it's just updating
    //the view!!! -- i want to use the panTo function for that reason!!!

  });

  $scope.updateMap = () => {
    $scope.center = {
      lat: $scope.location.lat,
      lng: $scope.location.lng,
      zoom: 15,
    };
    $scope.markers = {
      marker: {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
        draggable: true,
      },
    };
  };

  // TODO: when autocomplete updates, get its coordinates and use
  // it to also update the marker on the map


  $scope.tiles = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },

  };

  $scope.place = {
    address: '',
  };

  $scope.updateCoords = () => {
    if ($scope.place.address.length >= 15) {
      const geocoder = new google.maps.Geocoder();
      console.warn($scope.place.address, 'the address');
      geocoder.geocode({ address: $scope.place.address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
              console.warn('Getting geocode lng', results[0].geometry.location.lat());
              $scope.markers.marker.lat = results[0].geometry.location.lat();
              $scope.markers.marker.lng = results[0].geometry.location.lng();
              angular.extend($scope, {
                center: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                  zoom: 15,
                },
              });
              $scope.center.lat = results[0].geometry.location.lat();
              $scope.center.lng = results[0].geometry.location.lng();

            // listen to marker changed or place_changed, then get event and panto
            // window.L.panTo($scope.center);
            console.warn('center lat get updated', $scope.center.lat);

            console.warn('markers lat get updated', $scope.markers.marker.lat);
            $scope.$apply();
          } else {
            console.warn('Location not found');
          }
        } else {
          console.warn(`Geocoder failed due to: ${status}`);
        }
      });
    }
  };

});
