'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('SpotImages', [
        { spotId: 1, imgUrl: 'spotImage1.png', imgType: 'Fancy'},
        { spotId: 2, imgUrl: 'spotImage2.png', imgType: 'Fancy'},
        { spotId: 2, imgUrl: 'spotImage3.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'spotImage4.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'spotImage5.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'spotImage6.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'spotImage7.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'spotImage8.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'spotImage9.png', imgType: 'Fancy'},
        { spotId: 4, imgUrl: 'spotImage10.png', imgType: 'Fancy'},
        { spotId: 4, imgUrl: 'spotImage11.png', imgType: 'Fancy'},
        { spotId: 5, imgUrl: 'spotImage12.png', imgType: 'Fancy'},
        { spotId: 5, imgUrl: 'spotImage13.png', imgType: 'Fancy'},
        { spotId: 6, imgUrl: 'spotImage14.png', imgType: 'Fancy'},
        { spotId: 7, imgUrl: 'spotImage15.png', imgType: 'Fancy'},
        { spotId: 8, imgUrl: 'spotImage16.png', imgType: 'Fancy'},
        { spotId: 9, imgUrl: 'spotImage17.png', imgType: 'Fancy'},
        { spotId: 10, imgUrl: 'spotImage18.png', imgType: 'Fancy'},
        { spotId: 11, imgUrl: 'spotImage19.png', imgType: 'Fancy'},
        { spotId: 12, imgUrl: 'spotImage20.png', imgType: 'Fancy'},
        { spotId: 13, imgUrl: 'spotImage21.png', imgType: 'Fancy'},
        { spotId: 14, imgUrl: 'spotImage22.png', imgType: 'Fancy'},
        { spotId: 15, imgUrl: 'spotImage23.png', imgType: 'Fancy'},
        { spotId: 16, imgUrl: 'spotImage24.png', imgType: 'Fancy'},
        { spotId: 17, imgUrl: 'spotImage25.png', imgType: 'Fancy'},
        { spotId: 17, imgUrl: 'spotImage26.png', imgType: 'Fancy'},
        { spotId: 18, imgUrl: 'spotImage27.png', imgType: 'Fancy'},
        { spotId: 19, imgUrl: 'spotImage28.png', imgType: 'Fancy'},
        { spotId: 20, imgUrl: 'spotImage29.png', imgType: 'Fancy'},
        { spotId: 21, imgUrl: 'spotImage30.png', imgType: 'Fancy'},
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
