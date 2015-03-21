module.exports = function() {
  var mongoose = require('mongoose');
  var Schema   = mongoose.Schema;
  var bcrypt   = require('bcrypt-nodejs');

  var user = new Schema({
    local: {
      username: String,
      password: String
    },
    facebook: {
      id: Number,
      token: String,
      username: String
    }
  });

  user.methods.generateHash = function(password, next){
    return bcrypt.hash(password, null, null, next);
  };

  user.methods.isValidPassword = function(password, hash, next) {
    return bcrypt.compare(password, hash, next);
  };

  return mongoose.model('users', user);
}
