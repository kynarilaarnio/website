'use strict';

module.exports = function (sequelize, DataTypes) {
  var Round = sequelize.define('Round', {
    map: {
      type: DataTypes.ENUM('nuke', 'mirage', 'dust2', 'inferno', 'cache', 'overpass', 'cbble'),
      validate: {
        notNull: true
      }
    },
    scoreHome: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    },
    scoreAway: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false
      }
    }
  },
  {
    associate: function (db) {
      Round.belongsTo(db.Match);
    }
  });

  return Round;
};
