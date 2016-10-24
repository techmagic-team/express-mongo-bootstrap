'use strict';

const express = require('express');
const router = express.Router();
const daoUser = require('./../dao/user');
const dtoUser = require('./../dto/user');
const errorHelper = require('./../../../utils/errorHelper');
const passportMiddleware = require('./../middlewares/passport');
const sendEmailUtil = require('./../../../utils/sendEmail');

/**
 * @api {get} /users.json GET users.json listing.
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {object[]} List of users.json.
 */
router.get('/', (req, res, next) => {
  daoUser.findAll()
    .then((users) => {
      const publicUsers = users.map((user) => dtoUser.public(user));
      res.json(publicUsers);
    })
    .catch((err) => {
      return next(err);
    });
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
router.get('/:user_id', (req, res, next) => {
  daoUser.findOne(req.params.user_id)
    .then((user) => {
      if (!user) throw errorHelper.notFound();
      res.json(dtoUser.public(user));
    })
    .catch((err) => {
      next(err);
    });
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
  daoUser.create(req.body)
    .then((user) => {
      return Promise.all([user, sendEmailUtil.sendWelcomeEmail(user)]);
    })
    .then((data) => {
      const user = data[0];
      res.json(dtoUser.public(user));
    })
    .catch((err) => {
      next(err);
    });
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
router.put('/:user_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (req.params.user_id != req.user._id) next(errorHelper.forbidden());
  daoUser.update(req.params.user_id, req.body)
    .then((user) => {
      res.json(dtoUser.public(user));
    })
    .catch((err) => {
      next(err);
    });
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
router.patch('/:user_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (req.params.user_id != req.user._id) next(errorHelper.forbidden());
  daoUser.modify(req.params.user_id, req.body)
    .then((user) => {
      res.json(dtoUser.public(user));
    })
    .catch((err) => {
      next(err);
    });
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
router.delete('/:user_id', (req, res, next) => {
  daoUser.delete(req.params.user_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      return next(err);
    });
});
module.exports = router;
