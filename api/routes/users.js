const express = require('express');
const router = express.Router();
const db = require('../../db.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const User = require('../../models/user.js');
const app = require('../../app.js');

const models = require('../../models');

passport.use(
    'local',
    new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) { 
        db.query(`SELECT * FROM users WHERE email = ${db.escape(username)}`, function(err, rows){
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'Invalid username')); 
            }
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Invalid username or password'));
            return done(null, rows[0]);
        });
    })
);

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function (user_id, done) {
  let query = db.query(`select * from users where user_id = ${db.escape(user_id)}`, (err, rows) => {
    done(err, rows[0]);
  });
});

router.get(['/login', '/login.html'], function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

router.get(['/signup', '/signup.html'], function (req, res, next) {
  res.render('signup', {
    title: 'Sign Up'
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login.html',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/');
});

router.get('/', (req, res, next) => {
  let sql = `SELECT * FROM users ORDER BY user_id;`;
  let query = db.query(sql, (err, users) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    //console.log(users);
    res.status(200).json({
      users
    });
  });
});

router.post('/', (req, res, next) => {
  req.checkBody('fName', 'First Name is required').notEmpty();
  req.checkBody('lName', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('handle', 'Handle is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);
  //  req.checkBody('email', 'An account for this email already exists').isUnusedEmail();
  //req.checkBody('handle', 'This handle is taken').isUnusedHandle();

  const valErrors = req.validationErrors();


  if (valErrors) {
    console.log('valErrors have been sent: ' + valErrors.msg);
//    res.status(500).json({
//      valErrors: valErrors.msg
//    });
    let valErrMessages = '';
    for (let i = 0; i < valErrors.length; i++){
      valErrMessages += valErrors[i].msg + '\n';
    }
    res.redirect(500, '/about.html', {errors:valErrMessages});
  } else {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        console.log(hash);
        const user = {
          email: req.body.email,
          password: hash,
          fName: req.body.fName,
          lName: req.body.lName,
          handle: req.body.handle,
          dob: req.body.dob || null
        };
        let sql = `
            IF NOT EXISTS (SELECT * FROM users WHERE email = ${db.escape(user.email)} or handle = ${db.escape(user.handle)}) THEN
            INSERT INTO users (email, password, first_name, last_name, handle, dob)  
            VALUES(${db.escape(user.email)}, ${db.escape(user.password)}, ${db.escape(user.fName)}, ${db.escape(user.lName)}, ${db.escape(user.handle)}, 
            ${db.escape(user.dob)});
            END IF;`;
        let query = db.query(sql, (err, row) => {
          if (err) {
            console.error('SQL error: ', err);
            return next(err);
          }
          let message = 'You are now registered and can log in';
          if (row.affectedRows == 0) {
            message = 'error: email or handle already exist';
            console.log(message);
            req.flash('error_msg', message);
            console.log('affectedRows: ' + row.affectedRows);
//            res.status(409).json({
//              message
//            });
            res.redirect(409, '/users/signup');            
          } else {
            req.flash('success_msg', 'You are registered');
            console.log('affectedRows: ' + row.affectedRows);
            res.redirect(201, '/users/login'); 
//            res.status(201).json({
//              message
//            });
          }
        });
      }
    });
  }
});

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;

  let sql = `SELECT * FROM users WHERE user_id = ${db.escape(id)};`;

  let query = db.query(sql, (err, user) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    res.status(200).json({
      user
    });
  });
})

router.patch('/:userId', (req, res, next) => {
  const id = req.params.userId;
  const user = {
    email: req.body.email || null,
    password: req.body.password || null,
    fName: req.body.fName || null,
    lName: req.body.lName || null,
    handle: req.body.handle || null,
    dob: req.body.dob || null
  };

  let sql = `
          IF EXISTS (SELECT * FROM users WHERE user_id = ${db.escape(id)}) THEN
          UPDATE users set email=${db.escape(user.email)}, password = ${db.escape(user.password)}, first_name = ${db.escape(user.fName)}, last_name = ${db.escape(user.lName)}, handle = ${db.escape(user.handle)}, dob = 
          ${db.escape(user.dob)} WHERE user_id = ${db.escape(id)};
          END IF;`;
  let query = db.query(sql, (err, row) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'user updated...';
    if (row.affectedRows == 0) {
      console.log('user does not exist');
      message = 'user does not exist';
      console.log('affectedRows: ' + row.affectedRows);
      res.status(500).json({
        message: message
      });
    } else {
      console.log('affectedRows: ' + row.affectedRows);
      res.status(200).json({
        message
      });
    }
  });
});

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;

  let sql = `DELETE FROM users WHERE user_id = ${db.escape(id)};`;

  let query = db.query(sql, (err, user) => {
    if (err) {
      console.error('SQL error: ', err);
      return next(err);
    }
    let message = 'user deleted...';
    if (user.affectedRows == 0) {
      message = 'user not found';
    }
    console.log(user);
    res.status(200).json({
      message: message
    });
  });
});

module.exports = router;
