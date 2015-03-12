var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    function(username, password, done) {
      var User = require('mongoose').model('users');
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              console.log('User Not Found with username ' + username);
              return done(null,false);
          }
          if (!isValidPassword(user, password)){
              console.log('Invalid Password');
              return done(null, false);
          }
          return done(null, user);
        });
        var isValidPassword = function(user, password){
            return ((user.password == password) ? true : false );
        }
    }
);
