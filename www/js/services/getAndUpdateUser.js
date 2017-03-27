angular.module('breadcrumb')
.factory('getUpdateUserFact', function ($http, $state, store) {
  return (socialID, userInfo, deleteAcct) => {
    $http({
      method: 'GET',
      url: 'http://54.203.104.113/users',
      json: true,
      params: {
        social_login: socialID,
      },
    })
    .then((response) => {
      const data = response.data.data[0];
      if (deleteAcct) {
        const user = store.get('user');
        return $http({
          method: 'DELETE',
          url: `http://54.203.104.113/users/${user.id}`,
          json: true,
        })
        .then(() => {
          store.remove('profile');
          store.remove('user');
          $state.go('settings');
        });
      }
      userInfo.social_login = socialID;
      userInfo.password = socialID;

      const pic = store.get('pic');
      if (pic) {
        userInfo.profile_picture = pic;
      }
      if (data) {
        return $http({
          method: 'PUT',
          url: 'http://54.203.104.113/users',
          data: userInfo,
          json: true,
          params: {
            id: data[0].id,
          },
        })
        .then((res) => {
          store.set('user', res.data.data[0]);
          $state.go('app.dashboard');
        })
        .catch((error) => {
          console.error(error);
        });
      }
      return $http({
        method: 'POST',
        url: 'http://54.203.104.113/users',
        data: userInfo,
        json: true,
      })
      .then((res) => {
        store.set('user', res.data.data[0]);
        store.remove('email');
        $state.go('app.dashboard');
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error.data.error);
    });
  };
});
