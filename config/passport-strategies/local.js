var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    function(username, password, done) {
      var User = require('mongoose').model('users');
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null,false , { message: 'Incorrect username.' });
          }
          if (!isValidPassword(user, password)){
              return done(null, false,  { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
        var isValidPassword = function(user, password){
            return ((user.password == password) ? true : false );
        }
    }
);
