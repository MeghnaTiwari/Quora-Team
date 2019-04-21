//import the require dependencies
var express = require('express');
var app = express();//.router();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var cors = require('cors');
const fs = require('fs');
var glob = require('glob');

app.set('view engine', 'ejs');
var mysql = require('mysql'); 
const multer = require('multer');
const path = require('path');
//var pool = require('./connectionpool.js');
var Model = require('./DataBaseConnection');
var cors = require('cors');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});


var login = require('./routes/login');
var signup = require('./routes/signup');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

//For Connection Pooling

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'GHE@ta91',
  database: 'Luckycmpe273'
});

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

app.use('/login', login);
app.use('/signup', signup);

//start your server on posrt 3001
app.listen(3001);
console.log("Server Listening on port 3000");