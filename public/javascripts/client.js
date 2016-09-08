angular.module('myApp', ['ngMessages', 'ngAnimate', 'ui.router']);

angular.module('myApp')
.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    template: "<home></home>"
  })
  .state('about', {
    url: "/about",
    template: "<about></about>"
  })
  .state('login', {
    url: "/login",
    template: "<login></login>"
  })
  .state('signup', {
    url: "/signup",
    template: "<signup></signup>"
  })
  // .state('restaurants', {
  //   url: "/restaurants",
  //   template: "<restaurants></restaurants>"
  // })
  // .state('restaurant-new', {
  //   url: "/restaurants/new",
  //   template: "<restaurant-new></restaurant-new>"
  // })
  // .state('restaurant-show', {
  //   url: "/restaurants/:id",
  //   template: "<restaurant-show></restaurant-show>"
  // })
  // .state('restaurant-edit', {
  //   url: "/restaurants/edit/:id",
  //   template: "<restaurant-edit></restaurant-edit>"
  // })
  .state('items', {
    url: "/items",
    template: "<items></items>"
  })
  .state('item-new', {
    url: "/items/new",
    template: "<item-new></item-new>"
  })
  .state('item-show', {
    url: "/items/:id",
    template: "<item-show></item-show>"
  })
  .state('item-edit', {
    url: "/items/edit/:id",
    template: "<item-edit</item-edit>"
  });
});
