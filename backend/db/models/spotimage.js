'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotImage = sequelize.define('SpotImage', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgType: DataTypes.STRING
  }, {});
  SpotImage.associate = function(models) {
    // associations can be defined here
    SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId'})

  };
  return SpotImage;
};
