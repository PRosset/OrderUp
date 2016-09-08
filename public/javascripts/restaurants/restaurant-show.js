angular.module('myApp')
.component('restaurantShow', {
  template: `
    <h3>SHOW</h3>
    <p><b>Title: </b>{{ $ctrl.restaurant.title }}</p>
    <p><b>ID: </b>{{ $ctrl.restaurant._id }}</p>

    <a ui-sref="restaurants" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(restaurant)" class="btn btn-warning">Edit</a>
    <!-- I could not get the opts to work this way:
    <!-- <a ui-sref="restaurant-edit" ui-sref-opts="{ id: $ctrl.restaurant._id }" class="btn btn-primary">Edit</a> -->
  `,
  controller: function(restaurantService, $state, $stateParams) {
    this.restaurant = null;

    this.edit = function() {
      $state.go('restaurant-edit', { id: this.restaurant._id });
    };

    restaurantService.getRestaurant($stateParams.id)
    .then( res => {
      this.restaurant = res.data;
    });
  }
});