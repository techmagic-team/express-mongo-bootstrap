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

/**
 * @api {get} /users GET users
 * @apiName GetUsers
 * @apiGroup users
 *
 * @apiUse dtoUsersPublic
 */

/**
 * @api {get} /users/:user_id GET User information
 * @apiName GetUser
 * @apiGroup users
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiUse dtoUserPublic
 */

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup users
 *
 *
 * @apiParam {String} email email.
 * @apiParam {String} [firstName] Optional firstName.
 * @apiParam {String} [lastName] Optional lastName.
 * @apiParam {String} [password] Optional password.
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Content-Type": "application/json",
 *    "Authorization": "[accessToken]"
 *  }
 *
 * @apiUse dtoUserPublic
 */

/**
 * @api {put} /users/:user_id Update User Doc
 * @apiName UpdateUser
 * @apiGroup users
 * @apiPermission user
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Content-Type": "application/json",
 *    "Authorization": "[accessToken]"
 *  }
 *
 * @apiUse updateUserParams
 * @apiUse dtoUserPublic
 */

/**
 * @api {patch} /users/:user_id Update User information
 * @apiName UpdatePartialUser
 * @apiGroup users
 * @apiPermission user
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Content-Type": "application/json",
 *    "Authorization": "[accessToken]"
 *  }
 *
 * @apiUse updateUserParams
 * @apiUse dtoUserPublic
 */

/**
 * @api {delete} /users/:user_id Delete User
 * @apiName DeleteUser
 * @apiGroup users
 * @apiPermission user
 *
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Content-Type": "application/json",
 *    "Authorization": "[accessToken]"
 *  }
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiSuccess (204).
 */

/**
 * @apiDefine updateUserParams
 * @apiParam {String} [email] Optional email.
 * @apiParam {String} [firstName] Optional firstName.
 * @apiParam {String} [lastName] Optional lastName.
 * @apiParam {String} [password] Optional password.
 */
