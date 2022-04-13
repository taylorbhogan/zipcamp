'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('AreaImages', [
        { areaId: "99782", imgUrl: 'string1.png', imgType: 'Fancy'},
        { areaId: "99", imgUrl: 'string2.png', imgType: 'Fancy'},
        { areaId: "981", imgUrl: 'string3.png', imgType: 'Fancy'},
        { areaId: "98", imgUrl: 'string4.png', imgType: 'Fancy'},
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
