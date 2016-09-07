var mongoose = require('mongoose');

var Item = require('./item.js');
var User = require('./user.js');

var RestaurantSchema = new mongoose.Schema({
    title:        { type: String,  required: true },
    owner:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
