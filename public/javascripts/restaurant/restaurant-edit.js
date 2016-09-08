angular.module('myApp')
.component('restaurantEdit', {
  template: `
    <h3>EDIT</h3>

    <form ng-submit="$ctrl.save()">

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               ng-model="$ctrl.restaurant.title">
      </div>

      <div class="form-group">
        <label for="owner">Owner</label>
        <input type="text"
               class="form-control"
               name="owner"
               ng-model="$ctrl.restaurant.owner">
      </div>

      <a ng-click="$ctrl.show()" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(restaurantService, $state, $stateParams) {
    this.restaurant = null;

    this.show = function() {
      $state.go('restaurant-show', { id: this.restaurant._id });
    };

    this.save = function() {
      restaurantService.update(this.restaurant)
      .then( res => {
        $state.go('restaurants');
      });
    };

    restaurantService.getRestaurant($stateParams.id)
    .then( res => {
      this.restaurant = res.data;
    });
