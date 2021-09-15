'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('SpotImages', [
        { spotId: 10, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage1.png', imgType: 'Fancy'},
        { spotId: 7, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage2.png', imgType: 'Fancy'},
        { spotId: 4, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage3.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage4.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage5.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage6.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage7.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage8.png', imgType: 'Fancy'},
        { spotId: 3, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage9.png', imgType: 'Fancy'},
        { spotId: 4, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage10.png', imgType: 'Fancy'},
        { spotId: 4, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage11.png', imgType: 'Fancy'},
        { spotId: 5, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage12.png', imgType: 'Fancy'},
        { spotId: 5, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage13.png', imgType: 'Fancy'},
        { spotId: 6, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage14.png', imgType: 'Fancy'},
        { spotId: 7, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage15.png', imgType: 'Fancy'},
        { spotId: 8, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage16.png', imgType: 'Fancy'},
        { spotId: 9, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage17.png', imgType: 'Fancy'},
        { spotId: 1, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage18.png', imgType: 'Fancy'},
        { spotId: 11, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage19.png', imgType: 'Fancy'},
        { spotId: 12, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage20.png', imgType: 'Fancy'},
        { spotId: 13, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage21.png', imgType: 'Fancy'},
        { spotId: 14, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage22.png', imgType: 'Fancy'},
        { spotId: 15, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage23.png', imgType: 'Fancy'},
        { spotId: 16, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage24.png', imgType: 'Fancy'},
        { spotId: 17, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage25.png', imgType: 'Fancy'},
        { spotId: 2, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage26.png', imgType: 'Fancy'},
        { spotId: 18, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage27.png', imgType: 'Fancy'},
        { spotId: 19, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage28.png', imgType: 'Fancy'},
        { spotId: 20, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage29.png', imgType: 'Fancy'},
        { spotId: 21, imgUrl: 'https://zipcamp-by-taylorbhogan.s3.us-west-2.amazonaws.com/spotImage30.png', imgType: 'Fancy'},
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
