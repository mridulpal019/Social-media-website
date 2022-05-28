const  Post =require('../models/post');
const User =require('../models/user');

module.exports.home =async function(req,res){

//populate the user for each post and comment
try{
    let posts =await Post.find({})
    .sort('-createdAt')//for sorting the post a/c to their time
    .populate('user')
    .populate({ //for specifying to fetch user of the comment
        path:'comments',
        populate:{
            path:'user'
        }
    });
    let users= await User.find({});
        
        return res.render('home',{
        title:"Codeial |home",
        posts:posts,
        all_users:users

});

}catch(err){
console.log(err,'error')
}
    
}
    
        
    




// module.exports.register= function(req,res){
//     return;
// }


//module.exports.actionname= function(req,res){} 