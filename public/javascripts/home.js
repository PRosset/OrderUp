// angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myApp')
    .component('home', {
        template: `
                <div id="slides_control" uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides">
                   <div uib-slide ng-repeat ="slide in $ctrl.slides" index="slide.id">
                        <img ng-src="{{slide.image}}" style="margin:auto;">
                    <div class="carousel-caption">
                    <h3>Explore {{slide.text}}</h4>
                    </div>
                   </div>
                </div>
  `,
        controller: function() {
            this.name = 'Order Up';
            this.myInterval = 3000;
            this.noWrapSlides = false;
            this.active = 0;
            this.slides = [
                { image: 'http://lorempixel.com/400/200/food', text: 'Pat\'s', id: 0},
                { image: 'http://lorempixel.com/400/200/food', text: 'Dan\'s', id: 1},
                { image: 'http://lorempixel.com/400/200/food', text: 'Leslie\'s', id: 2 },
                { image: 'http://lorempixel.com/400/200/food', text: 'Brandon\'s', id: 3 }
            ];

        }


    });
