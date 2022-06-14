const passport=require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy=require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
const env=require('./environment');
let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret,
} 
//authentication 
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if (err){
            console.log('error in finding the user from jwt',err)
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));


module.exports=passport; 