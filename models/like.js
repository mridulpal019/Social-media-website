const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,

    },
    //this define sthe obj id of liked obj
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        //which other propertry it refer
        refPath:'onModel'

    },
    //this field is used to define the type of the liked object since this is a dyanamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']

    }
},
{
    timestamps:true,
});

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;