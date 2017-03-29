angular.module('breadcrumb')
.factory('UserFact', function ($http, $rootScope, store) {
  const code = store.get('access_token');

  const getUser = username => (
    $http({
      method: 'GET',
      url: `${$rootScope.IP}/users?username=${username}`,
      json: true,
    })
    .then(response => response.data.data[0])
    .catch(error => console.error(error))
  );

  const updateUser = (id, updates) => (
    $http({
      method: 'PUT',
      url: `${$rootScope.IP}/users/${id}?access_token=${code}`,
      json: true,
      data: updates,
    })
    .then(response => response.data.data[0])
    .catch(error => console.error(error))
  );

  return {
    getUser,
    updateUser,
  };
});
