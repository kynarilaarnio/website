'use strict';

module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [1, 1]
      }
    }
  });

  return Group;
};
