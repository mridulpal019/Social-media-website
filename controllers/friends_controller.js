const Friend=require('../models/friend');
const User=require('../models/user');

module.exports.add=async function(req,res){
    try{
        // console.log(req.params.id,req.user._id)
        let from_user=await User.findById(req.user._id);
        
        let to_user=await User.findById(req.params.id);

        let newFriend=await Friend.create({
            from_user:req.user._id,
            to_user:req.params.id
        });

        


        from_user.friends.push(newFriend);
        to_user.friends.push(newFriend);
        from_user.save();
        to_user.save(); 


        newFriend=await Friend.findById(newFriend)
        .populate('from_user','name')
        .populate('to_user','name')


        return res.json(200,{
            message:"request for adding  is succesfully",
            data:{
                friendAdded:req.params.id,                            
                newFriend:newFriend
            }
        })
    
        //return res.redirect('back');




    }catch(err){
        console.log("error in adding friend",err);
        return res.json(500,{
            message:"internal Server Error"
        })
    }
}

module.exports.remove=async function(req,res){
       try{
           let friendship= await Friend.findById(req.params.id);
           let user=await User.findByIdAndUpdate(friendship.to_user,{$pull:{friends:req.params.id}});
           let user2=await User.findByIdAndUpdate(friendship.from_user,{$pull:{friends:req.params.id}})
           friendship.remove();
        //    let post =await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});
  
        let to_id; 
        
           if(req.user._id == user._id){
               to_id=user2._id
           }else{
              to_id=user._id
           }
        //   await friendship.to_user.friends.pop(req.params.id)
         

        return res.json(200,{
            message:"request for adding  is succesfully",
            data:{
                to_id:to_id,
            
            }
        })
       }catch(err){
        console.log("error in removing friend",err);
        return res.json(500,{
            message:"internal Server Errorsss"
        })
       }
   
}