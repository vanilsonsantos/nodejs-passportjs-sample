var mongoose = require('mongoose');

describe('Mongodb server - ',function(){
    it('Verify if server is on',function(done){
      var db = mongoose.connection;
      db.on('error', function(err){
          expect(err.toString()).toBe('');
          done();
      });
      db.once('open',function(){
          expect(db._hasOpened).toBe(true);
          done();
      });
    })
});
