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
      <a ui-sref="restaurants" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(restaurantService, $state) {
    this.restaurant = {
      title: ''
    };

    this.save = function() {
      restaurantService.create(this.restaurant)
      .then( res => {
        $state.go('restaurants');
      });
    };
  }
});