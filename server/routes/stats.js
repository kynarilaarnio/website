'use strict';

var db = require('../models'),
    invcodes = require('../routes/invcodes'),
    _ = require('lodash'),
    sequelize = require('sequelize');


exports.bulkInsert = function(req, res) {
  // FIXME This really should be run inside a transaction
  sequelize.Promise.all(_.map(_.keys(req.body), function(steamId) {
    return db.userstats.findOrCreate({
      where: {
        steamId: steamId
      }
    })
    .spread(function(user) {
      _.each(['kills', 'hits', 'assists', 'headshots', 'deaths'], function(field) {
        user[field] += req.body[user.steamId][field] || 0;
      });
      return user.save();
    });
  }))
  .then(function() {
    res.sendStatus(200);
  });
};

exports.getPlayerStats = function(req, res) {
  console.log(req.params);
  db.userstats.findOne({
    where: { steamId: req.params.steamId }
  })
  .then(function(data) {
    res.send(data.dataValues);
  });
};
