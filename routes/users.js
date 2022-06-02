const express=require('express');

const router =express.Router();

const passport= require('passport');

const usersController=require('../controllers/users_controller')

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.post('/coverupdate/:id',passport.checkAuthentication,usersController.updatecover);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
//use passport as a middl ware to auth


router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),usersController.createSession);
router.get('/sign-out',usersController.destroySession)
//for sending req to request scope for specifying the data to get
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

//for reciving dcallback from google
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession)
module.exports =router;