const Comment=require('../models/comment');
//for adding comments in post
const Post=require('../models/post');
module.exports.create= async function(req,res){
  try{
    let post=await Post.findById(req.body.post);
    if (post){
         let comment= await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        })
            //for updating the posts
        post.comments.push(comment);
        post.save();
       
        return res.redirect('back');
      
        
    }

  }catch(err){
      console.log(err,'error');
      return;
  }
   
    
    
    
   
}


module.exports.destroy =async function(req,res){
 try{
    let comment = await Comment.findById(req.params.id);     
    //req.user is provided by passport part where we assign res.locals.user=req.user
    // .id means convertin the object id into string
    if ((comment.user == req.user.id) || ( comment.post.user == req.user.id ) ){
        //storing post id caz if we remove commnet first its attribute will lost as well
        let postid=comment.post
        comment.remove();
        //$pull will remove the content from that array
        let post =await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});
            // post.comment.pop(comment);
            // post.save();
            return res.redirect('back');
    }else{
        return res.redirect('back')
    }

 }catch(err){
     console.log(err,'error');
     return;
 }  
    
    
}