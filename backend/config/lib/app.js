'use strict'
//APP fucntions are performed here
var config = require('../config'),
    mongooseService = require('./mongoose'),
    express = require('./express'),
    chalk = require('chalk');
   // seed = require('./mongo-seed');


module.exports.init = function init(callback){
    mongooseService.connect(function(db){
        //Seeding Yaha KAro

        //Calling The Initializing Of aPP
        var app = express.init(db)
        if(callback) callback(app,db,config);
    })
}

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log('--');

      if (callback) callback(app, db, config);
    });

  })
}