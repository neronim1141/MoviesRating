'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', controller.show);
router.post('/register', controller.create);

module.exports = router;
