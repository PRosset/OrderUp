angular.module('myApp')
.component('restaurants', {
  template: `
    <div class="row">
        <div class="col-lg-4 col-md-offset-4 input-lg">
          <input type="text" class="form-control" ng-model="search" placeholder="Search for a restaurant">
        </div>
    </div>

    <div id="restaurantList" class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="restaurants col-md-6" ng-click="$ctrl.show(restaurant)" ng-repeat="restaurant in $ctrl.restaurants | filter: search">
          <p class="restaurantName">{{ restaurant.title }}</p>
          <hr/>
          <button ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.delete(restaurant)" class="deleteBtn btn btn-xs btn-danger">X</button>
          <p class="restaurantAddress">{{ restaurant.address }}</p>
          <p><b>Hours: </b>{{ restaurant.hours }}</p>
          <p>{{ restaurant.phone }}</p>
        </div>
      </div>
    </div>

  <div class="footer navbar-fixed-bottom">
    <p>Own a spot? <a ui-sref="restaurant-new" class="btn btn-default">Add a restaurant</a>
    </p>
  </div>
  `,
  controller: function(restaurantService, Auth, $state) {
    this.restaurants = null;
    this.cuisines = ['American', 'Chinese', 'Italian', 'Japanese'];

    // this.pagination = {
    //       currentPage: 1,
    //       maxSize: 21
    //   };

    this.getRestaurants = function() {
      restaurantService.getRestaurants()
      .then( res => {
        this.restaurants = res.data;
        // this.pagination.totalItems = this.restaurants.length;

      });
    };

    this.getRestaurants();

    // this.pageChanged = function() {
    //   console.log('Page changed to: ' + this.currentPage);
    // };

    this.show = function(restaurant) {
      $state.go('restaurant-show', { id: restaurant._id });
    };

    this.delete = function(restaurant) {
      var removedRestaurant = this.restaurants.indexOf(restaurant);
      this.restaurants.splice(removedRestaurant, 1);
      restaurantService.delete(restaurant);
    };

    this.checkOwner = function(restaurant) {
      return Auth.getCurrentUserSync().id === restaurant.owner;
    };
  }
});

