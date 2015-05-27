'use strict';

module.exports = function (sequelize, DataTypes) {
  var invcode = sequelize.define('invcode', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 10]
      },
      unique: true,
      index: true
    },
    type: {
      type: DataTypes.ENUM('admin', 'captain', 'member', 'standin'),
      allowNull: false
    }
  },
  {
    associate: function (db) {
      invcode.belongsTo(db.user, { as: 'usedBy' });
    }
  });

  return invcode;
};
