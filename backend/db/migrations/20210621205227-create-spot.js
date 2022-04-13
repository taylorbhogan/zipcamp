'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users'}
      },
      lat: {
        type: Sequelize.DECIMAL(9,6),
        allowNull: false,
      },
      long: {
        type: Sequelize.DECIMAL(9,6),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      blurb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      directions: {
        type: Sequelize.STRING
      },
      areaId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Areas'}
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'States'}
      },
      avgRating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
