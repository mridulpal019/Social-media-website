const Post =require('../models/post');
//for deleting comments
const Comment=require('../models/comment');

module.exports.create= function(req,res){
   Post.create({
       content:req.body.content,
       user:req.user._id

   },function(err,post){
       if (err){
           console.log('error in saving in post');

       }
       return res.redirect('back');
   }
   )
}


module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if (err){

        }
        //req.user is provided by passport part where we assign res.locals.user=req.user
        // .id means convertin the object id into string
        if (post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })


        }else{
            return res.redirect('back')
        }
    })
}