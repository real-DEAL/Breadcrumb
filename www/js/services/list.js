angular.module('breadcrumb').factory('ListFact', function ($rootScope, $http, Style, store) {
  const code = () => store.get('access_token');

  const arrayMaker = (num) => {
    const arr = [];
    let i;
    for (i = 0; i < num; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const getTrails = (request) => {
    const params = {};
    const link = `${$rootScope.IP}/trails?`;
    if (request === 'id') {
      params.id = $rootScope.trailID;
    } else if (request) {
      _.each(request, (val, req) => {
        if (req !== 'username' && val !== null && val !== 'Any') {
          params[req] = val;
        }
      });
    }
    return $http({
      method: 'GET',
      url: `${link}&access_token=${code()}`,
      params,
    })
    .then((response) => {
      const data = [];
      response.data.data.forEach((trail) => {
        trail.style = Style.inactiveTrail;
        const possible = trail.max_rating;
        const rating = Math.round((trail.rating / possible) * 5);
        const emptyStars = 5 - rating;
        const difficulty = trail.difficulty;
        trail.ratingArray = arrayMaker(rating);
        trail.emptyStars = arrayMaker(emptyStars);
        trail.difficulty = arrayMaker(difficulty);
        data.push(trail);
      });
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const updateTrail = (id, updates) => {
    $http({
      method: 'PUT',
      url: `${$rootScope.IP}/trails/${id}`,
      params: {
        access_token: code(),
      },
      data: updates,
    })
    .then(res => console.warn(res))
    .catch(err => console.error(err));
  };

  const deleteTrail = (trail) => {
    $http({
      method: 'DELETE',
      url: `${$rootScope.IP}/trails/${trail.id}?access_token=${code()}`,
    })
    .then(res => console.warn(res))
    .catch(res => console.error(res));
  };

  const makeSavedTrail = (user, trail) => (
    $http({
      method: 'POST',
      url: `${$rootScope.IP}/savedtrails`,
      params: {
        access_token: code(),
      },
      data: {
        user_id: user,
        trail_id: trail,
        position: 0,
      },
    })
    .then(res => res.data.data[0])
    .catch(error => console.error(error))
  );

  const getSavedTrail = (user, trail) => (
    $http({
      method: 'GET',
      url: `${$rootScope.IP}/savedtrails`,
      params: {
        user_id: user,
        trail_id: trail,
        access_token: code(),
      },
    })
    .then((res) => {
      if (!res.data.data[0]) {
        return makeSavedTrail(user, trail);
      }
      return res.data.data[0];
    })
    .catch(() => makeSavedTrail(user, trail))
  );

  const updateSavedTrail = (user, id, updates) => {
    $http({
      method: 'PUT',
      url: `${$rootScope.IP}/savedtrails/${id}`,
      params: {
        access_token: code(),
      },
      data: updates,
    })
    .catch(err => console.error(err));
  };

  const typeObj = {
    transport: false,
    length: false,
    difficulty: false,
    stars: true,
  };

  const itemSort = (items, type) => {
    if (typeObj[type]) {
      typeObj[type] = !typeObj[type];
      return items.sort((a, b) => {
        if (a[type] > b[type]) return -1;
        if (a[type] < b[type]) return 1;
        return 0;
      });
    }
    typeObj[type] = !typeObj[type];
    return items.sort((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
  };

  const filterListItems = (list, type, value) => {
    const items = list.slice();
    if (value) {
      return items.filter(item => item[type] === value);
    } else if (type === 'stars' // or should it be 'rating'?) {
      return itemSort(items, type);
    }
    return itemSort(items, type);
  };

  return {
    get: getTrails,
    del: deleteTrail,
    update: updateTrail,
    getSaved: getSavedTrail,
    updateSaved: updateSavedTrail,
    range: arrayMaker,
    filter: filterListItems,
  };
});
