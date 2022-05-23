const User =require('../models/user');

module.exports.profile= function(req,res){

    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:"codeial |Sign Up"
    })
}

module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:"codeial |Sign in"
    })
}
//get the sign up data 
module.exports.create =function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if (err){
            console.log("error in finding the user in signnig up");return;

        }

        if (!user){
            User.create(req.body,function(err,user){
                if (err){
                    console.log("error in creating user")
                    return;
                }

                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back')
        }
    })

}

module.exports.createSession =function(req,res){
    return res.redirect('/');
}


module.exports.destroySession=function(req,res){
    //passport provide this option to logout
    req.logout(function(err){
        if (err){
            console.log("error in logging out")
        }
    });

    return res.redirect('/')
}


