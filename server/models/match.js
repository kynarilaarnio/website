'use strict';

module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define('Match', {
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
  });

  return Match;
};
