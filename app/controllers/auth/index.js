

var responseError = require('response-handle').responseError;
var responseDone = require('response-handle').responseDone;

let _login = function (req, res) {
    console.log(req.user);
    res.send('ok');
}

let _register = function (req, res) {
    responseDone({res, result: "Success"})
}


module.exports = {
    login: _login,
    register: _register
}
