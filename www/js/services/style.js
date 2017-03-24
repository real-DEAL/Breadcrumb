/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('Style', function () {
  const displayNone = { display: 'none' };

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
    top: '0px',
    left: move,
  });

  const moveUp = {
    'animation-name': 'moveUp',
  };

  const moveDown = {
    'animation-name': 'moveDown',
  };

  const activeTransport = () => ({
    'background-color': '#F8F8F8',
    'border-radius': '50px',
  });

  const activeMoney = () => ({
    'background-color': '#F8F8F8',
    'border-radius': '50px',
    color: '#33CD61',
  });

  const overflowStyle = {
    'max-height': '100px',
    overflow: 'scroll',
  };

  return {
    displayNone,
    moveVertial,
    moveLeft,
    moveUp,
    moveDown,
    moveReset,
    activeTransport,
    activeMoney,
    overflowStyle,
  };
});
