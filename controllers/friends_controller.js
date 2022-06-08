const Friend=require('../models/friend');
const User=require('../models/user');

module.exports.add=async function(req,res){
    try{ 
        console.log(req.params.id,req.user._id,'in addtion body')
        let from_user=await User.findById(req.user._id);
        // console.log(req.user._id,'request user',from_user);
        
        let to_user=await User.findById(req.params.id);
        // console.log(req.params.id,'send  user',to_user);

        let newFriend=await Friend.create({
            from_user:req.user._id,
            to_user:req.params.id
        });

        await from_user.friends.push(newFriend);
        // console.log(from_user.friends)
        await to_user.friends.push(newFriend);
        // console.log(to_user.friends)
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
        let tt=await User.findById(friendship.to_user)
        .populate({ //for specifying to fetch user of the comment
            path:'friends',
            populate:{
                path:'to_user'
            }
        })
          
        //    console.log(friendship.to_user);
        //    console.log(friendship);
        //    let tt= await User.findById(friendship.to_user);
        // console.log(tt,'tt printed'); 
        // console.log(tt.friends,'tt printed');
        // let test1=await User.findOne({friends:req.params.id});
        // console.log('testcode',test1,"test code",test1[0].friends);
        
        // console.log('testcode',test,"test code");
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