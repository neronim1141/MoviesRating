'use strict';

var express = require('express');
var controller = require('./review.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthor(), controller.update);
router.patch('/:id', auth.isAuthor(), controller.update);
router.delete('/:id', auth.isAuthor(), controller.destroy);

module.exports = router;
