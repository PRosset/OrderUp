angular.module('myApp')
.service('itemService', function($http) {

  this.getItems = function() {
    return $http.get('/item');
  };

  this.getItem = function(id) {
    return $http.get('/item/' + id);
  };

  this.toggle = function(item) {
    return $http.get('/item/' + item._id + '/toggle');
  };

  this.create = function(item) {
    return $http.post('/item', item);
  };

  this.update = function(item) {
    return $http.put('/item/' + item._id, item);
  };

  this.delete = function(item) {
    return $http.delete('/item/' + item._id);
  };
});
