var angular = require('angular');
var ngTouch = require('angular-touch');
var carousel  = require('angular-carousel');

angular.module('myApp')
.component('home', {
  template: `
  <section class="container well text-center">
<link href="angular-carousel.css" rel="stylesheet" type="text/css" />
<div ng-app="app">
  <div ng-controller="CarouselDemoCtrl" id="slides_control">
    <div>

      <carousel interval="myInterval">
        <slide ng-repeat="slide in slides" active="slide.active">
          <img ng-src="{{slide.image}}">
          <div class="carousel-caption">
            <h4>Slide {{$index+1}}</h4>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</div>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min.js"></script>
    <h1>Welcome to the</h1>
    <h1>{{ $ctrl.name }}</h1>
  </section>
  `,
  controller: function() {
    this.name = 'MEAN Stack Starter App';


function CarouselDemoCtrl($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image:
 'http://lorempixel.com/400/200/'
    },
    {
      image: 'http://lorempixel.com/400/200/food'
    },
    {
      image: 'http://lorempixel.com/400/200/sports'
    },
    {
      image: 'http://lorempixel.com/400/200/people'
    }
  ];
}
}
});
