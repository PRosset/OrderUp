angular.module('myApp')
.service('itemService', function($http) {

  this.getItems = function() {
    return $http.get('/items');
  };

  this.getItem = function(id) {
    return $http.get('/items/' + id);
  };

  this.create = function(item) {
    return $http.post('/items', item);
  };

  this.update = function(item) {
    return $http.put('/items/' + item._id, item);
  };

  this.delete = function(item) {
    return $http.delete('/items/' + item._id);
  };
});
