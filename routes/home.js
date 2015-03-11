module.exports = function(app) {
  var home = app.controllers.home;
  var local = app.controllers.local;

  app.get('/', home.index);
  app.get('/local', local.index);
}
