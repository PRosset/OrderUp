angular.module('myApp')
.component('restaurants', {
  template: `
    <h1>Menu restaurants</h1>
    <div class="restaurants" ng-repeat = "restaurant in $ctrl.restaurants">
      <span ng-show="restaurant.completed" ng-click="$ctrl.toggle(restaurant)" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="restaurant.completed" ng-click="$ctrl.toggle(restaurant)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
      <a ng-click="$ctrl.show(restaurant)">{{ restaurant.title }}</a>
      <button ng-click="$ctrl.delete(restaurant)" class="btn btn-xs btn-danger">X</button>
    </div>
    <hr/>
    <a ui-sref="restaurant-new" class="btn btn-primary">New</a>
  `,
  controller: function(restaurantService, $state) {
    this.restaurants = null;

    this.getrestaurants = function() {
      restaurantService.getrestaurants()
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
