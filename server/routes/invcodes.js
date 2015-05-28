'use strict';

var db = require('../models');
var _ = require('lodash');
var crypto = require('crypto');
var sequelize = require('sequelize');

exports.authorize = function (req, res, next) {
  console.log(req.user);

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

exports.create = function (req, res) {
  var promises = [];

  _.times(req.body.amount, function () {
    var code = crypto.randomBytes(5).toString('hex');

    var invcode = {
      code: code,
      type: req.body.type
    };

    promises.push(db.invcode.create(invcode));
  });

  sequelize.Promise.all(promises).then(function () {
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
