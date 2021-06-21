'use strict';
module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define('Designation', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    }
  }, {});
  Designation.associate = function(models) {
    // associations can be defined here
    Designation.hasMany(models.Area, { foreignKey: 'designationId' })
  };
  return Designation;
};
