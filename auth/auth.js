var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var createSendToken = require('./services/jwt.js');
var LocalStrategy = require('./services/localStrategy.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});


passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function(req, res){
    createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req.user, res);
});

mongoose.connect('mongodb://localhost/testaouth');

var server = app.listen(4000, function(){
    console.log('Auth server listening on ', server.address().port);
});
