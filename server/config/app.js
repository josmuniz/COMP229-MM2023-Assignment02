var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var localStrategy = passportLocal.Strategy;
var flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the db URI
mongoose.connect(DB.URI,{useNewUrlParser:true, useUnifiedtopology:true} , (err) => {
  if (err) {
    console.log('Mongoose connection error: ' + err.message);
  } else {
    console.log('Mongoose connected to ' + DB.URI);
  }
});
//Creating An Event To Let mongo connect to the database

var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('connected to MongoDB...');
});

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var contactRouter = require('../routes/contactList');
var  Passport  = require('passport');
var booksRouter = require('../routes/book');
/*
var contactRouter = require('../routes/contactList');
*/


let app = express();


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//Express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Flash
app.use(flash())

//Passport
app.use(passport.initialize());
app.use(passport.session());

//user model
var userModel = require('../model/userModel');
var user = userModel.user;

//user strategy
passport.use(user.createStrategy());

//Serialize user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contactList',contactRouter);
app.use('/bookList', booksRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
