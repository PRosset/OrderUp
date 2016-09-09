var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');
var Item = require('../models/item');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json( { message: 'Please signup or login.'} );
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the restaurants and render the index view
  Restaurant.find({}).sort('-createdAt')
  .then(function(restaurants) {
    res.json(restaurants);
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var restaurant = new Restaurant({
    title: req.body.title,
    owner: req.user
  });
  restaurant.save()
  .then(function(saved) {
    res.json(restaurant);
  }, function(err) {
    return next(err);
  });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Restaurant.findById(req.params.id)
  .then(function(restaurant) {
    if (!restaurant) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(restaurant.user)) return next(makeError(res, 'You do not own that restaurant', 401));
    // res.json(restaurant);
    Item.find({"restaurant" : restaurant._id})
    .then(function(items) {
      console.log(items);
      // restaurantInfo = { items, restaurant };
      res.json(items);
    })
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Restaurant.findById(req.params.id)
  .then(function(restaurant) {
    if (!restaurant) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(restaurant.user)) return next(makeError(res, 'Unauthorized', 401));
    restaurant.title = req.body.title;
    return restaurant.save();
  })
  .then(function(restaurant) {
    res.json(restaurant);
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  Restaurant.findById(req.params.id)
  .then(function(restaurant) {
    if (!restaurant) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(restaurant.user)) return next(makeError(res, 'Unauthorized', 401));
    return Restaurant.remove( { _id: restaurant._id } );
  })
  .then(function() {
    res.status(204).end();
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
