angular.module('myApp')
.component('restaurants', {
  template: `
    <h1>RESTAURANTS</h1>
    <div class="restaurants" ng-repeat = "restaurant in $ctrl.restaurants">
      <h3 ng-click="$ctrl.show(restaurant)">{{ restaurant.title }}</h3>
      <button ng-click="$ctrl.delete(restaurant)" class="btn btn-xs btn-danger">X</button>
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

    this.toggle = function(restaurant) {
      restaurantService.toggle(restaurant)
      .then( res => {
        this.getRestaurants();
      });
    };

    this.delete = function(restaurant) {
      restaurantService.delete(restaurant)
      .then( res => {
        this.getRestaurants();
      });
    };
  }
});
