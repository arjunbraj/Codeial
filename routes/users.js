const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/details', usersController.details);
// sign up
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);

// sign in
router.get('/sign-in', usersController.signIn);
router.post('/create-session', usersController.createSession);

// sign out
router.get('/sign-out', usersController.signOut);

module.exports = router;