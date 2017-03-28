angular.module('breadcrumb').factory('AugRealFact', function () {
  // TODO: replace with data from database
  const messages = [
    { username: 'broHeim', text: 'sup bro', bearing: 130 },
    { username: 'fuckingButtMunch', text: 'hey man', bearing: 39 },
    { username: 'ali', text: 'yooo', bearing: 273 },
  ];

  const calculateDirection = (degree) => {
    let detected = 0;
    $('#spot').html('');
    messages.forEach((val, i) => {
      const fontSize = 6;
      const fontColor = 'white';
      $('#spot').append(`<div class="comment" data-id=${i} style="display:block;margin-left:${(((messages[i].bearing - degree) * 5) + 50)}px;width:${($(window).width() - 100)}px;font-size:${fontSize}px;color:${fontColor}">${messages[i].username}<div>${messages[i].text}</div></div>`);
      detected = 1;
    });
    if (!detected) {
      $('#spot').html('');
    }
  };

  const onAccelerometerSuccess = () => {};

  const onAccelerometerError = () => console.error('Accelerometer error');

  const onCompassSuccess = (heading) => {
    const degree = heading.magneticHeading;
    calculateDirection(degree);
  };

  const onCompassError = (compassError) => {
    console.error(`Compass failed: ${compassError}`);
  };

  return {
    accelSucc: onAccelerometerSuccess,
    accelErr: onAccelerometerError,
    compSucc: onCompassSuccess,
    compErr: onCompassError,
    messages,
  };
});
