// angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myApp')
    .component('home', {
        template: `
          <section class="container well text-center">
            <h1>{{ $ctrl.name }}</h1>
            <div>
                <div id="slides_control" uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides">
                   <div uib-slide ng-repeat ="slide in $ctrl.slides" active="slide.active" index="slide.id">
                        <img ng-src="{{slide.image}}" style="margin:auto;">
                    <div class="carousel-caption">
                    </div>
                   </div>
                </div>
            </div>
         </section>

  `,
        controller: function() {
            this.name = 'Order Up';
            this.myInterval = 3000;
            this.noWrapSlides = false;
            this.active = 0;
            this.slides = [
                { image: 'http://lorempixel.com/400/200/food', text: 'this is a burger', id: 0 },
                { image: 'http://lorempixel.com/400/200/food', text: 'akdf', id: 1 },
                { image: 'http://lorempixel.com/400/200/food', text: 'kafjldkf', id: 2 },
                { image: 'http://lorempixel.com/400/200/food', text: 'etajtla', id: 3 }
            ];

        }


    });
