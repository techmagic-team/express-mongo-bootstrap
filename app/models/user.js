'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const user = new Schema({
  firstName: {type: String, trim: true, default: ''},
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

user.methods.encryptPassword = (password) => {
  return crypto.createHash('sha1').update(password).digest('hex');
};

user.path('password').set((value) => {
  return crypto.createHash('sha1').update(value).digest('hex');
});

user.path('email').validate((value) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  return emailRegex.test(value);
}, 'Please fill a valid email address');

module.exports = mongoose.model('user', user);
