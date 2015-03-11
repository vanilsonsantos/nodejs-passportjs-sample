module.exports = function(app) {

  var homeController = {
    index: function(req,res){
      res.render('home',{ title : 'Developer' });
    }
  }

  return homeController;
}
