'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Activities', [
        { name: 'hiking', icon: 'iconurlstring'},
        { name: 'biking', icon: 'iconurlstring'},
        { name: 'rock climbing', icon: 'iconurlstring'},
        { name: 'swimming', icon: 'iconurlstring'},
        { name: 'cliff diving', icon: 'iconurlstring'},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Activities', null, {});
  }
};
