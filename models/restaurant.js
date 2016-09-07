var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    title:        { type: String,  required: true },
    address:      { type: String,  required: true },
    description:  { type: String,  required: true },
    menu:       [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item'  } ],
    orders:     [ { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } ]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
