var app = require('../app')
    , request = require('supertest')(app);

describe('Home Controller - ',function(){

    it('Must return the status 200 when get /',function(done){
        request
        .get('/')
        .end(function(err, res){
          expect(res.status).toBe(200);
          done();
        });
    });

    it('Must return the status 200 when get /local',function(done){
        request
        .get('/local')
        .end(function(err,res){
          expect(res.status).toBe(200);
          done();
        });
    });

});
