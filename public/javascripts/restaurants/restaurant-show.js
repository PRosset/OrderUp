angular.module('myApp')
.component('restaurantShow', {
  template: `
    <h3>SHOW</h3>
    <p><b>Title: </b>{{ $ctrl.restaurant.title }}</p>
    <p><b>ID: </b>{{ $ctrl.restaurant._id }}</p>

    <div class="items" ng-repeat="item in $ctrl.items">
      <a ng-click="$ctrl.show(item)">{{ item.title }}</a>
      <button ng-click="$ctrl.delete(item)" class="btn btn-xs btn-danger">X</button>
    </div>

    <a ui-sref="restaurants" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(restaurant)" class="btn btn-warning">Edit</a>
    <a ng-click="$ctrl.newItem(restaurant)" class="btn btn-warning">New Menu Item</a>
  `,
  controller: function(restaurantService, $state, $stateParams) {
    this.restaurant = null;

    this.edit = function() {
      $state.go('restaurant-edit', { id: this.restaurant._id });
    };

    this.newItem = function() {
      $state.go('item-new2', { id: this.restaurant._id });
    };

    restaurantService.getRestaurant($stateParams.id)
    .then( res => {
      this.items = res.data;
    });
  }
});