const passport=require('passport');
//we are using this staretegy
const LocalStrategy = require('passport-local').Strategy;
const User =require('../models/user');
//authentication
//telling passport.js to use this strategy
passport.use(new LocalStrategy({
    
    usernameField:'email',
    //after this we can add req
    passReqToCallback:true
    },
    function(req,email,password,done){
        
        //find a user and estalblish the indentity
        User.findOne({email:email},function(err,user){
            
            if (err){
                req.flash('error',err);
                return done(err);
            }
            if (!user || user.password != password){
                req.flash('error','Invalid Username/Password');
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

//check if user is authencticate

passport.checkAuthentication=function(req,res,next){
    //if the user is signed in then pass the request to next middleware
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we just sending this to the locals for
       //the views
        res.locals.user=req.user;
        // res.locals.post=req.post;
    }
    next();
}

module.exports =passport;
