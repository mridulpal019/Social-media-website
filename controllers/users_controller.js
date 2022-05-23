module.exports.profile= function(req,res){

    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"codeial |Sign Up"
    })
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"codeial |Sign in"
    })
}


