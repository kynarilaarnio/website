'use strict';

var db = require('../models');
var _ = require('lodash');
var crypto = require('crypto');
var sequelize = require('sequelize');

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else {
    res.sendStatus(403);
  }
};

exports.findAll = function (req, res) {
  db.invcode.findAll({ include: { model: db.user, as: 'usedBy' } }).then(function (entities) {
    res.json(entities);
  });
};

exports.createAdminCode = function (code) {
  db.invcode.find({ where: { code: code } }).then(function (entity) {
    if (!entity) {
      db.invcode.create({ code: code, type: 'admin' });
    }
  });
};

var createCodes = function (amount, type, teamId) {
  var promises = [];

  _.times(amount, function () {
    var code = crypto.randomBytes(5).toString('hex');

    var invcode = {
      code: code,
      type: type,
      teamId: teamId
    };

    promises.push(db.invcode.create(invcode));
  });

  return promises;
};

exports.createTeamCodes = function (team, promises) {
  promises.push(createCodes(4, 'member', team.id));
  promises.push(createCodes(2, 'standin', team.id));
};

exports.create = function (req, res) {
  // Optimization-TODO: return only the new codes, not all of them
  sequelize.Promise.all(createCodes(req.body.amount, req.body.type)).then(function () {
    db.invcode.findAll({ include: { model: db.user, as: 'usedBy' } })
    .then(function (entities) {
      res.statusCode = 201;
      res.json(entities);
    });
  })
  .catch(function (err) {
    res.sendStatus(400);
  });
};

exports.destroy = function(req, res) {
  db.invcode.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.destroy().then(function () {
        res.sendStatus(204);
      });
    } else {
      res.sendStatus(404);
    }
  });
};
