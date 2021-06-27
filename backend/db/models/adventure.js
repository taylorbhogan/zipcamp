'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adventure = sequelize.define('Adventure', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userPlannerId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: DataTypes.STRING
  }, {});
  Adventure.associate = function(models) {
    // associations can be defined here
    Adventure.belongsTo(models.Spot, { foreignKey: 'spotId'})
    Adventure.belongsTo(models.User, { foreignKey: 'userPlannerId'})
  };
  return Adventure;
};
