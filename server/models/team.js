'use strict';

module.exports = function (sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    tag: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1, 16]
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1, 255]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    rank: {
      type: DataTypes.ENUM('s1', 's2', 's3', 's4', 'se', 'sem', 'gn1', 'gn2', 'gn3', 'gnm', 'mg1', 'mg2', 'mge', 'dmg', 'le', 'lem', 'smfc', 'ge'),
      validate: {
        notNull: false
      }
    }
  },
  {
    associate: function (db) {
      // 1 captain
      Team.hasOne(db.User, { as: 'captain' });

      // 4 actual members
      Team.hasMany(db.User, { as: 'member' });

      // 2 reserves
      Team.hasMany(db.User, { as: 'reserve' });

      Team.hasOne(db.Group);
    }
  });

  return Team;
};
