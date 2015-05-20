'use strict';

module.exports = function (sequelize, DataTypes) {
  var group = sequelize.define('group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 1]
      }
    }
  },
  {
    associate: function (db) {
      group.hasMany(db.team, { foreignKey: { allowNull: true }});
    }
  });

  return group;
};
