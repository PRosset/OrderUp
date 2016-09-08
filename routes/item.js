var express = require('express');
var router = express.Router();
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
  // get all the items and render the index view
  Item.find({ user: req.user }).sort('-createdAt')
  .then(function(items) {
    res.json(items);
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var item = new Item({
    title: req.body.title,
    price: req.body.price,
    completed: req.body.completed ? true : false,
    user: req.user
  });
  item.save()
  .then(function(saved) {
    res.json(item);
  }, function(err) {
    return next(err);
  });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(item.user)) return next(makeError(res, 'You do not own that Item', 401));
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
    if (!req.user._id.equals(item.user)) return next(makeError(res, 'Unauthorized', 401));
    item.title = req.body.title;
    item.price = req.body.price;
    item.completed = req.body.completed ? true : false;
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
  Todo.findById(req.params.id)
  .then(function(item) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(item.user)) return next(makeError(res, 'Unauthorized', 401));
    return Item.remove( { _id: item._id } );
  })
  .then(function() {
    res.status(204).end();
  }, function(err) {
    return next(err);
  });
});

// TOGGLE completed status
router.get('/:id/toggle', authenticate, function(req, res, next) {
  Item.findById(req.params.id)
  .then(function(todo) {
    if (!item) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(item.user)) return next(makeError(res, 'Unauthorized', 401));
    item.completed = !item.completed;
    return item.save();
  })
  .then(function(item) {
    res.json(item);
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
