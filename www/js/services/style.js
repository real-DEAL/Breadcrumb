angular.module('breadcrumb').factory('Style', function () {
  const displayNone = { display: 'none' };

  const themes = [
    {
      style: {
        'background-image': 'linear-gradient(#3a7ec7, #c8f0ef)',
      },
      background: '../img/big-mountains.png',
      static: {
        'background-color': '#3a7ec7',
        'background-image': 'url("../img/static-mountains.png")',
        'background-repeat': 'no-repeat',
        'background-position': 'bottom center',
      },
    },
    {
      style: {
        'background-image': 'linear-gradient(#c8f0ef, #3a7ec7)',
      },
      background: '../img/big-houses.png',
      static: {
        'background-color': '#c8f0ef',
        'background-image': 'url("../img/static-houses.png")',
        'background-repeat': 'no-repeat',
        'background-position': 'bottom center',
      },
    },
    {
      style: {
        'background-image': 'linear-gradient(#3f3f3f, #3a7ec7)',
      },
      background: '../img/big-city.png',
      static: {
        'background-color': '#3D5772',
        'background-image': 'url("../img/static-city.png")',
        'background-repeat': 'no-repeat',
        'background-position': 'bottom center',
      },
    },
  ];

  const theme = () => themes[Math.floor(Math.random() * themes.length)];

  const activeTrail = {
    height: '375px',
    overflow: 'hidden',
    'transition-duration': '250ms',
  };

  const inactiveTrail = {
    height: '105px',
    'transition-duration': '250ms',
    overflow: 'hidden',
  };

  const moveVertial = num => ({
    'transition-duration': '1000ms',
    transform: `translate(0px, ${num}%)`,
  });

  const moveLeft = move => ({
    left: move,
    'transition-duration': '250ms',
  });

  const moveReset = move => ({
    'transition-duration': '1000ms',
    top: '2.5%',
    left: move,
  });

  const moveUp = {
    'animation-name': 'moveUp',
  };

  const moveDown = {
    'animation-name': 'moveDown',
  };

  const activeTransport = () => ({
    'background-color': '#95cebb',
    'border-radius': '50px',
    color: '#fbf0ed',
  });

  const activeMoney = () => ({
    'background-color': '#95cebb',
    'border-radius': '50px',
    color: '#fbf0ed',
  });

  const overflowStyle = {
    'max-height': '160px',
    overflow: 'scroll',
  };

  const bubbleUp = { top: '75px' };

  const bubbleDown = { top: '400px' };

  return {
    theme,
    activeTrail,
    inactiveTrail,
    displayNone,
    moveVertial,
    moveLeft,
    moveUp,
    moveDown,
    moveReset,
    activeTransport,
    activeMoney,
    overflowStyle,
    bubbleUp,
    bubbleDown,
  };
});
