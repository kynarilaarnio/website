'use strict';

var db = require('../models');
var _ = require('lodash');
var sequelize = require('sequelize');

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else if (req.user && req.user.id === req.params.id) {
    var whitelist = [ 'nick', 'name', 'email', 'imageUrl', 'birthdate', 'guild', 'contactInfo' ];
    req.body = _.pick(req.body, whitelist);
    next();
  }
  else {
    res.send(403);
  }
};

exports.findAll = function (req, res) {
  db.user.findAll().done(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.user.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      res.json(entity);
    }
    else {
      res.send(404);
    }
  });
};

exports.create = function (req, res) {
  db.user.create(req.body).done(function (entity) {
    res.statusCode = 201;
    res.json(entity);
  });
};

// This function needs some serious fucking unit testing and refactoring
// Have fun debugging this mess
exports.register = function (req, res) {
  var calculateSteamId = function () {
    return 'temp';
  };

  var createUser = function (user, role) {
    var user = {
      authIdentifier: req.user.identifier,
      nick: req.user.displayName,
      name: req.user.displayName,
      role: role,
      steamId: calculateSteamId(req.user.identifier)
    };

    return user;
  };

  db.invcodes.find({ where: { code: req.body.code, usedBy: null }}).done(function (entity) {
    if (entity) {
      var role = 'user';
      var foreignKey = '';
      var createTeam = false;
      var type = '';

      if (entity.type === 'admin') {
        role = 'admin';
      }
      else if (entity.type === 'captain') {
        createTeam = true;
      }
      else {
        type = entity.type;
      }

      var promises = [];

      var user;
      var userInfo = createUser(req.user, role);
      promises.push(db.user.create(userInfo).done(function (entity) {
        user = entity;

        if (createTeam) {
          db.team.create(team).done(function (entity) {
            promises.push(entity.setCaptain(user.id));

            // create member and standin invitation codes here?
          });
        }
        else {
          promises.push(db.team.find({ where: { id: entity.teamId }}).done(function (entity) {
            if (type === 'member') {
              promises.push(entity.setMember(user.id));
            }
            else if (type === 'standin') {
              promises.push(entity.setStandin(user.id));
            }
          }));
        }
      }));

      sequelize.Promise.all(promises).then(function () {
        db.user.find({ where: { id: user.id }}).done(function (entity) {
          res.statusCode = 201;
          res.json(entity);
        });
      });
    }
    else {
      // Code not found
      res.sendStatus(400);
    }
  });
};

exports.update = function (req, res) {
  db.user.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).done(function (entity) {
        res.json(entity);
      });
    }
    else {
      res.send(404);
    }
  });
};

exports.destroy = function (req, res) {
  db.user.find({ where: { id: req.params.id } }).done(function (entity) {
    if (entity) {
      entity.destroy().done(function () {
        res.send(204);
      });
    }
    else {
      res.send(404);
    }
  });
};
