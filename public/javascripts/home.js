// angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myApp')
    .component('home', {
        template: `
                <div id="outerslide">
                    <div id="slides_control" uib-carousel active="active" no-wrap="noWrapSlides">
                    <carousel-interval="myInterval"
                        <div uib-slide ng-repeat ="slide in $ctrl.slides" index="slide.id">
                             <div class="carousel-caption">
                                <h3>Explore</h4>
                            </div>
                            <img ng-src="{{slide.image}}">
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
                { image: 'https://hd.unsplash.com/photo-1453831362806-3d5577f014a4', id: 0 },
                { image: 'https://hd.unsplash.com/photo-1424847651672-bf20a4b0982b', id: 1 },
                { image: 'https://hd.unsplash.com/photo-1414235077428-338989a2e8c0', id: 2 },
                { image: 'https://hd.unsplash.com/photo-1470053053191-43e7bd267838', id: 3 }
            ];

        }


    });
