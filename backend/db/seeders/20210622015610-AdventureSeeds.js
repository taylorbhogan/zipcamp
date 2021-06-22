'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Adventures', [
        { id: 1, spotId: 1, userPlannerId: 1, startDate: new Date(), endDate: new Date()},
        { id: 2, spotId: 2, userPlannerId: 1, startDate: new Date(), endDate: new Date()},
        { id: 3, spotId: 3, userPlannerId: 1, startDate: new Date(), endDate: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Adventures', null, {});
  }
};
