'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

// Do not need to add createdAt and updatedAt because of the default value defined in the Sequelize migration file for those fields
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'sunsetchasing@user.io',
        username: 'Levi Shaber',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'Alejandra Oliva',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'Malik Peay',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'Johanna Perkins',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'Nick Roberts',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'Davis Harvin',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'Harvey Burke',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
