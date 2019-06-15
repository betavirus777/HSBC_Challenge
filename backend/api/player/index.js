'use strict';
var express = require('express');
var router = express.Router()
var passport = require('passport');
var Player = require('./player.model');

var playerController = require("./player.controller.js");

router.post('/get_player_info',passport.authenticate('headerapikey', { session: false, failureRedirect: '/api/unauthorized' }),playerController.getPlayerInfo);
router.post('/get_team_player_list',passport.authenticate('headerapikey', { session: false, failureRedirect: '/api/unauthorized' }),playerController.getTeamPlayerList);
router.get("/import",passport.authenticate('headerapikey', { session: false, failureRedirect: '/api/unauthorized' }), playerController.enterData)
router.get("/unauthorized",playerController.unauthorized)
module.exports = router;