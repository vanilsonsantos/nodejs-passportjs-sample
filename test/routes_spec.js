var app = require('../app')
    , request = require('supertest')(app);

describe('Route tests - ',function(){

    describe('Home',function(){
        it('Must return the status 200 when get /',function(done){
            request
            .get('/')
            .end(function(err, res){
              if(err) throw err;
              expect(res.status).toBe(200);
              done();
            });
        });
    });

    describe('Login local strategy',function(){
        it('Must return the status 200 when get /local',function(done){
            request
            .get('/login/local')
            .end(function(err,res){
              if(err) throw err;
              expect(res.status).toBe(200);
              done();
            });
        });

        it('Must return succes route (/) when post /local with valid user',function(done){
            var user = { username : 'developer' , password : '010203' }
            request
            .post('/login/local')
            .send(user)
            .end(function(err,res){
              if(err) throw err;
              expect(res.headers.location).toBe('/');
              done();
            });
        });

        it('Must return route (/local) when post /local with invalid user',function(done){
            var user = { username : 'invaliduser' , password : '000000' }
            request
            .post('/login/local')
            .send(user)
            .end(function(err,res){
              if(err) throw err;
              expect(res.headers.location).toBe('/login/local');
              done();
            });
        });

        it('Must return succes route (/signup) when get /signup',function(done){
            request
            .get('/login/local/signup')
            .end(function(err,res){
              if(err) throw err;
              expect(res.status).toBe(200);
              done();
            });
        });
    });

    describe('Logout',function(){
        it('Must return succes route (/) when get /logout after login', function(done){
            var user = { username : 'developer' , password : '010203' }
            request
            .post('/login/local')
            .send(user)
            .end(function(err,res){
                if(err) throw err;
                expect(res.headers.location).toBe('/');
                request
                .get('/logout')
                .end(function(err,res){
                  if(err) throw err;
                  expect(res.headers.location).toBe('/');
                  done();
                });
            });
        });
    });
});
