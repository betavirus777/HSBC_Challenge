'use strict'

var config = require('../config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    favicon = require('serve-favicon'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    path = require('path'),
    flash = require('flash'),
    _ = require('lodash');



/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {

    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.livereload = config.livereload;
    app.locals.env = process.env.NODE_ENV;
    app.locals.domain = config.domain;

}

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {

    // app.use(compress({
    //     filter: function (req, res) {
    //       return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    //     },
    //     level: 9
    //   }));


    //Body Parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // // Add the cookie parser and flash middleware
    // app.use(cookieParser());
    // app.use(flash());
    require('../../config/passport');
    app.use(passport.initialize());


}


module.exports.initViewEngine = function (app) {

}

module.exports.initModulesClientRoutes = function (app) {
    // Setting the app router and static folder
    console.log(path.resolve('./pulic'));
    app.use('/', express.static(path.resolve('./public'), { maxAge: 86400000 }));

};
module.exports.initErrorRoutes = function (app) {
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {
            return next();
        }
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({"message" : err.name + ": " + err.message,"error":true,"type":"Authentication"});

        }
    });
};
/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
    // Initialize express app
    var app = express();
    // Initialize local variables
    this.initLocalVariables(app);

    // Initialize Express middleware
    this.initMiddleware(app);

    // Initialize Express view engine
    this.initViewEngine(app);

    this.initModulesClientRoutes(app);

    var route = require('../../routes')(app);

    app.use(passport.initialize());

    this.initErrorRoutes(app);

    return app;
};