var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('./auth');

module.exports = new FacebookStrategy({

      clientID     : auth.facebookAuth.clientID,
      clientSecret : auth.facebookAuth.clientSecret,
      callbackURL  : auth.facebookAuth.callbackURL,
      passReqToCallback : true

    },function(req, accessToken, refreshToken, profile, done){
        var User = require('mongoose').model('users');
        User.findOne({ 'facebook.id' : profile.id },function(err, user){
          if (err) throw err;
          if (user) {
            req.session.strategy = 'facebook';
            return done(null, user);
          } else {
            var newUser = new User();
            newUser.facebook.id    = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.username  = profile.name.givenName;
            newUser.save(function(err){
              if (err) throw err;
              req.session.strategy = 'facebook';
              return done(null, newUser);
            });
          }
        });
    }
);
