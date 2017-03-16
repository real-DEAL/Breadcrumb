angular.module('breadcrumb')
.controller('LoginCtrl', function ($scope, auth, $state, store) {
  $scope.doAuth = () => {
    auth.signin({
      socialBigButtons: true,
      allowSignUpAction: false,
      allowedConnections: ['twitter', 'facebook', 'google'],
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
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      // TODO: erase after done with auth
      for (let k in profile) {
        console.log(k+': ' + profile[k]);
      }
      $state.go('app.dashboard');
    }, (error) => {
      console.warn('There was an error logging in', error);
    });
  };

  $scope.$on('$ionic.reconnectScope', () => {
    $scope.doAuth();
  });

  $scope.doAuth();
});
