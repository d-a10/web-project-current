const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//var ejs = require('ejs');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//sets up main route and API routes
const index = require('./routes/index');
const userRoutes = require('./api/routes/users');
const postRoutes = require('./api/routes/posts');
const commentRoutes = require('./api/routes/comments');
const friendFollowersListRoutes = require('./api/routes/friendFollowerList');
const flash = require('req-flash');
const db = require('./db.js');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//
app.use(expressValidator(/*{
  customValidators: {
    isUnusedEmail: function (email) {
//      console.log('unique email called with input ' + email);
//      let sql = `SELECT * FROM users WHERE email = ${db.escape(email)}`;
      let query = db.query(`SELECT * FROM users WHERE email = ${db.escape(email)}`, (err, userFound) => {
        if (err) {
          console.error('SQL error: ', err);
          //return next(err);
        } else {
          console.log(userFound + '\nlength' + userFound.length);
          if (userFound.length == 0) {
            console.log('isUnusedEmail');
            return true;
          } else {
            console.log('is already taken email');
            return false;
          }
        }
      }); 
      
    }//,
//    isUnusedHandle: function (handle) {
//      console.log('unique handle called with input ' + handle);
//      let sql = `SELECT * FROM users WHERE handle = ${db.escape(handle)}`;
//      let query = db.query(sql, (err, handleFound) => {
//        if (err) {
//          console.error('SQL error: ', err);
//          return next(err);
//        } else {
//          console.log(handleFound + '\nlength' + handleFound.length);
//          if (handleFound.length == 0) {
//            console.log('returning true');
//            return false;
//          } else {
//            return true;
//          }
//        }
//      });
//    }
  }
}*/));

app.use(cookieParser());
//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
//Express Session
app.use(expressSession({
  secret: 'anything',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(function (req, res, next){
  req.models = require('./models');
  next();
});

app.use('/', index);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/subscribers', friendFollowersListRoutes);

//catch routing errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

//app.get('./models');

app.listen();

//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//  const err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handler
//app.use(function (err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});

module.exports = app;
