
/**
 * @name Passport
 * @desc Handle kind of authenticate of system.
 *
 * */
const passport = require('passport');
const User = require('../../models').User;
const Client = require('../../models').Client;
const Token = require('../../models').Token;
/**
 * Strategy
 *
 * */
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const RegisterStrategy = require('passport-local-register').Strategy;

var responseError = require('response-handle').responseError;

/**
 * Handle token
 *
 * */
passport.use(new BearerStrategy(
    function(token, done) {
        console.log('BearerStrategy',token);
        Token.findOne({ value: token }, function (err, token) {
            if (err) { return done(err); }
            if (!token) { return done(null, false); }
            return done(null, token, { scope: 'all' });
        });
    }
));


/**
 * Handle login by header Authenticate
 *
 * */
passport.use(new BasicStrategy(
    function(userid, password, done) {
        console.log('BasicStrategy',userid);
        Client.findOne({ clientId: userid }, function (err, client) {
            console.log('BasicStrategy',err,client);
            if (err) { return done(err); }
            if (!client) { return done(null, false); }

            done(null, client);

        });
    }
));


/**
 * Login by form
 *
 * */
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('LocalStrategy');
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            user.verifyPassword(password,function (err,isMatch) {
                if(err) return done(err, false);
                if(!isMatch) return  done(responseError("LOGIN_PASSWORD_INVALID") , false);
                console.log('LocalStrategy',user);
                return done(null, user);
            })

        });
    }
));


/**
 * Register
 *
 * */
passport.use(new RegisterStrategy(
    function verify(username, password, done) {
        console.log('RegisterStrategy');
        User.findOne({
            'username' : username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(); // see section below
            }
            // if (!user.verifyPassword(password)) {
            //     return done(null, false);
            // }

            done(responseError('REGISTER_ALREADY_USER'));
        });
    }, function create(username, password, done) {
        User.create({
            'username' : username,
            'password' : password
        }, function(err, user) {
            if(err) {
                return done(err);
            }
            if(!user) {
                err = new Error("User creation failed.");
                return done(err);
            }

            done(null, user);
        });
    }
));

/**
 * Handle client
 * */
passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({ clientId: clientId }, function (err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != clientSecret) { return done(null, false); }
            return done(null, client);
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserializeUser', user);
    done(null, user);
});

