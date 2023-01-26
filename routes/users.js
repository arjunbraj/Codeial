const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/details', usersController.details);
// sign up
router.get('/sign-up', usersController.signUp);
// sign in
router.get('/sign-in', usersController.signIn);

module.exports = router;