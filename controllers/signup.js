module.exports = function(app) {
    var signupController = {
        index:function(req,res){
            res.render('./home/signup');  
        }
    }

    return signupController;
}
