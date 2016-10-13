'use strict';

const userModel = require('./../models/user.js');

module.exports.create = (data) => {
  return userModel.create(data);
};

module.exports.findAll = () => {
  return userModel.find();
};

module.exports.findOne = (id) => {
  return userModel.findById(id);
};

module.exports.update = (id, data) => {
  return userModel.findByIdAndUpdate(id, data, {new: true, overwrite: true});
};

module.exports.modify = (id, data) => {
  return userModel.findByIdAndUpdate(id, {$set: data}, {new: true});
};

module.exports.delete = (id) => {
  return userModel.remove({id: id});
};
