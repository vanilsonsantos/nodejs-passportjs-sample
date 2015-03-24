var passport    = require('passport');
var local       = require('./passport-strategies/localsignin');
var localSignup = require('./passport-strategies/localsignup');
var facebook    = require('./passport-strategies/facebook');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log('serializing user: ' + user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    var User = require('mongoose').model('users');
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });
  passport.use('local-login',local);
  passport.use('local-signup',localSignup);
  passport.use('facebook',facebook);
}
