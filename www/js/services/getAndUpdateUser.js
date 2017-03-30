angular.module('breadcrumb')
.factory('getUpdateUserFact', function ($http, $state, store) {
  const putUserInfo = (userIf, userData) =>
    $http({
      method: 'PUT',
      url: 'http://54.203.104.113/users',
      data: userIf,
      json: true,
      params: {
        id: userData.id,
        access_token: store.get('access_token'),
      },
    })
    .then((res) => {
      store.set('user', res.data.data[0]);
      $state.go('app.dashboard');
    })
    .catch((error) => {
      console.error(error);
    });

  const postUserInfo = userIf =>
    $http({
      method: 'POST',
      url: 'http://54.203.104.113/users',
      data: userIf,
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

  const deleteUserInfo = userData =>
    $http({
      method: 'DELETE',
      url: `http://54.203.104.113/users/${userData.id}?access_token=${store.get('access_token')}`,
      json: true,
    })
    .then(() => {
      store.remove('profile');
      store.remove('user');
      $state.go('start');
    });


  return (socialID, userInfo, deleteAcct) => {
    $http({
      method: 'GET',
      url: `http://54.203.104.113/users?access_token=${store.get('access_token')}`,
      json: true,
      params: {
        social_login: socialID,
      },
    })
    .then((response) => {
      const data = response.data.data[0];
      const pic = store.get('pic');
      userInfo.social_login = socialID;
      userInfo.password = socialID;
      if (pic) {
        userInfo.profile_picture = pic;
      }

      if (deleteAcct) {
        return deleteUserInfo(data);
      } else if (data) {
        return putUserInfo(userInfo, data);
      }
      return postUserInfo(userInfo);
    })
    .catch((error) => {
      console.error(error);
    });
  };
});
