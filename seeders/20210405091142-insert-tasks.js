'use strict';
const { User } = require('../models');
const _ = require('lodash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ attributes: ['id'] });
    console.log(users);

    const tasks = users
      .map(u =>
        new Array(_.random(1, 10, false)).fill(null).map((_, i) => {
          return {
            body: `Test task ${i}`,
            user_id: u.id,
            is_done: Math.random() > 0.5,
            created_at: new Date(),
            updated_at: new Date(),
          };
        })
      )
      .flat(2);

    queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
