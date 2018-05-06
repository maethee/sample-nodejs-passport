/**
 * User routers
 *
 * */

var express = require('express');
var router = express.Router();

var userController = require('../../../controllers/api/user.api');

/**
 * All of User Routes
 *
 * */

router.post('/create',userController.createProfile);

router.get('/:id',userController.getProfileById);


module.exports = router;
