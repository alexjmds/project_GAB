// server.js
var express = require('express');
var app = express();
// var request = require('request');
var bodyParser = require('body-parser');
var chalk = require('chalk');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

require('./models');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beer2');


 
var meanify = require('meanify')({
	path: '/',
	pluralize: true,
	strict: false,
	caseSensitive: false
});
app.use(meanify());
 console.log (chalk.blue('Beer') + chalk.red('Server started!.. on port ') + chalk.inverse('3000'));
app.listen(3000);
