var local = require('./passport-strategies/local');

module.exports = function(passport,app) {

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req,res,next){
      app.locals.user = req.user;
      next();  
  });

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

  passport.use(local);
}
