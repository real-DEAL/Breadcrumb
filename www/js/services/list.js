/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('ListFact', function ($http) {
  const closeStyle = {
    height: '95px',
    'transition-duration': '250ms',
    overflow: 'hidden',
  };

  const arrayMaker = (num) => {
    const arr = [];
    let i;
    for (i = 0; i < num; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const getTrails = () => (
    $http({
      method: 'GET',
      url: 'http://192.168.99.100/trails',
      // json: true,
    })
    .then((response) => {
      const data = [];
      response.data.data.forEach((trail) => {
        trail.style = closeStyle;
        // TODO: Integrate actual algorithm to calculate rating from trail.score
        const stars = Math.floor(Math.random() * 6);
        const emptyStars = 5 - stars;
        const difficulty = trail.difficulty;
        trail.stars = arrayMaker(stars);
        trail.emptyStars = arrayMaker(emptyStars);
        trail.difficulty = arrayMaker(difficulty);
        data.push(trail);
      });
      console.log(data);
      return data;
    })
  );

  const trailMaker = () => {
    const tran = Math.floor(Math.random() * 4) + 1;
    const stars = Math.floor(Math.random() * 6);
    const emptyStars = 5 - stars;
    const difficulty = Math.floor(Math.random() * 5) + 1;

    return {
      name: `Trail ${Math.floor(Math.random() * 100)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      transport: tran,
      stars: arrayMaker(stars),
      emptyStars: arrayMaker(emptyStars),
      difficulty: arrayMaker(difficulty),
      length: (Math.floor(Math.random() * 5) + 2) * tran,
      progress: Math.floor(Math.random() * 100),
      style: closeStyle,
    };
  };

  const filterListItems = (list, type, value) => {
    console.log(list);
    const items = list.slice();
    if (value) {
      return items.filter(item => item[type] === value);
    } else if (type === 'stars') {
      return items.sort((a, b) => {
        if (a[type] > b[type]) return -1;
        if (a[type] < b[type]) return 1;
        return 0;
      });
    }
    return items.sort((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
  };

  return {
    get: getTrails,
    close: closeStyle,
    range: arrayMaker,
    trail: trailMaker,
    filter: filterListItems,
  };
});
