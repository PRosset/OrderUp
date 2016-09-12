angular.module('myApp')
.component('restaurants', {
  template: `
    <h1>RESTAURANTS</h1>
    <div class="row">
      <div class="col-lg-4 col-md-offset-4">
        <div class="input-group">
          <input type="text" class="form-control" ng-model="search" placeholder="Search for a restaurant">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button">cuisine</button>
          </span>
        </div>
      </div>
    </div>

    <div id="restaurantList" class="row" ng-repeat="restaurant in $ctrl.restaurants | filter: search">
      <div class="restaurants col-md-6 col-md-offset-3">
        <p class="restaurantName"ng-click="$ctrl.show(restaurant)">{{ restaurant.title }}</p>
        <hr/>
        <button ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.delete(restaurant)" class="deleteBtn btn btn-xs btn-danger">X</button>
        <p class="restaurantAddress">{{ restaurant.address }}</p>
        <p><b>Hours: </b>{{ restaurant.hours }}</p>
        <p>{{ restaurant.phone }}</p>
      </div>
    </div>
    <hr/>
  <div class="footer navbar-fixed-bottom">
    <p>Own a spot? <a ui-sref="restaurant-new" class="btn btn-default">Add a restaurant</a>
    </p>
  </div>
  `,
  controller: function(restaurantService, Auth, $state) {
    this.restaurants = null;
    this.cuisines = ['American', 'Chinese', 'Italian', 'Japanese'];

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
      restaurantService.delete(restaurant)
      .then( res => {
        this.getRestaurants();
      });
    };

    this.checkOwner = function(restaurant) {
      return Auth.getCurrentUserSync().id === restaurant.owner;
    };
  }
});
