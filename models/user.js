module.exports = function() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var user = new Schema({
      username: String,
      password: String
  });

  return mongoose.model('users',user);
}
