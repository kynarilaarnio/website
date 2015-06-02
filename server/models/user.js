'use strict';

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
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: 3000
      }
    },
    contactInfo: {
      type: DataTypes.TEXT
    },
    guild: {
      type: DataTypes.STRING,
      allowNull: false
    },
    steamId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authIdentifier: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'staff', 'user'),
      DefaultValue: 'user',
      allowNull: false
    }
  },
  {
    associate: function (db) {
      // One of these is used
      user.belongsTo(db.team, { foreignKey: 'captainId', as: 'captain' });
      user.belongsTo(db.team, { foreignKey: 'memberId', as: 'member' });
      user.belongsTo(db.team, { foreignKey: 'standinId', as: 'standin' });
    }
  });

  return user;
};
