const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');
// console.log('user router loaded');

// router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);


router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

// use passport as a middleware({failureRedirect:'/users/sign-in'}) to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);
// in the above line if passport authentication is done then usersController.createSession is called

router.get('/sign-out',usersController.destroySession);

module.exports = router;