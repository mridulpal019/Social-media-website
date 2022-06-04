const express=require('express');

const router= express.Router();

const likesControllers=require("../controllers/likes_controller");

router.post('/toggle',likesControllers.toggleLike);




module.exports=router;
