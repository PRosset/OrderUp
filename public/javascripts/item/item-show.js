angular.module('myApp')
.component('itemShow', {
  template: `
    <h3>SHOW</h3>
    <p><b>Title: </b>{{ $ctrl.item.title }}</p>
    <p><b>ID: </b>{{ $ctrl.item._id }}</p>
    <p><b>Completed: </b>
      <span ng-show="$ctrl.item.completed" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="$ctrl.item.completed" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
    </p>
    <p><b>Created: </b>{{ $ctrl.item.updatedAt | date : "medium" }}</p>
    <p><b>Last Updated: </b>{{ $ctrl.item.createdAt | date : "medium" }}</p>

    <a ui-sref="items" class="btn btn-primary">Back</a>
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
