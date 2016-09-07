angular.module('myApp')
.component('orders', {
  template: `
    <h1>Menu Items</h1>
    <div class="orders" ng-repeat = "order in $ctrl.orders">
      <span ng-show="order.completed" ng-click="$ctrl.toggle(order)" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="order.completed" ng-click="$ctrl.toggle(order)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
      <a ng-click="$ctrl.show(order)">{{ order.title }}</a>
      <button ng-click="$ctrl.delete(order)" class="btn btn-xs btn-danger">X</button>
    </div>
    <hr/>
    <a ui-sref="order-new" class="btn btn-primary">New</a>
  `,
  controller: function(orderService, $state) {
    this.orders = null;

    this.getOrders = function() {
      orderService.getOrders()
      .then( res => {
        this.orders = res.data;
      });
    };

    this.getOrders();

    this.show = function(order) {
      $state.go('order-show', { id: order._id });
    };

    this.toggle = function(order) {
      orderService.toggle(order)
      .then( res => {
        this.getOrders();
      });
    };

    this.delete = function(order) {
      orderService.delete(order)
      .then( res => {
        this.getOrders();
      });
    };
  }
});
