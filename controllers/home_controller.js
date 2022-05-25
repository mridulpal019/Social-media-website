const  Post =require('../models/post');
const User =require('../models/user');

module.exports.home =function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial |home",
    //         posts:posts

    // });
    // });

//populate the user for each post and comment
    Post.find({})
    .populate('user')
    .populate({ //for specifying to fetch user of the comment
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            if (err){}
            return res.render('home',{
                title:"Codeial |home",
                posts:posts,
                all_users:users
    
        }); 
        });
        
    })
}



// module.exports.register= function(req,res){
//     return;
// }


//module.exports.actionname= function(req,res){} 