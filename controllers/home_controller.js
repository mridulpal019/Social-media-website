const  Post =require('../models/post');
const User =require('../models/user');

module.exports.home =async function(req,res){

//populate the user for each post and comment
try{
    // newFriend=await Friend.findById(newFriend)
    //     .populate('from_user','name')
    //     .populate('to_user','name')


    let posts =await Post.find({})
    .sort('-createdAt')//for sorting the post a/c to their time
    .populate('user')
    .populate({ //for specifying to fetch user of the comment
        path:'comments',
        populate:{
            path:'user'
        }
    })
    // .populate('comments')
    // .populate('likes');//for post
    let loginuser;
    // console.log(posts)
    
    if( req.user){
    loginuser= await User.findById(req.user.id)
    .populate({
        path:'friends',
        populate:{ 
            path:'to_user from_user',
            populate:'name avatar'
        }               
    });
    }
    let users= await User.find({});
        return res.render('home',{
        title:"Codeial |home",
        posts:posts,
        all_users:users,
        loginuser:loginuser

});

}catch(err){
console.log(err,'error')
}
    
}
    
        
    




// module.exports.register= function(req,res){
//     return;
// }

//ksouqwhnjlipcyiv
//module.exports.actionname= function(req,res){} 