var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  completed:  { type: Boolean, required: true },
  items:    [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item'} ],
  orderName:  { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }  // createdAt, updatedAt
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

OrderSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

OrderSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};

OrderSchema.methods.toString = function() {
  let status = this.completed ? 'completed' : 'not completed';
  return `Todo: ${this.title} owned by ${this.user.local.email} is ${status}.`;
};

module.exports = mongoose.model('Order', OrderSchema);
