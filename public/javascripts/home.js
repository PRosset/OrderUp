// angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myApp')
    .component('home', {
        template: `
                  <div id="slides_control" uib-carousel active="active"  no-pause="true" carousel interval= "3750" no-wrap="noWrapSlides">
                          <div uib-slide ng-repeat ="slide in $ctrl.slides"  index="slide.id">
                              <img ng-src="{{slide.image}}">
                              <div class="carousel-caption">
                                <h3>Explore</h3>
                             </div>
                          </div>
                  </div>
  `,
        controller: function() {
            this.name = 'Order Up';
            this.myInterval = " ";
            this.noWrapSlides = false;
            this.active = 0;
            this.slides = [
                { image: 'https://hd.unsplash.com/photo-1453831362806-3d5577f014a4', id: 0 },
                { image: 'https://hd.unsplash.com/photo-1424847651672-bf20a4b0982b', id: 1 },
                { image: 'https://hd.unsplash.com/photo-1414235077428-338989a2e8c0', id: 2 },
                { image: 'https://hd.unsplash.com/photo-1470053053191-43e7bd267838', id: 3 },
                { image: 'https://hd.unsplash.com/photo-1464500422302-6188776dcbf3', id: 4 },
                { image: 'https://images.unsplash.com/photo-1473213110592-19430a217c0e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=a7eb87f1caa636482e261d93ea062fb0', id: 5 }
            ];
        }
    });
