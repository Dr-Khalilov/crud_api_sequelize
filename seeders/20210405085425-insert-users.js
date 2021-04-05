'use strict';

const generateUser = key => ({
  first_name: `Name${key}`,
  last_name: `Surname${key}`,
  email: `test${key}@mail.com`,
  password_hash: `Test12345`,
  is_male: Math.random() > 0.5,
  birthday: new Date(2000, 1, key),
  created_at: new Date(),
  updated_at: new Date(),
});

const generateUsers = (amount = 50) => {
  return new Array(amount > 500 ? 500 : amount)
    .fill(null)
    .map((_, i) => generateUser(i));
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', generateUsers(100), {});
  },

  down: async (queryInterface, Sequelize) => {},
};
