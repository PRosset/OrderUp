angular.module('myApp')
.component('itemNew', {
  template: `
    <h3>NEW MENU ITEM</h3>
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
               name="categories">
              <option ng-repeat="x in $ctrl.categories">{{x}}</option>
            </select>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="text"
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

      <a ui-sref="items" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(itemService, $state) {
    this.categories = ['Appetizer', 'Entree', 'Sides', 'Desserts', 'Drinks'];

    this.item = {
      title: '',
      category: '',
      price: '',
      description: '',
      restaurant: location.hash.split('/')[2]
    };

    this.save = function() {
      itemService.create(this.item)
      .then( res => {
        $state.go('restaurant-show', { id: this.item.restaurant });
      });
    };
  }
});
