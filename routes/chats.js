const express=require('express');

const router= express.Router();

const chatsControllers=require("../controllers/chats_controller");

router.post('/create',chatsControllers.create);




module.exports=router;