var passport = require('passport');

module.exports = function(app) {
  var home = app.controllers.home;
  var local = app.controllers.local;
  var signup = app.controllers.signup;

  app.get('/', home.index);
  app.get('/login/local', local.index);
  app.post('/login/local', passport.authenticate('local-login',
                      { successRedirect: '/',
                        failureRedirect: '/login/local',
                        failureFlash: true })
  );
  app.get('/login/local/signup', signup.index);
  app.post('/login/local/signup', passport.authenticate('local-signup',
                      { successRedirect: '/',
                        failureRedirect: '/login/local/signup',
                        failureFlash: true })
  );
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
