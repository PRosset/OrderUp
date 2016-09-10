angular.module('myApp')
.component('restaurantShow', {
  template: `
    <div class="restaurantStuff">
      <h3>{{ $ctrl.restaurantInfo.restaurant.title }}</h3>
      <p><b>Cuisine: </b>{{ $ctrl.restaurantInfo.restaurant.cuisine }}</p>
      <p><b>Address: </b>{{ $ctrl.restaurantInfo.restaurant.address }}</p>
      <p><b>Phone: </b>{{ $ctrl.restaurantInfo.restaurant.phone }}</p>
      <p><b>Hours: </b>{{ $ctrl.restaurantInfo.restaurant.hours }}</p>
    </div>

    <div class="menuItems"
      <div class="items" ng-repeat="item in $ctrl.restaurantInfo.items">
        <h4><a class="itemTitle" ng-click="$ctrl.show(item)">{{ item.title }}</a>
          <button ng-click="$ctrl.delete(item)" class="btn btn-xs btn-danger">X</button>
        </h4>
        <p class="itemDescription"><b>Price: </b>{{ item.price | currency}}</p>
        <p class="itemDescription"><b>Description: </b>{{ item.description }}</p>
        <p class="itemDescription"><b>Category: </b>{{ item.category }}</p>
      </div>
    </div>

    <a ui-sref="restaurants" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(restaurant)" class="btn btn-warning">Edit</a>
    <a ng-click="$ctrl.newItem(restaurant)" class="btn btn-warning">New Menu Item</a>
  `,
  controller: function(restaurantService, $state, $stateParams) {
    this.restaurant = null;

    this.show = function(item) {
      $state.go('item-show', { id: item._id });
    };

    this.edit = function() {
      $state.go('restaurant-edit', { id: this.restaurantInfo.restaurant._id });
    };

    this.newItem = function() {
      $state.go('item-new2', { id: this.restaurantInfo.restaurant._id });
    };

    restaurantService.getRestaurant($stateParams.id)
    .then( res => {
      this.restaurantInfo = res.data;
    });
  }
});
<<<<<<< HEAD
=======

// object.restaurant
>>>>>>> brandon
