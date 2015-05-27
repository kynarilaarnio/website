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
    res.send(403);
  }
};

exports.findAll = function (req, res) {
  db.invitationCode.findAll().done(function (entities) {
    res.json(entities);
  });
};

exports.createCodes = function (req, res) {
  var codes = [];
  var promises = [];

  _.times(req.body.amount, function () {
    code.push(crypto.randomBytes(10).toString('hex'));

    var invitationCode = {
      code: code,
      type: req.body.type
    };

    promises.push(db.invitationCode.create(invitationCode));
  });

  sequelize.Promise.all(promises).then(function () {
    db.invitationCode.findAll().done(function (entities) {
      res.statusCode = 201;
      res.json(entities);
    });
  });
};

exports.destroy = function(req, res) {
  db.invitationCode.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
