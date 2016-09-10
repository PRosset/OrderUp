angular.module('myApp')
.component('restaurants', {
  template: `
    <h1>RESTAURANTS</h1>
    <div class="restaurants" ng-repeat = "restaurant in $ctrl.restaurants">
      <p ng-click="$ctrl.show(restaurant)">{{ restaurant.title }}</p>
      <p><b>Cuisine:</b>{{ $ctrl.restaurant.phoneNumber}}</p>
      <p><b>Address:</b>{{ $ctrl.restaurant.address }}</p>
      <p><b>Hours:</b>{{ $ctrl.restaurant.hours }}</p>
      <p><b>Phone:</b>{{ $ctrl.restaurant.phone}}</p>

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

    this.delete = function(restaurant) {
      restaurantService.delete(restaurant)
      .then( res => {
        this.getRestaurants();
      });
    };
  }
});
