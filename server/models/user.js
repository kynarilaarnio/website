'use strict';

var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nick: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1, 50]
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1, 255]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [3, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      validate: {
        notNull: false
      },
      get: function() {
        var value = this.getDataValue('birthdate');
        return value ? value.toISOString().substring(0, 10) : value;
      }
    },
    steamId: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    guild: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    }
  },
  {
    associate: function (db) {
      User.belongsTo(db.Team);
    }
  });

  passportLocalSequelize.attachToUser(User, {
    usernameField: 'nick'
  });

  return User;
};
