'use strict';

var db = require('../models');
var _ = require('lodash');

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else if (req.user && req.user.id === req.params.id) {
    var whitelist = [ 'nick', 'name', 'email', 'imageUrl', 'birthdate', 'guild' ];
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

  db.invitationCodes.find({ where: { code: req.body.code }}).done(function (entity) {
    if (entity) {
      var role = 'user';
      var createTeam = false;

      if (entity.type === 'admin') {
        role = 'admin';
      }

      if (entity.type === 'captain') {
        createTeam = true;
      }

      var user = createUser(req.user, role);

      db.user.create(user).done(function (entity) {
        res.statusCode = 201;
        res.json(entity);
      });
    }
    else {
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
