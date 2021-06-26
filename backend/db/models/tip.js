const moment = require('moment');

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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        // return moment(this.getDataValue('createdAt')).format('DD/MMMM/YYYY h:mm:ss');
        return moment(this.getDataValue('createdAt')).format('[on] MMMM DD, YYYY [at] h:mm:ss');
    }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    //   get() {
    //     return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
    // }
    }
  }, {});
  Tip.associate = function(models) {
    // associations can be defined here
    Tip.belongsTo(models.User, { foreignKey: 'userId'})
    Tip.belongsTo(models.Spot, { foreignKey: 'spotId'})
  };

  // Tip.findAll({
  //   attributes: [
  //       'id',
  //       'userId',
  //       'spotId',
  //       'rating',
  //       'text',
  //       // [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'formattedCreatedAt'],
  //       [sequelize.fn('date_format'('createdAt', 'HH12:MI:SS'))],
  //       'updatedAt'
  //   ]})
  //   .then(function(result) {
  //     console.log(result);
  //   });



  return Tip;
};
