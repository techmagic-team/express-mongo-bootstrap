'use strict';

module.exports.public = (userModel) => {
  const user = {};
  user._id = (userModel._id) ? userModel._id : null;
  user.accessToken = (userModel.accessToken) ? userModel.accessToken : null;
  user.firstName = (userModel.firstName) ? userModel.firstName : null;
  user.lastName = (userModel.lastName) ? userModel.lastName : null;
  user.email = (userModel.email) ? userModel.email : null;
  return user;
};
