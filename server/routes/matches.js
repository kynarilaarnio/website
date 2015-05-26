'use strict';

var db = require('../models');
var _ = require('lodash');

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else {
    res.send(403);
  }
};

exports.findAll = function (req, res) {
  db.match.findAll().done(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.match.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.match.create(req.body).done(function (entity) {
    res.statusCode = 201;
    res.json(entity);
  });
};

exports.update = function (req, res) {
  db.match.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).done(function (entity) {
        res.json(entity);
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function (req, res) {
  db.match.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
