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
        <label for="category">Category</label>
            <select type="text"
               class="form-control"
               name="category"
               ng-model="$ctrl.item.category">
              <option ng-repeat="category in $ctrl.categories"
              value="{{ category }}"> {{ category }} </option>
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
        <label for="description">Description</label>
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
        $state.go('item-show', { id: this.item._id } );
      });
    };

    itemService.getItem($stateParams.id)
    .then( res => {
      this.item = res.data;
    });
  }
});
