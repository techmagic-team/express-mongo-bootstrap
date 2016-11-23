'use strict';

/**
 * @apiDefine dtoUsersPublic
 * @apiSuccess {Object[]} users List of user profiles.
 * @apiSuccess {String} users.firstName Firstname of the User.
 * @apiSuccess {String} users.lastName  Lastname of the User.
 * @apiSuccess {String} users.email  Email of the User.
 */
/**
 * @apiDefine dtoUserPublic
 * @apiSuccess {String} firstName Firstname of the User.
 * @apiSuccess {String} lastName  Lastname of the User.
 * @apiSuccess {String} email  Email of the User.
 */
module.exports.public = (userModel) => {
  const user = {};
  user._id = (userModel._id) ? userModel._id : null;
  if (userModel.accessToken) user.accessToken = userModel.accessToken;
  user.firstName = (userModel.firstName) ? userModel.firstName : null;
  user.lastName = (userModel.lastName) ? userModel.lastName : null;
  user.email = (userModel.email) ? userModel.email : null;
  return user;
};
