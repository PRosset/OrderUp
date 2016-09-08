var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

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
  Restaurant.find({ user: req.user }).sort('-createdAt')
  .then(function(restaurants) {
    res.json(restaurants);
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Restaurant.findById(req.params.id)
  .then(function(restaurant) {
    if (!restaurant) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(restaurant.user)) return next(makeError(res, 'Unauthorized', 401));
    restaurant.title = req.body.title;
    restaurant.completed = req.body.completed ? true : false;
    return restaurant.save();
  })
  .then(function(restaurant) {
    res.json(restaurant);
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
