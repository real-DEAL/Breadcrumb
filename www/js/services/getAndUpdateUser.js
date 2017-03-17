angular.module('breadcrumb')
.factory('getUpdateUserFact', function ($http, $state, store) {
  return (socialID, userInfo) => {
    console.log(socialID, userInfo);
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
      console.log(data);
      userInfo.social_login = socialID;
      userInfo.password = socialID;
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
        .then(() => {
          $state.go('app.dashboard');
        })
        .catch((error) => {
          console.error(error);
        });
      }
      console.log(typeof socialID);
      return $http({
        method: 'POST',
        url: 'http://54.203.104.113/users',
        data: userInfo,
        json: true,
      })
      .then(() => {
        $state.go('app.dashboard');
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  };
});
