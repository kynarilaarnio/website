'use strict';

var db = require('../models');

exports.findAll = function (req, res) {
  db.Round.findAll().done(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.Round.find({ where: { id: req.param('id') } }).done(function (entity) {
    if (entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.Round.create(req.body).done(function (entity) {
    res.statusCode = 201;
    res.json(entity);
  });
};

exports.update = function(req, res) {
  db.Round.find({ where: { id: req.param('id') } }).done(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).done(function (entity) {
        res.json(entity);
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function(req, res) {
  db.Round.find({ where: { id: req.param('id') } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
