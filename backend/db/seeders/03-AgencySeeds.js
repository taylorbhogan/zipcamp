'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Agencies', [
        { name: 'USFS' },
        { name: 'DOD' },
        { name: 'AFRH' },
        { name: 'BLM' },
        { name: 'NPS' },
        { name: 'FWS' },
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
