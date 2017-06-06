'use strict'

module.exports.public = (userModel) => {
  const user = {}
  user._id = (userModel._id) ? userModel._id : null
  if (userModel.accessToken) user.accessToken = userModel.accessToken
  user.firstName = (userModel.firstName) ? userModel.firstName : null
  user.lastName = (userModel.lastName) ? userModel.lastName : null
  user.email = (userModel.email) ? userModel.email : null
  return user
}
