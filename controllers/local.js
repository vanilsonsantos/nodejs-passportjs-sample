module.exports = function(app) {
  var localController = {
    index: function(req, res){
      res.render('./home/localsignin', { message : req.flash('error')});
    },
    signup: function(req, res){
      res.render('./home/localsignup', { message : req.flash('error')});
    }
  };
  return localController;
}
