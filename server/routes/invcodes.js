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
  db.invcode.findAll({ include: { model: db.user, as: 'usedBy' } }).done(function (entities) {
    res.json(entities);
  });
};

exports.createAdminCode = function (code) {
  db.invcode.find({ where: { code: code } }).done(function (entity) {
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
  sequelize.Promise.all(createCodes(req.body.amount, req.body.type)).then(function () {
    db.invcode.findAll().done(function (entities) {
      res.statusCode = 201;
      res.json(entities);
    });
  });
};

exports.destroy = function(req, res) {
  db.invcode.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.sendStatus(204);
      });
    } else {
      res.sendStatus(404);
    }
  });
};
