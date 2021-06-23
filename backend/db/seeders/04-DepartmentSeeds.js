'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Departments', [
        { id: 1, name: 'Department of Agriculture' },
        { id: 2, name: 'Department of Defense' },
        { id: 3, name: 'Department of the Interior' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Departments', null, {});
  }
};
