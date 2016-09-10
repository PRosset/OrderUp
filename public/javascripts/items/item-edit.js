angular.module('myApp')
.component('itemEdit', {
  template: `
    <h3>EDIT ITEM</h3>

    <form ng-submit="$ctrl.save()">

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               ng-model="$ctrl.item.title">
      </div>

      <div class="form-group">
        <label for="title">Category</label>
            <select type="text"
               class="form-control"
               name="categories">
              <option ng-repeat="x in $ctrl.categories">{{x}}</option>
            </select>
      </div>

      <div class="form-group">
        <label for="title">Price</label>
        <input type="Number"
               class="form-control"
               name="price"
               ng-model="$ctrl.item.price">
      </div>

      <div class="form-group">
        <label for="title">Description</label>
        <input type="text"
               class="form-control"
               name="description"
               ng-model="$ctrl.item.description">
      </div>

      <a ng-click="$ctrl.show()" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(itemService, $state, $stateParams) {
    this.item = null;
    this.categories = ['Appetizer', 'Entree', 'Sides', 'Desserts', 'Drinks'];

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
