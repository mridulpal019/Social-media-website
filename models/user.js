const mongoose=require('mongoose');
//multer fo file upload we have differnt multer 
const multer=require('multer');

const path = require('path');

const AVATAR_PATH=path.join('/uploads/users/avatars');
//for cover photo path
const COVER_PIC_PATH=path.join('/uploads/users/cover_photo')

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
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friend'
    }],
    avatar:{
        type:String,
    },
    cover_photo:{
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
        cb(null,file.fieldname + '-' + Date.now());
    }

});
//cover_photo
let cover_storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',COVER_PIC_PATH))//adding cover photo path to upload
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' +Date.now());
    }
});

//static functions so that it can accessible through the files via uerschema 
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');//single for uploading single fine
userSchema.statics.avatarPath=AVATAR_PATH;
userSchema.statics.uploadedCoverPic=multer({storage:cover_storage}).single('cover_photo');
userSchema.statics.coverPicPath=COVER_PIC_PATH;

const User = mongoose.model("User",userSchema);

module.exports=User;