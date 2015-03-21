module.exports = function(app) {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Sorry, we couldn't find the page you have requested.");
    err.status = 404;
    next(err);
  });
  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message
    });
  });
};
