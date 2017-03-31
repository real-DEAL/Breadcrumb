angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, $rootScope, $state, Trail, Map, Data, Style, store) {
  const moveX = (crumb, num) => {
    const move = `${crumb.left += num}%`;
    const style = Style.moveLeft(move);
    crumb.style = style;
  };

  const moveY = (crumb, num) => {
    const style = Style.moveVertial(num);
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
    transport: 'WALKING',
    crumbs: {},
    left: 5,
    style: null,
  });

  $scope.loading = { display: 'none' };

  $scope.info = Data.info();

  $scope.toggleInfo = (type) => {
    if (type) {
      $scope.info.name = $scope.info[type].name;
      $scope.info.text = $scope.info[type].text;
    }
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
    address: '',
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
    $scope.transport = Data.transport();
    $scope.transport[type].style = Style.activeTransport();
  };

  // MONEY


  $scope.money = (boolean) => {
    $scope.trail.requires_money = !boolean;
    if (boolean) $scope.moneyStyle = null;
    else {
      $scope.moneyStyle = Style.activeMoney();
    }
  };

  $scope.moneyStyle = null;

  // REVIEW

  $scope.review = {
    check: false,
    style: Style.displayNone,
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


  $scope.add = () => {
    console.warn('add()');
    if (!$scope.review.check) {
      $scope.move(-100);
      $scope.trail.crumbs = $scope.crumbs.slice();
      const crumb = $scope.crumb();
      $scope.crumbs.push(crumb);
      if ($scope.crumbs.length > 1) {
        $scope.crumbs[$scope.crumbs.length - 2].address = $scope.location.address;
        $scope.crumbs[$scope.crumbs.length - 2].latitude = $scope.center.lat;
        $scope.crumbs[$scope.crumbs.length - 2].longitude = $scope.center.lng;
        console.warn('does $scope.crumbs get reassigned', $scope.crumbs);
      }
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
    console.warn($scope.trail.transport, 'Transport at ReviewMap()');
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
      console.warn(err);
      $scope.toggleInfo('errorMap');
    });
    $scope.loading = Style.displayNone;
  };

  $scope.reset = () => {
    $scope.review.check = false;
    moveReset($scope.trail, 0);
    $scope.location = {
      lat: '',
      lng: '',
      address: '',
    };
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
    $scope.trail.name = $scope.trail.name || 'Untitled Trail';
    Trail.submit($scope.trail, $scope.crumbs)
    .then(() => {
      $scope.reset();
      $scope.crumbs = [];
      $scope.trail = trailMaker();
      $scope.loading = Style.displayNone;
      // $rootScope.refresh = true;
      $state.go('app.dashboard');
    });
  };

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

  $scope.$on('leafletDirectiveMarker.dragend', (event, args) => {
    const map = args.leafletEvent.target;
    const center = map.getLatLng();
    $scope.center.lat = center.lat;
    $scope.center.lng = center.lng;
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
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

  $scope.updateCoords = () => {
    console.warn($scope.location.address, 'the location.address');
    if ($scope.location.address.length >= 15) {
      const geocoder = new google.maps.Geocoder();
      console.warn($scope.location.address, 'the address');
      geocoder.geocode({ address: $scope.location.address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
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
    const map = args.leafletEvent.target;
    const center = (map.getCenter());
    $scope.center.lat = center.lat;
    $scope.center.lng = center.lng;
    // $scope.crumb.latitude = center.lat;
    // $scope.crumb.longitude = center.lng;
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
    $scope.markers = {
      marker: {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
      },
    };
  });
});
