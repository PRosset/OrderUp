var mongoose = require('mongoose');

// var Restaurant = require('./restaurant.js');

var ItemSchema = new mongoose.Schema({
    title:        { type: String,  required: true },
    price:        { type: Number,  required: true },
    // restaurant:   { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}
});

module.exports = mongoose.model('Item', ItemSchema);
