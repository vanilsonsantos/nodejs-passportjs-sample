module.exports = function(app) {
  app.use(function(req,res,next){
      var user;
      switch(req.session.strategy){
          case 'local':
              user = req.user.local.username;
              break;
          case 'facebook':
              user = req.user.facebook.username;
              break;
      }
      app.locals.user = user;
      next();
  });

  app.use('/login',function(req,res,next){
      if(app.locals.user) {
        return res.redirect('/');
      }
      next();
  });
}
