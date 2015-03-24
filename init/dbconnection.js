var mongoose = require('mongoose');

module.exports = function(url) {
  var dbSettings = {
    connect: function() {
      mongoose.connect(url);
      var db = mongoose.connection;
      db.on('error', console.error.bind(console,'Mongodb connection error..'));
      db.once('open',function(){
        console.log('Mongodb server running..');
      });
    }
  }
  return dbSettings;
}
