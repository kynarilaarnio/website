'use strict';

var db = require('../models');
var sequelize = require('sequelize');
var _ = require('lodash');

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else if (req.user && req.user.captainId && req.user.captainId === req.params.id) {
    var whitelist = [ 'tag', 'name', 'imageUrl', 'rank', 'description' ];
    req.body = _.pick(req.body, whitelist);
    next();
  }
  else {
    res.send(403);
  }
};

exports.findAll = function (req, res) {
  db.team.findAll({
    include: [
      { model: db.user, as: 'captain' },
      { model: db.user, as: 'members' },
      { model: db.user, as: 'standins' }
    ]
  }).then(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  var eager = [
    { model: db.user, as: 'captain' },
    { model: db.user, as: 'members' },
    { model: db.user, as: 'standins' }
  ];

  if (req.user && req.user.teamId === req.id) {
    eager.push({ model: db.invcode, foreignKey: 'teamId'});
  }

  db.team.find({ where: { id: req.params.id }, include: eager }).then(function (entity) {
    if (entity) {
      res.json(entity);
    }
    else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.team.create(req.body).then(function (entity) {
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
      }).then(function (entity) {
        if (entity) {
          res.json(entity);
        }
        else {
          res.send(500);
        }
      });
    })
    .catch(function (err) {
      res.sendStatus(400);
    });
  });
};

exports.update = function (req, res) {
  db.team.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).then(function (entity) {
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
          }).then(function (entity) {
            if (entity) {
              res.json(entity);
            }
            else {
              res.send(500);
            }
          });
        });
      })
      .catch(function (err) {
        res.sendStatus(400);
      });
    } else {
      res.send(404);
    }
  });
};

exports.destroy = function( req, res) {
  db.team.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.destroy().then(function () {
        res.send(204);
      });
    } else {
      res.send(404);
    }
  });
};
