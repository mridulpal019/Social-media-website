const Post =require('../models/post');
//for deleting comments
const Comment=require('../models/comment');
//for like
const Like=require('../models/like');

module.exports.create= async function(req,res){
  try{
      let post=await Post.create({
     content:req.body.content,
      user:req.user._id
      });
      //opulating user before sending the data so that we can access user.name in post section
      let ppost=await Post.findById(post._id)
             .populate('user');
     
  


//for sending data back 
if(req.xhr){
  return res.status(200).json({
    data:{
    post:ppost
  },  
  message:'Postcreated !'
})
}

req.flash('success','Posted Successfully')
return res.redirect('back');

  }catch(err){
req.flash('error',err)
return res.redirect('back');
  }
}

module.exports.destroy = async function(req,res){
try{
    let post = await Post.findById(req.params.id);
    
    //req.user is provided by passport part where we assign res.locals.user=req.user
    // .id means convertin the object id into string
    if (post.user == req.user.id){
        
      await Like.deleteMany({likeable:post,onModel:'Post'});
      await Like.deleteMany({_id:{$in:post.comments}});//for comments
      
      post.remove();

        await Comment.deleteMany({post:req.params.id});
        console.log('going to execute')
        if(req.xhr){
          return res.status(200).json({
            data:{
              post_id:req.params.id
            },
            message:"Post deleted"
          });
        }
        
    }else{
        req.flash('error','You cannot delete this Post')
        return res.redirect('back')
    }

}catch(err){
    req.flash('error',err)
    return res.redirect('back');
}
  
    
}