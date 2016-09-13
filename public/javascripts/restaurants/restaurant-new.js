angular.module('myApp')
.component('restaurantNew', {
  template: `
    <div class="col-md-10 col-md-offset-1">
      <h3>Add a New Restaurant</h3>
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
                 name="cuisine"
                 ng-model="$ctrl.restaurant.cuisine">
                <option ng-repeat="cuisine in $ctrl.cuisines"
                value="{{ cuisine }}">{{ cuisine }}</option>
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
    </div>
  `,
  controller: function(restaurantService, $state) {
    this.cuisines = ['African', 'American', 'Asian Fusion', 'Bagels', 'Barbeque', 'British', 'Cajun', 'Cantonese', 'Chinese',
                    'Cuban', 'Deli', 'Ethiopian', 'French', 'German', 'Greek', 'Hawaiian', 'Indian', 'Italian', 'Jamacian',
                    'Japanese', 'Korean', 'Kosher', 'Latin American', 'Mexican', 'Moroccan', 'Nepalese', 'Persian', 'Peruvian',
                    'Russian', 'Seafood','Soul Food', 'Southern', 'Spanish', 'Steakhouse', 'Sushi', 'Tapas', 'Tex Mex', 'Thai',
                    'Vegan', 'Vegetarian', 'Vietnamese'];
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
