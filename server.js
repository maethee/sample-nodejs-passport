/**
 * Sample server
 *
 * @author Maethee
 * @email maethee.chakkuchhantorn@gmail.com
 * */

var express = require('express'),
    path = require('path')
    config = require('config'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    uthMiddleware = require('./app/middlewares/auth'),
    responseHandle = require('response-handle'),
    i18n = require('i18n'),
    oauth2 = require('./app/middlewares/auth/oauth2'),
    mongoose = require('mongoose');
;

// create express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'public')));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

i18n.configure({
    locales: config.lang.locales,
    directory:  __dirname + '/locales',
    fallbacks:{'nl': 'th'},
    defaultLocale: config.lang.default,
    cookie: 'i18n',
    objectNotation : true,
    api: {
        '__': 't'
    }
});
i18n.setLocale('th');

app.use(i18n.init);
//mongodb connection
var options = {
    auth: {authdb: config.mongodb.options.auth.authdb},
};

if(config.mongodb.options.user){
    options.user = config.mongodb.options.user;
}

if(config.mongodb.options.pass){
    options.pass = config.mongodb.options.pass;
}

mongoose.connect(config.mongodb.url,
    options, function (err) {

    });

// // If the connection throws an error
// mongoose.connection.on('error', function (err) {
//     console.log('Mongoose default connection error: ' + err);
// });
//
// mongoose.connection.on('connected', function () {
//     // listen for requests
//
// });
//
// mongoose.connection.on('disconnected', function () {
//     console.log('Mongoose default connection disconnected');
// });

//routers
app.use('/', require('./app/routes'));

// handle errors
app.use( function (err, req, res, next) {
    console.log(err)
    if(err){
        res.status(err.statusCode || 400)
    }
    res.send(err);
})


app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
