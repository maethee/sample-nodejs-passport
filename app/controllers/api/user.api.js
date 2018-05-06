/**
 * User
 * @version 0.0.1
 *
 * */

var User = require('../../models/user');

/**
 * @api {get} /sys/f/mid/:id/r Get result from search in filter by MID.
 * @apiName Get Filter Info by MID
 * @apiParam {String} id FilterID
 * @apiGroup Filter
 *
 */

var responseError = require('response-handle').responseError;
var responseDone = require('response-handle').responseDone;

exports.createProfile = function (req, res) {
    responseDone({res,result: "done"})
}

exports.getProfileById = function (req, res) {
    responseDone({res,result: "done"})
}

exports.getProfileDetailAsync = function (req, res) {
    responseDone({res,result: "done"})
}


