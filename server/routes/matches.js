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
  db.match.findAll().then(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.match.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.match.create(req.body).then(function (entity) {
    res.statusCode = 201;
    res.json(entity);
  })
  .catch(function (err) {
    res.sendStatus(400);
  });
};

exports.update = function (req, res) {
  db.match.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).then(function (entity) {
        res.json(entity);
      })
      .catch(function (err) {
        res.sendStatus(400);
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function (req, res) {
  db.match.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.destroy().then(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
