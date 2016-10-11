"use strict";

const express = require('express');
const router = express.Router();

/**
 * @api {get} /users GET users listing.
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {object[]} List of users.
 */
router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} user.firstname Firstname of the User.
 * @apiSuccess {String} user.lastname  Lastname of the User.
 */
router.get('/:id', (req, res, next) => {

});

/**
 * @api {post} /user/:id Create User
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {object} user User Information
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/', (req, res, next) => {

});

/**
 * @api {put} /user/:id Update User information
 * @apiName UpdateEntireUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {Number} user User (entire object)
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.put('/:id', (req, res, next) => {

});

/**
 * @api {patch} /partial/:id Update User information
 * @apiName UpdatePartialUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {Number} user User (partial object)
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.patch('/', (req, res, next) => {

});

/**
 * @api {delete} /user/:id Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/:id', (req, res, next) => {

});
module.exports = router;
