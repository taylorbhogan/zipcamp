'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  Activity.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'ActivitiesToSpot',
      otherKey: 'spotId',
      foreignKey: 'activityId',
    }
    Activity.belongsToMany(models.Spot, columnMapping)
  };
  return Activity;
};
