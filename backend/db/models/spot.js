'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    lat: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false,

    },
    long: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    blurb: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    directions: {
      type: DataTypes.STRING
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    avgRating: {
      type: DataTypes.INTEGER
    }
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, {foreignKey: 'userId'})
    Spot.belongsTo(models.State, { foreignKey: 'stateId'})
    Spot.belongsTo(models.Area, { foreignKey: 'areaId'})
    Spot.hasMany(models.SpotImage, { foreignKey: 'spotId'})
    Spot.hasMany(models.Tip, { foreignKey: 'spotId'})
    const columnMapping = {
      through: 'ActivitiesToSpot',
      otherKey: 'activityId',
      foreignKey: 'spotId',
    }
    Spot.belongsToMany(models.Activity, columnMapping)
  };
  return Spot;
};
