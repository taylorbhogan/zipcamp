'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spots', [
        { userId: 1, lat: 41.067262, long: -119.02918, name: 'Desert Stargazing Paradise', blurb: ' Enjoy unencumbered views of millions of stars in the night sky while camping in the middle of the Black Rock Desert playa. ', directions: 'Follow route 217 along the perimeter of the basin. Park when the terrian becomes too tough for your vehicle. ', areaId: "99", stateId: 33, avgRating: 0 },
        { userId: 1, lat: 36.707325, long: -121.290997, name: 'Peaceful Valley', blurb: 'Come to the valley and enjoy the remote solitude and beautiful sunsets on your way back from Pinnacles NP.', directions: 'Drive south down Route 25', areaId: "99", stateId: 6, avgRating: 0 },
        { userId: 1, lat: 39.238942, long: -120.037851, name: 'Beautiful Lake Tahoe Views', blurb: 'Amazing views of Lake Tahoe & its foilage are only a short uphill hike away.', directions: 'Park prior to the trail head, then follow the trail all the way to the top.', areaId: "99", stateId: 6, avgRating: 0 },
        { userId: 1, lat: 22.039661, long: -159.363558, name: 'Tropical Garden Dreamscape', blurb: 'You can stop dreaming about a tropical getaway and just come visit this place. ', directions: 'I don\'t remember :(', areaId: "99", stateId: 15, avgRating: 0 },
        { userId: 1, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 2, lat: 45.57377, long: -122.130123, name: 'Crazy Place', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 2, lat: 45.57377, long: -122.130123, name: 'Big tree', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 2, lat: 45.57377, long: -122.130123, name: 'By the river', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 2, lat: 45.57377, long: -122.130123, name: 'Great place', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 2, lat: 45.57377, long: -122.130123, name: 'Amazing little spot', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Groovy place', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Beers by the river', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Boo yah point', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Green Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'High Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Water Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Yellow Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 3, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
        { userId: 1, lat: 45.57377, long: -122.130123, name: 'Wahkeena Falls', blurb: 'I\'m not gonna lie, it\'s full of tourists. But maybe they\'re all onto something!', directions: 'Right off the HIstoric Columbia River Highway', areaId: "99", stateId: 43, avgRating: 0 },
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
