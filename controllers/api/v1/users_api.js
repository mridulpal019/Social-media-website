const User=require('../../../models/user');

const jwt =require('jsonwebtoken');

module.exports.createSession =async function(req,res){
       
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.passport != req.body.passport){
            return res.json(422,{
                message:"Invalid Username or password"
            });
         }
        return res.json(200,{
            message:"Sign in Successfully",
            data:{
                    token:jwt.sign(user.toJSON(),'Sometthing',{expiresIn:'1000000'})
                }
            });
            }
        
    catch(err){
       console.log('create section jwt',err)
        return res.json(500,{
            message:"Internal Server Errorrr",
        })
    }
} 