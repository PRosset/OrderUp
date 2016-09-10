var mongoose = require('mongoose');

// var Restaurant = require('./restaurant.js');

var ItemSchema = new mongoose.Schema({
    title:        { type: String,  required: true },
    category:     { type: String },
    price:        { type: Number,  required: true },
    description:  { type: String },
    restaurant:   { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

module.exports = mongoose.model('Item', ItemSchema);
