'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define('UserImage', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgType: DataTypes.STRING
  }, {});
  UserImage.associate = function(models) {
    // associations can be defined here
    UserImage.belongsTo(models.User, { foreignKey: 'userId'})

  };
  return UserImage;
};
