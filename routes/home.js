var passport = require('passport');

module.exports = function(app) {
  var home = app.controllers.home;
  var local = app.controllers.local;
  var signup = app.controllers.signup;

  app.get('/', home.index);
  app.get('/local', local.index);
  app.post('/local', passport.authenticate('local',
                      { successRedirect: '/',
                        failureRedirect: '/local',
                        failureFlash: true })
  );
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  app.get('/signup', signup.index);
}
