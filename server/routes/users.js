'use strict';

var db = require('../models');
var invcodes = require('../routes/invcodes');
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
    res.sendStatus(403);
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
      res.sendStatus(404);
    }
  });
};

exports.create = function (req, res) {
  db.user.create(req.body).done(function (entity) {
    res.statusCode = 201;
    res.json(entity);
  });
};

exports.getProfile = function (user) {
  return db.user.find({ where: { authIdentifier: user.id } });
};

// This function needs some serious fucking unit testing and most likely refactoring
// Have fun debugging this mess
//
// Process:
// 1. Steam login
// 2. Enter invitation code and following function gets called, validate code in this function
// 3. Link steam login identifier with user profile (+ calculate 64bit steamid for stats parser)
// 4. Create team if invitation code is for captain and link newly created user to team as a captain
//    or associate members / standins as members / standsins if invitation code is linked to a team
//    or ignore associations with admins and authorize user to create, edit, destroy and fuck up everything
// 5. If team was created (invitation code was for a captain), create 4 member invitation codes and
//    and 2 standin invitation codes associated with the newly created team -> associate when they
//    are requesting this mess.
// 6. Drink beer
// 7. ???
// 8. ???
exports.register = function (req, res) {
  var calculateSteamId = function () {
    return 'temp';
  };

  db.invcode.find({ where: { code: req.body.code, usedById: null }}).done(function (entity) {
    if (entity) {
      var role = 'user';
      var foreignKey = '';
      var createTeam = false;
      var type = '';
      var code = req.body.code;

      // Invitation code types at the moment: admin, captain, member, standin
      // User roles at the moment: admin, staff, user (staff is defined but not used)
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

      var userInfo = {
        authIdentifier: req.user.id,
        nick: req.user.displayName,
        name: req.user.displayName,
        role: role,
        guild: '',
        steamId: calculateSteamId(req.user.identifier)
      };

      db.user.create(userInfo).done(function (entity) {
        user = entity;

        if (createTeam) {
          db.team.create(team).done(function (entity) {
            promises.push(entity.setCaptain(user.id));
            promises = promises.concat(invcodes.createTeamCodes(entity));
          });
        }
        else {
          promises.push(db.team.find({ where: { id: entity.teamId } }).done(function (entity) {
            if (type === 'member') {
              promises.push(entity.setMember(user.id));
            }
            else if (type === 'standin') {
              promises.push(entity.setStandin(user.id));
            }
          }));
        }

        sequelize.Promise.all(promises).then(function () {
          db.user.find({ where: { id: user.id } }).done(function (entity) {
            var user = entity;

            // Invalidate invitation code
            db.invcode.find({ where: { code: code } }).done(function (entity) {
              entity.updateAttributes({ usedById: user.id }).done(function (entity) {
                res.statusCode = 201;
                res.json(user);
              });
            });
          });
        });
      });
    }
    else {
      // Code not found or already used
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
