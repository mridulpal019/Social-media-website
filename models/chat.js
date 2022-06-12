const mongoose=require('mongoose');


const chatSchema= new mongoose.Schema({
    messenger:{
        type:String,
        required:true,
        
    },
    msg:{
        type:String,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
});

const Chat =mongoose.model("Chat",chatSchema);

module.exports = Chat;
