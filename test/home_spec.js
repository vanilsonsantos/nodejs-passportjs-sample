var app = require('../app')
    , request = require('supertest')(app);

describe('Home Controller - ',function(){

    it('Must return the status 200 when get /',function(done){
        request
        .get('/')
        .end(function(err, res){
          if(err) throw err;
          expect(res.status).toBe(200);
          done();
        });
    });

    it('Must return the status 200 when get /local',function(done){
        request
        .get('/local')
        .end(function(err,res){
          if(err) throw err;
          expect(res.status).toBe(200);
          done();
        });
    });

    it('Must return succes route (/) when post /local',function(done){
        var user = { username : 'developer' , password : '010203' }
        request
        .post('/local')
        .send(user)
        .end(function(err,res){
          if(err) throw err;
          expect(res.headers.location).toBe('/');
          done();
        });
    });

    it('Must return succes route (/) when get /logout after login', function(done){
        var user = { username : 'developer' , password : '010203' }
        request
        .post('/local')
        .send(user)
        .end(function(err,res){
            if(err) throw err;
            request
            .get('/logout')
            .end(function(err,res){
              if(err) throw err;
              expect(res.headers.location).toBe('/');
              done();
            });
        });
    });

    it('Must return succes route (/signup) when get /signup',function(done){
        request
        .get('/signup')
        .end(function(err,res){
          if(err) throw err;
          expect(res.status).toBe(200);
          done();
        });
    });
});
