const Comment=require('../models/comment');
//for adding comments in post
const Post=require('../models/post');
const Like=require('../models/like');
const commentsMailer=require('../mailers/comments_mailer');
module.exports.create= async function(req,res){
  try{
    let post=await Post.findById(req.body.post);
    console.log(post);
    if (post){
         let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        })
            //for updating the posts
        post.comments.push(comment);
        post.save();
           //populating comment.user.name(only name is send so that end user cant find its password)
         comment=await Comment.findById(comment._id)
             .populate('user','name email');
        //for mailing 
        // commentsMailer.newComment(comment);


        if(req.xhr){
            return res.status(200).json({
              data:{
              comment:comment
            }, 
            message:'comment created !'
          })
          }
          
       req.flash('success','Commented !!')
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

        await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
        
            // post.comment.pop(comment);
            // post.save();
            if(req.xhr){
                return res.status(200).json({
                  data:{
                    comment_id:req.params.id
                  },
                  message:"Post deleted"
                });
              }
            req.flash('success','Comment deleted successfully')
            return res.redirect('back');
    }else{
        req.flash('error','You cannot delete comment')
        return res.redirect('back')
    }

 }catch(err){
     console.log(err,'error');
     return;
 }  
   
}