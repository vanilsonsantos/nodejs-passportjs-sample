var express = require('express');
var path = require('path');
var app = express();
var load = require('express-load');
var passport = require('passport');
var mongoose = require('mongoose');

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

load('models').then('controllers').then('routes').into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.listen(3000,function(){
    console.log('Node server running..');
});


module.exports = app;
