/**
 * @apiDefine dtoGroupPublic
 * @apiSuccess {String} name  Name of the Group.
 * @apiSuccess {Object[]} permissions List of groups permissions.
 */

/**
 * @api {get} /groups GET groups
 * @apiName GetGroups
 * @apiGroup groups
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Content-Type": "application/json",
 *    "Authorization": "[accessToken]"
 *  }
 */

/**
 * @api {post} /groups POST groups
 * @apiName CreateGroup
 * @apiGroup groups
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Content-Type": "application/json",
 *   "Authorization": "[accessToken]"
 * }
 *
 * @apiParam {String} name Group name.
 * @apiParam {String} [firstName] Optional firstName.
 * @apiParam {String} [lastName] Optional lastName.
 * @apiParam {String} [password] Optional password.
 *
 */
