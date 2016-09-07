angular.module('myApp')
.component('itemEdit', {
  template: `
    <h3>EDIT</h3>

    <form ng-submit="$ctrl.save()">

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               ng-model="$ctrl.item.title">
      </div>

      <div class="form-group">
        <label for="completed">Completed</label>
        <input type="checkbox"
               class="form-control"
               name="completed"
               ng-model="$ctrl.item.completed">
      </div>

      <a ng-click="$ctrl.show()" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(itemService, $state, $stateParams) {
    this.item = null;

    this.show = function() {
      $state.go('item-show', { id: this.item._id });
    };

    this.save = function() {
      itemService.update(this.item)
      .then( res => {
        $state.go('items');
      });
    };

    itemService.getItem($stateParams.id)
    .then( res => {
      this.item = res.data;
    });
  }
});
