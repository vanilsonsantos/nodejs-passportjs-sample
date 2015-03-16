var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    function(username, password, done) {
      var User = require('mongoose').model('users');
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null,false , { message: 'Incorrect username.' });
          }
          user.isValidPassword(password, user.password, function(err,res) {
              if(err) throw err;
              if(!res) {
                return done(null, false,  { message: 'Incorrect password.' });
              } else {
                return done(null, user);
              }
          });
        });
    }
);
