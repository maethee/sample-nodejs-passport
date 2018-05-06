/**
 * Routes
 *
 * @desc all of routers in system.
 * */

const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * Strategy
 */
const strategy = require('../middlewares/auth/strategy');
const oauth2 = require('../middlewares/auth/oauth2');

/**
 * Api
 * @desc control routes of api
 * @version 0.0.1
 * */
var apiVersion_01 = require('./api/1.0');
router.use('/api/',apiVersion_01);


/**
 * AuthController
 * */
const authController = require('../controllers/auth');
router.post('/login', strategy.local,authController.login);
router.post('/register', strategy.register, authController.register);
router.post('/oauth/token', oauth2.token);

module.exports = router;
