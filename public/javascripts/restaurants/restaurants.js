angular.module('myApp')
.component('restaurants', {
  template: `
    <h1>RESTAURANTS</h1>
    <input type="text" ng-model="search" />
    <div class="row" ng-repeat = "restaurant in $ctrl.restaurants | filter: search">
      <div class="restaurants col-md-6 col-md-offset-3">
        <p class="restaurantName"ng-click="$ctrl.show(restaurant)">{{ restaurant.title }}</p>
        <button ng-click="$ctrl.delete(restaurant)" class="deleteBtn btn btn-xs btn-danger">X</button>
        <p class="restaurantAddress">{{ restaurant.address }}</p>
        <p><b>Hours: </b>{{ restaurant.hours }}</p>
        <p>{{ restaurant.phone }}</p>
      </div>
    </div>
    <hr/>
    <a ui-sref="restaurant-new" class="btn btn-primary">New</a>
  `,
  controller: function(restaurantService, $state) {
    this.restaurants = null;

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
  }
});
