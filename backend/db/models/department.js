'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    }
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Area, { foreignKey: 'departmentId '})
  };
  return Department;
};
