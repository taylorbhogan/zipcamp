'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define('Agency', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    }
  }, {});
  Agency.associate = function(models) {
    // associations can be defined here
    Agency.hasMany(models.Area, { foreignKey: 'agencyId' })
  };
  return Agency;
};
