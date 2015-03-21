var passport = require('passport');

module.exports = function(app) {
  var home  = app.controllers.home;
  var local = app.controllers.local;

  app.get('/', home.index);
  app.get('/login/local', local.index);
  app.post('/login/local', passport.authenticate('local-login',
    { successRedirect: '/',
      failureRedirect: '/login/local',
      failureFlash: true })
  );
  app.get('/login/local/signup', local.signup);
  app.post('/login/local/signup', passport.authenticate('local-signup',
    { successRedirect : '/',
      failureRedirect : '/login/local/signup',
      failureFlash    : true })
  );
  app.get('/login/facebook/enter', passport.authenticate('facebook'));
  app.get('/login/facebook/callback', passport.authenticate('facebook',
    { successRedirect : '/',
      failureRedirect : '/login/local' })
  );
  app.get('/logout', function(req, res){
    req.session.strategy = null;
    req.logout();
    res.redirect('/');
  });
}
