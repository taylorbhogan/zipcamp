'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spots', [
        { userId: 1, lat: 41.067262, long: -119.02918, name: 'Desert Stargazing Paradise', blurb: ' Enjoy unencumbered views of millions of stars in the night sky while camping in the middle of the Black Rock Desert playa. ', directions: 'Follow route 217 along the perimeter of the basin. Park when the terrian becomes too tough for your vehicle. ', areaId: 198, stateId: 33, avgRating: 0 },
        { userId: 1, lat: 36.707325, long: -121.290997, name: 'Peaceful Valley', blurb: 'Come to the valley and enjoy the remote solitude and beautiful sunsets on your way back from Pinnacles NP.', directions: 'Drive south down Route 25', areaId: 1123, stateId: 6, avgRating: 0 },
        { userId: 1, lat: 39.238942, long: -120.037851, name: 'Beautiful Lake Tahoe Views', blurb: 'Amazing views of Lake Tahoe & its foilage are only a short uphill hike away.', directions: 'Park prior to the trail head, then follow the trail all the way to the top.', areaId: 35, stateId: 6, avgRating: 0 },
        { userId: 1, lat: 22.039661, long: -159.363558, name: 'Tropical Garden Dreamscape', blurb: 'You can stop dreaming about a tropical getaway and just come visit this place. ', directions: 'I don\'t remember :(', areaId: 1105, stateId: 15, avgRating: 0 },
        { userId: 1, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: 116, stateId: 43, avgRating: 0 },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Spots', null, {});
  }
};
