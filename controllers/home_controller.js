const  Post =require('../models/post');

module.exports.home =function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial |home",
    //         posts:posts

    // });
    // });

//populate the user for each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Codeial |home",
            posts:posts

    }); 
    })
}



// module.exports.register= function(req,res){
//     return;
// }


//module.exports.actionname= function(req,res){} 