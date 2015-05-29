'use strict';

var _ = require('lodash');
var db = require('../models');

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else {
    res.send(403);
  }
};

exports.findAll = function (req, res) {
  db.group.findAll({ include: { model: db.team } }).then(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.group.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.group.create(req.body).then(function (entity) {
    res.statusCode = 201;
     entity.setTeams(_.pluck(req.body.teams, 'id')).then(function (teams) {
      entity.teams = req.body.teams;
      res.json(entity);
    });
  })
  .catch(function (err) {
    res.sendStatus(400);
  });
};

exports.update = function (req, res) {
  db.group.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).then(function (entity) {
        entity.setTeams(_.pluck(req.body.teams, 'id')).then(function (teams) {
          entity.teams = req.body.teams;
          res.json(entity);
        })
        .catch(function (err) {
          res.sendStatus(400);
        });
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function (req, res) {
  db.group.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.destroy().then(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
