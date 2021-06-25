'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Adventures', [
        { spotId: 1, userPlannerId: 1, startDate: new Date(), endDate: new Date()},
        { spotId: 2, userPlannerId: 1, startDate: new Date(), endDate: new Date()},
        { spotId: 3, userPlannerId: 1, startDate: new Date(), endDate: new Date()},
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
