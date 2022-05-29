const User =require('../models/user');
const passport=require('passport');
//for deleting multiple copies of file uploaded
const fs=require('fs');
const path=require('path');

module.exports.profile= function(req,res){

    
        User.findById(req.params.id,function(err,user){
            if(err){}
            return res.render('user_profile', {
                title: 'User Profile',
                profile_user:user

            })

        })
       
}

module.exports.update = async function(req,res){
    // if (req.user.id ==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorised');
    // }
    if (req.user.id ==req.params.id){
        try{
           let user =await User.findById(req.params.id);

           User.uploadedAvatar(req,res,function(err){
               if (err){
                   console.log('*********multer err',err);
               }

               user.name =req.body.name;
               user.email=req.body.email;
               if (req.file){
//todo check if file is present in the server or not
                  if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                  }
                   //this is saving the path of the uploaded file into the avatar field in the user
                   user.avatar =User.avatarPath +'/' +req.file.filename ;
               }
               user.save()
               return res.redirect('back')
             
           })
        }catch(rr){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        return res.status(401).send('Unauthorised');
    }
}

module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
        req.flash('error','You already have an account')
        return res.redirect('/users/profile')
    }
    
    return res.render('user_sign_up',{
        title:"codeial |Sign Up"
    })
}

module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
        req.flash('error','You are Logged In Already!!!')
       return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:"codeial |Sign in"
    })
}
//get the sign up data 
module.exports.create =function(req,res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','Password and Confirm password is not matching')
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if (err){
            req.flash('error',err);
            return;
        }

        if (!user){
            User.create(req.body,function(err,user){
                if (err){
                    req.flash('error',err)
                    return;
                }
                req.flash('success','Registered Successfully');
                return res.redirect('/users/sign-in')
            })
        }else{
            req.flash('error','Email is already registered.')
            return res.redirect('back');
        }
    })

}

module.exports.createSession =function(req,res){
    //flash use
    req.flash('success','Logged in Successfuly');
    return res.redirect('/');
} 


module.exports.destroySession=function(req,res){
    //passport provide this option to logout
    req.logout(function(err){
        if(err){

        }
    });
    console.log('loggout');
    req.flash('success','Log out Successfully');
     
    return res.redirect('/');
}


