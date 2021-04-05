const { Router } = require('express');
const { checkUser } = require('./middlewares/user.mw');
const UserController = require('./controller/user.controller');

const router = Router();

router.get('/users', UserController.getAllUsers);
router.post('/user', UserController.createUser);
router.patch('/user/:id', UserController.updateUser);
router.patch('/user-v2/:id', checkUser, UserController.updatedUserInstance);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
