angular.module('myApp')
.component('itemShow', {
  template: `
    <h3>SHOW ITEM</h3>
    <p><b>Title: </b>{{ $ctrl.item.title }}</p>
    <p><b>Price: </b>{{ $ctrl.item.price}}</p>
    <p><b>Item ID: </b>{{ $ctrl.item._id }}</p>

    <a ui-sref="restaurant-show" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(item)" class="btn btn-warning">Edit</a>
    <!-- I could not get the opts to work this way:
    <!-- <a ui-sref="item-edit" ui-sref-opts="{ id: $ctrl.item._id }" class="btn btn-primary">Edit</a> -->
  `,
  controller: function(itemService, $state, $stateParams) {
    this.item = null;

    this.edit = function() {
      $state.go('item-edit', { id: this.item._id });
    };

    itemService.getItem($stateParams.id)
    .then( res => {
      this.item = res.data;
    });
  }
});
