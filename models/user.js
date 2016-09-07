var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  local : {
    email       : String,
    password    : String
  },
  firstName   : { type: String, required: true },
  lastName    : { type: String, required: true },
  restaurants : [ {  type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' } ]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
