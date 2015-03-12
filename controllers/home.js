module.exports = function(app) {

  var homeController = {
    index: function(req,res){
      if(req.session.passport.user) {
        res.render('home', { logged : true , user : req.user.username});
      } else {
        res.render('home', { logged : false });
      }
    }
  }

  return homeController;
}
