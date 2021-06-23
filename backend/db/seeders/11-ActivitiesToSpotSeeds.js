'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('ActivitiesToSpots', [
        { id: 1, spotId: 1, activityId: 1 },
        { id: 2, spotId: 1, activityId: 2 },
        { id: 3, spotId: 1, activityId: 3 },
        { id: 4, spotId: 2, activityId: 1 },
        { id: 5, spotId: 2, activityId: 2 },
        { id: 6, spotId: 2, activityId: 4 },
        { id: 7, spotId: 3, activityId: 1 },
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
