'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({title: 'Express'});
});

const users = require('./users');

router.use('/users', users);

module.exports = router;
