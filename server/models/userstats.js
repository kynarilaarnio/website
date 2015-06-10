'use strict';

module.exports = function (sequelize, DataTypes) {
  var userstats = sequelize.define('userstats', {
    steamId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    kills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    assists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    headshots: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deaths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  });
  return userstats;
};
