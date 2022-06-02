const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto=require('crypto');
const User=require('../models/user');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"227730572170-gpur4ct3tqtolfnknld598qc86g9sr1i.apps.googleusercontent.com",//from app
    clientSecret:"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",//from google
    callbackURL:"http://localhost:8000/users/auth/google/callback" //callbackurl mathcing from developers.google 
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