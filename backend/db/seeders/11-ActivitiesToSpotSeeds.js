'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('ActivitiesToSpots', [
        { spotId: 1, activityId: 1 },
        { spotId: 1, activityId: 2 },
        { spotId: 1, activityId: 3 },
        { spotId: 2, activityId: 1 },
        { spotId: 2, activityId: 2 },
        { spotId: 2, activityId: 4 },
        { spotId: 3, activityId: 1 },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('ActivitiesToSpots', null, {});
  }
};
