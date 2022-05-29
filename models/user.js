const mongoose=require('mongoose');
//multer fo file upload we have differnt multer 
const multer=require('multer');

const path = require('path');

const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
},{
    timestamps:true
});

let storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'..',AVATAR_PATH))//adding avatar path to be uploaded
    },
    filename: function(req,file,cb){
        cb(null,file.filename + '-' + Date.now());
    }

});

//static functions
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');//single for uploading single fine
userSchema.statics.avatarPath=AVATAR_PATH;

const User = mongoose.model("User",userSchema);

module.exports=User;