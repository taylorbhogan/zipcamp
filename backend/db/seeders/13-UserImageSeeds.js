'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('UserImages', [
        { id: 1, userId: 1, imgUrl: 'string1.png', imgType: 'Fancy'},
        { id: 2, userId: 2, imgUrl: 'string2.png', imgType: 'Fancy'},
        { id: 3, userId: 3, imgUrl: 'string3.png', imgType: 'Fancy'},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('UserImages', null, {});
  }
};
