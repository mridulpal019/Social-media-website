const passport=require('passport');
//we are using this staretegy
const LocalStrategy = require('passport-local').Strategy;
const User =require('../models/user');
//authentication
//telling passport.js to use this strategy
passport.use(new LocalStrategy({
    
    usernameField:'email'
    },
    function(email,password,done){
        
        //find a user and estalblish the indentity
        User.findOne({email:email},function(err,user){
            
            if (err){
                console.log("error in finding the user");
                return done(err);
            }
            if (!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);//second arguments tells the auth is not done while 1 is reserved for err
                        }
                    
            return done(null,user);            
        });
    }
    ))

//serializing the user which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    
    //encrprt the key on its own
    done(null,user.id);
})

//deserilaizing the user from the key in the cookiew
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err){
            console.log('error in cookes')
            return done(err);
        }
        return done(null,user);

    });
});


module.exports =passport;
