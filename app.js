var express = require('express');
var path = require('path');
var app = express();
var load = require('express-load');
var passport = require('passport');

app.use(express.static(path.join(__dirname, 'public')));

// Database settings
var dbConfig = require('./config/db-config')();
var dbConnection = require('./init/db-connection')(dbConfig.url);
dbConnection.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Express configurations
require('./config/express')(app);

// Passportjs configuration
require('./config/passport')(passport,app);
require('./middlewares/authentication')(app);

// Loading modules
load('models').then('controllers').then('routes').into(app);

// Errors
require('./middlewares/errors')(app);

app.listen(3000,function(){
    console.log('Node server running..');
});

module.exports = app;
