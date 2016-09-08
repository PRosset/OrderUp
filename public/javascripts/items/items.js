angular.module('myApp')
.component('items', {
  template: `
    <h1>ITEMS</h1>
    <div class="items" ng-repeat = "item in $ctrl.items">
      <a ng-click="$ctrl.show(item)">{{ item.title }}</a>
      <button ng-click="$ctrl.delete(item)" class="btn btn-xs btn-danger">X</button>
    </div>
    <hr/>
    <a ui-sref="item-new" class="btn btn-primary">New</a>
  `,
  controller: function(itemService, $state) {
    this.item = null;

    this.getItems = function() {
      itemService.getItems()
      .then( res => {
        this.items = res.data;
      });
    };

    this.getItems();

    this.show = function(item) {
      $state.go('item-show', { id: item._id });
    };

    this.delete = function(item) {
      itemService.delete(item)
      .then( res => {
        this.getItems();
      });
    };
  }
});
