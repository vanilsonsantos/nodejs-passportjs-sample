var express = require('express');
var app     = express();
var path    = require('path');
var load    = require('express-load');

app.use(express.static(path.join(__dirname, 'public')));

// Database settings
var dbConfig     = require('./config/dbconfig')();
var dbConnection = require('./init/dbconnection')(dbConfig.url);
dbConnection.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Express configurations
require('./config/express')(app);

// Passportjs configuration
require('./config/passport')(app);
require('./middlewares/authentication')(app);

// Loading modules
load('models').then('controllers').then('routes').into(app);

// Errors
require('./middlewares/errors')(app);

app.listen(3000,function(){
  console.log('Node server running..');
});

module.exports = app;
