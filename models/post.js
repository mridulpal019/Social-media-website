const mongoose=require('mongoose');

const multer=require('multer');

const path = require('path');

const POST_PATH=path.join('/uploads/users/posts');

const postSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post_media:{
        type:String,
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

});

let storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'..',POST_PATH))//adding avatar path to be uploaded
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now());
    }

});

postSchema.statics.uploadedPost=multer({storage:storage}).single('post_media');//single for uploading single fine
postSchema.statics.postPath=POST_PATH;

const Post =mongoose.model("Post",postSchema);

module.exports =Post;