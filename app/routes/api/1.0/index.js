/**
 * Api
 * @version 0.1
 *
 * */

var express = require('express');
var router = express.Router();
const strategy = require('../../../middlewares/auth/strategy');

router.use('/1/user/',strategy.bearer,require('./user'));

module.exports = router;
