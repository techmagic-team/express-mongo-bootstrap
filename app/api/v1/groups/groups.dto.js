'use strict'

module.exports.public = (groupModel) => {
  const group = {}
  group.permissions = (groupModel.permissions) || []
  group.name = groupModel.name || null
  return group
}
