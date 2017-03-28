angular.module('breadcrumb').factory('CameraFact', function () {
  const takePicture = () => {
    const onSuccess = (imageData) => {
      const image = document.getElementById('myImage');
      image.src = `data:image/jpeg;base64,${imageData}`;
    };

    const onFail = (message) => {
      console.warn(`Failed because: ${message}`);
    };
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
    });
  };

  return {
    takePicture,
  };
});
