'use strict';

var db = require('../models');
var invcodes = require('../routes/invcodes');
var _ = require('lodash');
var sequelize = require('sequelize');
var steamIdConvert = require('steamidconvert')()

exports.authorize = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else if (req.user && req.user.id == req.params.id) {
    var whitelist = [ 'nick', 'name', 'email', 'imageUrl', 'birthdate', 'guild', 'contactInfo' ];
    req.body = _.pick(req.body, whitelist);
    next();
  }
  else {
    res.sendStatus(403);
  }
};

exports.findAll = function (req, res) {
  db.user.findAll().then(function (entities) {
    res.json(entities);
  });
};

exports.find = function (req, res) {
  db.user.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      var teamId = entity.captainId || entity.memberId || entity.standinId;

      var eager = [
        { model: db.user, as: 'captain' },
        { model: db.user, as: 'members' },
        { model: db.user, as: 'standins' }
      ];

      db.team.find({ where: { id: teamId }, include: eager }).then(function (team) {
        var resp = entity.get();

        if (team) {
          resp.team = team;
        }

        res.json(resp);
      });
    }
    else {
      res.sendStatus(404);
    }
  });
};

exports.create = function (req, res) {
  db.user.create(req.body).then(function (entity) {
    res.statusCode = 201;
    res.json(entity);
  })
  .catch(function (err) {
    res.sendStatus(400);
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
  var calculateSteamId = function (steamId) {
    if (steamId) {
      return steamIdConvert.convertToText(steamId);
    }

    return '';
  };

  db.invcode.find({ where: { code: req.body.code, usedById: null } }).then(function (entity) {
    if (entity) {
      var role = 'user';
      var foreignKey = '';
      var createTeam = false;
      var type = '';
      var code = req.body.code;
      var relatedTeamId = entity.teamId;

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
        birthdate: '1970',
        steamId: calculateSteamId(req.user.id)
      };

      db.user.create(userInfo).then(function (entity) {
        user = entity;

        if (createTeam) {
          var team = {
            tag: ' ',
            name: ' '
          };

          db.team.create(team).then(function (entity) {
            promises.push(entity.setCaptain(user.id));
            invcodes.createTeamCodes(entity, promises);
          }).catch (function (err) {
            res.sendStatus(400);
          });
        }
        else {
          promises.push(db.team.find({ where: { id: relatedTeamId } }).then(function (entity) {
            if (entity) {
              if (type === 'member') {
                promises.push(entity.addMembers(user.id));
              }
              else if (type === 'standin') {
                promises.push(entity.addStandins(user.id));
              }
            }
          }));
        }

        sequelize.Promise.all(promises).then(function () {
          db.user.find({ where: { id: user.id } }).then(function (entity) {
            var user = entity;

            // Invalidate invitation code
            db.invcode.find({ where: { code: code } }).then(function (entity) {
              entity.updateAttributes({ usedById: user.id }).then(function (entity) {
                res.statusCode = 201;
                res.json(user);
              });
            }).catch(function (err) {
              res.sendStatus(400);
            });
          });
        }).catch(function (err) {
          res.sendStatus(400);
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
  db.user.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.updateAttributes(req.body).then(function (entity) {
        res.json(entity);
      })
      .catch(function (err) {
        res.sendStatus(400);
      });
    }
    else {
      res.send(404);
    }
  });
};

exports.destroy = function (req, res) {
  db.user.find({ where: { id: req.params.id } }).then(function (entity) {
    if (entity) {
      entity.destroy().then(function () {
        res.send(204);
      });
    }
    else {
      res.send(404);
    }
  });
};
