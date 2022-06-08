const mongoose=require('mongoose');

const postSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //inclede the id of comments to post
    comments :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},

//timestamp
{
    timestamps:true,

})

const Post =mongoose.model("Post",postSchema);

module.exports =Post;