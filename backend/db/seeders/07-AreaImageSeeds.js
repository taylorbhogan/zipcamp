'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('AreaImages', [
        { id: 1, areaId: 22, imgUrl: 'string1.png', imgType: 'Fancy'},
        { id: 2, areaId: 14, imgUrl: 'string2.png', imgType: 'Fancy'},
        { id: 3, areaId: 21, imgUrl: 'string3.png', imgType: 'Fancy'},
        { id: 4, areaId: 42, imgUrl: 'string4.png', imgType: 'Fancy'},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('AreaImages', null, {});
  }
};
