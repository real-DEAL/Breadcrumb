angular.module('breadcrumb')
.controller('LoginCtrl', function (
  $scope,
  $rootScope,
  auth,
  $state,
  store,
  getUpdateUserFact,
  $http
) {
  $scope.doAuth = () => {
    auth.signin({
      socialBigButtons: true,
      allowSignUpAction: true,
      connections: ['Username-Password-Authentication'],
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device',
      },
      icon: 'http://res.cloudinary.com/realdeal/image/upload/v1490885825/breadcrumb-logo.gif',
      // theme: 'auth',
      standalone: true,
      autoclose: true,
      rememberLastLogin: false,
      closable: false,
    }, (profile, idToken, accessToken, state, refreshToken) => {
      store.set('profile', profile.user_id);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      store.set('email', profile.email);
      store.set('pic', profile.picture);
      $http({
        method: 'GET',
        url: `${$rootScope.IP}/users`,
        json: true,
        params: {
          social_login: profile.user_id,
        },
      })
      .then((response) => {
        const data = response.data.data[0];
        if (data) {
          data.grant_type = 'password';
          data.social_login = profile.user_id;
          $http({
            method: 'POST',
            url: `${$rootScope.IP}/v1/access_tokens`,
            json: true,
            data,
          }).then((tokendata) => {
            store.set('access_token', tokendata.data.data[0].access_token);
            store.set('user', data);
            return $state.go('app.dashboard');
          }).catch((error) => { console.error(`There was an Error logging in ${error}`); });
        } else {
          $state.go('settings');
        }
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
