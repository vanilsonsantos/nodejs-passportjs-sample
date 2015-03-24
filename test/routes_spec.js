var app      = require('../app');
var request  = require('supertest')(app);

describe('Route tests - ', function() {

  describe('Home - ', function() {
    it('Must return the status 200 when get /', function(done) {
      request
        .get('/')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.status).toBe(200);
          done();
        });
    });
  });

  describe('Login local strategy - ', function() {

    describe('Registering a new user - ', function() {
        it('Must return the status 200 when get /login/local/signup', function(done) {
          request
            .get('/login/local/signup')
            .end(function(err, res) {
              if (err) throw err;
              expect(res.status).toBe(200);
              done();
            });
        });

        it('Must return fail route (/login/local/signup) if passwords are not the same.', function(done) {
          var user = {
            username: 'newuser',
            password: '8986',
            samepassword: '1234'
          }

          request
            .post('/login/local/signup')
            .send(user)
            .end(function(err, res) {
              if (err) throw err;
              expect(res.headers.location).toBe('/login/local/signup');
              done();
            });
        });

        it('Must return sucess route (/) after register a user', function(done) {
          var user = {
            username: 'newuser',
            password: '8986',
            samepassword: '8986'
          }

          request
            .post('/login/local/signup')
            .send(user)
            .end(function(err, res) {
              if (err) throw err;
              expect(res.headers.location).toBe('/');
              done();
            });
        });

        it('Must return fail route (/login/local/signup) if user already exists', function(done) {
          var user = {
            username: 'registereduser',
            password: '8986',
            samepassword: '8986'
          }

          request
            .post('/login/local/signup')
            .send(user)
            .end(function(err, res) {
              if (err) throw err;
              request
              .post('/login/local/signup')
              .send(user)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.headers.location).toBe('/login/local/signup');
                done();
              });
            });
        });

        afterEach(function() {
          require('mongoose').model('users').findOne({ 'local.username' : 'newuser' }).remove().exec();
          require('mongoose').model('users').findOne({ 'local.username' : 'registereduser' }).remove().exec();
        });
      });

    describe('Logging a user - ', function() {
        it('Must return the status 200 when get /login/local', function(done) {
          request
            .get('/login/local')
            .end(function(err, res) {
              if (err) throw err;
              expect(res.status).toBe(200);
              done();
            });
        });

        it('Must return succes route (/) when post /login/local with valid user', function(done) {
          var user = {
            username: 'loging',
            password: '000loging',
            samepassword: '000loging'
          }

          request
            .post('/login/local/signup')
            .send(user)
            .end(function(err, res) {
              if (err) throw err;
              expect(res.headers.location).toBe('/');
              request
                .post('/login/local')
                .send(user)
                .end(function(err, res) {
                  if (err) throw err;
                  expect(res.headers.location).toBe('/');
                  done();
                });
            });
        });

        it('Must return route (/login/local) when post /login/local with invalid user', function(done) {
          var user = {
            username: 'invaliduser',
            password: '000000'
          }

          request
            .post('/login/local')
            .send(user)
            .end(function(err, res) {
              if (err) throw err;
              expect(res.headers.location).toBe('/login/local');
              done();
            });
        });

        afterEach(function() {
          require('mongoose').model('users').findOne({ 'local.username' : 'loging' }).remove().exec();
        });
      });
  });

  describe('Facebook strategy - ', function() {
    it('Must return the status 302 when get /login/facebook', function(done) {
      request
        .get('/login/facebook/enter')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.status).toBe(302);
          done();
        });
    });
  });

  describe('Logout - ', function() {
    it('Must return succes route (/) when get /logout after login', function(done){
      var user = {
        username: 'userlogged',
        password: 'passwordlogged',
        samepassword: 'passwordlogged'
      }

      request
        .post('/login/local/signup')
        .send(user)
        .end(function(err, res) {
          if (err) throw err;
          expect(res.headers.location).toBe('/');
          request
            .get('/logout')
            .end(function(err, res) {
              if (err) throw err;
              expect(res.headers.location).toBe('/');
              done();
            });
        });
    });

    afterEach(function() {
      require('mongoose').model('users').findOne({ 'local.username' : 'userlogged' }).remove().exec();
    })
  });
});
