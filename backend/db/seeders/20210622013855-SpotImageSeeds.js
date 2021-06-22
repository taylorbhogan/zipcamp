'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('SpotImages', [
        { id: 1, spotId: 1, imgUrl: 'string1.png', imgType: 'Fancy'},
        { id: 2, spotId: 2, imgUrl: 'string2.png', imgType: 'Fancy'},
        { id: 3, spotId: 2, imgUrl: 'string3.png', imgType: 'Fancy'},
        { id: 4, spotId: 3, imgUrl: 'string4.png', imgType: 'Fancy'},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('SpotImages', null, {});
  }
};
