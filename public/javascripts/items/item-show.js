angular.module('myApp')
.component('itemShow', {
  template: `
    <h3>Menu Item Information</h3>
    <div class="itemShow">
      <p class="itemTitle">{{ $ctrl.item.title }}</p>
      <p><b>Category: </b> {{$ctrl.item.category }}</p>
      <p><b>Price: </b>{{ $ctrl.item.price | currency }}</p>
      <p><b>Description: </b> {{ $ctrl.item.description }}</p>
    </div>

      <a ng-click="$ctrl.back(item)" class="btn btn-primary">Back</a>
      <a ng-click="$ctrl.edit(item)" class="btn btn-warning">Edit</a>

  `,
  controller: function(itemService, $state, $stateParams) {
    this.item = null;

    this.edit = function() {
      $state.go('item-edit', { id: this.item._id });
    };

    this.back = function() {
      $state.go('restaurant-show', { id: this.item.restaurant });
    };

    itemService.getItem($stateParams.id)
    .then( res => {
      this.item = res.data;
    });
  }
});
