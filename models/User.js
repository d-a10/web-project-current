//const bcrypt = require('bcrypt');
//
//module.exports = (sequelize, DataTypes) => {
//  const User = sequelize.define('users', {
//    handle: {
//      type: DataTypes.STRING,
//      unique: true
//    },
//    email: {
//      type: DataTypes.STRING,
//      unique: true
//    },
//    password: DataTypes.STRING,
//    user_id: {
//      type: DataTypes.INTEGER,
//      unique: true
//    },
//    first_name: DataTypes.STRING,
//    last_name: DataTypes.STRING,
//    dob: DataTypes.DATEONLY,
//    created_at: DataTypes.DATE,
//    updated_at: DataTypes.DATE
//
//  });
//
//  //  User.associate = (models) => {
//  //    User.belongsToMany(models.Team, {
//  //      through: 'member',
//  //      foreignKey: 'userId',
//  //    });
//  //  };
//
//  return User;
//};
//
//const user = module.exports.default;
//
//
////const express = require('express');
////const bcrypt = require('bcrypt');
////const db = require('../../db.js');
////
//////const UserSchema = {
//////  username: {
//////    type: String,
//////  }
//////}
////
//module.exports.getUserByEmail = (email, callback) => {
//  console.log('in getUserByEmail');
//  let query = {
//    email: email
//  };
//  user.findOne();
//
//  //  console.log('getUserByEmail Called...');
//  //  let sql = 'SELECT TOP 1 FROM users WHERE email = ' + db.escape(email) + '';
//  //  let query = db.query(sql, (err, user) => {
//  //    if (err) {
//  //      console.error('SQL error: ', err);
//  //      return next(err);
//  //    }
//  //    return user;
//  //  });
//}
////
//module.exports.getUserById = (id, callback) => {
//  user.findById(id, callback);
////    console.log('getUserById called');
////  let sql = 'SELECT TOP 1 FROM users WHERE user_id = ' + db.escape(id) + '';
////  let query = db.query(sql, (err, user) => {
////    if (err) {
////      console.error('SQL error: ', err);
////      return next(err);
////    }
////    return user;
////  });
//}
////
//module.exports.comparePassword = (candidatePassword, hash, callback) => {
//  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
//    if (err) throw err;
//    callback(null, isMatch);
//  });
//
//
//  //  console.log('comparePassword called');
//  //  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
//  //    if (err) throw err;
//  //    callback(null, isMatch);
//  //  });
//}
////
