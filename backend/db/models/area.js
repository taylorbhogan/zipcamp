'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    acres: DataTypes.INTEGER,
    designationDate: DataTypes.STRING(255),
    mileage: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    latitude: DataTypes.DECIMAL(9,6),
    longitude: DataTypes.DECIMAL(9,6)
  }, {});
  Area.associate = function(models) {
    // associations can be defined here
    Area.hasMany(models.AreaImage, { foreignKey: 'areaId'})
    Area.belongsTo(models.Designation, { foreignKey: 'designationId'})
    Area.belongsTo(models.Agency, { foreignKey: 'agencyId'})
    Area.belongsTo(models.Department, { foreignKey: 'departmentId'})
    Area.belongsTo(models.State, { foreignKey: 'stateId'})
    Area.hasMany(models.Spot, { foreignKey: 'areaId'})
  };
  return Area;
};
