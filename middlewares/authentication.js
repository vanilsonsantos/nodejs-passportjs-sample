module.exports = function(app) {
  app.use(function(req,res,next){
      app.locals.user = req.user;
      next();
  });

  app.use('/login',function(req,res,next){
      if(req.user) {
        return res.redirect('/');
      }
      next();
  });
}
