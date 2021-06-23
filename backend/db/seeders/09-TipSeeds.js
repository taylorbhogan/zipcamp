'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Tips', [
        { id: 1, userId: 1, spotId: 3, rating: 3, text: 'Keep your eyes peeled for wild horses!' },
        { id: 2, userId: 1, spotId: 2, rating: 5, text: 'Be sure to pack layers - it gets chilly & windy after the sun sets!' },
        { id: 3, userId: 1, spotId: 4, rating: 4, text: 'Remember to check your sunscreen\'s expiration date. ' },
        { id: 4, userId: 1, spotId: 1, rating: 4, text: 'Consider waterproof hiking boots as the trail can get wet and slippery as the snow melts. ' },
        { id: 5, userId: 1, spotId: 2, rating: 3, text: 'The avocados are a MUST - they\'re huge and very creamy.' },
        { id: 6, userId: 1, spotId: 5, rating: 4, text: 'Bring water/snacks for a picnic!' },
        { id: 7, userId: 1, spotId: 5, rating: 3, text: 'I\'d get there early to avoid the crowds' },
        { id: 8, userId: 1, spotId: 1, rating: 5, text: 'Pack a swimsuit!' },
        { id: 9, userId: 1, spotId: 3, rating: 4, text: 'Don\'t forget the chainsaw -- you\'ll want it for these trails' },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Tips', null, {});
  }
};
