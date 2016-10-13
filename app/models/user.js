'use strict';

const mongoose = require('mongoose');
//const cryptPassword = require('../utils').cryptPassword;

const Schema = mongoose.Schema;

const user = new Schema({
  fistName: {type: String, trim: true, default: ''},
  lastName: {type: String, trim: true, default: ''},
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    default: ''
  },
  password: {type: String, default: ''},
}, {
  collection: 'users',
  _id: true
});

user.path('email').validate((value) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  return emailRegex.test(value);
}, 'Please fill a valid email address');

module.exports = mongoose.model('user', user);
