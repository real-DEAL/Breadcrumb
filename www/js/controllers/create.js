/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('CreateTrailCtrl', function ($scope, Trail) {
  const moveX = (step, num) => {
    const move = `${step.left += num}%`;
    const style = {
      left: move,
      'transition-duration': '250ms',
    };
    step.style = style;
  };

  const moveY = (step, num) => {
    const style = {
      'transition-duration': '1000ms',
      transform: `translate(0px, ${num}px)`,
    };
    step.style = style;
  };

  const moveReset = (step, index) => {
    step.left = 100 * index;
    const move = `${step.left += 2.5}%`;
    const style = {
      'transition-duration': '1000ms',
      top: '0px',
      left: move,
    };
    step.style = style;
  };

  $scope.map = {};

  $scope.getImage = function(src) {
  if (src !== "") {
    return src;
  } else {
   return "//:0";
  }
};

  $scope.staticMap = '';

  $scope.review = {
    check: false,
  };

  $scope.noOverflow = {
    height: '700px',
    overflow: 'hidden',
  };

  $scope.trail = {
    name: '',
    description: '',
    transport: '',
    money: false,
    steps: 0,
    length: '',
    left: 2.5,
    style: null,
  };

  $scope.step = () => ({
    text: '',
    location: '',
    media: '',
    left: 2.5,
    style: { 'animation-name': 'moveInFromRight' },
  });

  $scope.steps = [];

  $scope.add = () => {
    if (!$scope.review.check) {
      $scope.move(-100);
      const step = $scope.step();
      $scope.steps.push(step);
      $scope.trail.steps += 1;
      console.warn($scope.step, 'step');
    }
  };

  $scope.remove = (index) => {
    if (!$scope.review.check) {
      $scope.trail.steps -= 1;
      $scope.steps.splice(index, 1);
      moveReset($scope.trail, 0);
      $scope.steps.forEach((step, ind) => {
        moveReset(step, ind + 1);
      });
    }
  };

  $scope.cardSwipedLeft = (index) => {
    if (!$scope.steps.length || index === $scope.steps.length) {
      return null;
    }
    return $scope.move(-100);
  };

  $scope.cardSwipedRight = () => {
    $scope.move(100);
  };

  $scope.move = (num) => {
    if (!$scope.review.check) {
      moveX($scope.trail, num);
      $scope.steps.forEach((step) => {
        moveX(step, num);
      });
    }
  };
  setTimeout(function(){
/*map loading logic*/
$scope.reviewMap = () => {
  $scope.review.check = true;
  moveY($scope.trail, -450);
  $scope.steps.forEach((step) => {
    moveY(step, -325);
  });
  moveY($scope.review, 0);
  $scope.review.style = {
    'animation-name': 'moveUp',
  };
  console.warn($scope.steps, '$scope.steps Array ');
  Trail.addPath($scope.steps)
  .then(data => {
    console.log(data.image, 'the image url what it returns')
    let url = 'http://orig00.deviantart.net/c2bb/f/2012/106/2/b/15sct_kqyw2q3iozbguqkugfjeg5sckzsew_400x400_by_iceykim-d4wc7re.jpg';
    // $scope.map = {
    //   // {
    //   'background-image': 'url(' + url + ')'
    // };
      // 'background-image': `url(${url})`
    // };

  $scope.staticMap = data.image;

    // $scope.getImage(url);

    // console.log($scope.map, 'the map image')
  });


};

  }, 10000);

  $scope.edit = () => {
    $scope.review.check = false;
    moveReset($scope.trail, 0);
    $scope.steps.forEach((step, index) => {
      moveReset(step, index + 1);
    });
    $scope.review.style = {
      'animation-name': 'moveDown',
    };
  };

  $scope.submit = () => null;
});
