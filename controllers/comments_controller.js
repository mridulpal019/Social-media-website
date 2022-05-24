const Comment=require('../models/comment');
//for adding comments in post
const Post=require('../models/post');
module.exports.create= function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log('error in saving comment in db')
        }
        if (post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,comment){
                if (err){
                    console.log('error in saving comment in db')
                }
                //for updating the posts
                post.comments.push(comment);
                post.save();
           
                return res.redirect('back');
            });
            
        }
    });
    
    
   
}