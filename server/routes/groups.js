'use strict';

var _ = require('lodash');
var db = require('../models');

exports.findAll = function (req, res) {
  db.group.findAll({ include: { model: db.team } }).done(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.group.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.group.create(req.body).done(function (entity) {
    res.statusCode = 201;
     entity.setTeams(_.pluck(req.body.teams, 'id')).done(function (teams) {
      entity.teams = req.body.teams;
      res.json(entity);
    });
  });
};

exports.update = function (req, res) {
  db.group.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).done(function (entity) {
        entity.setTeams(_.pluck(req.body.teams, 'id')).done(function (teams) {
          entity.teams = req.body.teams;
          res.json(entity);
        });
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function (req, res) {
  db.group.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
