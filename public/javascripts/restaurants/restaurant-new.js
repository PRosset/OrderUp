angular.module('myApp')
.component('restaurantNew', {
  template: `
    <h3>NEW</h3>
    <form ng-submit="$ctrl.save()">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               ng-model="$ctrl.restaurant.title">
      </div>

      <div class="form-group">
        <label for="cuisine">Cuisine</label>
            <select type="text"
               class="form-control"
               name="cuisine">
              <option ng-repeat="x in $ctrl.cuisine"
              value="{{x}}">{{x}}</option>
            </select>
      </div>

      <div class="form-group">
        <label for="title">Address</label>
        <input type="text"
               class="form-control"
               name="address"
               ng-model="$ctrl.restaurant.address">
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="text"
               class="form-control"
               name="phone"
               ng-model="$ctrl.restaurant.phone">
      </div>

      <div class="form-group">
        <label for="hours">Hours</label>
        <input type="text"
               class="form-control"
               name="hours"
               ng-model="$ctrl.restaurant.hours">
      </div>

      <a ui-sref="restaurants" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(restaurantService, $state) {
    this.cuisine = ['American', 'Chinese', 'Italian', 'Japanese'];

    this.restaurant = {
      title: '',
      cuisine: '',
      address: '',
      phone: '',
      hours: ''
    };

    this.save = function() {
      restaurantService.create(this.restaurant)
      .then( res => {
        $state.go('restaurants');
      });
    };
  }
});
