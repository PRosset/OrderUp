angular.module('myApp')
.component('itemNew', {
  template: `
    <h3>NEW MENU ITEM</h3>
    <h4> RESTAURANT ID: </h4>
    <form ng-submit="$ctrl.save()">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               ng-model="$ctrl.item.title">
      </div>

      <div class="form-group">
        <label for="title">Price</label>
        <input type="text"
               class="form-control"
               name="price"
               ng-model="$ctrl.item.price">
      </div>

      <a ui-sref="items" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(itemService, $state) {
    this.item = {
      title: '',
      price: '',
      restaurant: location.hash.split('/')[2]
    };

    this.save = function() {
      itemService.create(this.item)
      .then( res => {
        $state.go('items');
      });
    };
  }
});
