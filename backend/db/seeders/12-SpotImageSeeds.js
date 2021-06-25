'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('SpotImages', [
        { spotId: 1, imgUrl: 'string1.png', imgType: 'Fancy'},
        { spotId: 2, imgUrl: 'string2.png', imgType: 'Fancy'},
        { spotId: 2, imgUrl: 'string3.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'string4.png', imgType: 'Fancy'},
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
