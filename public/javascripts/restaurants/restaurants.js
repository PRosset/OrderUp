angular.module('myApp')
.component('restaurants', {
  template: `
    <br>
    <div class="row">
        <div class="col-lg-4 col-md-offset-4 input-lg">
          <input type="text" class="form-control" ng-model="search" placeholder="Search for a restaurant">
        </div>
    </div>
    <br>
    <div id="restaurantList" class="row">
      <div class="col-md-9 col-md-offset-1">
        <div class="restaurants col-md-5 col-md-offset-1" ng-click="$ctrl.show(restaurant)" ng-repeat="restaurant in $ctrl.restaurants | filter: search | startFrom: ($ctrl.currentPage - 1) * $ctrl.pageSize | limitTo: $ctrl.pageSize" style="background-image: url({{restaurant.image}}); background-size: 100%; background-color: rgba(0,0,0,.5);">
          <div class="cover">
            <div class="restaurantInfo">
              <p class="restaurantName">{{ restaurant.title }}</p>
              <hr/>
              <button ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.delete(restaurant)" class="deleteBtn btn btn-xs btn-danger">X</button>
              <p class="restaurantAddress">{{ restaurant.address }}</p>
              <p><b>Hours: </b>{{ restaurant.hours }}</p>
              <p>{{ restaurant.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul uib-pagination total-items="$ctrl.restaurants.length" ng-model="$ctrl.currentPage" items-per-page="$ctrl.pageSize"></ul uib-pagination>
    <br>
    <br>
    <br>
  <div class="footer navbar-fixed-bottom">
    <p>Own a spot? <a ui-sref="restaurant-new" class="btn btn-default">Add a restaurant</a>
    </p>
  </div>
  `,
  controller: function(restaurantService, Auth, $state) {
    this.restaurants = [];
    // this.cuisines = ['American', 'Chinese', 'Italian', 'Japanese'];

    this.pageSize = 4;
    this.currentPage = 1;

    this.getRestaurants = function() {
      restaurantService.getRestaurants()
      .then( res => {
        this.restaurants = res.data;
      });
    };

    this.getRestaurants();

    this.show = function(restaurant) {
      $state.go('restaurant-show', { id: restaurant._id });
    };

    this.delete = function(restaurant) {
      var removedRestaurant = this.restaurants.indexOf(restaurant);
      this.restaurants.splice(removedRestaurant, 1);
      restaurantService.delete(restaurant);
    };

    this.checkOwner = function(restaurant) {
      return Auth.getCurrentUserSync().id === restaurant.owner;
    };
  }
});
