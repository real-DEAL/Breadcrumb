angular.module('breadcrumb').controller('TrailCtrl', function ($scope, Geofence, $ionicLoading) {
  $scope.data = {
    id: 1,
    user_id: 1,
    name: 'operation spark trail',
    description: 'a test for devin',
    rating: 3,
    type: 'tour',
    transport: null,
    length: '2 miles',
    difficulty: null,
    map: null,
    time: null,
    requires_money: true,
    created_at: '2017-03-17T17:45:18.882Z',
    updated_at: '2017-03-17T17:45:18.882Z',
    crumb: [
      {
        id: 4,
        trail_id: 1,
        name: 'op spark',
        description: '3',
        order_number: 4,
        latitude: 29.945995,
        longitude: -90.070206,
        notification_id: null,
        title: 'You found a crumb!',
        small_icon: null,
        data: null,
        text: 'Operation Spark!!!!',
        image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1455596221531/',
        video: 'string',
        ar: 'string',
      },
      {
        id: 3,
        trail_id: 1,
        name: 'lee circle',
        description: '3',
        order_number: 3,
        latitude: 29.943323,
        longitude: -90.072495,
        notification_id: null,
        title: 'You found a crumb!',
        small_icon: null,
        data: null,
        text: 'Lee Circle!!!!',
        image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1455596221531/',
        video: 'string',
        ar: 'string',
        challenge: {
          // the type of the challenge, "picture" means to take a picture of something
          // other possibilites: "quiz", etc.
          type: 'picture',
          // iterate through to compare object returned from google vision
          keywords: ['flower', 'pot', 'plant', 'petals', 'petal'],
          // used for picture detection, can be label, logo, text, face, landmark
          detection: 'label',
        },
      },
      {
        id: 2,
        trail_id: 1,
        name: 'cafe CAC',
        description: '2',
        order_number: 2,
        latitude: 29.943632,
        longitude: -90.070864,
        notification_id: null,
        title: 'You found a crumb!',
        small_icon: null,
        data: null,
        text: 'The Cafe at the CAC!!!',
        image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1455596221531/',
        video: 'string',
        ar: 'string',
      },
      {
        id: 1,
        trail_id: 1,
        name: 'Degas Gallery',
        description: '1',
        order_number: 1,
        latitude: 29.945499,
        longitude: -90.070735,
        notification_id: null,
        title: 'You found a crumb!',
        small_icon: null,
        data: null,
        text: 'Degas Gallery!!!!',
        image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1455596221531/',
        video: 'string',
        ar: 'string',
      },
    ],
  };

  $scope.videoOverlay = () => {
    ezar.getBackCamera().start();
    document.ezar.style.backgroundColor = 'transparent';
  };
  $scope.stopVideoOverlay = () => {
    ezar.getBackCamera().stop();
    document.ezar.style.backgroundColor = 'opaque';
  };

  $scope.addGeofences = () => {
    Geofence.addOrUpdate($scope.data.crumb[0]);
    $ionicLoading.show({
      template: 'Get ready for a journey!',
      noBackdrop: true,
      duration: 3000,
    });
  };
});
