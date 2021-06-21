'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'States' }
      },
      designationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Designations' }
      },
      agencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Agencies' }
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Departments' }
      },
      acres: {
        type: Sequelize.INTEGER
      },
      designationDate: {
        type: Sequelize.STRING(255)
      },
      mileage: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Areas');
  }
};
