module.exports = function(app) {

    var homeController = {
      index: function(req,res){
        res.render('home');
      }
    }

    return homeController;
}
