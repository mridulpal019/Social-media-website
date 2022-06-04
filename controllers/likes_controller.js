const Post=require('../models/post');
const Like=require('../models/like');
const Comment=require('../models/comment');


module.exports.toggleLike=async function(req,res){
    try{
        //likes/toggle/?id=abcsc&type=Post
        let likeable;
        let deleted =false;
        console.log(req.query)
        if(req.query.type=="Post"){
            likeable= await Post.findById(req.query.id).populate('likes');

        }else{
            likeable= await Comment.findById(req.query.id).populate('likes');

        }
        console.log(likeable);
        //check if like i spreend
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id,
        })
        //if a likeable exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id)
            likeable.save();

            existingLike.remove();
            deleted =true

        }else{
            //make a new like
            let NewLike=await Like.create({
             user:req.user._id,
             likeable:req.query.id,
             onModel:req.query.type
            });
            console.log(likeable.likes);
            likeable.likes.push(NewLike);
            likeable.save();

        }

        return res.json(200,{
            message:"reques is succesfully",
            data:{
                deleted:deleted,
            }
        })

    }catch(err){
        console.log(err,"err in toggle view")
        return res.json(500,{
            message:"internal Server Error"
        })
    }
}