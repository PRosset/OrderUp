angular.module('myApp')
.component('restaurantEdit', {
  template: `
    <div class="col-md-10 col-md-offset-1">
      <h3>EDIT</h3>
      <form ng-submit="$ctrl.save()">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text"
                 class="form-control"
                 name="title"
                 ng-model="$ctrl.restaurantInfo.restaurant.title">
        </div>

        <div class="form-group">
          <label for="cuisine">Cuisine</label>
              <select type="text"
                 class="form-control"
                 name="cuisine"
                 ng-model="$ctrl.restaurantInfo.restaurant.cuisine">
                <option ng-repeat="cuisine in $ctrl.cuisines"
                value="{{ cuisine }}">{{ cuisine }}</option>
              </select>
        </div>

        <div class="form-group">
          <label for="title">Address</label>
          <input type="text"
                 class="form-control"
                 name="address"
                 ng-model="$ctrl.restaurantInfo.restaurant.address">
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="text"
                 class="form-control"
                 name="phone"
                 ng-model="$ctrl.restaurantInfo.restaurant.phone">
        </div>

        <div class="form-group">
          <label for="hours">Hours</label>
          <input type="text"
                 class="form-control"
                 name="hours"
                 ng-model="$ctrl.restaurantInfo.restaurant.hours">
        </div>

        <a ng-click="$ctrl.show(restaurantInfo.restaurant)" class="btn btn-primary">Back</a>
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  `,
  controller: function(restaurantService, $state, $stateParams) {
    this.restaurant = null;
    this.cuisines = ['American', 'Chinese', 'Italian', 'Japanese'];


    this.show = function() {
      $state.go('restaurant-show', { id: this.restaurantInfo.restaurant._id });
    };

    this.save = function() {
      restaurantService.update(this.restaurantInfo.restaurant)
      .then( res => {
        $state.go('restaurants');
      });
    };

    restaurantService.getRestaurant($stateParams.id)
    .then( res => {
      this.restaurantInfo = res.data;
    });
  }
});
