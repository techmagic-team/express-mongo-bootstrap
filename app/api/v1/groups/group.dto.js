'use strict'

/**
 * @apiDefine dtoGroupPublic
 * @apiSuccess {String} name  Name of the Group.
 * @apiSuccess {Object[]} permissions List of groups permissions.
 */
module.exports.public = (groupModel) => {
  const group = {}
  group.permissions = (groupModel.permissions) || []
  group.name = groupModel.name || null
  return group
}
