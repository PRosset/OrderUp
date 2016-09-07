angular.module('myApp')
.component('items', {
  template: `
    <h1>Menu Items</h1>
    <div class="todos" ng-repeat = "todo in $ctrl.todos">
      <span ng-show="todo.completed" ng-click="$ctrl.toggle(todo)" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="todo.completed" ng-click="$ctrl.toggle(todo)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
      <a ng-click="$ctrl.show(todo)">{{ todo.title }}</a>
      <button ng-click="$ctrl.delete(todo)" class="btn btn-xs btn-danger">X</button>
    </div>
    <hr/>
    <a ui-sref="todo-new" class="btn btn-primary">New</a>
  `,
  controller: function(itemService, $state) {
    this.items = null;

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

    this.toggle = function(item) {
      itemService.toggle(item)
      .then( res => {
        this.getItems();
      });
    };

    this.delete = function(item) {
      itemService.delete(item)
      .then( res => {
        this.getItems();
      });
    };
  }
});
