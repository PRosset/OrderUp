angular.module('myApp')
.service('restaurantService', function($http) {

  this.getRestaurants = function() {
    return $http.get('/restaurant');
  };

  this.getRestaurant = function(id) {
    return $http.get('/restaurant/' + id);
  };

  this.toggle = function(restaurant) {
    return $http.get('/restaurant/' + restaurant._id + '/toggle');
  };

  this.create = function(restaurant) {
    return $http.post('/restaurant', restaurant);
  };

  this.update = function(restaurant) {
    return $http.put('/restaurant/' + restaurant._id, restaurant);
  };

  this.delete = function(restaurant) {
    return $http.delete('/restaurant/' + restaurant._id);
  };
});
