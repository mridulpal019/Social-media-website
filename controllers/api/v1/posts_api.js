const Post =require('../../../models/post')
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){

    let posts =await Post.find({})
    .sort('-createdAt')//for sorting the post a/c to their time
    .populate('user')
    .populate({ //for specifying to fetch user of the comment
        path:'comments',
        populate:{
            path:'user'
        }
    });
    console.log(posts)
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}

module.exports.destroy = async function(req,res){
    try{

        let post = await Post.findById(req.params.id);
        if(post.user ==req.user.id){
        
        
        //req.user is provided by passport part where we assign res.locals.user=req.user
        // .id means convertin the object id into string
        // if (post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post:req.params.id});
            console.log('going to execute')
        
            return res.json(200,{
                message:"Post and assocaitaed comments are deleted"

            })
        }else{
          return res.json(401,{
              message:"You cannot delete the post"
          })
        }
    
    }catch(err){
        console.log('error',err)
        return res.json(500,{
            message:"Internal Server Errorrr",
        })
    }
      
        
    }