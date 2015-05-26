'use strict';

var db = require('../models');
var sequelize = require('sequelize');
var _ = require('lodash');

exports.findAll = function (req, res) {
  db.team.findAll({
    include: [
      { model: db.user, as: 'captain' },
      { model: db.user, as: 'members' },
      { model: db.user, as: 'standins' }
    ]
  }).done(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.team.find(
    { where: { id: req.params.id },
    include: [
      { model: db.user, as: 'captain' },
      { model: db.user, as: 'members' },
      { model: db.user, as: 'standins' }
    ]
  }).done(function (entity) {
    if (entity) {
      res.json(entity);
    }
    else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.team.create(req.body).done(function (entity) {
    res.statusCode = 201;

    var promises = [];

    if (req.body.captain) {
      promises.push(entity.setCaptain(req.body.captain.id));
    }

    if (req.body.members) {
      promises.push(entity.setMembers(_.pluck(req.body.members, 'id')));
    }

    if (req.body.standins) {
      promises.push(entity.setStandins(_.pluck(req.body.standins, 'id')));
    }

    sequelize.Promise.all(promises).then(function () {
      db.team.find(
        { where: { id: entity.id },
        include: [
          { model: db.user, as: 'captain' },
          { model: db.user, as: 'members' },
          { model: db.user, as: 'standins' }
        ]
      }).done(function (entity) {
        if (entity) {
          res.json(entity);
        }
        else {
          res.send(500);
        }
      });
    });
  });
};

exports.update = function (req, res) {
  db.team.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).done(function (entity) {
        var promises = [];

        if (req.body.captain) {
          promises.push(entity.setCaptain(req.body.captain.id));
        }

        if (req.body.members) {
          promises.push(entity.setMembers(_.pluck(req.body.members, 'id')));
        }

        if (req.body.standins) {
          promises.push(entity.setStandins(_.pluck(req.body.standins, 'id')));
        }

        sequelize.Promise.all(promises).done(function () {
          db.team.find(
            { where: { id: entity.id },
            include: [
              { model: db.user, as: 'captain' },
              { model: db.user, as: 'members' },
              { model: db.user, as: 'standins' }
            ]
          }).done(function (entity) {
            if (entity) {
              res.json(entity);
            }
            else {
              res.send(500);
            }
          });
        });
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function( req, res) {
  db.team.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
