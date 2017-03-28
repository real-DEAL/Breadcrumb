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
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      store.set('email', profile.email);
      store.set('pic', profile.picture);
      $http({
        method: 'GET',
        // url: 'http://54.203.104.113/users',
        url: 'http://192.168.99.100:3000/users',
        json: true,
        params: {
          social_login: profile.user_id,
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data[0];
        if (data) {
          console.log('userid',profile.user_id)
          data.grant_type = 'password';
          data.username = data.username;
          data.social_login = profile.user_id;
          $http({
            method: 'POST',
            // url: 'http://54.203.104.113//v1/access_tokens',
            url: 'http://192.168.99.100:3000/v1/access_tokens',
            json: true,
            data,
          }).then((tokendata) => {
            store.set('access_token', tokendata.data.data[0].access_token);
            store.set('user', data);
            return $state.go('app.dashboard');
          }).catch((error) => { console.error(`There was an Error logging in ${error}`); });
        }
        $state.go('settings');
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
