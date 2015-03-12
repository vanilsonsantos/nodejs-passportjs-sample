var passport = require('passport');

module.exports = function(app) {
  var home = app.controllers.home;
  var local = app.controllers.local;

  app.get('/', home.index);
  app.get('/local', local.index);
  app.post('/local', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/local'); }
      req.logIn(user, function(err) {
         if (err) { return next(err); }
         return res.redirect('/');
      });
    })(req, res, next);
  });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
