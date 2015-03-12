var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

module.exports = function(app) {

  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Cookies
  app.use(cookieParser());

  // Sessions
  app.use(session({
  		saveUninitialized: true,
  		resave: true,
  		secret: 'OurSuperSecretCookieSecret'
  }));

  // Connect-flash middleware
  app.use(flash());
}
