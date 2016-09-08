angular.module('myApp')
.service('restaurantService', function($http) {

  this.getRestaurants = function() {
    return $http.get('/restaurants');
  };

  this.getRestaurant = function(id) {
    return $http.get('/restaurants/' + id);
  };

  this.create = function(restaurant) {
    return $http.post('/restaurants', restaurant);
  };

  this.update = function(restaurant) {
    return $http.put('/restaurants/' + restaurant._id, restaurant);
  };

  this.delete = function(restaurant) {
    return $http.delete('/restaurants/' + restaurant._id);
  };
});
