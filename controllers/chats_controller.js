const Chat =require('../models/chat');

module.exports.create= async function(req,res){

    try{        
        let messenger= await Chat.create({
            messenger:req.body.username,
            msg:req.body.msg,
            user_id:req.body.user_id

        });
        return res.json(200,{
          message:"reques is succesfully",
          data:{
              ress :'message is saved in database',
          }
      })
    }catch(err){
        console.log(err,"err in saving chat")
        return res.json(500,{
            message:"internal Server Error"
        })
    }    

}