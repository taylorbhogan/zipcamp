'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Agencies', [
        { id: 1, name: 'USFS' },
        { id: 2, name: 'DOD' },
        { id: 3, name: 'AFRH' },
        { id: 4, name: 'BLM' },
        { id: 5, name: 'NPS' },
        { id: 6, name: 'FWS' },
    ], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Agencies', null, {});
  }
};
