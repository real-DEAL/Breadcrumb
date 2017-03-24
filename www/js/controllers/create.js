/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, $state, Trail, Map, Data, leafletData) {
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
    const move = `${crumb.left += 2.5}%`;
    const style = {
      'transition-duration': '1000ms',
      top: '0px',
      left: move,
    };
    crumb.style = style;
  };

  const trailMaker = () => ({
    name: Data.trailName(),
    description: Data.description(),
    type: $scope.trailTypes[0],
    difficulty: null,
    map: null,
    time: null,
    length: null,
    requires_money: false,
    transport: null,
    crumbs: {},
    left: 2.5,
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

  $scope.trailTypes = [
    'adventure',
    'mystery',
    'casual',
    'tour',
    'scavenger',
    'nature',
    'history',
  ].sort();

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

  $scope.$on('transferUp', (event, data) => {
    $scope.location.lat = data.coords.geometry.location.lat();
    $scope.location.lng = data.coords.geometry.location.lng();
    console.warn('on working', $scope.location, data);
    $scope.$watch('location', () => {
      $scope.updateMap();
    }, true);
  });

  $scope.obj = {};

  $scope.difficulty = {
    0: {
      type: 'easy',
      style: null,
    },
    1: {
      type: 'medium',
      style: null,
    },
    2: {
      type: 'hard',
      style: null,
    },
  };

  $scope.fillDifficulty = (diff) => {
    const fill = {
      color: 'purple',
    };
    $scope.difficulty[0].style = null;
    $scope.difficulty[1].style = null;
    $scope.difficulty[2].style = null;
    if (diff === 'easy') {
      $scope.trail.difficulty = 1;
      $scope.difficulty[0].style = fill;
    }
    if (diff === 'medium') {
      $scope.trail.difficulty = 2;
      $scope.difficulty[0].style = fill;
      $scope.difficulty[1].style = fill;
    }
    if (diff === 'hard') {
      $scope.trail.difficulty = 3;
      $scope.difficulty[0].style = fill;
      $scope.difficulty[1].style = fill;
      $scope.difficulty[2].style = fill;
    }
  };

  $scope.transport = {
    WALKING: {
      type: 'walk',
      style: null,
    },
    BICYCLING: {
      type: 'bicycle',
      style: null,
    },
    TRANSIT: {
      type: 'bus',
      style: null,
    },
    DRIVING: {
      type: 'car',
      style: null,
    },
  };

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

  $scope.review = {
    check: false,
    style: { display: 'none' },
  };

  $scope.trail = trailMaker();

  $scope.crumb = () => ({
    clue: null,
    description: Data.crumbDescription(),
    name: null,
    media_text: null,
    image: null,
    video: null,
    audio: null,
    ar: null,
    latitude: null,
    longitude: null,
    address: null,
    left: 2.5,
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
      if ($scope.crumbs.length > 1) {
        $scope.crumbs[$scope.crumbs.length - 2].latitude = arg.geometry.location.lat();
        $scope.crumbs[$scope.crumbs.length - 2].longitude = arg.geometry.location.lng();
        $scope.crumbs[$scope.crumbs.length - 2].address = arg.formatted_address;
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
    $scope.loading = null;
    $scope.review.check = true;
    Map.add($scope.crumbs, $scope.trail.transport)
    .then((data) => {
      $scope.loading = { display: 'none' };
      $scope.trail.map = data.image;
      $scope.trail.time = data.time;
      $scope.trail.length = data.miles;
      moveY($scope.trail, -475);
      $scope.crumbs.forEach((crumb) => {
        moveY(crumb, -400);
      });
      $scope.review.style = {
        'animation-name': 'moveUp',
      };
      $scope.$apply();
    });
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
      events: {},
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

  $scope.$on('leafletDirectiveMap.move', (event, args) => {
    // Get the Leaflet map from the triggered event.
    const map = args.leafletEvent.target;
    const center = (map.getCenter());
    $scope.center.lat = center.lat;
    $scope.center.lng = center.lng;
    $scope.location.lat = center.lat;
    $scope.location.lng = center.lng;
    $scope.updateMap();
    $scope.markers = {
      marker: {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
      },
    };
    console.warn($scope.location, '$scope.location at the same time')
  });

  $scope.tiles = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  };
});
