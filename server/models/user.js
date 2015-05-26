'use strict';

var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
      get: function() {
        var value = this.getDataValue('birthdate');
        return value ? value.toISOString().substring(0, 10) : value;
      }
    },
    steamId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    guild: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    associate: function (db) {
      //user.belongsTo(db.team);
    }
  });

  passportLocalSequelize.attachToUser(user, {
    usernameField: 'nick'
  });

  return user;
};
