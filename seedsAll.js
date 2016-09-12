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
    local:  {
      email: 'hello@itsme.com',
      password: adele.encrypt('123')
    },
    firstName: 'Adele',
    lastName: 'Adkins'
  };

  let andre = new User();
  andre = {
    local: {
      email: 'hey@ya.com',
      password: andre.encrypt('123')
    },
    firstName: 'Andre',
    lastName: '3000'
  };
  console.log(adele);
  console.log(andre);
  return User.create(adele, andre);
})
.then(function() {
  return User.findOne({ "local.email" : "hello@itsme.com" });
})
.then(function(owner) {
  console.log('creating some new restaurants...');
  let fellinis = new Restaurant({
    title: 'Fellinis',
    owner: owner._id,
    cuisine: 'Italian',
    address: '123 Ponce de Leon, Atlanta, GA 30308',
    phone: '(404) 123-4567',
    hours: 'M-F 10AM-2AM'
  });
  let boccalupo = new Restaurant({
    title: 'Bocca Lupo',
    owner: owner._id,
    cuisine: 'Italian',
    address: '753 Edgewood Ave NE, Atlanta, GA ',
    phone: '(404) 577-2332',
    hours: 'M-F 10AM-10PM'
  });
  let stapleHouse = new Restaurant({
    title: 'Staple House',
    owner: owner._id,
    cuisine: 'American',
    address: '541 Edgewood Ave SE, Atlanta, GA ',
    phone: '(404) 524-5005',
    hours: 'M-F 10AM-10PM'
  });
  let gunShow = new Restaurant({
    title: 'Gun Show',
    owner: owner._id,
    cuisine: 'Eclectic',
    address: '924 Garrett St, Atlanta, GA',
    phone: '(404) 380-1886',
    hours: 'T-S 6PM-9PM'
  });
  let optimist = new Restaurant({
    title: 'The Optimist',
    owner: owner._id,
    cuisine: 'Seafood',
    address: '914 Howell Mill Rd, Atlanta, GA',
    phone: '(404) 477-6260',
    hours: 'M-S 11:30AM-10PM'
  });
  let taqueriaDelSol = new Restaurant({
    title: 'Taqueria Del Sol',
    owner: owner._id,
    cuisine: 'Mexican',
    address: '1200 Howell Mill Rd NW, Atlanta, GA',
    phone: '(404) 352-5811',
    hours: 'M-S 11AM-10PM'
  });
  let sos = new Restaurant({
    title: 'S.O.S. Tiki Bar',
    owner: owner._id,
    cuisine: 'Cocktail Bar',
    address: '340 Church St, Decatur, GA',
    phone: '(404) 377-9308',
    hours: 'W-S 6PM-2AM'
  });
  let mcdonalds = new Restaurant({
    title: "McDonald's",
    owner: owner._id,
    cuisine: 'Fast Food',
    address: '526 Ponce De Leon Ave NE, Atlanta, GA',
    phone: '(404) 874-7848',
    hours: 'All day, Err Day'
  });

  console.log(fellinis);
  return Restaurant.create([fellinis, boccalupo, stapleHouse, gunShow, optimist, taqueriaDelSol, sos, mcdonalds]);
})
.then(function(restaurant) {
  let slice = new Item({
    title: "Slice",
    price: 4.40,
    restaurant: restaurant[0]._id,
    category: 'Appetizer',
    description: 'A single slice of pizza'
  });
  let sicillianSlice = new Item({
    title: "Sicillian Slice",
    price: 4.60,
    restaurant: restaurant[0]._id,
    category: 'Appetizer',
    description: 'A single Sicillian slice of pizza'
  });
  let mediumPizza = new Item({
    title: "Medium Pizza",
    price: 19,
    restaurant: restaurant[0]._id,
    category: 'Entree',
    description: 'A medium sized pizza'
  });
  let largePizza = new Item({
    title: "Large Pizza",
    price: 21,
    restaurant: restaurant[0]._id,
    category: 'Entree',
    description: 'A large sized pizza'
  });
  let sicillianPizza = new Item({
    title: "Sicillian Pizza",
    price: 23.50,
    restaurant: restaurant[0]._id,
    category: 'Entree',
    description: 'A Sicillian style pizza'
  });
  let salads = new Item({
    title: "A Big Salad",
    price: 5.25,
    restaurant: restaurant[0]._id,
    category: 'Sides',
    description: 'Big lettuce, big carrots, tomatoes like volleyballs'
  });
  let swFellinis = new Item({
    title: 'Sweet Water 420',
    price: 4.20,
    restaurant: restaurant[0]._id,
    category: 'Drinks',
    description: 'A local atlanta beer'
  });
  let dessertFellinis = new Item({
    title: 'Dessert',
    price: 3.99,
    restaurant: restaurant[0]._id,
    category: 'Desserts',
    description: 'It has some choclate or something'
  });
  let elijayFarmEgg = new Item({
    title: 'Elijay Farm Egg',
    price: 13,
    restaurant: restaurant[1]._id,
    category: 'Appetizer',
    description: 'Elijay farm egg, white asparagus, butterbeans, green garlic'
  });
  let calamari = new Item({
    title: 'Calimari',
    price: 11.00,
    restaurant: restaurant[1]._id,
    category: 'Appetizer',
    description: 'Calamari in Sicilian tomate brodetto'
  });
  let risotto = new Item({
    title: 'Green garlic Risotto',
    price: 19,
    restaurant: restaurant[1]._id,
    category: 'Entree',
    description: 'With favas, sugar snaps & vidalias'
  });
  let wildBoar = new Item({
    title: 'Wild Boar & Eggplant',
    price: 16,
    restaurant: restaurant[1]._id,
    category: 'Entree',
    description: 'baked penne, pomodoro, sprout & parm salad'
  });

  return Item.create([slice, sicillianSlice, mediumPizza, largePizza, sicillianPizza,
                     salads, swFellinis, dessertFellinis, elijayFarmEgg, calamari,
                     risotto, wildBoar]);
})
.then(function() {
  return Restaurant.find({})
})
.then(function() {
  quit();
}),
 function(err) {
  return handleError(err);
}
