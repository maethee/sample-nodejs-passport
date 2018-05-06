/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var config = require('config');
var db = require('../../models');
var utils = require('../../../utils');

// create OAuth 2.0 server
var server = oauth2orize.createServer();



server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {

    db.User.findOne({username: username}, function (err, user) {
        if(err) done(err)

        var token = new db.Token({
            value: utils.uid(config.token.accessTokenLength),
            client_id: client._id,
            user_id: user._id,
            scope: scope
        });
        console.log(token)

        if(client.osVersion){
            token.osVersion = client.osVersion;
        }
        if(client.resolution){
            token.resolution = client.resolution;
        }

        token.save(function (err) {
            console.log(err)
            if(err) done(err)

            return done(null,
                token.value,
                {refresh_token: null},
                {expires_in: config.token.expiresIn});
        });
    });



}))

/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
server.grant(oauth2orize.grant.token(function (client, user, ares, done) {
    var token = new db.Token({
        value: utils.uid(config.token.accessTokenLength),
        client_id: client.id,
        user_id: user._id,
        scope: client.scope
    });

    token.save(function (err) {
        if (err) {
            return done(err);
        }
        return done(null, token.value, {expires_in: config.token.expiresIn});
    });
}));

/**
 * User decision endpoint
 *
 * `decision` middleware processes a user's decision to allow or deny access
 * requested by a client application.  Based on the grant type requested by the
 * client, the above grant middleware configured above will be invoked to send
 * a response.
 */
exports.decision = [
    server.decision()
];

/**
 * Token endpoint
 *
 * `token` middleware handles client requests to exchange authorization grants
 * for access tokens.  Based on the grant type being exchanged, the above
 * exchange middleware will be invoked to handle the request.  Clients must
 * authenticate when making requests to this endpoint.
 */
exports.token = [
    passport.authenticate(['basic' ], {session: false}),
    server.token(),
    server.errorHandler()
];



server.serializeClient(function (client, done) {
    console.log('server.serializeClient')
    return done(null, client._id);
});

server.deserializeClient(function (id, done) {
    console.log('server.deserializeClient')
    db.Client.findOne({_id: id}, function (err, client) {
        if (err) {
            return done(err);
        }
        return done(null, client);
    });
});

