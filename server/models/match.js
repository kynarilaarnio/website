'use strict';

module.exports = function (sequelize, DataTypes) {
  var match = sequelize.define('match', {
    groupStage: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true
      }
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        notNull: false
      },
      get: function() {
        var value = this.getDataValue('date');
        return value ? value.toISOString().substring(0, 10) : value;
      }
    }
  },
  {
    associate: function (db) {
      match.hasMany(db.round);
      match.hasOne(db.team, { as: 'home' });
      match.hasOne(db.team, { as: 'away' });
    }
  });

  return match;
};
