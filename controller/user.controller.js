const createError = require('http-error');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    if (!createdUser) {
      const err = createUser(204, 'No Content');
      return next(err);
    }
    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByPk(id);
    if (!user) {
      const err = createError(404, 'User not found');
      return next(err);
    }

    res.status(200).send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    if (!users.length) {
      const err = createError(404, 'Users not found');
      return next(err);
    }
    res.status(200).send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const [rows, [updatedUser]] = await User.update(body, {
      where: { id },
      returning: true,
    });
    if (rows !==1) {
      const err = createError(404, 'Users not found');
      return next(err);
    }
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updatedUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    const updatedUserInstance = await userInstance.update(body, {
      returning: true,
    });
    updatedUserInstance.password = undefined;
    res.status(200).send({ data: updatedUserInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const affectedUser = await User.destroy({
      where: { id },
    });
    if (affectedUser === 0) {
      const err = createError(404, 'User not found');
      return next(err);
    }
    res.status(200).send({ data: affectedUser });
  } catch (err) {
    next(err);
  }
};
