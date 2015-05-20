'use strict';

module.exports = function (sequelize, DataTypes) {
  var round = sequelize.define('round', {
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
      round.belongsTo(db.match);
    }
  });

  return round;
};
