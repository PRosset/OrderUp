angular.module('myApp')
.component('restaurantShow', {
  template: `
    <a ui-sref="restaurants" class="btn btn-primary">Back</a>
    <a ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.edit(restaurant)" class="btn btn-warning">Edit</a>
    <a ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.newItem(restaurant)" class="btn btn-warning">New Menu Item</a>

    <div class="restaurantDetails">
      <h3>{{ $ctrl.restaurantInfo.restaurant.title }}</h3>
      <hr/>
      <p><b>Cuisine: </b>{{ $ctrl.restaurantInfo.restaurant.cuisine }}</p>
      <p><b>Address: </b>{{ $ctrl.restaurantInfo.restaurant.address }}</p>
      <p><b>Phone: </b>{{ $ctrl.restaurantInfo.restaurant.phone }}</p>
      <p><b>Hours: </b>{{ $ctrl.restaurantInfo.restaurant.hours }}</p>
    </div>

    <div class="categories col-xs-6 col-md-offset-3">
      <uib-tabset type="pills" active="activeItemId" ng-model="$ctrl.item.category">
        <uib-tab class="pillButton" ng-repeat="category in $ctrl.categories" heading="{{category}}" ng-click="$ctrl.sendCategory(category)"></uib-tab>
      </uib-tabset>
    </div>

    <div class="menuItems">
      <div class="items" ng-repeat="item in $ctrl.restaurantInfo.items | orderBy: 'category' | filter : $ctrl.search ">
        <h4><a class="itemTitle" ng-click="$ctrl.show(item)">{{ item.title }}</a>
          <button ng-if="$ctrl.checkOwner(restaurant)" ng-click="$ctrl.deleteItem(item)" class="btn btn-xs btn-danger">X</button>
        </h4>
        <p class="itemDescription"><b>Price: </b>{{ item.price | currency}}</p>
        <p class="itemDescription"><b>Description: </b>{{ item.description }}</p>
        <p class="itemDescription"><b>Category: </b>{{ item.category }}</p>
      </div>
    </div>
  `,
  controller: function(restaurantService, Auth, $state, $stateParams) {
    this.restaurant = null;
    this.categories = ['Appetizer', 'Entree', 'Sides', 'Desserts', 'Drinks'];
    this.activeItemId = 0;

    this.sendCategory = function(category) {
     this.search = category;
     console.log(category.id);
     console.log('I fired');
     console.log(this.search);
    };


    this.show = function(item) {
      $state.go('item-show', { id: item._id });
    };

    this.edit = function() {
      $state.go('restaurant-edit', { id: this.restaurantInfo.restaurant._id });
    };

    this.newItem = function() {
      $state.go('item-new2', { id: this.restaurantInfo.restaurant._id });
    };

    this.deleteItem = function(item) {
      var deletedItem = this.restaurantInfo.items.indexOf(item)
      this.restaurantInfo.items.splice(deletedItem, 1);
      restaurantService.deleteItem(item);
    };

    restaurantService.getRestaurant($stateParams.id)
    .then( res => {
      this.restaurantInfo = res.data;
    });

    this.checkOwner = function(restaurant) {
      return Auth.getCurrentUserSync().id === this.restaurantInfo.restaurant.owner;
    };
  }
});



    // <div class="categories col-xs-6 col-md-offset-3">
    //   <uib-tabset type="pills" active="activeItemId" ng-model="$ctrl.item.category" ng-repeat="category in $ctrl.categories">
    //     <uib-tab heading="{{category}}" ng-click="$ctrl.sendCategory(category)"></uib-tab>
    //   </uib-tabset>
    // </div>
