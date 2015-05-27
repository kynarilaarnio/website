'use strict';

module.exports = function (sequelize, DataTypes) {
  var invitationCode = sequelize.define('invitationCode', {
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
      invitationCode.belongsTo(db.user, { as: 'usedBy' });
    }
  });

  return invitationCode;
};
