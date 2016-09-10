var express = require('express');
var router = express.Router();
var Item = require('../models/item');
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
  // get all the menu Items and render the index view
  Item.find({})
  .then(function(items) {
    console.log(items);
    res.json(items);
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', function(req, res, next) {
  Restaurant.findById({})
  var item = new Item({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    restaurant: req.body.restaurant
  });
  item.save()
  .then(function(saved) {
    res.json(item);
  }, function(err) {
    return next(err);
  });
});

// // SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Item.findById(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(item.user)) return next(makeError(res, 'You do not own that item', 401));
    res.json(item);
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Item.findById(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(item.user)) return next(makeError(res, 'Unauthorized', 401));
    item.title = req.body.title;
    item.category = req.body.category;
    item.price = req.body.price;
    item.description = req.body.description;
    return item.save();
  })
  .then(function(item) {
    res.json(item);
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  Item.findById(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(item.user)) return next(makeError(res, 'Unauthorized', 401));
    return Item.remove( { _id: item._id } );
  })
  .then(function() {
    res.status(204).end();
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
