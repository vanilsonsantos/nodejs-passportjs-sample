var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
      process.nextTick(function() {
        var User = require('mongoose').model('users');
        User.findOne({ 'local.username' : username },function(err,user){

            if(err) return done(err);

            if(user) {
                return done(null, false, { message : 'User already exists.' });
            }
            if(password != req.body.samepassword) {
                return done(null, false, { message : 'Passwords must be the same.' });
            }else {
                var newLocalUser = new User();
                newLocalUser.local.username = req.body.username;
                newLocalUser.generateHash(req.body.password,function(err,hash){
                    if(err) throw err;
                    newLocalUser.local.password = hash;
                    newLocalUser.save(function(err){
                      if(err) throw err;
                      req.session.strategy = 'local';
                      return done(null,newLocalUser);
                    });
                });
            }
        });
      });
    }
);
