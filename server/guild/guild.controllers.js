'use strict';

var Guild = require('./guild.model.js'),
    Q    = require('q');

module.exports = exports = {
  get: function (req, res, next) {
    var $promise = Q.nbind(Guild.find, Guild);
    $promise()
      .then(function (guilds) {
        res.json(guilds);
        console.log(guilds);
      })
       .fail(function (reason) {
        next(reason);
      });
  }
};
