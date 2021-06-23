'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Designations', [
      { id: 1, name: 'National Monument' },
      { id: 2, name: 'National Forest' },
      { id: 3, name: 'National Grassland' },
      { id: 4, name: 'National Conservation Area' },
      { id: 5, name: 'Forest Reserve' },
      { id: 6, name: 'Outstanding Natural Area' },
      { id: 7, name: 'Cooperative Management and Protection Area' },
      { id: 8, name: 'Wilderness Area' },
      { id: 9, name: 'Wilderness Study Area' },
      { id: 10, name: 'Wild and Scenic River' },
      { id: 11, name: 'National Historic Trail' },
      { id: 12, name: 'National Park' },
      { id: 13, name: 'National Preserve' },
      { id: 14, name: 'National Historic Park' },
      { id: 15, name: 'National Historic Site' },
      { id: 16, name: 'National Wildlife Refuge' },
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
