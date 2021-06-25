'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Tip.associate = function(models) {
    // associations can be defined here
    Tip.belongsTo(models.User, { foreignKey: 'userId'})
    Tip.belongsTo(models.Spot, { foreignKey: 'spotId'})
  };
  return Tip;
};
