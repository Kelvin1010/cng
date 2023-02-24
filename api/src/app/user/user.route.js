const express = require('express');
const router = express.Router();
const _userController = require('./user.controller');

/* GET users. */
router.get('/', _userController.get);

/* GET user by id. */
router.get('/:id', _userController.getById);

/* GET user by username. */
router.get('/profile/:username', _userController.getByUsername);

/* Sign up user */
router.post('/sign_up', _userController.signUp);

/* Sign in user */
router.post('/sign_in', _userController.signIn);

/* Active user */
router.post('/active/:id', _userController.activeUser);

/* Deactive user */
router.post('/deactive/:id', _userController.deactiveUser);

/* Change password */
router.put('/change_passwd/:id', _userController.changePasswd);

/* Reset password - For Admin only */
router.put('/reset_passwd/:id', _userController.resetPasswd);

/* PUT user */
router.put('/:id', _userController.update);

/* DELETE user */
router.delete('/:id', _userController.remove);

module.exports = router;
