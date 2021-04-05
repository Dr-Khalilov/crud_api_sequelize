const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const newTask = await Task.create({ ...body, userId: id });
    res.send({ data: newTask });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks();
    console.log(tasks);
    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};
