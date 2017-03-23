angular.module('breadcrumb')
.controller('LoginCtrl', function ($scope, auth, $state, store, getUpdateUserFact, $http) {
  $scope.doAuth = () => {
    auth.signin({
      socialBigButtons: true,
      allowSignUpAction: true,
      connections: ['Username-Password-Authentication', 'twitter', 'facebook'],
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device',
      },
      standalone: true,
      autoclose: true,
      rememberLastLogin: false,
      closable: false,

      // container: 'widget'
    }, (profile, idToken, accessToken, state, refreshToken) => {
      store.set('profile', profile.user_id);
      store.set('pic', profile.picture);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $http({
        method: 'GET',
        url: 'http://54.203.104.113/users',
        json: true,
        params: {
          social_login: profile.user_id,
        },
      })
      .then((response) => {
        console.log(response, 'response')
        const data = response.data.data[0];
        if (data) {
          store.set('user', data);
          return $state.go('app.dashboard');
        }
        return $state.go('settings');
      });
    }, (error) => {
      console.error('There was an error logging in', error);
    });
  };

  $scope.$on('$ionic.reconnectScope', () => {
    $scope.doAuth();
  });

  $scope.doAuth();
});
