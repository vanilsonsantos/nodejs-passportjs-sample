module.exports = function(app) {

  var localController = {
      index: function(req,res){
        res.render('./home/local');
      }
  };

  return localController;
}
