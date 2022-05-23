const express=require('express');

const router =express.Router();

const passport= require('passport');

const usersController=require('../controllers/users_controller')

router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
//use passport as a middl ware to auth


router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-up'}),usersController.createSession);
module.exports =router;