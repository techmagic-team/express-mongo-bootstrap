'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({version: 'v1'});
});

const users = require('./users');

router.use('/users', users);

module.exports = router;
