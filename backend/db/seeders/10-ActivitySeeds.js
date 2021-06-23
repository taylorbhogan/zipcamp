'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Activities', [
        { id: 1, name: 'hiking', icon: 'iconurlstring'},
        { id: 2, name: 'biking', icon: 'iconurlstring'},
        { id: 3, name: 'rock climbing', icon: 'iconurlstring'},
        { id: 4, name: 'swimming', icon: 'iconurlstring'},
        { id: 5, name: 'cliff diving', icon: 'iconurlstring'},
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
