'use strict';
module.exports = (sequelize, DataTypes) => {
  const AreaImage = sequelize.define('AreaImage', {
    areaId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgType: DataTypes.STRING
  }, {});
  AreaImage.associate = function(models) {
    // associations can be defined here
    AreaImage.belongsTo(models.Area, { foreignKey: 'areaId'})
  };
  return AreaImage;
};
