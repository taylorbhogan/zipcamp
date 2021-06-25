'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Designations', [
      { name: 'National Monument' },
      { name: 'National Forest' },
      { name: 'National Grassland' },
      { name: 'National Conservation Area' },
      { name: 'Forest Reserve' },
      { name: 'Outstanding Natural Area' },
      { name: 'Cooperative Management and Protection Area' },
      { name: 'Wilderness Area' },
      { name: 'Wilderness Study Area' },
      { name: 'Wild and Scenic River' },
      { name: 'National Historic Trail' },
      { name: 'National Park' },
      { name: 'National Preserve' },
      { name: 'National Historic Park' },
      { name: 'National Historic Site' },
      { name: 'National Wildlife Refuge' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Designations', null, {});
  }
};
