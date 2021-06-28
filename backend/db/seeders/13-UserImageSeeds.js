'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('UserImages', [
        { userId: 1, imgUrl: 'userImage1.png', imgType: 'Fancy'},
        { userId: 2, imgUrl: 'userImage2.png', imgType: 'Fancy'},
        { userId: 3, imgUrl: 'userImage3.png', imgType: 'Fancy'},
        { userId: 4, imgUrl: 'userImage4.png', imgType: 'Fancy'},
        { userId: 5, imgUrl: 'userImage5.png', imgType: 'Fancy'},
        { userId: 6, imgUrl: 'userImage6.png', imgType: 'Fancy'},
        { userId: 7, imgUrl: 'userImage7.png', imgType: 'Fancy'},
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
