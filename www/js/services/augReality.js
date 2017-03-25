// let $ = window.$;

angular.module('breadcrumb').factory('AugRealFact', function ($ionicLoading) {
  const messages = [
    { username: 'broHeim', text: 'sup bro', bearing: 130 },
    { username: 'fuckingButtMunch', text: 'hey man', bearing: 39 },
    { username: 'ali', text: 'yooo', bearing: 273 },
  ];

  const calculateDirection = (degree) => {
    let detected = 0;
    $('#spot').html('<div id="userComment"></div>');
    for (let i = 0; i < messages.length; i += 1) {
      const fontSize = 6;
      const fontColor = 'white';
      $('#userComment').append(`<div class="comment" data-id=${i} ng-click='{displayComment(messages[i].text)}' style="margin-left:${(((messages[i].bearing - degree) * 5) + 50)}px;width:${($(window).width() - 100)}px;font-size:${fontSize}px;color:${fontColor}">${messages[i].username}<div>${messages[i].text}</div></div>`);
      detected = 1;
    }
    if (!detected) {
      $('#spot').html('');
    }
  };

  const displayComment = (comment) => {
    $ionicLoading.show({
      template: `Notification clicked: ${comment}`,
      noBackdrop: true,
      duration: 5000,
    });
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
