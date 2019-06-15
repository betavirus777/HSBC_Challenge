'use strict'

var _ = require('lodash'),
    config = require('../config'),
    chalk = require('chalk'),
    path = require('path'),
    mongoose = require('mongoose');

//Initialize Mongoose

module.exports.connect = function(callback){
    mongoose.Promise = global.Promise

    mongoose
    .connect(config.db.uri,{useNewUrlParser: true })
    .then(function(connection){
        mongoose.set('debug',config.db.debug)
        console.error(chalk.green('MongoDB!'));
        if(callback) callback(connection.db)
    })
    .catch(function(err){
      console.log(err)
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(err);
    });
}
module.exports.disconnect = function (cb) {
  mongoose.connection.db
    .close(function (err) {
      console.info(chalk.yellow('Disconnected from MongoDB.'));
      return cb(err);
    });
};