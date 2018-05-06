const passport = require('passport');

/**
 * Controller each group.
 *
 * */

let _basic = passport.authenticate(['basic'], { session : false });
let _local = passport.authenticate(['local'], { session : false });
let _register = passport.authenticate(['localRegister'], { session : false });
let _bearer = passport.authenticate(['bearer'], { session : false });
let _test = passport.authenticate([ 'basic', 'oauth2-client-password'], { session : false });

module.exports = {
    basic: _basic,
    local: _local,
    register: _register,
    test: _test,
    bearer:_bearer
}
