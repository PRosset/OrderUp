angular.module('myApp')
.component('home', {
  template: `
  <section class="container well text-center">
    <h1>{{ $ctrl.name }}</h1>
  </section>
  `,
  controller: function() {
    this.name = 'Order Up';
  }
});
