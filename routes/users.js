const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/details', usersController.details);
// sign up
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);

// sign in
router.get('/sign-in', usersController.signIn);
// -> using passport as middleware
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/users/sign-in'}), usersController.createSession);

module.exports = router;