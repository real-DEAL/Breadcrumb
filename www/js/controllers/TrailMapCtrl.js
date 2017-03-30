angular.module('breadcrumb')
.controller('TrailMapCtrl', function () {
  launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, (isAvailable) => {
    let app = '';
    if (isAvailable) {
      app = launchnavigator.APP.GOOGLE_MAPS;
    } else {
      console.warn('Google Maps not available - falling back to user selection');
      app = launchnavigator.APP.USER_SELECT;
    }
    // origin
    launchnavigator.navigate('London, UK', {
      app,
    });
    // destination
    // launchnavigator.navigate(destination, successCallback, errorCallback, options);
    // launchnavigator.supportsTransportMode(app, platform, launchMode);
    // launchnavigator.LAUNCH_MODE.TURN_BY_TURN
  });
  // document.addEventListener(`deviceready ${onDeviceReady}, ${false}`);
  //
  // function onDeviceReady() {
  //   let scheme = '';
  //
  //     // Don't forget to add the org.apache.cordova.device plugin!
  //   if (device.platform === 'iOS') {
  //     scheme = 'twitter://';
  //   } else if (device.platform === 'Android') {
  //     scheme = 'com.twitter.android';
  //   }
  //   appAvailability.check(
  //       scheme, // URI Scheme
  //       function () {  // Success callback
  //         window.open('twitter://user?screen_name=gajotres', '_system', 'location=no');
  //         console.warn('Twitter is available');
  //       },
  //       function () {  // Error callback
  //         window.open('https://twitter.com/gajotres', '_system', 'location=no');
  //         console.warn('Twitter is not available');
  //       }
  //   );
  // }


  // TODO: show where you are -- test on Android in regards to autoDiscover
  // TODO: give directions to the next crumb from where you are
      // retrieve from Database the next crumb based on which trail you're on
      // then do a Google API call to show you how to get to the next area
  // TODO: show the current address in words

  // sample route
  // route 1: current location -- 348 Camp St -- use coordinates
  // route 2: Cafe Du Monde -- coordinates
// how will it be retrieved from the Database
  // ListFact -- do this later


});
