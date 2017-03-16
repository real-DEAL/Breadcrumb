var RegistrationApp = angular.module('RegistrationApp', [ 'ngResource', 'ngFileUpload' ]);

RegistrationApp.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: []
            };
            if(attrs.name === 'university'){
              console.log('inside type university');
              options.types.push('establishment')
            }
            if(attrs.name === "hometown"){
              console.log('inside type', attrs.name);
              options.types.push('(cities)');
            }

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
              scope.$apply(function() {
                  // var place = scope.gPlace.getPlace().name
                  model.$setViewValue(element.val());
              });
            });
        }
    };
});
/**
 * Registration Model Factory
 *
 * @param {ngResource} $resource The $resource service.
 *
 * @return {Registration} The Registration model.
 */
function RegistrationFactory($resource) {
  // console.log('inside factory');
  var Registration = $resource(
    '/api/registration',
    {},
    {
      withCredentials: true,
      cache: false
    }
  );
  // console.log('before registration return');
  return Registration;
}

// Register the Registration Factory.
RegistrationApp.factory('Registration', [ '$resource', RegistrationFactory ]);

/**
 * Registration Controller
 *
 * @param {angular.$scope} $scope The controller's scope.
 * @param {Registration}   Registration The registration service.
 */
function RegistrationController($scope, Registration, Upload) {
  // console.log('$scope:', $scope);
  // Setup controller state.
  $scope.state = {
    error: null,
    submitting: false,
    validating: false,
    completed: false
  };

  $scope.gPlace;

  $scope.step = 1;
  $scope.setStep = function(step){
    console.log('setting step')
    $scope.state.validating = true;
    if ($scope.form.$invalid) {
      console.log('form is invalid inside step');
      $scope.step = 1;
      return;
    }else{
      $scope.state.validating = false;
      $scope.step = step;
    }
  }

  // Bind the data to the scope.
  $scope.data = new Registration({
    purpose: 'student1',
    interests: {}
  });

  // TODO: uncomment for .edu
  // $scope.emailFormat = /(?:^[a-z]+[a-z0-9._]+@[a-z]+\.edu(?:\.cn)?$)|(?:^[a-z]+\@operationspark.org$)|(?:^[a-z]+\@bondfar.com$)|(?:shams.ali0216@gmail.com$)|(?:ali.s90@outlook.com$)/;

  // Handle submit success.
  function handleSuccess(resp) {
    // Update state.
    console.log('handle success');
    $scope.state.submitting = false;
    $scope.state.error = null;
    $scope.state.completed = true;
  }

  // Handle submit error.
  function handleError(httpResponse) {
    // Update state.
    console.log('handle error');
    $scope.state.submitting = false;
    $scope.state.error = httpResponse.data;
    console.log($scope.state.error.message);
  }

  $scope.uploadFile = function(files) {
    var fd = new FormData();
    for (var key in files) {
      console.log(key, files[key]);
      fd.append(key, files[key]);
   }
    $scope.data.files = files[0];
  };



  // Handle form submission.
  $scope.submit = function() {
    console.log('inside submit');
    // Check if the form is already submitting.
    if ($scope.state.submitting) {
       return;
    }
    $scope.data.subject_id = $scope.data.purpose.slice(-1);
    $scope.data.role = $scope.data.purpose.slice(0, -1);

    // Start validation.
    $scope.state.validating = true;
    //Check if the form is valid.
    if ($scope.form.$invalid) {
      console.log('form is invalid');
      $scope.step = 2;
      return;
    }

    // Start submitting.
    $scope.state.submitting = true;

    // TODO: finish university validation
    $scope.data.university = $scope.data.university.split(',')[0];

    // Capitalize Name
    $scope.data.name = $scope.data.name.split(' ').reduce(function(prev,curr){
      return prev.concat(curr[0].toUpperCase() + curr.slice(1));
    }, []).join(' ');

    // Stringify interests
    $scope.data.interests = Object.keys($scope.data.interests).reduce(function(interests, key){
      return $scope.data.interests[key] === true ? interests.concat(key) : interests;
    }, []).join(',');

    //Submit the form.
    console.log('calling save');
    delete $scope.data.purpose;
    console.log('data before save', $scope.data);

    Upload.upload({
      url: '/api/regis











      <div class="list">
        <label class="item item-input">
          <input type="text" data-method="watchValue()" location-suggestion location="location" placeholder="Location" ng-model="location.formatted_address">
        </label>
      </div>




      function watchValue(arg) {
        const step = $scope.step() // bc its an instance of the constructor
        // $scope.step.location = arg; // this works
        step.location = arg;
        vm.goal.location = arg;
        console.warn(step, 'step.location')
      }
