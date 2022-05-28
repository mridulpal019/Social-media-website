const Post =require('../models/post');
//for deleting comments
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
  try{
      let post=await Post.create({
     content:req.body.content,
      user:req.user._id
});
//for sending data back 
if(req.xhr){
  return res.status('200').json({
    data:{
    post:post
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
        post.remove();

        await Comment.deleteMany({post:req.params.id});
        req.flash('success','Post deleted')
        return res.redirect('back');
    }else{
        req.flash('error','You cannot delete this Post')
        return res.redirect('back')
    }


}catch(err){
    req.flash('error',err)
    return res.redirect('back');
}
  
    
}