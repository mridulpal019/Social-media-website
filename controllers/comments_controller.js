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


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if (err){

        }
        //req.user is provided by passport part where we assign res.locals.user=req.user
        // .id means convertin the object id into string
        if (comment.user == req.user.id){
            //storing post id caz if we remove commnet first its attribute will lost as well
            let postid=comment.post
            comment.remove();
            //$pull will remove the content from that arrat
            Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post){
                // post.comment.pop(comment);
                // post.save();
                return res.redirect('back');

            });
            
        }else{
            return res.redirect('back')
        }
    })
}