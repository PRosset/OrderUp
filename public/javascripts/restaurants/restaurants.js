angular.module('myApp')
.component('restaurants', {
  template: `
    <br>
    <div class="row">
        <div class="col-lg-4 col-md-offset-4 input-lg">
          <input type="text" class="form-control" ng-model="search" placeholder="Search for a restaurant">
        </div>
    </div>
    <br>
    <div id="restaurantList" class="row">
      <div class="col-md-9 col-md-offset-1">
        <div class="restaurants col-md-5 col-md-offset-1" ng-click="$ctrl.show(restaurant)" ng-repeat="restaurant in $ctrl.restaurants | filter: search | rPagination : $ctrl.paginationSettings.currentPage : $ctrl.paginationSettings.recordsPerPage ">
          <p class="restaurantName">{{ restaurant.title }}</p>
          <hr/>
          <button ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.delete(restaurant)" class="deleteBtn btn btn-xs btn-danger">X</button>
          <p class="restaurantAddress">{{ restaurant.address }}</p>
          <p><b>Hours: </b>{{ restaurant.hours }}</p>
          <p>{{ restaurant.phone }}</p>
        </div>
      </div>
    </div>

        <ul uib-pagination total-items="$ctrl.restaurants.length" ng-model="$ctrl.paginationSettings.currentPage" class="pagination-sm"></ul>

    <br>
    <br>
    <br>
  <div class="footer navbar-fixed-bottom">
    <p>Own a spot? <a ui-sref="restaurant-new" class="btn btn-default">Add a restaurant</a>
    </p>
  </div>
  `,
  controller: function(restaurantService, Auth, $state) {
    this.restaurants = [];
    this.cuisines = ['American', 'Chinese', 'Italian', 'Japanese'];

    console.log(this.restaurants.length);
    this.paginationSettings = {
          totalItems: 6,
          currentPage: 1,
          recordsPerPage: 4
      };

    this.getRestaurants = function() {
      restaurantService.getRestaurants()
      .then( res => {
        this.restaurants = res.data;
        console.log(this.restaurants.length);
        this.paginationSettings.totalItems = this.restaurants.length;
        console.log("pagination settings: ", this.paginationSettings.totalItems);
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
})
.filter('rPagination', function() {
    return function(list, currentPage, recordsPerPage) {

      if (angular.isUndefined(list) || list.length <= 0)
        throw ("List either undefined or empty");

      if (angular.isUndefined(currentPage) || angular.isUndefined(recordsPerPage))
        throw ("Parameters for filter are not defined. [Param 1: current page, Param 2: records per page]");

      currentPage = currentPage - 1;
      var startSelectionIndex, endSelectionIndex;
      startSelectionIndex = currentPage * recordsPerPage;
      endSelectionIndex = startSelectionIndex + recordsPerPage;

      return list.slice(startSelectionIndex, endSelectionIndex);
    };
});
