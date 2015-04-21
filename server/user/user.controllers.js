'use strict';

var User = require('./user.model.js'),
    Q    = require('q');

module.exports = exports = {
  // Route functions
  get: function (req, res, next) {
    var $promise = Q.nbind(User.find, User);
    $promise()
      .then(function (users) {
        res.json(users);
      })
      .fail(function (reason) {
        next(reason);
      });
  },

  // Authencation functions
  serializeUser: function (user) {
    console.log(user);
  },
  deserializeUser: function (user) {
    return $promise = Q.nbind(User.findOne({ identifier: user.identifier }));
  }
};
