'use strict';

var express = require('express');
var controller = require('./ec2Instances.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.start);
router.delete('/:id', controller.terminate);
router.put('/:id', controller.stop);

module.exports = router;