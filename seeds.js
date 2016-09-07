var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var User = require('./models/user');
var Item = require('./models/item');
var Order = require('./models/order');
var Restaurant = require('./models/restaurant');

mongoose.connect('mongodb://localhost/orderup');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old items...');
Item.remove({})
.then(function() {
  console.log('removing old users...');
  return User.remove({})
})
.then(function() {
  console.log('removing old restaurants...');
  return Restaurant.remove({})
})
.then(function() {
  console.log('removing old orders...');
  return Order.remove({});
})
.then(function() {
  console.log('creating new users');
  let adele = new User();
  adele = {
    local:  { email: 'hello@itsme.com', password: adele.encrypt('123') },
    firstName: 'Adele',
    lastName: 'Adkins',
    restaurants: []
  };

  let andre = new User();
  andre = {
    local: { email: 'hey@ya.com', password: andre.encrypt('123') },
    firstName: 'Andre',
    lastName: '3000',
    restaurants: []
  };
  console.log(adele);
  console.log(andre);
  return [User.create(adele), User.create(andre)];
})
.then(function() {
  console.log('creating some new restaurants...');
  var fellinis    = new Restaurant({ title: 'Fellinis' });
    console.log(fellinis);
    Restaurant.create([fellinis]);
    quit();
  }),
// .then(function(restaurant) {
//   var test = User.find({ "local.email" : "hello@itsme.com" });
//   console.log(test)
//   .then(function(adele) {
//     adele.restaurants.push(restaurant._id);
//   })
// }),
// .then(function(savedTodos) {
//   console.log('Just saved', savedTodos.length, 'todos.');
//   return Todo.find({}).populate('user');
// })
// .then(function(allTodos) {
//   console.log('Printing all todos:');
//   allTodos.forEach(function(todo) {
//     console.log(todo.toString());
//   });
 function(err) {
  return handleError(err);
}
