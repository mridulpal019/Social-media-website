const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const env =require('./environment');
const crypto=require('crypto');
const User=require('../models/user');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.goggle_client_id,//from app
    clientSecret:env.goggle_client_Secret,//from google
    callbackURL:env.goggle_callbackURL //callbackurl mathcing from developers.google 
    },
    function(accessToken,refreshToken,profile,done){
       //find a user 
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if (err){
                console.log(err,'err in google strgty passport');
                return;
            }
            console.log(profile);
            if(user){
                // if found ,setthis user as req.user
                return done(null,user);
            }else{
                //if not found create a user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    passport:crypto.randomBytes(20).toString("hex")//for random passport
                },function(err,user){
                    if(err){console.log(err,'error in creating a user via google oatuh ');return;}
                    return done(null,user);
                });
            }
        });

    }

));

module.exports=passport; 