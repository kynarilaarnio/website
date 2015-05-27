'use strict';

module.exports = function (sequelize, DataTypes) {
  var team = sequelize.define('team', {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 16]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rank: {
      type: DataTypes.ENUM('s1', 's2', 's3', 's4', 'se', 'sem', 'gn1', 'gn2', 'gn3', 'gnm', 'mg1', 'mg2', 'mge', 'dmg', 'le', 'lem', 'smfc', 'ge'),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT
    }
  },
  {
    associate: function (db) {
      // 1 captain
      team.hasOne(db.user, { as: 'captain', foreignKey: 'captainId' });

      // 4 actual members
      team.hasMany(db.user, { as: 'members', foreignKey: 'memberId' });

      // 2 reserves
      team.hasMany(db.user, { as: 'standins', foreignKey: 'standinId' });
    }
  });

  return team;
};
