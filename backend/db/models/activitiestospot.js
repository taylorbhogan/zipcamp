'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivitiesToSpot = sequelize.define('ActivitiesToSpot', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  ActivitiesToSpot.associate = function(models) {
    // associations can be defined here
  };
  return ActivitiesToSpot;
};
