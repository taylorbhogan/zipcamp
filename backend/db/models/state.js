'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    abbreviation: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true,
    }
  }, {});
  State.associate = function(models) {
    // associations can be defined here
    State.hasMany(models.Area, { foreignKey: 'stateId' })
    State.hasMany(models.Spot, { foreignKey: 'stateId' })
  };
  return State;
};
